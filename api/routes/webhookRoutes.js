import express from "express";
import { createWebhookService } from "../webhookService.js";
import { createWebhookController } from "../controllers/webhookController.js";
import { asyncHandler } from "../asyncHandler.js";

export const createWebhookRoutes = ({ prisma, webhookService, verifyWebhookFn } = {}) => {
  const service = webhookService || createWebhookService({ prisma });
  const controller = createWebhookController({
    webhookService: service,
    verifyWebhookFn,
  });

  const router = express.Router();
  router.post("/", express.raw({ type: "application/json" }), asyncHandler(controller.receiveWebhook));

  return {
    router,
    webhookService: service,
  };
};
