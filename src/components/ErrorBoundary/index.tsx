import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 全局错误边界组件，捕获子组件树中的 JavaScript 错误并展示友好提示。
 * 适用于捕获整个应用范围内的错误，防止白屏。
 * 需要将其放在组件树的顶层，通常在 main.tsx 中包裹整个应用。
 *
 * @example
 * ```tsx
 * import ErrorBoundary from "./components/ErrorBoundary";
 *
 * createRoot(document.getElementById("root")!).render(
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 * );
 * ```
 * @returns
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="页面出现错误"
          subTitle={this.state.error?.message ?? "未知错误，请稍后再试"}
          extra={
            <Button type="primary" onClick={this.handleReset}>
              重试
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

/**
 * 作用于路由错误的边界组件，捕获路由组件树中的错误并展示友好提示。
 * 需要配合 react-router 的 errorElement 使用。
 *
 * @example
 * ```tsx
 * import { RouteErrorFallback } from "./components/ErrorBoundary";
 *
 * const routes = [
 *   { path: "/", element: <Layout />, errorElement: <RouteErrorFallback /> },
 *   // ...
 * ];
 * ```
 * @returns
 */
export function RouteErrorFallback() {
  const error = useRouteError() as Error;
  return (
    <Result
      status="error"
      title="页面出现错误"
      subTitle={error?.message ?? "未知错误，请稍后再试"}
    />
  );
}

export default ErrorBoundary;
