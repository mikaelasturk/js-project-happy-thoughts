import { create } from "zustand";

const STORAGE_KEY = "happy-thoughts-auth";

const readInitialAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    return {
      user: parsed?.user || null,
      token: parsed?.token || null,
    };
  } catch {
    return { user: null, token: null };
  }
};

const writeAuth = (user, token) => {
  if (!token) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
};

const initialAuth = readInitialAuth();

export const userStore = create((set, get) => ({
  user: initialAuth.user,
  token: initialAuth.token,
  setUser: (user) => {
    set({ user });
    writeAuth(user, get().token);
  },
  setToken: (token) => {
    set({ token });
    writeAuth(get().user, token);
  },
  setAuth: ({ user, token }) => {
    set({ user, token });
    writeAuth(user, token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem(STORAGE_KEY);
  },
}));
