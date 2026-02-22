import { createLeaderboardRepository } from "./leaderboardRepository.js";

export const sanitizeUsername = (username) => {
  if (typeof username !== "string") {
    return null;
  }

  const trimmed = username.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const createLeaderboardService = ({ prisma, repository } = {}) => {
  const leaderboardRepository =
    repository || (prisma ? createLeaderboardRepository({ prisma }) : null);

  if (!leaderboardRepository) {
    throw new Error("createLeaderboardService requires prisma or repository");
  }

  const addPointsToLeaderboard = async ({ clerkId, username, points }) => {
    if (!clerkId || typeof clerkId !== "string") {
      return;
    }

    const parsedPoints = Number(points);
    if (!Number.isInteger(parsedPoints) || parsedPoints <= 0) {
      return;
    }

    const normalizedUsername = sanitizeUsername(username);

    await leaderboardRepository.normalizeNullScores(clerkId);

    try {
      await leaderboardRepository.incrementScore(clerkId, parsedPoints);
    } catch (error) {
      if (error?.code !== "P2025") {
        throw error;
      }

      try {
        await leaderboardRepository.createUser({
          clerkId,
          username: normalizedUsername,
          score: parsedPoints,
        });
        return;
      } catch (createError) {
        if (createError?.code !== "P2002") {
          throw createError;
        }

        try {
          await leaderboardRepository.incrementScore(clerkId, parsedPoints);
        } catch (retryError) {
          if (retryError?.code !== "P2025") {
            throw retryError;
          }

          await leaderboardRepository.createUser({
            clerkId,
            score: parsedPoints,
          });
        }
      }
    }

    if (!normalizedUsername) {
      return;
    }

    try {
      await leaderboardRepository.updateUsername(clerkId, normalizedUsername);
    } catch (error) {
      if (error?.code !== "P2002") {
        throw error;
      }
    }
  };

  const awardMultiplayerWinnerPoints = async (game) => {
    if (!game || game.status !== "COMPLETED") {
      return;
    }

    if (game.player1Score === game.player2Score) {
      return;
    }

    const winnerIsPlayer1 = game.player1Score > game.player2Score;
    const winnerClerkId = winnerIsPlayer1 ? game.player1ClerkId : game.player2ClerkId;
    const winnerUsername = winnerIsPlayer1 ? game.player1Username : game.player2Username;
    const winnerScore = winnerIsPlayer1 ? game.player1Score : game.player2Score;

    await addPointsToLeaderboard({
      clerkId: winnerClerkId,
      username: winnerUsername,
      points: winnerScore,
    });
  };

  const getLeaderboard = async () => {
    const users = await leaderboardRepository.findUsers();

    return users
      .filter((user) => Boolean(user.clerkId))
      .map((user) => ({
        clerkId: user.clerkId,
        username: sanitizeUsername(user.username) || "Unknown Player",
        score: Number.isInteger(user.score) ? user.score : 0,
      }))
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.username.localeCompare(b.username);
      });
  };

  const submitSingleplayerScore = async ({ clerkId, username, correctAnswers }) => {
    const points = Number(correctAnswers);
    if (!clerkId || !Number.isInteger(points) || points < 0) {
      return { ok: false, statusCode: 400, message: "Invalid singleplayer score payload." };
    }

    if (points > 0) {
      await addPointsToLeaderboard({ clerkId, username, points });
    }

    return { ok: true, statusCode: 200 };
  };

  return {
    sanitizeUsername,
    addPointsToLeaderboard,
    awardMultiplayerWinnerPoints,
    getLeaderboard,
    submitSingleplayerScore,
  };
};
