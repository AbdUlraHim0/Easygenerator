import { create } from "zustand";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refresh-token"),
  isAuthenticated: !!localStorage.getItem("token"),
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },
  setRefreshToken: (token: string) => {
    localStorage.setItem("refresh-token", token);
    set({ refreshToken: token });
  },
  clearToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },
}));
