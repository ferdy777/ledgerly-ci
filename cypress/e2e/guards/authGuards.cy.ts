describe("Auth Guards", () => {
  beforeEach(() => {
    cy.clearAppState();
  });

  it("redirects unauthenticated users from /members to /login", () => {
    cy.visit("/members");
    cy.url().should("include", "/login");
  });

  it("redirects an authenticated user visiting /login to /members", () => {
    cy.login();
    cy.visit("/login");
    cy.url().should("include", "/members");
  });

  it("redirects / to /login", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });

  it("shows the not-found page for unknown routes", () => {
    cy.visit("/does-not-exist");
    cy.contains("Page not found").should("be.visible");
  });
});
