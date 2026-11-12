import { describe, expect, it } from "vitest";
import { getPageTitle } from "./getPageTitle";

describe("getPageTitle", () => {
  it("returns just the app name for the root path", () => {
    expect(getPageTitle("/")).toBe("Ledgerly");
  });

  it("title-cases a plain page", () => {
    expect(getPageTitle("/login")).toBe("Login · Ledgerly");
  });

  it("adds the portal label and ignores record ids", () => {
    expect(getPageTitle("/individual/settings/bank-accounts/12345")).toBe(
      "Bank Accounts · Individual · Ledgerly",
    );
  });
});
