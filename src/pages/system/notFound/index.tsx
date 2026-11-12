import { Link } from "react-router-dom";
import { Path } from "@/navigations/routes";
import Typography from "@/components/common/typography";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 px-6 text-center">
    <Typography as="h1" variant="heading-3" className="font-semibold">
      Page not found
    </Typography>
    <Link to={Path.Root} className="text-[14px] font-medium text-blue-600">
      Back to home
    </Link>
  </div>
);

export default NotFound;
