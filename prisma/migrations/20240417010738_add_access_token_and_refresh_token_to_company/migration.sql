/*
  Warnings:

  - Added the required column `access_token` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "expires_in" INTEGER NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL;
