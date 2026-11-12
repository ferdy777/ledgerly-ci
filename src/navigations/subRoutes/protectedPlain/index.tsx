/* eslint-disable react-refresh/only-export-components */
import SuspenseFallback from "@/components/common/suspenseFallback";
import { Path } from "@/navigations/routes";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ProtectedPlainLayout = lazy(() => import("@/layouts/protectedPlain"));
const Members = lazy(() => import("@/pages/protectedPlain/members"));

const routesData = [
  {
    path: Path.Members,
    component: <Members />,
  },
];

const protectedPlainChildren: RouteObject[] = routesData.map((route) => ({
  path: route.path,
  element: (
    <SuspenseFallback path={route.path}>{route.component}</SuspenseFallback>
  ),
}));

export const protectedPlainRoutes: RouteObject[] = [
  {
    element: <ProtectedPlainLayout />,
    children: protectedPlainChildren,
  },
];
