/*
  Warnings:

  - A unique constraint covering the columns `[userId,musicPlaylistId]` on the table `FavoriteMusicPlaylist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,songId]` on the table `SongReaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMusicPlaylist_userId_musicPlaylistId_key" ON "FavoriteMusicPlaylist"("userId", "musicPlaylistId");

-- CreateIndex
CREATE UNIQUE INDEX "SongReaction_userId_songId_key" ON "SongReaction"("userId", "songId");
