import { IUserCreated } from "@/interfaces/user.interface";
import { create } from "zustand";

interface IUserStore {
  user: IUserCreated | null;
  setUser: (user: IUserCreated) => void;
}

export const userStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: IUserCreated) => set(() => ({ user })),
}));
