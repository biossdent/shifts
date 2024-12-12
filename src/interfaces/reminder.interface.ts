import { EVENTS_TYPE } from "@/enums/events.enum";

export interface IReminder {
  id?: number;
  title: string;
  reminder: string;
  date: string;
  userId: number;
  type: EVENTS_TYPE
}
