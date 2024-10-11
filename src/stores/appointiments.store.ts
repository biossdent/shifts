import { IAppointment, IAppointmentCreated } from "@/interfaces/appointment.interface";

import { create } from "zustand";

interface AppointmentStore {
    appointments: IAppointmentCreated[];
    myAppointments: IAppointmentCreated[];
    appointmentSelected: IAppointmentCreated | null;
    setAppointments: (appointments: IAppointmentCreated[]) => void;
    setMyAppointments: (myAppointments: IAppointmentCreated[]) => void;
    setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => void;
}

export const appointmentsStore = create<AppointmentStore>((set) => ({
  appointments: [],
  myAppointments: [],
  appointmentSelected: null,
  setAppointments: (appointments: IAppointmentCreated[]) => set({ appointments }),
  setMyAppointments: (myAppointments: IAppointmentCreated[]) => set({ myAppointments }),
  setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => set({ appointmentSelected }),
}));