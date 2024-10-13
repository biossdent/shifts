import { IAppointment } from "@/interfaces/appointment.interface";
import { PrismaClient } from "@prisma/client";
import { getById } from "./patient.service";
import { getById as getDoctorById } from "./user.service";
import moment from "moment"; // Importar Moment.js

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.appointment.findMany({
    include: {
      patient: true,
      doctor: true,
      specialty: true,
    },
  });
};

export const create = async (appointment: IAppointment) => {
  const existPatient = await getById(appointment.patientId);
  if (!existPatient) throw new Error("El paciente no existe");

  const existDoctor = await getDoctorById(appointment.doctorId);
  if (!existDoctor) throw new Error("El doctor no existe");

  const startDate = moment(appointment.startDate);
  const endDate = moment(appointment.endDate);
  const now = moment();

  if (startDate.isValid() && endDate.isValid()) {
    if (startDate.isAfter(endDate)) {
      throw new Error("La fecha de inicio no puede ser después a la de fin");
    }
    if (startDate.isBefore(now)) {
      throw new Error("La fecha de inicio no puede ser anterior a la fecha actual");
    }
    if (endDate.isBefore(now)) {
      throw new Error("La fecha de fin no puede ser anterior a la fecha actual");
    }

    const appointmentByDoctor = await getAppointmentsByRangeAndDoctorId(
      appointment.startDate,
      appointment.endDate,
      appointment.doctorId
    );
    if (appointmentByDoctor.length > 0) {
      throw new Error("Ya existe una cita entre las fechas introducidas");
    }

    return await prisma.appointment.create({
      data: appointment,
    });
    
  } else {
    throw new Error("La fecha no es válida");
  }
};

export const getAppointmentsByDoctorId = async (doctorId: number) => {
  return await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
    },
    include: {
      patient: true,
      doctor: true,
      specialty: true,
    },
  });
};

export const getAppointmentsByRangeAndDoctorId = async (startDate: string, endDate: string, doctorId: number) => {
  return await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      startDate: {
        lte: endDate,
        gte: startDate,
      },
    },
    include: {
      patient: true,
      doctor: true,
      specialty: true,
    },
  });
};

export const deleteAppointment = async (appointmentId: number) => {
  try {
    return await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
  } catch (error) {
    throw error;
  }
};
