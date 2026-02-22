import { MULTIPLAYER_MIGRATION_MESSAGE } from "./constants.js";

export const createMultiplayerRepository = ({ prisma, state }) => {
  const isMissingMultiplayerTableError = (error) =>
    error?.code === "P2021" &&
    (error?.meta?.modelName === "MultiplayerGame" ||
      String(error?.meta?.table || "").includes("MultiplayerGame"));

  const warnMissingMultiplayerTableOnce = () => {
    if (state.flags.hasWarnedMissingMultiplayerTable) {
      return;
    }

    state.flags.hasWarnedMissingMultiplayerTable = true;
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

  const getActiveGameForPair = async (pairKey) => {
    try {
      return await prisma.multiplayerGame.findFirst({
        where: {
          status: "ACTIVE",
          activePairKey: pairKey,
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

  const findActiveGamesForUsers = async (onlineUserIds) => {
    if (!onlineUserIds.length) {
      return [];
    }

    try {
      return await prisma.multiplayerGame.findMany({
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
        return [];
      }
      throw error;
    }
  };

  const findGameById = (gameId) =>
    prisma.multiplayerGame.findUnique({
      where: { id: gameId },
    });

  const createGame = (data) =>
    prisma.multiplayerGame.create({
      data,
    });

  const updateGame = (gameId, data) =>
    prisma.multiplayerGame.update({
      where: { id: gameId },
      data,
    });

  const deleteGame = async (gameId) => {
    try {
      await prisma.multiplayerGame.delete({
        where: { id: gameId },
      });
    } catch (error) {
      if (error?.code !== "P2025") {
        throw error;
      }
    }
  };

  const findStoredGame = (gameId) =>
    prisma.multiplayerGame.findUnique({
      where: { id: gameId },
    });

  const deleteCompletedGames = async () => {
    try {
      await prisma.multiplayerGame.deleteMany({
        where: { status: "COMPLETED" },
      });
    } catch (error) {
      if (isMissingMultiplayerTableError(error)) {
        warnMissingMultiplayerTableOnce();
        return;
      }

      throw error;
    }
  };

  return {
    isMissingMultiplayerTableError,
    warnMissingMultiplayerTableOnce,
    getErrorMessage,
    getActiveGamesForUser,
    getAnyActiveGameForUser,
    getActiveGameForPair,
    findActiveGamesForUsers,
    findGameById,
    createGame,
    updateGame,
    deleteGame,
    findStoredGame,
    deleteCompletedGames,
  };
};
