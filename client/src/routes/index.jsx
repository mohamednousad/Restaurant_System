import {
  Home,
  Auth,
  Orders,
  Tables,
  Menu,
  Dashboard,
  CustomerOrder,
} from "../views";
import { Layout } from "./Layout";
import { ProtectedRoute, CustomerRoute } from "./ProtectedRoute";

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
  {
    path: "/customer",
    element: (
      <CustomerRoute>
        <CustomerOrder />
      </CustomerRoute>
    ),
  },
  {
    path: "/customer/tables",
    element: (
      <CustomerRoute>
        <Tables />
      </CustomerRoute>
    ),
  },
  {
    path: "/customer/menu",
    element: (
      <CustomerRoute>
        <Menu />
      </CustomerRoute>
    ),
  },
];

export const createRoutes = () => {
  return routes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
  }));
};