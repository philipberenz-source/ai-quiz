import { randomUUID } from "node:crypto";

export const createMultiplayerService = ({
  state,
  constants,
  mapper,
  leaderboardService,
}) => {
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

  const getUsernameForUser = (userId) => state.activeUsers.get(userId)?.username || userId;

  const getPendingInvitesForUser = (userId) =>
    Array.from(state.pendingInvites.values())
      .filter((invite) => invite.toUserId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const hasPendingInviteBetween = (userA, userB) =>
    Array.from(state.pendingInvites.values()).some(
      (invite) =>
        (invite.fromUserId === userA && invite.toUserId === userB) ||
        (invite.fromUserId === userB && invite.toUserId === userA)
    );

  const mapOnlineUsers = () => state.activeUsers;
  const listPendingInvites = () => state.pendingInvites.entries();

  const toDashboardGame = (game, userId) => mapper.toDashboardGame(game, userId);
  const toGameSnapshot = (game, userId) => mapper.toGameSnapshot(game, userId);

  const registerSocketUser = ({ socketId, userId, username }) => {
    state.socketToUserId.set(socketId, userId);

    const existing = state.activeUsers.get(userId);
    if (existing) {
      existing.socketIds.add(socketId);
      if (username) {
        existing.username = username;
      }
      return existing;
    }

    const nextUser = {
      userId,
      username: username || userId,
      socketIds: new Set([socketId]),
    };
    state.activeUsers.set(userId, nextUser);
    return nextUser;
  };

  const unregisterSocketUser = ({ socketId }) => {
    const disconnectedUserId = state.socketToUserId.get(socketId);
    state.socketToUserId.delete(socketId);

    if (!disconnectedUserId) {
      return { disconnectedUserId: null, removedUser: null };
    }

    const userEntry = state.activeUsers.get(disconnectedUserId);
    if (!userEntry) {
      return { disconnectedUserId, removedUser: null };
    }

    userEntry.socketIds.delete(socketId);
    if (userEntry.socketIds.size > 0) {
      return { disconnectedUserId, removedUser: null };
    }

    state.activeUsers.delete(disconnectedUserId);
    return { disconnectedUserId, removedUser: userEntry };
  };

  const buildInvite = ({ fromUserId, toUserId, difficulty }) => ({
    inviteId: randomUUID(),
    fromUserId,
    fromUsername: getUsernameForUser(fromUserId),
    toUserId,
    difficulty,
    createdAt: new Date().toISOString(),
  });

  const validateInviteRequest = ({ userId, toUserId, difficulty }) => {
    if (!toUserId || typeof toUserId !== "string") {
      return "Invalid invite target.";
    }

    if (!constants.ALLOWED_DIFFICULTIES.has(difficulty)) {
      return "Invalid difficulty.";
    }

    if (toUserId === userId) {
      return "You cannot invite yourself.";
    }

    if (!state.activeUsers.has(toUserId)) {
      return "Player is offline.";
    }

    return null;
  };

  const validateInviteResponsePayload = ({ inviteId, action }) => {
    if (!inviteId || (action !== "accept" && action !== "decline")) {
      return "Invalid invite response.";
    }

    return null;
  };

  const validateChooseCategoryPayload = ({ gameId, category }) => {
    if (!gameId || !category || typeof category !== "string") {
      return "Invalid category selection payload.";
    }

    return null;
  };

  const validateSubmitAnswerPayload = ({ gameId, questionIndex }) => {
    const parsedIndex = Number(questionIndex);
    if (!gameId || Number.isNaN(parsedIndex)) {
      return { error: "Invalid answer payload.", parsedIndex: null };
    }

    return { error: null, parsedIndex };
  };

  const validateGameDeletePayload = ({ gameId }) => {
    if (!gameId || typeof gameId !== "string") {
      return "Invalid game deletion payload.";
    }

    return null;
  };

  const validateDashboardRefreshPayload = ({ userId }) => {
    if (!userId) {
      return "Invalid dashboard refresh payload.";
    }

    return null;
  };

  const computeAnswerUpdateData = ({ game, userId, parsedIndex, isCorrect }) => {
    const scoreField = userId === game.player1ClerkId ? "player1Score" : "player2Score";
    const updateData = {};

    if (isCorrect) {
      updateData[scoreField] = { increment: 1 };
    }

    const nextQuestionIndex = parsedIndex + 1;
    if (nextQuestionIndex < constants.QUESTIONS_PER_TURN) {
      updateData.currentQuestionIndex = nextQuestionIndex;
      return updateData;
    }

    const pickerId = game.currentTurnClerkId;
    const isPickerAnswering = Boolean(pickerId) && game.answeringPlayerClerkId === pickerId;

    if (isPickerAnswering) {
      updateData.currentQuestionIndex = 0;
      updateData.answeringPlayerClerkId = getOpponentId(game, userId);
      return updateData;
    }

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
      return updateData;
    }

    const nextPicker = pickerId ? getOpponentId(game, pickerId) : getOpponentId(game, userId);
    updateData.phase = "PICK_CATEGORY";
    updateData.currentTurnClerkId = nextPicker;
    updateData.answeringPlayerClerkId = null;
    updateData.currentCategory = null;
    updateData.currentQuestions = null;
    updateData.currentQuestionIndex = 0;

    return updateData;
  };

  const createGameDataFromInvite = (invite) => ({
    status: "ACTIVE",
    phase: "PICK_CATEGORY",
    difficulty: invite.difficulty,
    player1ClerkId: invite.fromUserId,
    player1Username: invite.fromUsername || getUsernameForUser(invite.fromUserId),
    player2ClerkId: invite.toUserId,
    player2Username: getUsernameForUser(invite.toUserId),
    currentTurnClerkId: invite.fromUserId,
    answeringPlayerClerkId: null,
    currentQuestionIndex: 0,
    completedTurns: 0,
    totalTurns: constants.TOTAL_TURNS,
    activePairKey: getPairKey(invite.fromUserId, invite.toUserId),
  });

  const addInvite = (invite) => {
    state.pendingInvites.set(invite.inviteId, invite);
  };

  const removeInvite = (inviteId) => {
    const invite = state.pendingInvites.get(inviteId) || null;
    state.pendingInvites.delete(inviteId);
    return invite;
  };

  const getInvite = (inviteId) => state.pendingInvites.get(inviteId) || null;

  const awardCompletedGame = async (game) => {
    await leaderboardService.awardMultiplayerWinnerPoints(game);
  };

  return {
    userRoom,
    getPairKey,
    isPlayerInGame,
    isSamePair,
    getOpponentId,
    getUsernameForUser,
    getPendingInvitesForUser,
    hasPendingInviteBetween,
    mapOnlineUsers,
    listPendingInvites,
    toDashboardGame,
    toGameSnapshot,
    registerSocketUser,
    unregisterSocketUser,
    buildInvite,
    validateInviteRequest,
    validateInviteResponsePayload,
    validateChooseCategoryPayload,
    validateSubmitAnswerPayload,
    validateGameDeletePayload,
    validateDashboardRefreshPayload,
    computeAnswerUpdateData,
    createGameDataFromInvite,
    addInvite,
    removeInvite,
    getInvite,
    awardCompletedGame,
  };
};
