import test from "node:test";
import assert from "node:assert/strict";
import { registerSocketHandlers } from "../routes/socketRoutes.js";
import { createMultiplayerState } from "../multiplayerState.js";

class FakeIo {
  constructor() {
    this.middlewares = [];
    this.handlers = {};
    this.emitted = [];
  }

  use(handler) {
    this.middlewares.push(handler);
  }

  on(eventName, handler) {
    this.handlers[eventName] = handler;
  }

  to(room) {
    return {
      emit: (eventName, payload) => {
        this.emitted.push({ room, eventName, payload });
      },
    };
  }

  emit(eventName, payload) {
    this.emitted.push({ eventName, payload });
  }
}

class FakeSocket {
  constructor({ id, auth }) {
    this.id = id;
    this.handshake = { auth };
    this.data = {};
    this.handlers = {};
    this.joinedRooms = [];
    this.emitted = [];
  }

  join(room) {
    this.joinedRooms.push(room);
  }

  on(eventName, handler) {
    this.handlers[eventName] = handler;
  }

  emit(eventName, payload) {
    this.emitted.push({ eventName, payload });
  }
}

const createPrismaStub = () => ({
  multiplayerGame: {
    async findMany() {
      return [];
    },
    async findFirst() {
      return null;
    },
    async findUnique() {
      return null;
    },
    async create() {
      throw new Error("not used in this smoke test");
    },
    async update() {
      throw new Error("not used in this smoke test");
    },
    async delete() {},
    async deleteMany() {},
  },
  user: {
    async findMany() {
      return [];
    },
    async updateMany() {},
    async update() {},
    async create() {},
    async delete() {},
  },
});

test("socket module registers auth guard and multiplayer event handlers", async () => {
  const io = new FakeIo();
  const prisma = createPrismaStub();
  const state = createMultiplayerState();

  registerSocketHandlers(io, {
    prisma,
    state,
    leaderboardService: {
      async awardMultiplayerWinnerPoints() {},
    },
    generateQuestionsFn: async () => [],
  });

  assert.equal(io.middlewares.length, 1);
  assert.equal(typeof io.handlers.connection, "function");

  const authMiddleware = io.middlewares[0];
  const missingAuthSocket = new FakeSocket({ id: "s-missing", auth: {} });
  let middlewareError = null;
  await authMiddleware(missingAuthSocket, (error) => {
    middlewareError = error || null;
  });
  assert.equal(middlewareError?.message, "Authentication error: userId required in handshake auth");

  const validSocket = new FakeSocket({
    id: "s-1",
    auth: { userId: "u-1", username: "alice" },
  });
  await authMiddleware(validSocket, () => {});
  await io.handlers.connection(validSocket);

  assert.equal(validSocket.data.userId, "u-1");
  assert.equal(validSocket.joinedRooms.includes("user:u-1"), true);

  const expectedEvents = [
    "dashboard:refresh",
    "game:delete",
    "invite:send",
    "invite:respond",
    "game:choose-category",
    "game:submit-answer",
    "disconnect",
  ];

  expectedEvents.forEach((eventName) => {
    assert.equal(typeof validSocket.handlers[eventName], "function");
  });
});
