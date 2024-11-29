import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { create } from "zustand";
import { getAppointments } from "@/api/appointment.api";

interface AppointmentStore {
    appointments: IAppointmentCreated[];
    myAppointments: IAppointmentCreated[];
    filteredAppointments: IAppointmentCreated[];
    appointmentSelected: IAppointmentCreated | null;
    appointmentIdForDelete: number | null;
    setAppointments: (appointments: IAppointmentCreated[]) => void;
    setMyAppointments: (myAppointments: IAppointmentCreated[]) => void;
    setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => void;
    setFilteredAppointments: (filteredAppointments: IAppointmentCreated[]) => void;
    setAppointmentIdForDelete: (id: number | null) => void;
    setConfirmationDeleteId: (id: number) => void;
    getAppointments: () => Promise<void>;
}

export const appointmentsStore = create<AppointmentStore>((set) => ({
  appointments: [],
  myAppointments: [],
  filteredAppointments: [],
  appointmentSelected: null,
  appointmentIdForDelete: null,
  setAppointments: (appointments: IAppointmentCreated[]) => set({ appointments }),
  setMyAppointments: (myAppointments: IAppointmentCreated[]) => set({ myAppointments }),
  setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => set({ appointmentSelected }),
  setFilteredAppointments: (filteredAppointments: IAppointmentCreated[]) => set({ filteredAppointments }),
  setAppointmentIdForDelete: (id: number | null) => set({ appointmentIdForDelete: id }),
  setConfirmationDeleteId(id: number) {
    const newAppointments  = appointmentsStore.getState().appointments.filter((appointment) => appointment.id !== id);
    set({ appointments: newAppointments });
    set({ appointmentIdForDelete: null });
  },
  getAppointments: async () => {
    const appointments = await getAppointments();
    set({ appointments, filteredAppointments: appointments });
  },
}));