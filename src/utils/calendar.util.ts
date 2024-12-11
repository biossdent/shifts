import { getTextColorForBackground, hexToRgb } from "@/utils/color.util";

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

export const eventStyleGetter = (calendarEvent: IEventCalendar) => {
  let backgroundColor = "";
  let color = "";

  switch (calendarEvent.type) {
    case EVENTS_TYPE.APPOINTMENT:
      const appointmentEvent = calendarEvent as IAppointmentCreated;
      if (appointmentEvent.event) {
        backgroundColor = appointmentEvent.event.color;
        color = getTextColorForBackground(
          hexToRgb(appointmentEvent.event.color)
        );
      } else {
        backgroundColor = "#265985";
        color = getTextColorForBackground(hexToRgb(backgroundColor));
      }
      break;
    case EVENTS_TYPE.REMINDER:
      backgroundColor = "#4caf50";
      color = getTextColorForBackground(hexToRgb(backgroundColor));
      break;
    default:
      backgroundColor = "#2196f3";
      color = getTextColorForBackground(hexToRgb(backgroundColor));
      break;
  }

  return {
    style: {
      backgroundColor,
      color,
    },
  };
};
