/*
  Warnings:

  - Added the required column `issueDate` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "issueDate" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL;
