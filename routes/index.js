import express from "express";
import { createQuizRoutes } from "./quizRoutes.js";
import { createWebhookRoutes } from "./webhookRoutes.js";
import { createLeaderboardRoutes } from "./leaderboardRoutes.js";

export const registerHttpRoutes = (app, deps = {}) => {
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

  app.use("/retrievequestions", questionsRouter);
  app.use("/retrievecategories", categoriesRouter);
  app.use("/api/webhooks", webhookRouter);

  app.use(express.json());
  app.use(leaderboardRouter);
};
