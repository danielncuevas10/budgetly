/*
  Warnings:

  - You are about to drop the column `goal` on the `Onboarding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "goal",
ADD COLUMN     "bills" TEXT,
ADD COLUMN     "isFreelancer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "missionGoal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "missionTitle" TEXT,
ADD COLUMN     "monthlyContribution" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "monthlyIncome" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "currency" SET DEFAULT 'USD';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingComplete" BOOLEAN NOT NULL DEFAULT false;
