/*
  Warnings:

  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_studyGuideId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_studyGuideId_fkey" FOREIGN KEY ("studyGuideId") REFERENCES "StudyGuide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
