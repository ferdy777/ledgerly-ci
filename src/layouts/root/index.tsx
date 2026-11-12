import { Outlet } from "react-router-dom";
import QueryProvider from "@/contexts/queryContext";
import AppMeta from "@/components/common/appMeta";

const RootLayout = () => {
  return (
    <QueryProvider>
      <AppMeta />
      <Outlet />
    </QueryProvider>
  );
};

export default RootLayout;
