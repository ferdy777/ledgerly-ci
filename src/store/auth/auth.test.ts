import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from ".";

const user = { firstName: "Ada", lastName: "Obi", email: "ada@ledgerly.app" };

describe("auth store", () => {
  beforeEach(() => {
    useAuthStore.getState().handleLogoutSuccess();
  });

  it("starts logged out", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it("stores the user on login", () => {
    useAuthStore.getState().handleLoginSuccess(user);
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe("ada@ledgerly.app");
  });

  it("clears everything on logout", () => {
    useAuthStore.getState().handleLoginSuccess(user);
    useAuthStore.getState().handleLogoutSuccess();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it("persists to localStorage under auth_store", () => {
    useAuthStore.getState().handleLoginSuccess(user);
    expect(window.localStorage.getItem("auth_store")).toContain(
      "ada@ledgerly.app",
    );
  });
});
