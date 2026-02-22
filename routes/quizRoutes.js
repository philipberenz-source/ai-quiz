import express from "express";
import { createQuizService } from "../quizService.js";
import { createQuizController } from "../controllers/quizController.js";
import { asyncHandler } from "../asyncHandler.js";

export const createQuizRoutes = (deps = {}) => {
  const quizService = deps.quizService || createQuizService();
  const quizController = createQuizController({ quizService });

  const questionsRouter = express.Router();
  questionsRouter.get("/", asyncHandler(quizController.getQuestions));

  const categoriesRouter = express.Router();
  categoriesRouter.get("/", asyncHandler(quizController.getCategories));

  return {
    questionsRouter,
    categoriesRouter,
  };
};
