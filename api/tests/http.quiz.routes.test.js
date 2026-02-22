import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createApp } from "../createApp.js";

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

test("quiz routes: retrievequestions and retrievecategories return service payloads", async () => {
  const quizService = {
    async retrieveQuestions(category, difficulty) {
      return [{ question: `${category}:${difficulty}` }];
    },
    async retrieveCategories() {
      return ["Science", "History"];
    },
  };

  const leaderboardService = {
    async getLeaderboard() {
      return [];
    },
    async submitSingleplayerScore() {
      return { ok: true, statusCode: 200 };
    },
  };

  const webhookService = {
    async handleEvent() {},
  };

  const app = createApp({
    quizService,
    leaderboardService,
    webhookService,
    middleware: { useClerk: false },
  });

  const { server, baseUrl } = await startTestServer(app);

  try {
    const questionsResponse = await fetch(
      `${baseUrl}/retrievequestions?category=Science&difficulty=easy`
    );
    assert.equal(questionsResponse.status, 200);
    assert.deepEqual(await questionsResponse.json(), [{ question: "Science:easy" }]);

    const categoriesResponse = await fetch(`${baseUrl}/retrievecategories`);
    assert.equal(categoriesResponse.status, 200);
    assert.deepEqual(await categoriesResponse.json(), ["Science", "History"]);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
