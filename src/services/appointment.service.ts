import { DateTime } from "luxon";
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
    },
  });
};

export const create = async (appointment: IAppointment) => {
  console.log('create', {appointment})
  const existPatient = await getById(appointment.patientId);
  console.log({existPatient})
  if (!existPatient) throw new Error("El paciente no existe");
  const existDoctor = await getDoctorById(appointment.doctorId);
  console.log({existDoctor})
  if (!existDoctor) throw new Error("El doctor no existe");
  let startDate = DateTime.fromISO(appointment.startDate);
  let endDate = DateTime.fromISO(appointment.endDate);
  console.log({startDate, endDate})
  if (startDate.isValid && endDate.isValid) {
    if (startDate.toMillis() > endDate.toMillis()){
      console.log('if 1')
      throw new Error("La fecha de inicio no puede ser mayor a la de fin");
    }
    if (startDate.toMillis() < DateTime.now().toMillis()) {
      console.log('if 2')
      throw new Error(
        "La fecha de inicio no puede ser anterior a la fecha actual"
      );
    }
    if (endDate.toMillis() < DateTime.now().toMillis()) {
      console.log('if 3')
      throw new Error(
        "La fecha de fin no puede ser anterior a la fecha actual"
      );
    }
  } else throw new Error("La fecha no es válida");

  console.log({appointment})
  return await prisma.appointment.create({
    data: appointment,
  });
};
