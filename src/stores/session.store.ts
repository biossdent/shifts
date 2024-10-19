import { IUserCreated } from "@/interfaces/user.interface";
import { create } from "zustand";

interface IUserStore {
  user: IUserCreated | null;
  setUser: (users: IUserCreated | null) => void;
}

export const sessionStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: IUserCreated | null) => set({ user }),
}));
