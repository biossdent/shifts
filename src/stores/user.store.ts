import { IUser, IUserCreated } from "@/interfaces/user.interface";

import { ROLE } from "@/enums/role.enum";
import { create } from "zustand";

interface IUserStore {
  users: IUserCreated[];
  userSelected: IUser | IUserCreated;
  userForDelete: IUserCreated | null;
  setUsers: (users: IUserCreated[]) => void;
  setUserSelected: (user: IUser) => void;
  setInitialUserSelected: () => void;
  setUserForDelete: (user: IUserCreated | null) => void;
  setUserConfirmationDeleteId: (id: number) => void;
}

export const INITIAL_USER_SELECTED = {
  name: "",
  lastName: "",
  email: "",
  role: ROLE.DOCTOR,
  password: "",
};

export const userStore = create<IUserStore>((set) => ({
  users: [],
  userSelected: INITIAL_USER_SELECTED,
  userForDelete: null,
  setUsers: (users: IUserCreated[]) => set({ users }),
  setUserSelected: (user: IUser | IUserCreated) => set({ userSelected: user }),
  setInitialUserSelected: () => set({ userSelected: INITIAL_USER_SELECTED }),
  setUserForDelete: (user: IUserCreated | null) => set({ userForDelete: user }),
  setUserConfirmationDeleteId(id: number) {
    const newUsers = userStore
      .getState()
      .users.filter((user) => user.id !== id);
    set({ users: newUsers });
    set({ userForDelete: null });
  },
}));
