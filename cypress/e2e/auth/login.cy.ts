import { sel } from "../../support/selectors";

describe("Login", () => {
  beforeEach(() => {
    cy.clearAppState();
  });

  const submitLoginForm = (email: string, pass: string) => {
    cy.get(sel.auth.email).type(email);
    cy.get(sel.auth.password).type(pass);
    cy.get(sel.auth.loginSubmit).click();
  };

  // ── Success path (mock data, no network) ──────────────────────────────────

  it("redirects to /members after a successful login", () => {
    cy.visit("/login");
    submitLoginForm("ada@ledgerly.app", "Password123!");

    cy.url().should("include", "/members");
    cy.get(sel.members.name).should("have.text", "Ada Obi");
    cy.get(sel.members.transactions).children().should("have.length", 3);
  });

  // ── Failure path ──────────────────────────────────────────────────────────

  it("stays on /login and shows an error for bad credentials", () => {
    cy.visit("/login");
    submitLoginForm("ada@ledgerly.app", "wrongpassword");

    cy.get(sel.auth.loginError).should("contain", "Invalid email or password");
    cy.url().should("include", "/login");
  });

  // ── Validation ────────────────────────────────────────────────────────────

  it("blocks submit and shows errors when the form is empty", () => {
    cy.visit("/login");
    cy.get(sel.auth.loginSubmit).click();

    cy.get(sel.auth.emailError).should("contain", "Email is required");
    cy.get(sel.auth.passwordError).should("contain", "Password is required");
    cy.url().should("include", "/login");
  });
});
