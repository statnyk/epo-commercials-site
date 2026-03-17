import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { T, container } from "../theme.ts";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, fontFamily: T.fontFamily }}>
        <div style={{ ...container, textAlign: "center", maxWidth: "480px" }}>
          <h1 style={{ color: T.textMain, fontSize: "1.8rem", fontWeight: 800, marginBottom: "12px" }}>Something went wrong</h1>
          <p style={{ color: T.textSub, fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: T.accent, color: "#fff", border: "none", borderRadius: T.radius, padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}
