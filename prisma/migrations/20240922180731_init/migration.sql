/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patient_ci_key" ON "Patient"("ci");
