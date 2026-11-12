import { describe, expect, it } from "vitest";
import { getInitials } from "./getInitials";

describe("getInitials", () => {
  it("returns uppercase first letters of both names", () => {
    expect(getInitials("ada", "obi")).toBe("AO");
  });

  it("works with only one name", () => {
    expect(getInitials("Ada")).toBe("A");
  });

  it("falls back to dashes when no name is given", () => {
    expect(getInitials()).toBe("--");
  });
});
