import { create } from "zustand";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refresh-token"),
  user: localStorage.getItem("user"),
  isAuthenticated: !!localStorage.getItem("token"),
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem("refresh-token", refreshToken);
    set({ refreshToken });
  },
  setUser: (user: string) => {
    localStorage.setItem("user", user);
    set({ user });
  },
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    set({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
