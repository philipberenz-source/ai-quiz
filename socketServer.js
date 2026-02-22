import { Server } from "socket.io";

export const createSocketServer = (httpServer) =>
  new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
