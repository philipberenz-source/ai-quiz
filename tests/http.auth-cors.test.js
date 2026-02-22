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

const buildServices = () => ({
  quizService: {
    async retrieveQuestions() {
      return [{ question: "test" }];
    },
    async retrieveCategories() {
      return ["Science"];
    },
  },
  leaderboardService: {
    async getLeaderboard() {
      return [];
    },
    async submitSingleplayerScore() {
      return { ok: true, statusCode: 200 };
    },
  },
  webhookService: {
    async handleEvent() {},
  },
});

test("protected routes return 401 when request is unauthenticated", async () => {
  const services = buildServices();
  const app = createApp({
    ...services,
    middleware: { useClerk: false, requireHttpAuth: true },
  });
  const { server, baseUrl } = await startTestServer(app);

  try {
    const questionsResponse = await fetch(`${baseUrl}/retrievequestions?category=Science&difficulty=easy`);
    assert.equal(questionsResponse.status, 401);
    assert.deepEqual(await questionsResponse.json(), { message: "Unauthorized" });

    const leaderboardResponse = await fetch(`${baseUrl}/leaderboard`);
    assert.equal(leaderboardResponse.status, 401);
    assert.deepEqual(await leaderboardResponse.json(), { message: "Unauthorized" });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

test("webhook route remains public even when HTTP auth is enabled", async () => {
  let receivedEvent = null;
  const services = buildServices();
  services.webhookService = {
    async handleEvent(evt) {
      receivedEvent = evt;
    },
  };

  const app = createApp({
    ...services,
    verifyWebhookFn: async () => ({
      type: "user.created",
      data: { id: "clerk_123", username: "alice" },
    }),
    middleware: { useClerk: false, requireHttpAuth: true },
  });
  const { server, baseUrl } = await startTestServer(app);

  try {
    const response = await fetch(`${baseUrl}/api/webhooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hello: "world" }),
    });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "Webhook received");
    assert.deepEqual(receivedEvent, {
      type: "user.created",
      data: { id: "clerk_123", username: "alice" },
    });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

test("allowed origins receive CORS headers", async () => {
  const services = buildServices();
  const app = createApp({
    ...services,
    middleware: { useClerk: false, requireHttpAuth: false },
  });
  const { server, baseUrl } = await startTestServer(app);

  try {
    const renderOrigin = "https://ai-quiz-2-r8d2.onrender.com";
    const renderResponse = await fetch(`${baseUrl}/leaderboard`, {
      headers: { Origin: renderOrigin },
    });
    assert.equal(renderResponse.status, 200);
    assert.equal(renderResponse.headers.get("access-control-allow-origin"), renderOrigin);

    const localhostOrigin = "http://localhost:5173";
    const localhostResponse = await fetch(`${baseUrl}/leaderboard`, {
      headers: { Origin: localhostOrigin },
    });
    assert.equal(localhostResponse.status, 200);
    assert.equal(localhostResponse.headers.get("access-control-allow-origin"), localhostOrigin);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

test("disallowed explicit origin is rejected with 403", async () => {
  const services = buildServices();
  const app = createApp({
    ...services,
    middleware: { useClerk: false, requireHttpAuth: false },
  });
  const { server, baseUrl } = await startTestServer(app);

  try {
    const response = await fetch(`${baseUrl}/leaderboard`, {
      headers: { Origin: "https://evil.example" },
    });
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { message: "Origin not allowed." });
    assert.equal(response.headers.get("access-control-allow-origin"), null);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
