-- CreateEnum
CREATE TYPE "WorkMedium" AS ENUM ('BOOKS', 'SHORT_STORIES', 'POETRY', 'THEATRE', 'OTHER');

-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "citation" TEXT,
ADD COLUMN     "subsection" TEXT;
