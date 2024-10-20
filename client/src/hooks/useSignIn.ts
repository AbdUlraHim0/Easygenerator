import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import { useAuthStore } from "../store/auth.store";

interface SignInData {
  email: string;
  password: string;
}

const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post("/authentication/sign-in", data);

  const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
  const refreshToken = response.headers["refresh-token"];
  const user = data.email;

  if (!accessToken || !refreshToken) {
    throw new Error("Failed to retrieve tokens from response headers.");
  }

  return { accessToken, refreshToken, user };
};

export const useSignIn = () => {
  const { setToken, setRefreshToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });
};
