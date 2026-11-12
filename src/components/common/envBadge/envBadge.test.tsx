import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EnvBadge from ".";

vi.mock("@/constants/envs", () => ({
  APP_TITLE: "Ledgerly (Test)",
  ENVIRONMENT: "production",
  APP_VERSION: "1.2.3",
}));

describe("EnvBadge", () => {
  it("shows title, environment and version", () => {
    render(<EnvBadge />);
    expect(screen.getByTestId("box")).toHaveTextContent(
      "Ledgerly (Test) · production · v1.2.3",
    );
  });
});
