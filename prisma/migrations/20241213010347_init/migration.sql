-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "clinicalHistory" DROP NOT NULL,
ALTER COLUMN "clinicalHistory" DROP DEFAULT;
