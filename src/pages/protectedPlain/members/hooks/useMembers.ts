import { useAuthStore } from "@/store/auth";
import { getInitials } from "@/utils/getInitials";
import { formatAmount } from "@/utils/formatAmount";
import { DEMO_BALANCE } from "../constants";

const useMembers = () => {
  const { user, handleLogoutSuccess } = useAuthStore();

  return {
    user,
    initials: getInitials(user?.firstName, user?.lastName),
    balance: formatAmount(DEMO_BALANCE.currency, DEMO_BALANCE.amount),
    handleLogout: handleLogoutSuccess,
  };
};

export default useMembers;
