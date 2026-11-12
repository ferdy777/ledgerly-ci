import { createBrowserRouter, Navigate } from "react-router-dom";
import { Path } from "./routes";
import RootLayout from "@/layouts/root";
import NotFound from "@/pages/system/notFound";
import { authRoutes } from "./subRoutes/auth";
import { protectedPlainRoutes } from "./subRoutes/protectedPlain";

export const router = createBrowserRouter([
  {
    path: Path.Root,
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={Path.Login} replace /> },
      ...authRoutes,
      ...protectedPlainRoutes,
      { path: "*", element: <NotFound /> },
    ],
  },
]);
