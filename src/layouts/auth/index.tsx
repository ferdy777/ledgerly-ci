import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Path } from "@/navigations/routes";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={Path.Members} replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-8 py-10">
      <div className="w-full max-w-112.5">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
