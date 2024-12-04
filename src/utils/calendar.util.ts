import { EVENTS_TYPE } from "@/enums/events.enum";
import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { IEventCalendar } from "@/app/(private)/calendario/page";
import { IReminder } from "@/interfaces/reminder.interface";

export const getEventTitle = (event: IEventCalendar) => {
  if (event.type === EVENTS_TYPE.REMINDER) return (event as IReminder).title;
  else return (event as IAppointmentCreated).patient.fullName;
};

export const getEventStartAccessor = (event: IEventCalendar) => {
  let date;
  if (event.type === EVENTS_TYPE.REMINDER) date = (event as IReminder).date;
  else date = (event as IAppointmentCreated).startDate;
  return new Date(date);
};

export const getEventEndAccessor = (event: IEventCalendar) => {
    let date;
  if (event.type === EVENTS_TYPE.REMINDER) date = (event as IReminder).date;
  else date = (event as IAppointmentCreated).endDate;
  return new Date(date);
};

export const eventStyleGetter = (event: IEventCalendar) => {
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
