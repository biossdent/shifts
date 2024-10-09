import { IAppointmentCreated } from "@/interfaces/appointment.interface";

import { create } from "zustand";

interface AppointmentStore {
    appointments: IAppointmentCreated[];
    myAppointments: IAppointmentCreated[];
    setAppointments: (appointments: IAppointmentCreated[]) => void;
    setMyAppointments: (myAppointments: IAppointmentCreated[]) => void;
}

export const appointmentsStore = create<AppointmentStore>((set) => ({
  appointments: [],
  myAppointments: [],
  setAppointments: (appointments: IAppointmentCreated[]) => set({ appointments }),
  setMyAppointments: (myAppointments: IAppointmentCreated[]) => set({ myAppointments }),
}));