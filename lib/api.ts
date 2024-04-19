import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
});

export const api = {
  get: async <T>(url: string) => await axiosInstance.get<T>(url),
  post: async <T>(url: string, data: unknown = {}) =>
    await axiosInstance.post<T>(url, data),
  put: async <T>(url: string, data: unknown = {}) =>
    await axiosInstance.put<T>(url, data),
  delete: async <T>(url: string) => await axiosInstance.delete<T>(url),
};

export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    passwordRecovery: "/auth/password-recovery",
  },
};
