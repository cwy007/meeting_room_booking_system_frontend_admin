import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import { App, ConfigProvider } from "antd";
import AntdInit from "./components/AntdInit/index.tsx";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";
import zhCN from "antd/locale/zh_CN";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <App>
      <ErrorBoundary>
        <AntdInit />
        <RouterProvider router={router} />{" "}
        {/* 将 RouterProvider 放在 ErrorBoundary 内部，以捕获路由组件中的错误 */}
      </ErrorBoundary>
    </App>
  </ConfigProvider>,
);
