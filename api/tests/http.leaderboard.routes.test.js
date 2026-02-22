import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createApp } from "../createApp.js";
import { createLeaderboardService } from "../leaderboardService.js";

const startTestServer = async (app) => {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  return {
    server,
    baseUrl: `http://127.0.0.1:${port}`,
  };
};

test("leaderboard routes: get sorted leaderboard and validate singleplayer payload", async () => {
  const repository = {
    async findUsers() {
      return [
        { clerkId: "c-2", username: "zoe", score: 4 },
        { clerkId: "c-1", username: "anna", score: 9 },
        { clerkId: "c-3", username: "mike", score: 9 },
      ];
    },
    async normalizeNullScores() {},
    async incrementScore() {},
    async createUser() {},
    async updateUsername() {},
  };

  const leaderboardService = createLeaderboardService({ repository });
  const quizService = {
    async retrieveQuestions() {
      return [];
    },
    async retrieveCategories() {
      return [];
    },
  };
  const webhookService = {
    async handleEvent() {},
  };

  const app = createApp({
    leaderboardService,
    quizService,
    webhookService,
    middleware: { useClerk: false },
  });

  const { server, baseUrl } = await startTestServer(app);

  try {
    const leaderboardResponse = await fetch(`${baseUrl}/leaderboard`);
    assert.equal(leaderboardResponse.status, 200);
    assert.deepEqual(await leaderboardResponse.json(), [
      { clerkId: "c-1", username: "anna", score: 9 },
      { clerkId: "c-3", username: "mike", score: 9 },
      { clerkId: "c-2", username: "zoe", score: 4 },
    ]);

    const invalidSubmit = await fetch(`${baseUrl}/leaderboard/singleplayer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkId: "", correctAnswers: "abc" }),
    });
    assert.equal(invalidSubmit.status, 400);

    const validSubmit = await fetch(`${baseUrl}/leaderboard/singleplayer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkId: "c-1", username: "anna", correctAnswers: 0 }),
    });
    assert.equal(validSubmit.status, 200);
    assert.deepEqual(await validSubmit.json(), { ok: true });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
