import { create } from "zustand";

type LoginState = {
  logged: boolean;
  setLogged: (loginState: boolean) => void;
};

export const loginStore = create<LoginState>((set) => ({
  logged: Boolean(localStorage.getItem("signed")),
  setLogged: (loginState: boolean) => set(() => ({ logged: loginState })),
}));
