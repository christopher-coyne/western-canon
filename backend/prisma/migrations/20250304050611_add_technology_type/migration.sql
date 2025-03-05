-- CreateTable
CREATE TABLE "_ProjectToTechnologyTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToTechnologyTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectToTechnologyTag_B_index" ON "_ProjectToTechnologyTag"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTechnologyTag" ADD CONSTRAINT "_ProjectToTechnologyTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnologyTag" ADD CONSTRAINT "_ProjectToTechnologyTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TechnologyTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
