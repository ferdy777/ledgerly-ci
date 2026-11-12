export interface ITransaction {
  id: string;
  label: string;
  amount: number;
  currency: string;
  type: "credit" | "debit";
}

// Mock data — no backend.
export const MOCK_TRANSACTIONS: ITransaction[] = [
  { id: "t1", label: "Salary", amount: 150000, currency: "NGN", type: "credit" },
  { id: "t2", label: "Groceries", amount: 12500, currency: "NGN", type: "debit" },
  { id: "t3", label: "Electricity", amount: 8000, currency: "NGN", type: "debit" },
];
