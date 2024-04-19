import { type RequestPasswordRecoveryPayload } from "@/app/api/auth/password-recovery/route";
import { API_ROUTES, api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useRequestPasswordRecovery() {
  return useMutation({
    mutationFn: async (payload: RequestPasswordRecoveryPayload) => {
      return await api.post(API_ROUTES.auth.passwordRecovery, payload);
    },
  });
}
