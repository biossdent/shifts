import { getAvailableDoctors, getDoctors } from "@/api/doctors.api";

import { IDoctor } from "@/interfaces/user.interface";
import { create } from "zustand";

interface IDoctorsStore {
  isLoadingDoctor: boolean;
  doctors: IDoctor[];
  availableDoctors: IDoctor[];
  getDoctors: () => Promise<void>;
  getAvailableDoctors: (startDate: string, endDate: string) => Promise<void>;
}

export const doctorsStore = create<IDoctorsStore>((set) => ({
  isLoadingDoctor: true,
  doctors: [],
  availableDoctors: [],
  getDoctors: async () => {
    set({ isLoadingDoctor: true });
    const doctors = await getDoctors();
    set({ doctors, isLoadingDoctor: false });
  },
  getAvailableDoctors: async (startDate: string, endDate: string) => {
    set({ isLoadingDoctor: true });
    const availableDoctors = await getAvailableDoctors(startDate, endDate);
    set({ availableDoctors, isLoadingDoctor: false });
  },
}));