/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectFavorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionFavorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyGuide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyGuideFavorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechnologyTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTechnologyTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudyGuideToTechnologyTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectFavorite" DROP CONSTRAINT "ProjectFavorite_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectFavorite" DROP CONSTRAINT "ProjectFavorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionFavorite" DROP CONSTRAINT "QuestionFavorite_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionFavorite" DROP CONSTRAINT "QuestionFavorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_studyGuideId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGuide" DROP CONSTRAINT "StudyGuide_authorId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGuideFavorite" DROP CONSTRAINT "StudyGuideFavorite_studyGuideId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGuideFavorite" DROP CONSTRAINT "StudyGuideFavorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTechnologyTag" DROP CONSTRAINT "_ProjectToTechnologyTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTechnologyTag" DROP CONSTRAINT "_ProjectToTechnologyTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudyGuideToTechnologyTag" DROP CONSTRAINT "_StudyGuideToTechnologyTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudyGuideToTechnologyTag" DROP CONSTRAINT "_StudyGuideToTechnologyTag_B_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectFavorite";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionFavorite";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "StudyGuide";

-- DropTable
DROP TABLE "StudyGuideFavorite";

-- DropTable
DROP TABLE "TechnologyTag";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ProjectToTechnologyTag";

-- DropTable
DROP TABLE "_StudyGuideToTechnologyTag";

-- DropEnum
DROP TYPE "TechnologyType";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "dayStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthYear" INTEGER,
    "birthYearApprox" BOOLEAN NOT NULL DEFAULT true,
    "deathYear" INTEGER,
    "deathYearApprox" BOOLEAN NOT NULL DEFAULT true,
    "intro" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "pageCount" INTEGER,
    "publishYear" INTEGER,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snippets" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "analysis" TEXT,
    "workId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "snippets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_genres" (
    "workId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "work_genres_pkey" PRIMARY KEY ("workId","genreId")
);

-- CreateTable
CREATE TABLE "author_genres" (
    "authorId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "author_genres_pkey" PRIMARY KEY ("authorId","genreId")
);

-- CreateTable
CREATE TABLE "favorites" (
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId","snippetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_genres" ADD CONSTRAINT "work_genres_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_genres" ADD CONSTRAINT "work_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_genres" ADD CONSTRAINT "author_genres_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_genres" ADD CONSTRAINT "author_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
