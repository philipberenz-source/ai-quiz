import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { registerHttpRoutes } from "./routes/index.js";
import { httpErrorHandler } from "./httpErrorHandler.js";
import { enforceOriginAllowlist, isAllowedOrigin } from "./httpAccessControl.js";

export const createApp = (deps = {}) => {
  const app = express();
  const useClerk = deps.middleware?.useClerk !== false;
  const requireHttpAuth = deps.middleware?.requireHttpAuth ?? useClerk;
  const httpAuthMiddleware = deps.middleware?.httpAuthMiddleware;

  if (useClerk) {
    app.use(
      clerkMiddleware({
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      })
    );
  }

  app.use(
    cors({
      origin(origin, callback) {
        callback(null, isAllowedOrigin(origin));
      },
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(enforceOriginAllowlist);

  registerHttpRoutes(app, {
    ...deps,
    middleware: {
      ...deps.middleware,
      useClerk,
      requireHttpAuth,
      httpAuthMiddleware,
    },
  });
  app.use(httpErrorHandler);

  return app;
};
