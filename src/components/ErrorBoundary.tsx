import React, { ErrorInfo, ReactNode } from "react";

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    console.log(_);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.log(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
