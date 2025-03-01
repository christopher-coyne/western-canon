/*
  Warnings:

  - You are about to drop the `UserFavorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavorite" DROP CONSTRAINT "UserFavorite_studyGuideId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavorite" DROP CONSTRAINT "UserFavorite_userId_fkey";

-- DropTable
DROP TABLE "UserFavorite";

-- CreateTable
CREATE TABLE "StudyGuideFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "studyGuideId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyGuideFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyGuideFavorite_userId_studyGuideId_key" ON "StudyGuideFavorite"("userId", "studyGuideId");

-- AddForeignKey
ALTER TABLE "StudyGuideFavorite" ADD CONSTRAINT "StudyGuideFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyGuideFavorite" ADD CONSTRAINT "StudyGuideFavorite_studyGuideId_fkey" FOREIGN KEY ("studyGuideId") REFERENCES "StudyGuide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
