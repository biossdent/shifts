import { ciRegex, phoneRegex } from "@/regex/validate.reg";

import { IPatient } from "@/interfaces/patient.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.patient.findMany();
};

export const getById = async (id: number) => {
  return await prisma.patient.findUnique({ where: { id } });
};

export const create = async (patient: IPatient) => {
  if (!patient.fullName || patient.fullName.length < 3)
    throw new Error("El nombre del paciente no puede estar vacío");
  if (!patient.ci) throw new Error("La CI del paciente no puede estar vacío");
  if (!ciRegex.test(patient.ci) || patient.ci.length < 9)
    throw new Error("La CI del paciente no es válido");
  if (!patient.phone)
    throw new Error("El teléfono del paciente no puede estar vacío");
  if (!phoneRegex.test(patient.phone) || patient.phone.length < 9)
    throw new Error("El teléfono del paciente no es válido");
  return await prisma.patient.create({
    data: patient,
  });
};

export const getByCi = async (ci: string) => {
  return await prisma.patient.findUnique({ where: { ci } });
};

export const remove = async (id: number) => {
  return await prisma.patient.delete({ where: { id } });
};