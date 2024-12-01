/*
  Warnings:

  - You are about to drop the column `starDate` on the `BlockAppointment` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `BlockAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlockAppointment" DROP COLUMN "starDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
