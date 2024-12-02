import { IReminder } from "@/interfaces/reminder.interface";
import { create } from "zustand";
import { getReminders } from "@/api/reminder.api";

interface IReminderStore {
  reminders: IReminder[];
  reminderSelected: IReminder | null;
  reminderIdForDelete: number | null;
  setReminders: (reminders: IReminder[]) => void;
  setReminderSelected: (reminderSelected: IReminder | null) => void;
  setReminderIdForDelete: (id: number | null) => void;
  setConfirmationDeleteId: (id: number) => void;
  getReminders: () => Promise<void>;
}

export const reminderStore = create<IReminderStore>((set) => ({
  reminders: [],
  reminderSelected: null,
  reminderIdForDelete: null,
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
}));
