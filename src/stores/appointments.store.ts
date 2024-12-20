import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { create } from "zustand";
import { getAppointments } from "@/api/appointment.api";

interface IAppointmentStore {
    shoModalForNew: boolean;
    appointments: IAppointmentCreated[];
    myAppointments: IAppointmentCreated[];
    filteredAppointments: IAppointmentCreated[];
    appointmentSelected: IAppointmentCreated | null;
    appointmentForEdit: IAppointmentCreated | null;
    appointmentIdForDelete: number | null;
    setShoModalForNew: (shoModalForNew: boolean) => void;
    setAppointments: (appointments: IAppointmentCreated[]) => void;
    setMyAppointments: (myAppointments: IAppointmentCreated[]) => void;
    setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => void;
    setAppointmentForEdit: (appointmentForEdit: IAppointmentCreated | null) => void;
    setFilteredAppointments: (filteredAppointments: IAppointmentCreated[]) => void;
    setAppointmentIdForDelete: (id: number | null) => void;
    setConfirmationDeleteId: (id: number) => void;
    getAppointments: () => Promise<void>;
}

export const appointmentsStore = create<IAppointmentStore>((set) => ({
  shoModalForNew: false,
  appointments: [],
  myAppointments: [],
  filteredAppointments: [],
  appointmentSelected: null,
  appointmentForEdit: null,
  appointmentIdForDelete: null,
  setShoModalForNew: (shoModalForNew: boolean) => set({ shoModalForNew }), 
  setAppointments: (appointments: IAppointmentCreated[]) => set({ appointments }),
  setMyAppointments: (myAppointments: IAppointmentCreated[]) => set({ myAppointments }),
  setAppointmentSelected: (appointmentSelected: IAppointmentCreated | null) => set({ appointmentSelected }),
  setAppointmentForEdit: (appointmentForEdit: IAppointmentCreated | null) => set({ appointmentForEdit }),
  setFilteredAppointments: (filteredAppointments: IAppointmentCreated[]) => set({ filteredAppointments }),
  setAppointmentIdForDelete: (id: number | null) => set({ appointmentIdForDelete: id }),
  setConfirmationDeleteId(id: number) {
    const newFilteredAppointments  = appointmentsStore.getState().filteredAppointments.filter((appointment) => appointment.id !== id);
    set({ filteredAppointments: newFilteredAppointments });
    set({ appointmentIdForDelete: null });
  },
  getAppointments: async () => {
    const appointments = await getAppointments();
    set({ appointments, filteredAppointments: appointments });
  },
}));