import { IBlockAppointment } from "@/interfaces/blockAppointment.interface";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();
type INewBlockAppointment = Omit<IBlockAppointment, "id">;

export const createBlockAppointment = async (
  blockAppointment: INewBlockAppointment
) => {
  if (!blockAppointment.doctorId)
    throw new Error("Necista seleccionar un doctor");

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
  });
};

export const getAllBlockAppointments = async () => {
  return await prisma.blockAppointment.findMany({
    include: {
      doctor: true,
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
