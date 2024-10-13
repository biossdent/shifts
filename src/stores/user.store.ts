import { IUser, IUserCreated } from "@/interfaces/user.interface";

import { ROLE } from "@/enums/role.enum";
import { create } from "zustand";

interface IUserStore {
  users: IUserCreated[];
  userSelected: IUser;
  setUsers: (users: IUserCreated[]) => void;
  setUserSelected: (user: IUser) => void;
}

export const userStore = create<IUserStore>((set) => ({
  users: [],
  userSelected: {
    name: '',
    lastName: '',
    email: '',
    role: ROLE.DOCTOR,
    password: ''
  },
  setUsers: (users: IUserCreated[]) => set({ users }),
  setUserSelected: (user: IUser) => set({ userSelected: user }),
}));