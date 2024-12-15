import { getAllBlockAppointments, getBlockAppointmentsForDay } from "@/api/blockAppointment.api";

import { IBlockAppointment } from "@/interfaces/blockAppointment.interface";
import { create } from "zustand";

interface IBlockAppointmentStore {
  blockAppointments: IBlockAppointment[];
  blockAppointmentSelected: IBlockAppointment;
  blockAppointmentIdForDelete: number | null;
  blockAppointmentsDaySelected: IBlockAppointment[];
  setBlockAppointments: (blockAppointments: IBlockAppointment[]) => void;
  setBlockAppointmentsSelected: (blockAppointmentSelected: IBlockAppointment) => void;
  setInitialBlockAppointmentSelected: () => void;
  setBlockAppointmentsIdForDelete: (id: number | null) => void;
  setConfirmationDeleteId: (id: number) => void;
  setBlockAppointmentsDaySelected: (blockAppointmentsDaySelected: IBlockAppointment[]) => void;
  getBlockAppointments: () => Promise<void>;
  getBlockAppointmentsDaySelected: (day: string) => Promise<void>;
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
  blockAppointmentsDaySelected:[],
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
  setBlockAppointmentsDaySelected: (blockAppointmentsDaySelected: IBlockAppointment[]) =>
    set({ blockAppointmentsDaySelected }),
  getBlockAppointments: async () => {
    const blockAppointments = await getAllBlockAppointments();
    set({ blockAppointments });
  },
  getBlockAppointmentsDaySelected: async (day: string) => {
    const blockAppointments = await getBlockAppointmentsForDay(day);
    set({ blockAppointmentsDaySelected: blockAppointments });
  },
}));
