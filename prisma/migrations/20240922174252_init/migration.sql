-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
