/*
  Warnings:

  - The primary key for the `MusicPlaylist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlaylistCollection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `creatorId` to the `PlaylistCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MusicPlaylist" DROP CONSTRAINT "MusicPlaylist_playlistCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_musicPlaylistId_fkey";

-- AlterTable
ALTER TABLE "MusicPlaylist" DROP CONSTRAINT "MusicPlaylist_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playlistCollectionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MusicPlaylist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MusicPlaylist_id_seq";

-- AlterTable
ALTER TABLE "PlaylistCollection" DROP CONSTRAINT "PlaylistCollection_pkey",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlaylistCollection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlaylistCollection_id_seq";

-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "musicPlaylistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Song_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "PlaylistCollection" ADD CONSTRAINT "PlaylistCollection_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicPlaylist" ADD CONSTRAINT "MusicPlaylist_playlistCollectionId_fkey" FOREIGN KEY ("playlistCollectionId") REFERENCES "PlaylistCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_musicPlaylistId_fkey" FOREIGN KEY ("musicPlaylistId") REFERENCES "MusicPlaylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
