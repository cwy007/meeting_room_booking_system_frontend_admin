import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import { App, ConfigProvider } from "antd";
import AntdInit from "./components/AntdInit/index.tsx";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App>
      <AntdInit />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </App>
  </ConfigProvider>,
);
