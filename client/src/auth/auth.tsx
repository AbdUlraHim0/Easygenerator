import { createContext, ReactNode, useContext } from "react";
import { useAuthStore } from "../store/auth.store";

interface IAuthContext {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    isAuthenticated,
    setToken,
    setRefreshToken,
    setUser,
    clearAuth,
  } = useAuthStore();

  const login = (username: string) => {
    setUser(username);
    setToken("your-access-token"); // Simulate setting a token
    setRefreshToken("your-refresh-token");
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
