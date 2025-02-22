/*
  Warnings:

  - You are about to drop the column `mediaType` on the `PlaylistCollection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MusicPlaylist" ADD COLUMN     "relatedSongs" TEXT[];

-- AlterTable
ALTER TABLE "PlaylistCollection" DROP COLUMN "mediaType";

-- DropEnum
DROP TYPE "MediaType";
