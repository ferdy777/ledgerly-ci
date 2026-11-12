import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from ".";
import { useAuthStore } from "@/store/auth";
import { loginService } from "@/services/auth";

vi.mock("@/services/auth", () => ({ loginService: vi.fn() }));

const renderLogin = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </QueryClientProvider>,
  );

const fillAndSubmit = async (email: string, password: string) => {
  await userEvent.type(screen.getByLabelText("Email"), email);
  await userEvent.type(screen.getByLabelText("Password"), password);
  await userEvent.click(screen.getByRole("button", { name: "Log in" }));
};

describe("Login page", () => {
  beforeEach(() => {
    vi.mocked(loginService).mockReset();
    useAuthStore.getState().handleLogoutSuccess();
  });

  it("shows the demo account hint", () => {
    renderLogin();
    expect(screen.getByText(/Demo account: ada@ledgerly.app/)).toBeInTheDocument();
  });

  it("shows validation errors and does not call the service when empty", async () => {
    renderLogin();
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(loginService).not.toHaveBeenCalled();
  });

  it("logs the user in on success", async () => {
    vi.mocked(loginService).mockResolvedValue({
      firstName: "Ada",
      lastName: "Obi",
      email: "ada@ledgerly.app",
    });
    renderLogin();
    await fillAndSubmit("ada@ledgerly.app", "Password123!");
    await waitFor(() =>
      expect(useAuthStore.getState().isAuthenticated).toBe(true),
    );
    expect(loginService).toHaveBeenCalledWith({
      email: "ada@ledgerly.app",
      password: "Password123!",
    });
  });

  it("shows the error message on failure", async () => {
    vi.mocked(loginService).mockRejectedValue(
      new Error("Invalid email or password"),
    );
    renderLogin();
    await fillAndSubmit("ada@ledgerly.app", "wrong");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password",
    );
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
