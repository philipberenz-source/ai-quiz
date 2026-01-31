/*
  Warnings:

  - You are about to drop the column `QuizId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isInQuiz` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "QuizId",
DROP COLUMN "isInQuiz",
ADD COLUMN     "clerkId" TEXT,
ADD COLUMN     "score" INTEGER DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
