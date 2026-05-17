import type { RouteObject } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/user-list",
        element: <UserList />,
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
