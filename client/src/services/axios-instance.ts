import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { setToken, setRefreshToken } = useAuthStore.getState();

    const accessToken = response.headers["authorization"]?.replace(
      "Bearer ",
      ""
    );
    const refreshToken = response.headers["refresh-token"];

    if (accessToken) setToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setToken, setRefreshToken, clearToken } =
      useAuthStore.getState();

    if (originalRequest.url.includes("/sign-in")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshToken) throw new Error("No refresh token available");

        const { headers } = await axios.post(
          "http://localhost:5000/api/authentication/refresh-tokens",
          { refreshToken }
        );

        const newAccessToken = headers["authorization"]?.replace("Bearer ", "");
        const newRefreshToken = headers["refresh-token"];

        setToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        clearToken();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/sign-in";
        return Promise.reject(err);
      }
    }

    const errorMessage = error.response?.data?.message || "An error occurred.";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
