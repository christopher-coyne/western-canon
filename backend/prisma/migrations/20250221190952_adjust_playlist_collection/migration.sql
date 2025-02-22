/*
  Warnings:

  - You are about to drop the column `description` on the `PlaylistCollection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaylistCollection" DROP COLUMN "description",
ALTER COLUMN "prompt" DROP NOT NULL;
