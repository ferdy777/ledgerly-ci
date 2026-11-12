import type { UseMutationOptions } from "@tanstack/react-query";

export type MutationOptions<TData, TVariables = void> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn" | "mutationKey"
>;

export enum AuthQueryTag {
  Login = "Login",
}
