/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudyGuideToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TechnologyType" AS ENUM ('LANGUAGE', 'DOMAIN', 'FRAMEWORK', 'PLATFORM');

-- DropForeignKey
ALTER TABLE "_StudyGuideToTag" DROP CONSTRAINT "_StudyGuideToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudyGuideToTag" DROP CONSTRAINT "_StudyGuideToTag_B_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_StudyGuideToTag";

-- CreateTable
CREATE TABLE "TechnologyTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TechnologyType" NOT NULL,

    CONSTRAINT "TechnologyTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudyGuideToTechnologyTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudyGuideToTechnologyTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnologyTag_name_key" ON "TechnologyTag"("name");

-- CreateIndex
CREATE INDEX "_StudyGuideToTechnologyTag_B_index" ON "_StudyGuideToTechnologyTag"("B");

-- AddForeignKey
ALTER TABLE "_StudyGuideToTechnologyTag" ADD CONSTRAINT "_StudyGuideToTechnologyTag_A_fkey" FOREIGN KEY ("A") REFERENCES "StudyGuide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyGuideToTechnologyTag" ADD CONSTRAINT "_StudyGuideToTechnologyTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TechnologyTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
