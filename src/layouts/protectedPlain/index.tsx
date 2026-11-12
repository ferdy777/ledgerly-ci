import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Path } from "@/navigations/routes";

const ProtectedPlainLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={Path.Login} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedPlainLayout;
