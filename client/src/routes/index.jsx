import { Home, Auth, Orders, Tables, Menu, Dashboard } from "../pages";
import { Layout } from "./Layout";
import { ProtectedRoute } from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tables",
    element: (
      <ProtectedRoute>
        <Tables />
      </ProtectedRoute>
    ),
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export const createRoutes = () => {
  return routes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
  }));
};