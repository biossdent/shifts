import { DateTime } from "luxon";
import { PrismaClient } from "@prisma/client";
import { getById } from "./patient.service";

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.appointment.findMany();
};

export const create = async (appointment: any) => {
  const existPatient = await getById(appointment.patientId);
  if (!existPatient) throw new Error("El paciente no existe");
  const existDoctor = await getById(appointment.doctorId);
  if (!existDoctor) throw new Error("El doctor no existe");
  const startDate = DateTime.fromISO(appointment.startDate);
  const endDate = DateTime.fromISO(appointment.endDate);
  if (startDate.isValid && endDate.isValid) {
    if (startDate.toMillis() > endDate.toMillis())
      throw new Error("La fecha de inicio no puede ser mayor a la de fin");
    if (startDate.toMillis() < DateTime.now().toMillis())
      throw new Error(
        "La fecha de inicio no puede ser anterior a la fecha actual"
      );
    if (endDate.toMillis() < DateTime.now().toMillis())
      throw new Error(
        "La fecha de fin no puede ser anterior a la fecha actual"
      );
  } else throw new Error("La fecha no es válida");

  return await prisma.appointment.create({
    data: appointment,
  });
};
