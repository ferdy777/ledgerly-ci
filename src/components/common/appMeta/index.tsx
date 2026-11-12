import { useLocation } from "react-router-dom";
import { getPageTitle } from "@/utils/getPageTitle";

// React 19 hoists <title> into <head>; keeps the tab title in sync with the route.
const AppMeta = () => {
  const { pathname } = useLocation();

  return <title>{getPageTitle(pathname)}</title>;
};

export default AppMeta;
