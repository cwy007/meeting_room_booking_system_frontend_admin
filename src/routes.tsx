import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ErrorNotFound from "./components/ErrorNotFound";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import { RouteErrorFallback } from "./components/ErrorBoundary";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorFallback />, // 添加错误边界
    children: [
      {
        index: true,
        element: <Navigate to="/user-list" replace />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "*",
        element: <ErrorNotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
];

export default routes;
