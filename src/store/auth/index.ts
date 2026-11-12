import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Auth } from "@/types";

export interface IAuthStore {
  isAuthenticated: boolean;
  user: Auth.User | null;
}

interface IAuthStoreAction {
  handleLoginSuccess: (user: Auth.Login.Data) => void;
  handleLogoutSuccess: () => void;
}

const AUTH_PERSIST_NAME = "auth_store";

export const useAuthStore = create<IAuthStore & IAuthStoreAction>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      handleLoginSuccess: (user) => {
        set({ isAuthenticated: true, user });
      },
      handleLogoutSuccess: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: AUTH_PERSIST_NAME,
    },
  ),
);
