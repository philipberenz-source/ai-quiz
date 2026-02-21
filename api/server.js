import express from "express";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { Server } from "socket.io";
import { PrismaClient } from "./generated/prisma/index.js";
import { clerkMiddleware } from "@clerk/express";
import retrieveQuestions from "./routes/retrieveQuestions.js";
import retrieveCategories from "./routes/retrieveCategories.js";
import webhook from "./routes/webhook.js";
import generateQuestions from "./generateQuestions.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8080;

const TOTAL_TURNS = 6;
const QUESTIONS_PER_TURN = 3;
const MULTIPLAYER_MIGRATION_MESSAGE =
  "Multiplayer database is not ready. Run `npx prisma migrate deploy` inside /api.";
const ALLOWED_DIFFICULTIES = new Set([
  "easy",
  "intermediate",
  "advanced",
  "hard",
  "impossible",
]);
let hasWarnedMissingMultiplayerTable = false;

const activeUsers = new Map();
const socketToUserId = new Map();
const pendingInvites = new Map();

const userRoom = (userId) => `user:${userId}`;
const getPairKey = (userA, userB) => [userA, userB].sort().join("::");
const isPlayerInGame = (game, userId) =>
  game.player1ClerkId === userId || game.player2ClerkId === userId;
const isSamePair = (game, userA, userB) => {
  const pair = new Set([game.player1ClerkId, game.player2ClerkId]);
  return pair.has(userA) && pair.has(userB);
};

const getOpponentId = (game, userId) =>
  game.player1ClerkId === userId ? game.player2ClerkId : game.player1ClerkId;

const getUsernameForUser = (userId) =>
  activeUsers.get(userId)?.username || userId;

const isMissingMultiplayerTableError = (error) =>
  error?.code === "P2021" &&
  (error?.meta?.modelName === "MultiplayerGame" ||
    String(error?.meta?.table || "").includes("MultiplayerGame"));

const warnMissingMultiplayerTableOnce = () => {
  if (hasWarnedMissingMultiplayerTable) return;
  hasWarnedMissingMultiplayerTable = true;
  console.warn(MULTIPLAYER_MIGRATION_MESSAGE);
};

const getErrorMessage = (error, fallback) =>
  isMissingMultiplayerTableError(error) ? MULTIPLAYER_MIGRATION_MESSAGE : fallback;

const getActiveGamesForUser = async (userId) => {
  try {
    return await prisma.multiplayerGame.findMany({
      where: {
        status: "ACTIVE",
        OR: [{ player1ClerkId: userId }, { player2ClerkId: userId }],
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    if (isMissingMultiplayerTableError(error)) {
      warnMissingMultiplayerTableOnce();
      return [];
    }
    throw error;
  }
};

const getAnyActiveGameForUser = async (userId) => {
  try {
    return await prisma.multiplayerGame.findFirst({
      where: {
        status: "ACTIVE",
        OR: [{ player1ClerkId: userId }, { player2ClerkId: userId }],
      },
    });
  } catch (error) {
    if (isMissingMultiplayerTableError(error)) {
      warnMissingMultiplayerTableOnce();
      return null;
    }
    throw error;
  }
};

const getActiveGameForPair = async (userA, userB) => {
  try {
    return await prisma.multiplayerGame.findFirst({
      where: {
        status: "ACTIVE",
        activePairKey: getPairKey(userA, userB),
      },
    });
  } catch (error) {
    if (isMissingMultiplayerTableError(error)) {
      warnMissingMultiplayerTableOnce();
      return null;
    }
    throw error;
  }
};

const getPendingInvitesForUser = (userId) =>
  Array.from(pendingInvites.values())
    .filter((invite) => invite.toUserId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const hasPendingInviteBetween = (userA, userB) =>
  Array.from(pendingInvites.values()).some(
    (invite) =>
      (invite.fromUserId === userA && invite.toUserId === userB) ||
      (invite.fromUserId === userB && invite.toUserId === userA)
  );

const toDashboardGame = (game, userId) => {
  const isPlayer1 = game.player1ClerkId === userId;
  const opponentClerkId = isPlayer1 ? game.player2ClerkId : game.player1ClerkId;
  const opponentUsername = isPlayer1 ? game.player2Username : game.player1Username;
  const selfScore = isPlayer1 ? game.player1Score : game.player2Score;
  const opponentScore = isPlayer1 ? game.player2Score : game.player1Score;
  const isYourTurnToPick =
    game.status === "ACTIVE" &&
    game.phase === "PICK_CATEGORY" &&
    game.currentTurnClerkId === userId;
  const isYourTurnToAnswer =
    game.status === "ACTIVE" &&
    game.phase === "ANSWERING" &&
    game.answeringPlayerClerkId === userId;

  return {
    id: game.id,
    status: game.status,
    phase: game.phase,
    difficulty: game.difficulty,
    opponentClerkId,
    opponentUsername,
    selfScore,
    opponentScore,
    currentCategory: game.currentCategory,
    completedTurns: game.completedTurns,
    totalTurns: game.totalTurns,
    isYourTurnToPick,
    isYourTurnToAnswer,
  };
};

const toGameSnapshot = (game, userId) => {
  const dashboardGame = toDashboardGame(game, userId);
  const questions = Array.isArray(game.currentQuestions) ? game.currentQuestions : [];
  const question =
    dashboardGame.isYourTurnToAnswer && questions[game.currentQuestionIndex]
      ? questions[game.currentQuestionIndex]
      : null;

  return {
    ...dashboardGame,
    currentTurnClerkId: game.currentTurnClerkId,
    answeringPlayerClerkId: game.answeringPlayerClerkId,
    questionIndex: game.currentQuestionIndex,
    questionNumber: game.currentQuestionIndex + 1,
    totalQuestionsInTurn: questions.length || QUESTIONS_PER_TURN,
    question,
    isWaiting:
      game.status === "ACTIVE" &&
      !dashboardGame.isYourTurnToPick &&
      !dashboardGame.isYourTurnToAnswer,
    updatedAt: game.updatedAt,
  };
};

const emitToUser = (userId, eventName, payload) => {
  io.to(userRoom(userId)).emit(eventName, payload);
};

const emitGameUpdated = (game) => {
  emitToUser(
    game.player1ClerkId,
    "game:updated",
    toGameSnapshot(game, game.player1ClerkId)
  );
  emitToUser(
    game.player2ClerkId,
    "game:updated",
    toGameSnapshot(game, game.player2ClerkId)
  );
};

const syncDashboard = async (userId) => {
  if (!userId) {
    return;
  }

  const [activeGames] = await Promise.all([getActiveGamesForUser(userId)]);
  const pending = getPendingInvitesForUser(userId);

  emitToUser(userId, "dashboard:sync", {
    pendingInvites: pending,
    activeGames: activeGames.map((game) => toDashboardGame(game, userId)),
  });

  activeGames.forEach((game) => {
    emitToUser(userId, "game:updated", toGameSnapshot(game, userId));
  });
};

const broadcastActiveUsers = async () => {
  const onlineUserIds = Array.from(activeUsers.keys());
  if (onlineUserIds.length === 0) {
    io.emit("presence:active-users", []);
    return;
  }

  let activeGames = [];
  try {
    activeGames = await prisma.multiplayerGame.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { player1ClerkId: { in: onlineUserIds } },
          { player2ClerkId: { in: onlineUserIds } },
        ],
      },
    });
  } catch (error) {
    if (isMissingMultiplayerTableError(error)) {
      warnMissingMultiplayerTableOnce();
      activeGames = [];
    } else {
      throw error;
    }
  }

  const playingUsers = new Set();
  activeGames.forEach((game) => {
    playingUsers.add(game.player1ClerkId);
    playingUsers.add(game.player2ClerkId);
  });

  const payload = onlineUserIds.map((userId) => ({
    userId,
    username: activeUsers.get(userId)?.username || userId,
    status: playingUsers.has(userId) ? "playing" : "online",
  }));

  io.emit("presence:active-users", payload);
};

const invalidateInvitesForUser = async (userId) => {
  const affectedUsers = new Set();

  for (const [inviteId, invite] of pendingInvites.entries()) {
    if (invite.fromUserId === userId || invite.toUserId === userId) {
      pendingInvites.delete(inviteId);
      if (invite.fromUserId !== userId) {
        affectedUsers.add(invite.fromUserId);
        emitToUser(invite.fromUserId, "invite:result", {
          status: "cancelled",
          message: "Invite was cancelled because the other player left.",
          inviteId,
        });
      }
      if (invite.toUserId !== userId) {
        affectedUsers.add(invite.toUserId);
      }
    }
  }

  await Promise.all(Array.from(affectedUsers).map((targetUserId) => syncDashboard(targetUserId)));
};

const refreshParticipants = async (game) => {
  emitGameUpdated(game);
  await Promise.all([syncDashboard(game.player1ClerkId), syncDashboard(game.player2ClerkId)]);
  await broadcastActiveUsers();
};

app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);
app.use(cors({ origin: "*" }));
app.use("/retrievequestions", retrieveQuestions);
app.use("/retrievecategories", retrieveCategories);
app.use("/api/webhooks", webhook);

io.use((socket, next) => {
  const { userId, username } = socket.handshake.auth || {};
  if (!userId) {
    return next(new Error("Authentication error: userId required in handshake auth"));
  }
  socket.data.userId = userId;
  socket.data.username = username || "unknown";
  return next();
});

io.on("connection", async (socket) => {
  const { userId, username } = socket.data;

  socketToUserId.set(socket.id, userId);
  socket.join(userRoom(userId));

  const existing = activeUsers.get(userId);
  if (existing) {
    existing.socketIds.add(socket.id);
    if (username) {
      existing.username = username;
    }
  } else {
    activeUsers.set(userId, {
      userId,
      username: username || userId,
      socketIds: new Set([socket.id]),
    });
  }

  console.log(`Socket connected: ${socket.id} userId=${userId} username=${username}`);

  try {
    await syncDashboard(userId);
    await broadcastActiveUsers();
  } catch (error) {
    console.error("Error while syncing after connect:", error);
  }

  socket.on("dashboard:refresh", async () => {
    try {
      await syncDashboard(userId);
    } catch (error) {
      socket.emit("game:error", { message: "Failed to refresh dashboard." });
    }
  });

  socket.on("invite:send", async (payload = {}) => {
    try {
      const { toUserId, difficulty } = payload;

      if (!toUserId || typeof toUserId !== "string") {
        socket.emit("invite:result", {
          status: "error",
          message: "Invalid invite target.",
        });
        return;
      }

      if (!ALLOWED_DIFFICULTIES.has(difficulty)) {
        socket.emit("invite:result", {
          status: "error",
          message: "Invalid difficulty.",
        });
        return;
      }

      if (toUserId === userId) {
        socket.emit("invite:result", {
          status: "error",
          message: "You cannot invite yourself.",
        });
        return;
      }

      if (!activeUsers.has(toUserId)) {
        socket.emit("invite:result", {
          status: "error",
          message: "Player is offline.",
        });
        return;
      }

      const existingPairGame = await getActiveGameForPair(userId, toUserId);
      if (existingPairGame) {
        socket.emit("invite:result", {
          status: "existing-game",
          gameId: existingPairGame.id,
          message: "An active game already exists with this player.",
        });
        await Promise.all([syncDashboard(userId), syncDashboard(toUserId)]);
        return;
      }

      const [senderActiveGame, targetActiveGame] = await Promise.all([
        getAnyActiveGameForUser(userId),
        getAnyActiveGameForUser(toUserId),
      ]);

      if (senderActiveGame) {
        socket.emit("invite:result", {
          status: "error",
          message: "Finish your current active game before inviting another player.",
          gameId: senderActiveGame.id,
        });
        return;
      }

      if (targetActiveGame) {
        socket.emit("invite:result", {
          status: "error",
          message: "That player already has an active game.",
        });
        return;
      }

      if (hasPendingInviteBetween(userId, toUserId)) {
        socket.emit("invite:result", {
          status: "error",
          message: "There is already a pending invite between these players.",
        });
        return;
      }

      const inviteId = randomUUID();
      const invite = {
        inviteId,
        fromUserId: userId,
        fromUsername: getUsernameForUser(userId),
        toUserId,
        difficulty,
        createdAt: new Date().toISOString(),
      };

      pendingInvites.set(inviteId, invite);

      emitToUser(toUserId, "invite:received", invite);
      socket.emit("invite:result", {
        status: "sent",
        inviteId,
        message: "Invite sent.",
      });

      await Promise.all([syncDashboard(userId), syncDashboard(toUserId)]);
    } catch (error) {
      console.error("invite:send failed:", error);
      socket.emit("invite:result", {
        status: "error",
        message: getErrorMessage(error, "Failed to send invite."),
      });
    }
  });

  socket.on("invite:respond", async (payload = {}) => {
    try {
      const { inviteId, action } = payload;
      if (!inviteId || (action !== "accept" && action !== "decline")) {
        socket.emit("invite:result", {
          status: "error",
          message: "Invalid invite response.",
        });
        return;
      }

      const invite = pendingInvites.get(inviteId);
      if (!invite) {
        socket.emit("invite:result", {
          status: "error",
          message: "Invite no longer exists.",
          inviteId,
        });
        await syncDashboard(userId);
        return;
      }

      if (invite.toUserId !== userId) {
        socket.emit("invite:result", {
          status: "error",
          message: "You are not allowed to respond to this invite.",
          inviteId,
        });
        return;
      }

      pendingInvites.delete(inviteId);

      if (action === "decline") {
        emitToUser(invite.fromUserId, "invite:result", {
          status: "declined",
          inviteId,
          message: `${getUsernameForUser(userId)} declined your invite.`,
        });
        socket.emit("invite:result", {
          status: "declined",
          inviteId,
          message: "Invite declined.",
        });
        await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
        return;
      }

      let game = await getActiveGameForPair(invite.fromUserId, invite.toUserId);
      if (!game) {
        const [inviterActiveGame, inviteeActiveGame] = await Promise.all([
          getAnyActiveGameForUser(invite.fromUserId),
          getAnyActiveGameForUser(invite.toUserId),
        ]);

        if (inviterActiveGame && !isSamePair(inviterActiveGame, invite.fromUserId, invite.toUserId)) {
          emitToUser(invite.fromUserId, "invite:result", {
            status: "error",
            message: "You already started another active game.",
          });
          socket.emit("invite:result", {
            status: "error",
            message: "The inviter already started another active game.",
          });
          await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
          return;
        }

        if (inviteeActiveGame && !isSamePair(inviteeActiveGame, invite.fromUserId, invite.toUserId)) {
          emitToUser(invite.fromUserId, "invite:result", {
            status: "error",
            message: "The other player has another active game.",
          });
          socket.emit("invite:result", {
            status: "error",
            message: "You already have another active game.",
          });
          await Promise.all([syncDashboard(invite.fromUserId), syncDashboard(invite.toUserId)]);
          return;
        }

        game = await prisma.multiplayerGame.create({
          data: {
            status: "ACTIVE",
            phase: "PICK_CATEGORY",
            difficulty: invite.difficulty,
            player1ClerkId: invite.fromUserId,
            player1Username: invite.fromUsername || getUsernameForUser(invite.fromUserId),
            player2ClerkId: invite.toUserId,
            player2Username: getUsernameForUser(invite.toUserId),
            currentTurnClerkId: invite.fromUserId,
            answeringPlayerClerkId: invite.toUserId,
            currentQuestionIndex: 0,
            completedTurns: 0,
            totalTurns: TOTAL_TURNS,
            activePairKey: getPairKey(invite.fromUserId, invite.toUserId),
          },
        });
      }

      emitToUser(invite.fromUserId, "invite:result", {
        status: "accepted",
        inviteId,
        gameId: game.id,
        message: "Invite accepted. Multiplayer game is active.",
      });
      socket.emit("invite:result", {
        status: "accepted",
        inviteId,
        gameId: game.id,
        message: "Game created.",
      });

      await refreshParticipants(game);
    } catch (error) {
      console.error("invite:respond failed:", error);
      socket.emit("invite:result", {
        status: "error",
        message: getErrorMessage(error, "Failed to respond to invite."),
      });
    }
  });

  socket.on("game:choose-category", async (payload = {}) => {
    try {
      const { gameId, category } = payload;

      if (!gameId || !category || typeof category !== "string") {
        socket.emit("game:error", { message: "Invalid category selection payload." });
        return;
      }

      let game;
      try {
        game = await prisma.multiplayerGame.findUnique({ where: { id: gameId } });
      } catch (error) {
        socket.emit("game:error", {
          message: getErrorMessage(error, "Failed to load game."),
        });
        return;
      }
      if (!game || !isPlayerInGame(game, userId)) {
        socket.emit("game:error", { message: "Game not found." });
        return;
      }

      if (game.status !== "ACTIVE") {
        socket.emit("game:error", { message: "Game is no longer active." });
        return;
      }

      if (game.phase !== "PICK_CATEGORY" || game.currentTurnClerkId !== userId) {
        socket.emit("game:error", { message: "It is not your turn to pick a category." });
        return;
      }

      const questions = await generateQuestions(category, game.difficulty);
      if (!Array.isArray(questions) || questions.length < QUESTIONS_PER_TURN) {
        socket.emit("game:error", {
          message: "Could not generate enough questions for this category.",
        });
        return;
      }

      const turnQuestions = questions.slice(0, QUESTIONS_PER_TURN);
      const opponentId = getOpponentId(game, userId);

      const updatedGame = await prisma.multiplayerGame.update({
        where: { id: game.id },
        data: {
          phase: "ANSWERING",
          currentCategory: category,
          currentQuestions: turnQuestions,
          currentQuestionIndex: 0,
          answeringPlayerClerkId: opponentId,
        },
      });

      await refreshParticipants(updatedGame);
    } catch (error) {
      console.error("game:choose-category failed:", error);
      socket.emit("game:error", { message: getErrorMessage(error, "Failed to choose category.") });
    }
  });

  socket.on("game:submit-answer", async (payload = {}) => {
    try {
      const { gameId, questionIndex, selectedAnswer } = payload;
      const parsedIndex = Number(questionIndex);
      const answerValue = typeof selectedAnswer === "string" ? selectedAnswer : null;

      if (!gameId || Number.isNaN(parsedIndex)) {
        socket.emit("game:error", { message: "Invalid answer payload." });
        return;
      }

      let game;
      try {
        game = await prisma.multiplayerGame.findUnique({ where: { id: gameId } });
      } catch (error) {
        socket.emit("game:error", {
          message: getErrorMessage(error, "Failed to load game."),
        });
        return;
      }
      if (!game || !isPlayerInGame(game, userId)) {
        socket.emit("game:error", { message: "Game not found." });
        return;
      }

      if (game.status !== "ACTIVE") {
        socket.emit("game:error", { message: "Game is no longer active." });
        return;
      }

      if (game.phase !== "ANSWERING" || game.answeringPlayerClerkId !== userId) {
        socket.emit("game:error", { message: "It is not your turn to answer." });
        return;
      }

      if (game.currentQuestionIndex !== parsedIndex) {
        socket.emit("game:error", { message: "Stale answer submission detected." });
        return;
      }

      const questions = Array.isArray(game.currentQuestions) ? game.currentQuestions : [];
      const question = questions[parsedIndex];
      if (!question) {
        socket.emit("game:error", { message: "Question not found for this turn." });
        return;
      }

      const isCorrect = answerValue !== null && answerValue === question.answer;
      const scoreField = userId === game.player1ClerkId ? "player1Score" : "player2Score";
      const updateData = {};

      if (isCorrect) {
        updateData[scoreField] = { increment: 1 };
      }

      const nextQuestionIndex = parsedIndex + 1;
      if (nextQuestionIndex < QUESTIONS_PER_TURN) {
        updateData.currentQuestionIndex = nextQuestionIndex;
      } else {
        const nextCompletedTurns = game.completedTurns + 1;
        updateData.completedTurns = nextCompletedTurns;

        if (nextCompletedTurns >= game.totalTurns) {
          updateData.status = "COMPLETED";
          updateData.phase = "PICK_CATEGORY";
          updateData.currentTurnClerkId = null;
          updateData.answeringPlayerClerkId = null;
          updateData.currentCategory = null;
          updateData.currentQuestions = null;
          updateData.currentQuestionIndex = 0;
          updateData.activePairKey = null;
        } else {
          const nextPicker = userId;
          const nextAnswering = getOpponentId(game, userId);

          updateData.phase = "PICK_CATEGORY";
          updateData.currentTurnClerkId = nextPicker;
          updateData.answeringPlayerClerkId = nextAnswering;
          updateData.currentCategory = null;
          updateData.currentQuestions = null;
          updateData.currentQuestionIndex = 0;
        }
      }

      const updatedGame = await prisma.multiplayerGame.update({
        where: { id: game.id },
        data: updateData,
      });

      await refreshParticipants(updatedGame);
    } catch (error) {
      console.error("game:submit-answer failed:", error);
      socket.emit("game:error", { message: getErrorMessage(error, "Failed to submit answer.") });
    }
  });

  socket.on("disconnect", async (reason) => {
    const disconnectedUserId = socketToUserId.get(socket.id);
    socketToUserId.delete(socket.id);

    if (!disconnectedUserId) {
      return;
    }

    const userEntry = activeUsers.get(disconnectedUserId);
    if (userEntry) {
      userEntry.socketIds.delete(socket.id);
      if (userEntry.socketIds.size === 0) {
        activeUsers.delete(disconnectedUserId);
        try {
          await invalidateInvitesForUser(disconnectedUserId);
        } catch (error) {
          console.error("Failed to invalidate invites on disconnect:", error);
        }
      }
    }

    console.log(`Socket disconnected: ${socket.id} reason=${reason}`);

    try {
      await broadcastActiveUsers();
    } catch (error) {
      console.error("Failed to broadcast active users after disconnect:", error);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
