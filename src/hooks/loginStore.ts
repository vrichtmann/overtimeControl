import { create } from "zustand";

type LoginState = {
  isLoading: boolean;
  setIsLoading: (loadingState: boolean) => void;
};

export const loginStore = create<LoginState>((set) => ({
  isLoading: true,
  setIsLoading: (loadingState: boolean) => set(() => ({ isLoading: loadingState })),
}));
