import { ciRegex, phoneRegex } from "@/regex/validate.reg";

import { IPatient } from "@/interfaces/patient.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async () => {
  return await prisma.patient.findMany();
};

export const getPatientById = async (id: number) => {
  return await prisma.patient.findUnique({ where: { id } });
};

export const createPatient = async (patient: IPatient) => {
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

export const updatePatient = async (patient: IPatient) => {
  if (!patient.id) throw new Error("El id del paciente no puede estar vacío");

  const existPatient = await getPatientById(patient.id);
  if (!existPatient) throw new Error("El paciente no existe");

  if (!patient.fullName || patient.fullName.length < 3)
    throw new Error("El nombre del paciente no puede estar vacío");
  if (!patient.ci) throw new Error("La CI del paciente no puede estar vacío");
  if (!ciRegex.test(patient.ci) || patient.ci.length < 9)
    throw new Error("La CI del paciente no es válido");
  if (!patient.phone)
    throw new Error("El teléfono del paciente no puede estar vacío");
  if (!phoneRegex.test(patient.phone) || patient.phone.length < 9)
    throw new Error("El teléfono del paciente no es válido");

  return await prisma.patient.update({
    where: {
      id: patient.id,
    },
    data: patient,
  });
};

export const getByCi = async (ci: string) => {
  if (!ci) return null;
  return await prisma.patient.findFirst({
    where: {
      OR: [
        { clinicalHistory: ci },
        { ci: ci },
      ],
    },
  });
};

export const remove = async (id: number) => {
  return await prisma.patient.delete({ where: { id } });
};