import { API_ROUTES, api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export type RegisterUserPayload = {
  email: string;
  name: string;
  password: string;
  phone: string;
};

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      return await api.post(API_ROUTES.auth.register, payload);
    },
  });
}
