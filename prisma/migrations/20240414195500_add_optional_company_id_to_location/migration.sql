-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_companyId_fkey";

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
