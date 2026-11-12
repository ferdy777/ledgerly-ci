import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./getErrorMessage";

describe("getErrorMessage", () => {
  it("returns the message of an Error", () => {
    expect(getErrorMessage(new Error("Invalid email or password"))).toBe(
      "Invalid email or password",
    );
  });

  it.each([undefined, null, "boom", {}])("falls back for %s", (value) => {
    expect(getErrorMessage(value)).toBe(
      "Something went wrong. Please try again.",
    );
  });
});
