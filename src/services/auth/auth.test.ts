import { describe, expect, it } from "vitest";
import { INVALID_CREDENTIALS_MESSAGE, loginService } from ".";

describe("loginService (mock)", () => {
  it("returns the user for valid credentials", async () => {
    await expect(
      loginService({ email: "ada@ledgerly.app", password: "Password123!" }),
    ).resolves.toEqual({
      firstName: "Ada",
      lastName: "Obi",
      email: "ada@ledgerly.app",
    });
  });

  it("is case-insensitive on email and never returns the password", async () => {
    const user = await loginService({
      email: " ADA@ledgerly.app ",
      password: "Password123!",
    });
    expect(user).not.toHaveProperty("password");
  });

  it("rejects wrong credentials", async () => {
    await expect(
      loginService({ email: "ada@ledgerly.app", password: "nope" }),
    ).rejects.toThrow(INVALID_CREDENTIALS_MESSAGE);
  });
});
