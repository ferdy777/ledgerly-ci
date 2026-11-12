import Typography from "@/components/common/typography";
import { formatAmount } from "@/utils/formatAmount";
import type { ITransaction } from "../../data/transactions";

type Props = {
  transactions: ITransaction[];
};

const TransactionList = ({ transactions }: Props) => (
  <ul
    className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white"
    data-cy="transaction-list"
  >
    {transactions.map((t) => (
      <li key={t.id} className="flex items-center justify-between px-6 py-4">
        <Typography variant="body-small">{t.label}</Typography>
        <Typography
          variant="body-small"
          className={t.type === "credit" ? "text-green-600" : "text-gray-700"}
        >
          {t.type === "credit" ? "+" : "-"}
          {formatAmount(t.currency, t.amount)}
        </Typography>
      </li>
    ))}
  </ul>
);

export default TransactionList;
