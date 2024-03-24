/*
  Warnings:

  - The `rules` column on the `Permission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "rules",
ADD COLUMN     "rules" TEXT[];
