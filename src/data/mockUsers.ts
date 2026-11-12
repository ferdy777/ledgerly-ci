import type { Auth } from "@/types";

export interface IMockUser extends Auth.User {
  password: string;
}

// Demo accounts — there is no backend, this is the "database".
export const MOCK_USERS: IMockUser[] = [
  {
    firstName: "Ada",
    lastName: "Obi",
    email: "ada@ledgerly.app",
    password: "Password123!",
  },
  {
    firstName: "Tunde",
    lastName: "Bello",
    email: "tunde@ledgerly.app",
    password: "Password123!",
  },
];
