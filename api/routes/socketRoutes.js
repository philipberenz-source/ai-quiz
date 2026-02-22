import generateQuestions from "../generateQuestions.js";
import {
  TOTAL_TURNS,
  QUESTIONS_PER_TURN,
  ALLOWED_DIFFICULTIES,
  COMPLETED_GAME_CLEANUP_DELAY_MS,
  COMPLETED_GAMES_PRUNE_INTERVAL_MS,
} from "../constants.js";
import { createMultiplayerMapper } from "../multiplayerMapper.js";
import { createMultiplayerService } from "../multiplayerService.js";
import { createMultiplayerRepository } from "../multiplayerRepository.js";
import { createMultiplayerCleanup } from "../multiplayerCleanup.js";
import { createMultiplayerSocketController } from "../controllers/multiplayerSocketController.js";

export const registerSocketHandlers = (ioOrDeps, maybeDeps = {}) => {
  const deps =
    ioOrDeps && typeof ioOrDeps === "object" && "io" in ioOrDeps && !("to" in ioOrDeps)
      ? ioOrDeps
      : { ...maybeDeps, io: ioOrDeps };

  const {
    io,
    prisma,
    state,
    leaderboardService,
    generateQuestionsFn = generateQuestions,
  } = deps;

  const constants = {
    TOTAL_TURNS,
    QUESTIONS_PER_TURN,
    ALLOWED_DIFFICULTIES,
    COMPLETED_GAME_CLEANUP_DELAY_MS,
    COMPLETED_GAMES_PRUNE_INTERVAL_MS,
  };

  const mapper = createMultiplayerMapper({
    questionsPerTurn: constants.QUESTIONS_PER_TURN,
  });

  const repository = createMultiplayerRepository({
    prisma,
    state,
  });

  const service = createMultiplayerService({
    state,
    constants,
    mapper,
    leaderboardService,
  });

  const cleanup = createMultiplayerCleanup({
    repository,
    state,
    constants,
    onDeleteGameAndNotify: async () => {},
  });

  const controller = createMultiplayerSocketController({
    io,
    repository,
    service,
    cleanup,
    generateQuestions: generateQuestionsFn,
    constants,
  });

  cleanup.setDeleteNotifier(controller.deleteGameAndNotify);
  controller.registerAuthMiddleware();
  controller.registerConnectionHandlers();

  return {
    controller,
    cleanup,
  };
};
