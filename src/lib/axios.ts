import { defaultAuth, setAuthStorage, getAuthStorage } from "@/contexts/AuthContext";
import { refresh } from "@/services/apis/auth.api";
import _axios from "axios";
import { toast } from "sonner";

export const axios = _axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

axios.interceptors.request.use(
  (config) => {
    const token = getAuthStorage().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest: any = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await refresh();
        const { accessToken } = res.data
        setAuthStorage({ ...getAuthStorage(), accessToken, isAuthenticated: true });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch {
        setAuthStorage(defaultAuth);
        toast.error("Session expired, please login again.");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);