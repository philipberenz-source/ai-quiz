import express from "express";
import { createQuizRoutes } from "./quizRoutes.js";
import { createWebhookRoutes } from "./webhookRoutes.js";
import { createLeaderboardRoutes } from "./leaderboardRoutes.js";
import { requireHttpAuth as defaultRequireHttpAuth } from "../httpAccessControl.js";

export const registerHttpRoutes = (app, deps = {}) => {
  const requireAuthForHttpRoutes = deps.middleware?.requireHttpAuth === true;
  const httpAuthMiddleware = deps.middleware?.httpAuthMiddleware || defaultRequireHttpAuth;

  const { questionsRouter, categoriesRouter } = createQuizRoutes({
    quizService: deps.quizService,
  });

  const { router: webhookRouter } = createWebhookRoutes({
    prisma: deps.prisma,
    webhookService: deps.webhookService,
    verifyWebhookFn: deps.verifyWebhookFn,
  });

  const { router: leaderboardRouter } = createLeaderboardRoutes({
    prisma: deps.prisma,
    leaderboardService: deps.leaderboardService,
  });

  app.use("/api/webhooks", webhookRouter);

  const protectedRouter = express.Router();

  if (requireAuthForHttpRoutes) {
    protectedRouter.use(httpAuthMiddleware);
  }

  protectedRouter.use("/retrievequestions", questionsRouter);
  protectedRouter.use("/retrievecategories", categoriesRouter);
  protectedRouter.use(express.json());
  protectedRouter.use(leaderboardRouter);

  app.use(protectedRouter);
};
