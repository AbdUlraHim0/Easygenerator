import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import axiosInstance from "../services/axios-instance";

interface SignInData {
  email: string;
  password: string;
}

const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post("/authentication/sign-in", data);

  // Use lowercase for headers and check if they exist before splitting
  const accessTokenHeader = response.headers["authorization"];
  const refreshToken = response.headers["refresh-token"];

  if (accessTokenHeader) {
    const accessToken = accessTokenHeader.split(" ")[1];
    useAuthStore.getState().setAccessToken(accessToken);
  }

  if (refreshToken) {
    useAuthStore.getState().setRefreshToken(refreshToken);
  }

  return response.data;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onError: (error: any) => {
      console.error("Error signing in:", error);
    },
    onSuccess: (data) => {
      console.log("Signed in successfully:", data);
    },
  });
};
