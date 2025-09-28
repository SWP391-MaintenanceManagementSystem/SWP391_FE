import { defaultAuth, setAuthStorage, getAuthStorage } from "@/contexts/AuthContext";
import { refresh } from "@/services/auth/apis/auth.api";
import _axios from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";


export const axiosPublic = _axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export const axiosPrivate = _axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getAuthStorage().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest: any = error.config;

    if (originalRequest.url.includes("/auth/refresh-token")) {
      setAuthStorage(defaultAuth);
      toast.error("Session expired, please login again.");
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await refresh();
        const { accessToken } = res.data;
        setAuthStorage({ ...getAuthStorage(), accessToken, isAuthenticated: true });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosPrivate(originalRequest);
      } catch {
        setAuthStorage(defaultAuth);
        toast.error("Session expired, please login again.");
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);
