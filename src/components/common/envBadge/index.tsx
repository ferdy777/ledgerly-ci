import Typography from "@/components/common/typography";
import { APP_TITLE, APP_VERSION, ENVIRONMENT } from "@/constants/envs";

// Shows which environment this build was compiled for — handy to confirm
// a Render deploy picked up the right env vars.
const EnvBadge = () => (
  <Typography
    as="span"
    variant="body-x-small"
    className="rounded-full bg-gray-100 px-3 py-1 text-gray-600"
    data-cy="env-badge"
  >
    {APP_TITLE} · {ENVIRONMENT} · v{APP_VERSION}
  </Typography>
);

export default EnvBadge;
