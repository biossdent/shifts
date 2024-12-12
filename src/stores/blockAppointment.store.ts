import { IBlockAppointment } from "@/interfaces/blockAppointment.interface";
import { create } from "zustand";
import { getAllBlockAppointments } from "@/api/blockAppointment.api";

interface IBlockAppointmentStore {
  blockAppointments: IBlockAppointment[];
  blockAppointmentSelected: IBlockAppointment;
  blockAppointmentIdForDelete: number | null;
  setBlockAppointments: (reminders: IBlockAppointment[]) => void;
  setBlockAppointmentsSelected: (reminderSelected: IBlockAppointment) => void;
  setInitialBlockAppointmentSelected: () => void;
  setBlockAppointmentsIdForDelete: (id: number | null) => void;
  setConfirmationDeleteId: (id: number) => void;
  getBlockAppointments: () => Promise<void>;
}

export const INITIAL_BLOCK_APPOINTMENT_SELECTED = {
  startDate: "",
  endDate: "",
  reason: "",
  doctorId: 0,
};

export const blockAppointmentStoreStore = create<IBlockAppointmentStore>((set) => ({
  blockAppointments: [],
  blockAppointmentSelected: INITIAL_BLOCK_APPOINTMENT_SELECTED,
  blockAppointmentIdForDelete: null,
  setBlockAppointments: (blockAppointments: IBlockAppointment[]) =>
    set({ blockAppointments }),
  setBlockAppointmentsSelected: (blockAppointmentSelected: IBlockAppointment) =>
    set({ blockAppointmentSelected }),
  setInitialBlockAppointmentSelected: () => set({ blockAppointmentSelected: INITIAL_BLOCK_APPOINTMENT_SELECTED }),
  setBlockAppointmentsIdForDelete: (id: number | null) =>
    set({ blockAppointmentIdForDelete: id }),
  setConfirmationDeleteId(id: number) {
    const newBlockAppointments = blockAppointmentStoreStore
      .getState()
      .blockAppointments.filter((blockAppointment) => blockAppointment.id !== id);
    set({ blockAppointments: newBlockAppointments });
    set({ blockAppointmentIdForDelete: null });
  },
  getBlockAppointments: async () => {
    const blockAppointments = await getAllBlockAppointments();
    set({ blockAppointments });
  },
}));
