import { AppError } from "./errors.js";

export const httpErrorHandler = (error, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      code: error.code,
      details: error.details || undefined,
    });
    return;
  }

  console.error("Unhandled HTTP error:", error);
  res.status(500).json({ message: "Internal server error." });
};
