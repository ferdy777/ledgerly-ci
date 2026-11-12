import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TransactionList from ".";

describe("TransactionList", () => {
  it("renders credits and debits with signs", () => {
    render(
      <TransactionList
        transactions={[
          { id: "1", label: "Salary", amount: 1000, currency: "NGN", type: "credit" },
          { id: "2", label: "Rent", amount: 400, currency: "NGN", type: "debit" },
        ]}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/^\+NGN/)).toBeInTheDocument();
    expect(screen.getByText(/^-NGN/)).toBeInTheDocument();
  });
});
