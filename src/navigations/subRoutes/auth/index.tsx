/* eslint-disable react-refresh/only-export-components */
import SuspenseFallback from "@/components/common/suspenseFallback";
import { Path } from "@/navigations/routes";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const AuthLayout = lazy(() => import("@/layouts/auth"));
const Login = lazy(() => import("@/pages/auth/login"));

const routesData = [
  {
    path: Path.Login,
    component: <Login />,
  },
];

const authRoutesChildren: RouteObject[] = routesData.map((route) => ({
  path: route.path,
  element: (
    <SuspenseFallback path={route.path}>{route.component}</SuspenseFallback>
  ),
}));

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: authRoutesChildren,
  },
];
