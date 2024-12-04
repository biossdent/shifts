import { IEvent } from "@/interfaces/event.interface";
import { PrismaClient } from "@prisma/client";
import { colorRegex } from "@/regex/validate.reg";

const prisma = new PrismaClient();
type INewEvent = Omit<IEvent, "id">;

export const createEvent = async (event: INewEvent) => {
  if (!event.title || event.title.length < 3)
    throw new Error("El titulo del evento no puede estar vacío");
  if (!event.color || !colorRegex.test(event.color))
    throw new Error("El color no es válido");
  return await prisma.event.create({
    data: event,
  });
};

export const getEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
};

export const getEventById = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });
  return event;
};

export const deleteEvent = async (id: number) => {
  const event = await prisma.event.delete({
    where: { id },
  });
  return event;
};