/*
  Warnings:

  - Changed the type of `issueDate` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "issueDate",
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL;
