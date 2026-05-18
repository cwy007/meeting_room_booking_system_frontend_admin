import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ErrorNotFound from "./components/ErrorNotFound";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import { RouteErrorFallback } from "./components/ErrorBoundary";
import MeetingRoom from "./pages/MeetingRoom";
import BookingList from "./pages/BookingList";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorFallback />, // 添加错误边界
    children: [
      {
        index: true,
        element: <Navigate to="/meeting-room" replace />,
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
        path: "/meeting-room",
        element: <MeetingRoom />,
      },
      {
        path: "/booking-list",
        element: <BookingList />,
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
