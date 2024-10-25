import { create } from "zustand";

interface IUiStore {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const UiStore = create<IUiStore>((set) => ({ 
    isMenuOpen: false,
    setIsMenuOpen: (isMenuOpen: boolean) => set({ isMenuOpen })
}));