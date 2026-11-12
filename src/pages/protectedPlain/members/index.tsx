import Typography from "@/components/common/typography";
import AppButton from "@/components/common/appButton";
import EnvBadge from "@/components/common/envBadge";
import MemberCard from "./components/memberCard";
import TransactionList from "./components/transactionList";
import { MOCK_TRANSACTIONS } from "./data/transactions";
import useMembers from "./hooks/useMembers";

const Members = () => {
  const { user, initials, balance, handleLogout } = useMembers();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 p-6">
      <Typography as="h1" variant="heading-4" className="font-semibold">
        Members
      </Typography>
      <MemberCard
        initials={initials}
        fullName={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()}
        email={user?.email ?? ""}
        balance={balance}
      />
      <TransactionList transactions={MOCK_TRANSACTIONS} />
      <AppButton onClick={handleLogout} data-cy="members-logout">
        Log out
      </AppButton>
      <EnvBadge />
    </div>
  );
};

export default Members;
