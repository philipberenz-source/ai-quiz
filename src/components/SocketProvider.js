import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";

let socket;

export const initSocket = (auth) => {
  if (!socket) {
    socket = io("http://localhost:8080", { auth });
  }
  return socket;
};

const SocketContext = createContext(null);

const toSummaryFromGame = (game) => ({
  id: game.id,
  status: game.status,
  phase: game.phase,
  difficulty: game.difficulty,
  opponentClerkId: game.opponentClerkId,
  opponentUsername: game.opponentUsername,
  selfScore: game.selfScore,
  opponentScore: game.opponentScore,
  currentCategory: game.currentCategory || null,
  completedTurns: game.completedTurns,
  totalTurns: game.totalTurns,
  isYourTurnToPick: game.isYourTurnToPick,
  isYourTurnToAnswer: game.isYourTurnToAnswer,
});

const upsertGameSummary = (games, summary) => {
  const foundIndex = games.findIndex((game) => game.id === summary.id);
  if (summary.status !== "ACTIVE") {
    if (foundIndex === -1) {
      return games;
    }
    return games.filter((game) => game.id !== summary.id);
  }

  if (foundIndex === -1) {
    return [summary, ...games];
  }

  return games.map((game) => (game.id === summary.id ? summary : game));
};

export const SocketProvider = ({ children }) => {
  const { user } = useUser();
  const [instance, setInstance] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [activeGames, setActiveGames] = useState([]);
  const [gamesById, setGamesById] = useState({});
  const [lastSystemMessage, setLastSystemMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      setInstance(null);
      setActiveUsers([]);
      setPendingInvites([]);
      setActiveGames([]);
      setGamesById({});
      setLastSystemMessage(null);
      return;
    }

    const s = initSocket({
      userId: user.id,
      username: user.username || user.fullName || "player",
    });

    const onPresence = (users) => {
      setActiveUsers(Array.isArray(users) ? users : []);
    };

    const onDashboardSync = (payload = {}) => {
      const invites = Array.isArray(payload.pendingInvites) ? payload.pendingInvites : [];
      const games = Array.isArray(payload.activeGames) ? payload.activeGames : [];
      setPendingInvites(invites);
      setActiveGames(games);
    };

    const onInviteReceived = (invite) => {
      if (!invite?.inviteId) {
        return;
      }
      setPendingInvites((prev) => {
        if (prev.some((item) => item.inviteId === invite.inviteId)) {
          return prev;
        }
        return [invite, ...prev];
      });
    };

    const onInviteResult = (result) => {
      setLastSystemMessage(result || null);
      if (!result?.inviteId) {
        return;
      }

      if (
        result.status === "declined" ||
        result.status === "accepted" ||
        result.status === "cancelled" ||
        result.status === "error"
      ) {
        setPendingInvites((prev) => prev.filter((invite) => invite.inviteId !== result.inviteId));
      }
    };

    const onGameUpdated = (game) => {
      if (!game?.id) {
        return;
      }

      setGamesById((prev) => ({
        ...prev,
        [game.id]: game,
      }));

      const summary = toSummaryFromGame(game);
      setActiveGames((prev) => upsertGameSummary(prev, summary));
    };

    const onGameError = (payload = {}) => {
      setLastSystemMessage({
        status: "error",
        message: payload.message || "Game action failed.",
      });
    };

    const onGameRemoved = (payload = {}) => {
      const { gameId, message } = payload;
      if (!gameId) {
        return;
      }

      setGamesById((prev) => {
        if (!prev[gameId]) {
          return prev;
        }
        const next = { ...prev };
        delete next[gameId];
        return next;
      });
      setActiveGames((prev) => prev.filter((game) => game.id !== gameId));

      if (message) {
        setLastSystemMessage({
          status: "cancelled",
          message,
        });
      }
    };

    s.on("connect", () => {
      s.emit("dashboard:refresh");
    });
    s.on("presence:active-users", onPresence);
    s.on("dashboard:sync", onDashboardSync);
    s.on("invite:received", onInviteReceived);
    s.on("invite:result", onInviteResult);
    s.on("game:updated", onGameUpdated);
    s.on("game:error", onGameError);
    s.on("game:removed", onGameRemoved);

    setInstance(s);

    return () => {
      s.off("presence:active-users", onPresence);
      s.off("dashboard:sync", onDashboardSync);
      s.off("invite:received", onInviteReceived);
      s.off("invite:result", onInviteResult);
      s.off("game:updated", onGameUpdated);
      s.off("game:error", onGameError);
      s.off("game:removed", onGameRemoved);
      s.disconnect();
      socket = null;
    };
  }, [user]);

  const sendInvite = useCallback(
    (toUserId, difficulty) => {
      if (!instance) return;
      instance.emit("invite:send", { toUserId, difficulty });
    },
    [instance]
  );

  const respondInvite = useCallback(
    (inviteId, action) => {
      if (!instance) return;
      instance.emit("invite:respond", { inviteId, action });
    },
    [instance]
  );

  const chooseCategory = useCallback(
    (gameId, category) => {
      if (!instance) return;
      instance.emit("game:choose-category", { gameId, category });
    },
    [instance]
  );

  const submitAnswer = useCallback(
    (gameId, questionIndex, selectedAnswer) => {
      if (!instance) return;
      instance.emit("game:submit-answer", { gameId, questionIndex, selectedAnswer });
    },
    [instance]
  );

  const deleteGame = useCallback(
    (gameId) => {
      if (!instance) return;
      instance.emit("game:delete", { gameId });
    },
    [instance]
  );

  const refreshDashboard = useCallback(() => {
    if (!instance) return;
    instance.emit("dashboard:refresh");
  }, [instance]);

  const clearLastSystemMessage = useCallback(() => {
    setLastSystemMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      socket: instance,
      activeUsers,
      pendingInvites,
      activeGames,
      gamesById,
      lastSystemMessage,
      sendInvite,
      respondInvite,
      chooseCategory,
      submitAnswer,
      deleteGame,
      refreshDashboard,
      clearLastSystemMessage,
    }),
    [
      instance,
      activeUsers,
      pendingInvites,
      activeGames,
      gamesById,
      lastSystemMessage,
      sendInvite,
      respondInvite,
      chooseCategory,
      submitAnswer,
      deleteGame,
      refreshDashboard,
      clearLastSystemMessage,
    ]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
