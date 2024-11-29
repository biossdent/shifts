import { EVENTS_TYPE } from "@/enums/events.enum";
import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { IEvent } from "@/app/(private)/calendario/page";
import { IReminder } from "@/interfaces/reminder.interface";

export const getEventTitle = (event: IEvent) => {
  if (event.type === EVENTS_TYPE.REMINDER) return (event as IReminder).title;
  else return (event as IAppointmentCreated).patient.fullName;
};

export const getEventStartAccessor = (event: IEvent) => {
  let date;
  if (event.type === EVENTS_TYPE.REMINDER) date = (event as IReminder).date;
  else date = (event as IAppointmentCreated).startDate;
  return new Date(date);
};

export const getEventEndAccessor = (event: IEvent) => {
    let date;
  if (event.type === EVENTS_TYPE.REMINDER) date = (event as IReminder).date;
  else date = (event as IAppointmentCreated).endDate;
  return new Date(date);
};

export const eventStyleGetter = (event: IEvent) => {
  let backgroundColor = "";
  let color = "";

  switch (event.type) {
    case EVENTS_TYPE.APPOINTMENT:
      backgroundColor = "#ff7f50"; // color para eventos médicos
      color = "#fff";
      break;
    case EVENTS_TYPE.REMINDER:
      backgroundColor = "#4caf50"; // color para reuniones
      color = "#fff";
      break;
    default:
      backgroundColor = "#2196f3"; // color por defecto
      color = "#fff";
      break;
  }

  return {
    style: {
      backgroundColor,
      color,
    },
  };
};
