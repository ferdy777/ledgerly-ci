/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Seeds the Zustand auth_store in localStorage to simulate a logged-in
       * user, bypassing the login UI. Use for tests that require auth but
       * aren't testing the login flow itself.
       */
      login(): void;

      /** Removes auth_store from localStorage. */
      clearAppState(): void;
    }
  }
}

Cypress.Commands.add("login", () => {
  window.localStorage.setItem(
    "auth_store",
    JSON.stringify({
      state: {
        isAuthenticated: true,
        user: { firstName: "Ada", lastName: "Obi", email: "ada@ledgerly.app" },
      },
      version: 0,
    }),
  );
});

Cypress.Commands.add("clearAppState", () => {
  window.localStorage.removeItem("auth_store");
});

export {};
