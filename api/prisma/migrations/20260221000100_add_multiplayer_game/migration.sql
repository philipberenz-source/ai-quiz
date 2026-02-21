-- CreateEnum
CREATE TYPE "MultiplayerGameStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "MultiplayerPhase" AS ENUM ('PICK_CATEGORY', 'ANSWERING');

-- CreateTable
CREATE TABLE "MultiplayerGame" (
    "id" TEXT NOT NULL,
    "status" "MultiplayerGameStatus" NOT NULL DEFAULT 'ACTIVE',
    "phase" "MultiplayerPhase" NOT NULL DEFAULT 'PICK_CATEGORY',
    "difficulty" TEXT NOT NULL,
    "player1ClerkId" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2ClerkId" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "currentTurnClerkId" TEXT,
    "answeringPlayerClerkId" TEXT,
    "currentCategory" TEXT,
    "currentQuestions" JSONB,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "player1Score" INTEGER NOT NULL DEFAULT 0,
    "player2Score" INTEGER NOT NULL DEFAULT 0,
    "completedTurns" INTEGER NOT NULL DEFAULT 0,
    "totalTurns" INTEGER NOT NULL DEFAULT 6,
    "activePairKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultiplayerGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MultiplayerGame_activePairKey_key" ON "MultiplayerGame"("activePairKey");

-- CreateIndex
CREATE INDEX "MultiplayerGame_player1ClerkId_status_idx" ON "MultiplayerGame"("player1ClerkId", "status");

-- CreateIndex
CREATE INDEX "MultiplayerGame_player2ClerkId_status_idx" ON "MultiplayerGame"("player2ClerkId", "status");
