import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import { useAuthStore } from "../store/auth.store";
import { useAuth } from "../auth/auth";

interface SignInData {
  email: string;
  password: string;
}

const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post("/authentication/sign-in", data);

  const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
  const refreshToken = response.headers["refresh-token"];
  console.log("headers", response.headers);

  if (!accessToken || !refreshToken) {
    throw new Error("Failed to retrieve tokens from response headers.");
  }

  return { accessToken, refreshToken, user: data.email };
};

export const useSignIn = () => {
  const { setToken, clearToken, setRefreshToken } = useAuthStore();
  const { login } = useAuth();

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setToken(accessToken);
      setRefreshToken(refreshToken);
      login(user);
    },
    onError: (error) => {
      clearToken();
      console.error("Error signing in:", error);
    },
  });
};
