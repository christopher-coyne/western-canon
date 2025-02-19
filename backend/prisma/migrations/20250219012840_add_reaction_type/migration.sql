/*
  Warnings:

  - Added the required column `reaction` to the `SongReaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "SongReaction" ADD COLUMN     "reaction" "ReactionType" NOT NULL;
