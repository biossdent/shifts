import { IUser, IUserNew } from "@/interfaces/user.interface";
import { PrismaClient, ROLE } from "@prisma/client";

import bcrypt from "bcryptjs";
import { generateTemporallyPassword } from "@/utils/password.util";
import { isEmptyString } from "@/utils/string.util";
import { sendFirsTemporaryPasswordEmail } from "@/utils/sendEmail.util";

const prisma = new PrismaClient();

export const get = async (myId: number) => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    },
    where: { id: { not: myId }, role: { not: ROLE.SUPERADMIN } },
  });
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
  const generatePassword = generateTemporallyPassword(10);
  user.password = generatePassword;
  if (
    !user.password ||
    isEmptyString(user.password) ||
    !user.email ||
    isEmptyString(user.email)
  )
    throw new Error("Usuario no valido");
  const existUser = await getByEmail(user.email);
  if (existUser) throw new Error("Ya existe un usuario con este Email");
  const hashedPassword = await bcrypt.hash(user.password!, 10);
  const userCreated = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  if (!userCreated) throw new Error("Error al crear usuario");
  sendFirsTemporaryPasswordEmail(userCreated.email, generatePassword);
  return userCreated;
};

export const updatePassword = async (id: number, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userUpdated = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
  if (!userUpdated) throw new Error("Error al actualizar contraseña");
  return userUpdated;
};

export const updateUser = async (user: IUser) => {
  const userUpdated = await prisma.user.update({
    where: { id: user.id },
    data: user,
  });
  if (!userUpdated) throw new Error("Error al actualizar usuario");
  return userUpdated;
}

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
