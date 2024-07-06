import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const useAxiosInterceptor = () => {
  const { token } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);
};

export default instance;
