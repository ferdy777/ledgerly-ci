import { describe, expect, it } from "vitest";
import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("formats a number with its currency", () => {
    expect(formatAmount("NGN", 25000)).toBe(`NGN ${(25000).toLocaleString()}`);
  });

  it("accepts numeric strings", () => {
    expect(formatAmount("NGN", "1500")).toBe(`NGN ${(1500).toLocaleString()}`);
  });

  it("omits the currency when none is given", () => {
    expect(formatAmount(null, 100)).toBe("100");
  });

  it.each([null, undefined, "", "abc"])("returns a dash for %s", (value) => {
    expect(formatAmount("NGN", value)).toBe("—");
  });
});
