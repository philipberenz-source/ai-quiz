export const createMultiplayerMapper = ({ questionsPerTurn }) => {
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
      totalQuestionsInTurn: questions.length || questionsPerTurn,
      question,
      isWaiting:
        game.status === "ACTIVE" &&
        !dashboardGame.isYourTurnToPick &&
        !dashboardGame.isYourTurnToAnswer,
      updatedAt: game.updatedAt,
    };
  };

  return {
    toDashboardGame,
    toGameSnapshot,
  };
};
