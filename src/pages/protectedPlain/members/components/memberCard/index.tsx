import Typography from "@/components/common/typography";

type Props = {
  initials: string;
  fullName: string;
  email: string;
  balance: string;
};

const MemberCard = ({ initials, fullName, email, balance }: Props) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6">
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700"
      data-cy="member-initials"
    >
      {initials}
    </div>
    <div className="flex flex-col">
      <Typography className="font-semibold" data-cy="member-name">
        {fullName}
      </Typography>
      <Typography variant="body-small" className="text-gray-500">
        {email}
      </Typography>
      <Typography variant="body-small" data-cy="member-balance">
        Balance: {balance}
      </Typography>
    </div>
  </div>
);

export default MemberCard;
