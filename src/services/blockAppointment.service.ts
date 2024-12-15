import { IBlockAppointment } from "@/interfaces/blockAppointment.interface";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();
type INewBlockAppointment = Omit<IBlockAppointment, "id"| "doctor">;

export const createBlockAppointment = async (
  blockAppointment: INewBlockAppointment
) => {
  if (!blockAppointment.doctorId)
    throw new Error("Necesita seleccionar un doctor");

  const startDate = moment(blockAppointment.startDate);
  const endDate = moment(blockAppointment.endDate);
  const now = moment();
  if (startDate.isValid() && endDate.isValid()) {
    if (startDate.isAfter(endDate)) {
      throw new Error("La fecha de inicio no puede ser después a la de fin");
    }
    if (startDate.isBefore(now)) {
      throw new Error(
        "La fecha de inicio no puede ser anterior a la fecha actual"
      );
    }
    if (endDate.isBefore(now)) {
      throw new Error(
        "La fecha de fin no puede ser anterior a la fecha actual"
      );
    }
  }
  return await prisma.blockAppointment.create({
    data: blockAppointment,
    select: {
      id: true,
      doctorId: true,
      startDate: true,
      endDate: true,
      reason: true,
      doctor: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    }
  });
};

export const getAllBlockAppointments = async () => {
  return await prisma.blockAppointment.findMany({
    include: {
      doctor: true,
    },
  });
};

export const getBlockAppointmentsForDay = (day: string) => {
  const date = moment(day);
  if (!date.isValid()) throw new Error("Fecha no valida");
  const startDate = date.startOf("day").toDate();
  const endDate = date.endOf("day").toDate();
  return prisma.blockAppointment.findMany({
    where: {
      startDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      doctor: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });
};

export const deleteBlockAppointment = async (blockAppointmentId: number) => {
  try {
    return await prisma.blockAppointment.delete({
      where: {
        id: blockAppointmentId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getBlockAppointmentIdByDoctorId = async (doctorId: number) => {
  const blockAppointments = await prisma.blockAppointment.findMany({
    where: {
      doctorId: doctorId,
    },
    select: {
      id: true,
    },
  });
  return blockAppointments.map((blockAppointment) => blockAppointment.id);
};

export const deleteBlockAppointmentForIds = async (ids: number[]) => {
  return await prisma.blockAppointment.deleteMany({
    where: {
      id: {
        in: ids,
      },
    }
  });
};