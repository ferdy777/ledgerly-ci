// Safe money-ish formatter: never throws on null/undefined amounts.
export const formatAmount = (
  currency: string | null | undefined,
  amount: number | string | null | undefined,
) => {
  if (amount === null || amount === undefined || amount === "") return "—";
  const value = Number(amount);
  if (Number.isNaN(value)) return "—";
  return currency ? `${currency} ${value.toLocaleString()}` : value.toLocaleString();
};
