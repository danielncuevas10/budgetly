-- AlterTable
ALTER TABLE "Onboarding" ADD COLUMN     "emergencyAutoContribution" DOUBLE PRECISION,
ADD COLUMN     "emergencyEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emergencyTargetAmount" DOUBLE PRECISION,
ADD COLUMN     "emergencyTargetMonths" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "direction" TEXT;
