// src/hooks/useSignUp.ts
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const signUp = async (data: SignUpData) => {
  const response = await axiosInstance.post("/authentication/sign-up", data);
  return response.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onError: (error: any) => {
      console.error("Error signing up:", error);
    },
    onSuccess: (data) => {
      console.log("Signed up successfully:", data);
    },
  });
};
