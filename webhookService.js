export const createWebhookService = ({ prisma }) => ({
  async handleEvent(evt) {
    const { type, data } = evt;
    if (!data?.id) {
      return;
    }

    if (type === "user.created") {
      await prisma.user.create({
        data: {
          username: data.username,
          clerkId: data.id,
        },
      });
      return;
    }

    if (type === "user.updated") {
      await prisma.user.update({
        where: { clerkId: data.id },
        data: { username: data.username },
      });
      return;
    }

    if (type === "user.deleted") {
      await prisma.user.delete({
        where: { clerkId: data.id },
      });
    }
  },
});
