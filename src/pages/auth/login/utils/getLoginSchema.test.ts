import { describe, expect, it } from "vitest";
import { getLoginSchema } from "./getLoginSchema";

describe("getLoginSchema", () => {
  const schema = getLoginSchema();

  it("accepts valid credentials", async () => {
    await expect(
      schema.isValid({ email: "ada@ledgerly.app", password: "Secret123!" }),
    ).resolves.toBe(true);
  });

  it("requires an email", async () => {
    await expect(
      schema.validateAt("email", { email: "", password: "x" }),
    ).rejects.toThrow("Email is required");
  });

  it("rejects a malformed email", async () => {
    await expect(
      schema.validateAt("email", { email: "not-an-email", password: "x" }),
    ).rejects.toThrow("Enter a valid email");
  });

  it("requires a password", async () => {
    await expect(
      schema.validateAt("password", { email: "ada@ledgerly.app", password: "" }),
    ).rejects.toThrow("Password is required");
  });
});
