export const createMultiplayerState = () => ({
  activeUsers: new Map(),
  socketToUserId: new Map(),
  pendingInvites: new Map(),
  gameCleanupTimers: new Map(),
  flags: {
    hasWarnedMissingMultiplayerTable: false,
  },
});
