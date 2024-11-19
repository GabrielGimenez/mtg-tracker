/*
  Warnings:

  - You are about to drop the column `endedAt` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "endedAt",
ADD COLUMN     "notes" TEXT;
