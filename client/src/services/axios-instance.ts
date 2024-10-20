import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAccessToken, setRefreshToken, clearTokens } =
      useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(
          "/api/authentication/refresh-tokens",
          {
            refreshToken,
          }
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        clearTokens();
        window.location.href = "/sign-in";
        return Promise.reject(err);
      }
    }

    if (error.response) {
      const { data, status } = error.response;
      const errorMessage = data?.message || `Error ${status}: ${data}`;
      toast.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    const genericErrorMessage =
      "An unexpected error occurred. Please try again.";
    toast.error(genericErrorMessage);
    return Promise.reject(new Error(genericErrorMessage));
  }
);

export default axiosInstance;
