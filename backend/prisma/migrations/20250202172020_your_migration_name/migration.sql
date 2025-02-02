/*
  Warnings:

  - You are about to drop the `MusicRecommendation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `musicRecommendationId` to the `MusicPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MusicPlaylist" ADD COLUMN     "musicRecommendationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "MusicRecommendation";

-- CreateTable
CREATE TABLE "PlaylistCollection" (
    "id" SERIAL NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlaylistCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MusicPlaylist" ADD CONSTRAINT "MusicPlaylist_musicRecommendationId_fkey" FOREIGN KEY ("musicRecommendationId") REFERENCES "PlaylistCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
