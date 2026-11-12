import { sel } from "../../support/selectors";

describe("Logout", () => {
  it("returns to /login and clears the session", () => {
    cy.login();
    cy.visit("/members");

    cy.get(sel.members.logout).click();

    cy.url().should("include", "/login");
    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("auth_store") ?? "{}");
      expect(stored.state.isAuthenticated).to.eq(false);
    });
  });
});
