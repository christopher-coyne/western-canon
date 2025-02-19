-- CreateTable
CREATE TABLE "FavoriteMusicPlaylist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "musicPlaylistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteMusicPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongReaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "SongReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteMusicPlaylist" ADD CONSTRAINT "FavoriteMusicPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteMusicPlaylist" ADD CONSTRAINT "FavoriteMusicPlaylist_musicPlaylistId_fkey" FOREIGN KEY ("musicPlaylistId") REFERENCES "MusicPlaylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongReaction" ADD CONSTRAINT "SongReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongReaction" ADD CONSTRAINT "SongReaction_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
