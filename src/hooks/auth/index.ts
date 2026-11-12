import { useMutation } from "@tanstack/react-query";
import { AuthQueryTag, type MutationOptions } from "../types";
import { loginService } from "@/services/auth";
import type { Auth } from "@/types";

export const useLogin = (
  options?: MutationOptions<Auth.Login.Data, Auth.Login.Request>,
) => {
  return useMutation({
    mutationFn: (payload: Auth.Login.Request) => loginService(payload),
    mutationKey: [AuthQueryTag.Login],
    ...options,
  });
};
