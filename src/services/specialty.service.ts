import { ISpecialty } from "@/interfaces/specialty.interface";
import { PrismaClient } from "@prisma/client";
import { isEmptyString } from "@/utils/string.util";

const prisma = new PrismaClient();
type INewSpecialty = Omit<ISpecialty, "id">;

export const get = async () => {
    return await prisma.specialty.findMany();
}

export const getById = async (id: number) => {
    return await prisma.specialty.findUnique({ where: { id } })
}

export const getByLabel = async (label: string) => {
    return await prisma.specialty.findUnique({ where: { label } });
}

export const create = async (specialty: INewSpecialty) => {
    if (!specialty.label || isEmptyString(specialty.label)) throw new Error('La especialidad no puede estar vacía');
    const existSpecialty = await getByLabel(specialty.label);
    if (existSpecialty) throw new Error('Ya existe esta especialidad');
    return await prisma.specialty.create({
        data: specialty
    })
}

export const remove = async (id: number) => {
    return await prisma.specialty.delete({ where: { id } })
}