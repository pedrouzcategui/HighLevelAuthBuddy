/*
  Warnings:

  - You are about to drop the column `issueDate` on the `Location` table. All the data in the column will be lost.
  - Added the required column `expires_in` to the `Auth_Buddy_API_Key` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth_Buddy_API_Key" ADD COLUMN     "expires_in" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "generationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "issueDate",
ADD COLUMN     "expires_in" INTEGER NOT NULL,
ADD COLUMN     "generationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
