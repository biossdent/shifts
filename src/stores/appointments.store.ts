import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { create } from "zustand";

interface AppointmentStore {
    appointments: IAppointmentCreated[];
    myAppointments: IAppointmentCreated[];
    appointmentSelected: IAppointmentCreated | null;
    appointmentIdForDelete: number | null;
    setAppointments: (appointments: IAppointmentCreated[]) => void;
    setMyAppointments: (myAppointments: IAppointmentCreated[]) => void;
    setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => void;
    setAppointmentIdForDelete: (id: number | null) => void;
    setConfirmationDeleteId: (id: number) => void;
}

export const appointmentsStore = create<AppointmentStore>((set) => ({
  appointments: [],
  myAppointments: [],
  appointmentSelected: null,
  appointmentIdForDelete: null,
  setAppointments: (appointments: IAppointmentCreated[]) => set({ appointments }),
  setMyAppointments: (myAppointments: IAppointmentCreated[]) => set({ myAppointments }),
  setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => set({ appointmentSelected }),
  setAppointmentIdForDelete: (id: number | null) => set({ appointmentIdForDelete: id }),
  setConfirmationDeleteId(id: number) {
    const newAppointments  = appointmentsStore.getState().appointments.filter((appointment) => appointment.id !== id);
    set({ appointments: newAppointments });
    set({ appointmentIdForDelete: null });
  },
}));