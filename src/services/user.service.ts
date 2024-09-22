import { PrismaClient, ROLE } from "@prisma/client";

import { IUserNew } from "@/interfaces/user.interface";
import bcrypt from "bcryptjs";
import { isEmptyString } from "@/utils/string.util";

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      role: true,
    },
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
  return await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
};

export const remove = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
