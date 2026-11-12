import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Members from ".";
import { useAuthStore } from "@/store/auth";

describe("Members page", () => {
  beforeEach(() => {
    useAuthStore
      .getState()
      .handleLoginSuccess({ firstName: "Ada", lastName: "Obi", email: "ada@ledgerly.app" });
  });

  it("shows the signed-in member", () => {
    render(<Members />);
    expect(screen.getByText("Ada Obi")).toBeInTheDocument();
    expect(screen.getByText("ada@ledgerly.app")).toBeInTheDocument();
    expect(screen.getByText("AO")).toBeInTheDocument();
    expect(screen.getByText(/Balance: NGN/)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("logs out when the button is clicked", async () => {
    render(<Members />);
    await userEvent.click(screen.getByRole("button", { name: "Log out" }));
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
