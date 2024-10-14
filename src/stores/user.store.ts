import { IUser, IUserCreated } from "@/interfaces/user.interface";

import { ROLE } from "@/enums/role.enum";
import { create } from "zustand";

interface IUserStore {
  users: IUserCreated[];
  userSelected: IUser;
  setUsers: (users: IUserCreated[]) => void;
  setUserSelected: (user: IUser) => void;
  setInitialUserSelected: () => void;
}

const INITIAL_USER_SELECTED = {
  name: '',
  lastName: '',
  email: '',
  role: ROLE.DOCTOR,
  password: ''
}

export const userStore = create<IUserStore>((set) => ({
  users: [],
  userSelected: INITIAL_USER_SELECTED,
  setUsers: (users: IUserCreated[]) => set({ users }),
  setUserSelected: (user: IUser) => set({ userSelected: user }),
  setInitialUserSelected: () => set({ userSelected: INITIAL_USER_SELECTED }),
}));