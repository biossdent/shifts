import { getReminders, getWeekReminders } from "@/api/reminder.api";

import { IReminder } from "@/interfaces/reminder.interface";
import { create } from "zustand";
import moment from "moment";

interface IReminderStore {
  reminderShowWeek: boolean;
  reminders: IReminder[];
  reminderWeeks: IReminder[];
  reminderSelected: IReminder | null;
  reminderIdForDelete: number | null;
  setReminderShowWeek: (reminderShowWeek: boolean) => void;
  setReminders: (reminders: IReminder[]) => void;
  setReminderSelected: (reminderSelected: IReminder | null) => void;
  setReminderIdForDelete: (id: number | null) => void;
  setConfirmationDeleteId: (id: number) => void;
  getReminders: () => Promise<void>;
  getReminderWeeks: () => Promise<void>;
}

export const reminderStore = create<IReminderStore>((set) => ({
  reminderShowWeek: false,
  reminders: [],
  reminderWeeks: [],
  reminderSelected: null,
  reminderIdForDelete: null,
  setReminderShowWeek: (reminderShowWeek: boolean) =>
    set({ reminderShowWeek }),
  setReminders: (reminders: IReminder[]) =>
    set({ reminders }),
  setReminderSelected: (reminderSelected: IReminder | null) =>
    set({ reminderSelected }),
  setReminderIdForDelete: (id: number | null) =>
    set({ reminderIdForDelete: id }),
  setConfirmationDeleteId(id: number) {
    const newReminders = reminderStore
      .getState()
      .reminders.filter((reminder) => reminder.id !== id);
    set({ reminders: newReminders });
    set({ reminderIdForDelete: null });
  },
  getReminders: async () => {
    const reminders = await getReminders();
    set({ reminders });
  },
  getReminderWeeks: async () => {
    const date = moment().startOf('day').toISOString();
    const reminders = await getWeekReminders(date);
    set({ reminderWeeks: reminders, reminderShowWeek: true });
  },
}));
