export const DEFAULT_PORT = 8080;

export const TOTAL_TURNS = 6;
export const QUESTIONS_PER_TURN = 3;

export const MULTIPLAYER_MIGRATION_MESSAGE =
  "Multiplayer database is not ready. Run `npx prisma migrate deploy` inside /api.";

export const ALLOWED_DIFFICULTIES = new Set([
  "easy",
  "intermediate",
  "advanced",
  "hard",
  "impossible",
]);

export const COMPLETED_GAME_CLEANUP_DELAY_MS = 15_000;
export const COMPLETED_GAMES_PRUNE_INTERVAL_MS = 30 * 60 * 1000;
