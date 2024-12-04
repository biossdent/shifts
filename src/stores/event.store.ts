import { IEvent } from "@/interfaces/event.interface";
import { create } from "zustand";
import { getEvents } from "@/api/event.api";

interface IEventStore {
  events: IEvent[];
  eventSelected: IEvent;
  eventForDelete: IEvent | null;
  setEvents: (events: IEvent[]) => void;
  setEventSelected: (reminderSelected: IEvent) => void;
  setInitialEventSelected: () => void;
  setEventForDelete: (event: IEvent | null) => void;
  setConfirmationDeleteId: (id: number) => void;
  getEvents: () => Promise<void>;
}

export const INITIAL_EVENT_SELECTED = {
  title: "",
  color: "#A3A3A3",
};


export const eventStore = create<IEventStore>((set) => ({
  events: [],
  eventSelected: INITIAL_EVENT_SELECTED,
  eventForDelete: null,
  setEvents: (events: IEvent[]) =>
    set({ events }),
  setEventSelected: (eventSelected: IEvent) =>
    set({ eventSelected }),
  setInitialEventSelected: () => set({ eventSelected: INITIAL_EVENT_SELECTED }),
  setEventForDelete: (event: IEvent | null) =>
    set({ eventForDelete: event }),
  setConfirmationDeleteId(id: number) {
    const newEvents = eventStore
      .getState()
      .events.filter((event) => event.id !== id);
    set({ events: newEvents });
    set({ eventForDelete: null });
  },
  getEvents: async () => {
    const events = await getEvents();
    set({ events });
  },
}));
