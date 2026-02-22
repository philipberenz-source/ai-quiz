import express from "express";
import { createLeaderboardService } from "../leaderboardService.js";
import { createLeaderboardController } from "../controllers/leaderboardController.js";
import { asyncHandler } from "../asyncHandler.js";

export const createLeaderboardRoutes = ({ prisma, leaderboardService } = {}) => {
  const service = leaderboardService || createLeaderboardService({ prisma });
  const controller = createLeaderboardController({ leaderboardService: service });

  const router = express.Router();
  router.get("/leaderboard", asyncHandler(controller.getLeaderboard));
  router.post("/leaderboard/singleplayer", asyncHandler(controller.submitSingleplayer));

  return {
    router,
    leaderboardService: service,
  };
};
