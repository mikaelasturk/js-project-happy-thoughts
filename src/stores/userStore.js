import { create } from "zustand";

export const userStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
  // Lägg till fler user-relaterade states/metoder här
}));
