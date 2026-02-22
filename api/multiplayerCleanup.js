export const createMultiplayerCleanup = ({
  repository,
  state,
  constants,
  onDeleteGameAndNotify,
}) => {
  let deleteNotifier = onDeleteGameAndNotify;

  const setDeleteNotifier = (handler) => {
    deleteNotifier = handler;
  };

  const clearGameCleanupTimer = (gameId) => {
    if (!gameId) {
      return;
    }

    const timer = state.gameCleanupTimers.get(gameId);
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    state.gameCleanupTimers.delete(gameId);
  };

  const scheduleCompletedGameCleanup = (game) => {
    if (!game?.id) {
      return;
    }

    clearGameCleanupTimer(game.id);

    const timer = setTimeout(async () => {
      state.gameCleanupTimers.delete(game.id);

      try {
        const storedGame = await repository.findStoredGame(game.id);
        if (!storedGame || storedGame.status !== "COMPLETED") {
          return;
        }

        if (typeof deleteNotifier !== "function") {
          return;
        }

        await deleteNotifier(storedGame, {
          reason: "completed-cleanup",
          message: "Finished game was automatically removed.",
        });
      } catch (error) {
        console.error("completed-game cleanup failed:", error);
      }
    }, constants.COMPLETED_GAME_CLEANUP_DELAY_MS);

    state.gameCleanupTimers.set(game.id, timer);
  };

  const pruneCompletedGames = async () => {
    try {
      await repository.deleteCompletedGames();
    } catch (error) {
      console.error("completed-game prune failed:", error);
    }
  };

  const startCompletedGamePruner = () => {
    const interval = setInterval(() => {
      pruneCompletedGames().catch((error) => {
        console.error("scheduled completed-game prune failed:", error);
      });
    }, constants.COMPLETED_GAMES_PRUNE_INTERVAL_MS);

    if (typeof interval.unref === "function") {
      interval.unref();
    }

    return interval;
  };

  return {
    clearGameCleanupTimer,
    setDeleteNotifier,
    scheduleCompletedGameCleanup,
    pruneCompletedGames,
    startCompletedGamePruner,
  };
};
