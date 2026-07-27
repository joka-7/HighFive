import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "../services/errors";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Catches render failures (e.g. empty offline lists throwing in pickByDay)
// so the whole app doesn't blank out with no recovery path.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, `render${info.componentStack ?? ""}`);
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app">
          <main className="screen">
            <div className="card center" role="alert">
              <div style={{ fontSize: 48 }}>⚠️</div>
              <h2>משהו השתבש</h2>
              <p className="muted">אירעה שגיאה בלתי צפויה. אפשר לנסות שוב.</p>
              <button className="btn" onClick={this.retry} style={{ marginTop: 12 }}>
                נסו שוב 🔄
              </button>
            </div>
          </main>
        </div>
      );
    }
    return this.props.children;
  }
}
