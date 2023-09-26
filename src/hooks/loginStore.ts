import { create } from "zustand";

type LoginState = {
  isLoading: boolean;
  userId?:string;
  setIsLoading: (loadingState: boolean) => void;
  setUserID: (userID:string) => void;
};

export const loginStore = create<LoginState>((set) => ({
  isLoading: true,
  userId: "",
  setIsLoading: (loadingState: boolean) => set(() => ({ isLoading: loadingState })),
  setUserID: (userId :string) => set(() => ({userId:userId}))
}));
