import { PrismaClient } from "./generated/prisma/index.js";

let prismaInstance = null;

export const createPrismaClient = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }

  return prismaInstance;
};
