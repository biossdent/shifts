import { EVENTS_TYPE } from "@/enums/events.enum";
import { IReminder } from "@/interfaces/reminder.interface";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();
type INewReminder = Omit<IReminder, "id">;

export const createReminder = async (reminder: INewReminder) => {
  if (!reminder.title || reminder.title.length < 3)
    throw new Error("El titulo del recordatorio no puede estar vacío");
  if (!reminder.reminder || reminder.reminder.length < 3)
    throw new Error("El recordatorio no puede estar vacío");
  if (!reminder.date)
    throw new Error("La fecha del recordatorio no puede estar vacía");
  const date = moment(reminder.date);
  if (date.isBefore(moment()))
    throw new Error(
      "La fecha del recordatorio no puede ser anterior a la fecha actual"
    );
  const reminderCreated = await prisma.reminder.create({
    data: reminder,
  });
  return { ...reminderCreated, type: EVENTS_TYPE.REMINDER };
};

export const getRemindersByDateAndUserId = async (
  date: string,
  userId: number
) => {
  const reminders = await prisma.reminder.findMany({
    where: {
      date: {
        lte: date,
        gte: moment().subtract(1, "day").toISOString(),
      },
      userId: userId,
    },
    orderBy: {
      date: "asc",
    },
  });
  return reminders.map((reminder) => ({
    ...reminder,
    type: EVENTS_TYPE.REMINDER,
  }));
};

export const deleteReminder = async (id: number) => {
  return await prisma.reminder.delete({
    where: {
      id: id,
    },
  });
};
