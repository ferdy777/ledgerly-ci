import { MOCK_USERS } from "@/data/mockUsers";
import type { Auth } from "@/types";

const MOCK_LATENCY_MS = 300;
export const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock login: resolves with the matching demo user, rejects otherwise.
export const loginService = async (
  payload: Auth.Login.Request,
): Promise<Auth.Login.Data> => {
  await wait(MOCK_LATENCY_MS);

  const match = MOCK_USERS.find(
    (u) =>
      u.email.toLowerCase() === payload.email.trim().toLowerCase() &&
      u.password === payload.password,
  );
  if (!match) throw new Error(INVALID_CREDENTIALS_MESSAGE);

  const { firstName, lastName, email } = match;
  return { firstName, lastName, email };
};
