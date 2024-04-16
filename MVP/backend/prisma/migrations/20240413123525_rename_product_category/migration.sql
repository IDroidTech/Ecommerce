/*
  Warnings:

  - You are about to drop the `_product_categoryTovariation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_product_categoryTovariation" DROP CONSTRAINT "_product_categoryTovariation_A_fkey";

-- DropForeignKey
ALTER TABLE "_product_categoryTovariation" DROP CONSTRAINT "_product_categoryTovariation_B_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_parent_category_id_fkey";

-- DropTable
DROP TABLE "_product_categoryTovariation";

-- DropTable
DROP TABLE "product_category";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "parent_category_id" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_categoryTovariation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categoryTovariation_AB_unique" ON "_categoryTovariation"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryTovariation_B_index" ON "_categoryTovariation"("B");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTovariation" ADD CONSTRAINT "_categoryTovariation_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTovariation" ADD CONSTRAINT "_categoryTovariation_B_fkey" FOREIGN KEY ("B") REFERENCES "variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
