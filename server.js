import { createServer } from "node:http";
import { loadEnv } from "./env.js";
import { DEFAULT_PORT } from "./constants.js";
import { createPrismaClient } from "./prismaClient.js";
import { createSocketServer } from "./socketServer.js";
import { createMultiplayerState } from "./multiplayerState.js";
import { registerSocketHandlers } from "./routes/socketRoutes.js";
import { createApp } from "./createApp.js";
import { startServer } from "./startServer.js";
import { createLeaderboardService } from "./leaderboardService.js";

loadEnv();

const prisma = createPrismaClient();
const state = createMultiplayerState();
const leaderboardService = createLeaderboardService({ prisma });

const app = createApp({
  prisma,
  leaderboardService,
});

const httpServer = createServer(app);
const io = createSocketServer(httpServer);

const { cleanup } = registerSocketHandlers(io, {
  prisma,
  state,
  leaderboardService,
});

cleanup.pruneCompletedGames().catch((error) => {
  console.error("initial completed-game prune failed:", error);
});
cleanup.startCompletedGamePruner();

const port = Number(process.env.PORT) || DEFAULT_PORT;

await startServer({
  server: httpServer,
  port,
  onStart: (activePort) => {
    console.log(`Server is running on http://localhost:${activePort}`);
  },
});
