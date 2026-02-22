import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { registerHttpRoutes } from "./routes/index.js";
import { httpErrorHandler } from "./httpErrorHandler.js";

export const createApp = (deps = {}) => {
  const app = express();
  const useClerk = deps.middleware?.useClerk !== false;

  if (useClerk) {
    app.use(
      clerkMiddleware({
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      })
    );
  }

  app.use(cors({ origin: "*" }));
  registerHttpRoutes(app, deps);
  app.use(httpErrorHandler);

  return app;
};
