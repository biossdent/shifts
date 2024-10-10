import { getTime, isBefore, isValid, parseISO } from "date-fns";

import { IAppointment } from "@/interfaces/appointment.interface";
import { PrismaClient } from "@prisma/client";
import { getById } from "./patient.service";
import { getById as getDoctorById } from "./user.service";

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.appointment.findMany({
    include: {
      patient: true,
      doctor: true,
      specialty: true
    },
  });
};

export const create = async (appointment: IAppointment) => {
  const existPatient = await getById(appointment.patientId);
  if (!existPatient) throw new Error("El paciente no existe");

  const existDoctor = await getDoctorById(appointment.doctorId);
  if (!existDoctor) throw new Error("El doctor no existe");

  const startDate = parseISO(String(appointment.startDate));
  const endDate = parseISO(String(appointment.endDate));
  const now = new Date();

  if (isValid(startDate) && isValid(endDate)) {
    if (getTime(startDate) > getTime(endDate)) {
      console.log('if 1');
      throw new Error("La fecha de inicio no puede ser mayor a la de fin");
    }
    if (isBefore(startDate, now)) {
      console.log('if 2');
      throw new Error("La fecha de inicio no puede ser anterior a la fecha actual");
    }
    if (isBefore(endDate, now)) {
      console.log('if 3');
      throw new Error("La fecha de fin no puede ser anterior a la fecha actual");
    }
  } else {
    throw new Error("La fecha no es válida");
  }

  return await prisma.appointment.create({
    data: appointment,
  });
};
