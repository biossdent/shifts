import { PrismaClient, ROLE } from "@prisma/client";

import { IUserNew } from "@/interfaces/user.interface";
import bcrypt from "bcryptjs";
import { getAllBlockAppointments } from "./blockAppointment.service";

const prisma = new PrismaClient();

export const get = async (myId: number, role: ROLE) => {
  if (role === ROLE.DOCTOR) {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
      },
      where: { id:  myId  },
    });
  } else {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
      },
      where: { role: { not: ROLE.SUPERADMIN } },
    });
  }
  
};

export const getByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getByRole = async (role: ROLE) => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    },
    where: { role },
  });
};

export const create = async (user: IUserNew) => {
  const existUser = await getByEmail(user.email);
  if (existUser) throw new Error("Ya existe un usuario con este Email");
  const hashedPassword = await bcrypt.hash(user.password!, 10);
  const userCreated = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    }
  });
  if (!userCreated) throw new Error("Error al crear usuario");
  return userCreated;
};

export const updatePassword = async (id: number, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userUpdated = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    }
  });
  if (!userUpdated) throw new Error("Error al actualizar contraseña");
  return userUpdated;
};

export const updateUser = async (user: IUserNew) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);;
  }
  const userUpdated = await prisma.user.update({
    where: { id: user.id },
    data: user,
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    }
  });
  if (!userUpdated) throw new Error("Error al actualizar usuario");
  return userUpdated;
}

// TODO: Hacer que al eliminar un usuario se elimine toda la data relacionada al usuario
export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};

export const getAvailableDoctors = async (startDate: string, endDate: string) => {
  const doctors = await getByRole(ROLE.DOCTOR);
  const blockAppointments = await getAllBlockAppointments();
  const availableDoctors = doctors.map((doctor) => {
    const blockAppointment = blockAppointments.find((blockAppointment) => {
      const startDateBlockAppointment = new Date(blockAppointment.startDate);
      const endDateBlockAppointment = new Date(blockAppointment.endDate);
      return (
        doctor.id === blockAppointment.doctorId &&
        startDateBlockAppointment <= new Date(startDate) &&
        endDateBlockAppointment >= new Date(endDate)
      );
    });
    return {
      ...doctor,
      available: blockAppointment ? false : true,
    };
  });
  return availableDoctors;
};