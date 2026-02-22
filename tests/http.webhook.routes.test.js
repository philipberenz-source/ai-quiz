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

test("webhook route uses raw body middleware and forwards verified event", async () => {
  let observedRawBody = false;
  let observedEvent = null;

  const verifyWebhookFn = async (req) => {
    observedRawBody = Buffer.isBuffer(req.body);
    return {
      type: "user.created",
      data: {
        id: "clerk-1",
        username: "alice",
      },
    };
  };

  const webhookService = {
    async handleEvent(evt) {
      observedEvent = evt;
    },
  };

  const quizService = {
    async retrieveQuestions() {
      return [];
    },
    async retrieveCategories() {
      return [];
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

  const app = createApp({
    quizService,
    leaderboardService,
    webhookService,
    verifyWebhookFn,
    middleware: { useClerk: false },
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
    assert.equal(observedRawBody, true);
    assert.deepEqual(observedEvent, {
      type: "user.created",
      data: {
        id: "clerk-1",
        username: "alice",
      },
    });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
