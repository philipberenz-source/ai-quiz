export const createLeaderboardRepository = ({ prisma }) => ({
  findUsers() {
    return prisma.user.findMany({
      select: {
        clerkId: true,
        username: true,
        score: true,
      },
    });
  },

  normalizeNullScores(clerkId) {
    return prisma.user.updateMany({
      where: { clerkId, score: null },
      data: { score: 0 },
    });
  },

  incrementScore(clerkId, points) {
    return prisma.user.update({
      where: { clerkId },
      data: {
        score: { increment: points },
      },
    });
  },

  createUser({ clerkId, username, score }) {
    return prisma.user.create({
      data: {
        clerkId,
        username,
        score,
      },
    });
  },

  updateUsername(clerkId, username) {
    return prisma.user.update({
      where: { clerkId },
      data: { username },
    });
  },
});
