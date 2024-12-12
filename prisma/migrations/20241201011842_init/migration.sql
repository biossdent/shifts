-- CreateTable
CREATE TABLE "BlockAppointment" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "starDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockAppointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlockAppointment" ADD CONSTRAINT "BlockAppointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
