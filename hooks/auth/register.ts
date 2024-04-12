import { type RegisterUserPayload } from "@/app/api/auth/register/route";
import { API_ROUTES, api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      return await api.post(API_ROUTES.auth.register, payload);
    },
  });
}
