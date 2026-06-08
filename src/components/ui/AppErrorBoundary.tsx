import { Component, type ErrorInfo, type ReactNode } from "react";
import { debug } from "../../lib/debug";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.error("React render error", { error, componentStack: errorInfo.componentStack });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05080d] p-4 text-slate-100">
        <section className="w-full max-w-xl rounded-md border border-red-300/25 bg-red-950/20 p-5 shadow-2xl">
          <h1 className="text-lg font-semibold text-red-100">The calculator could not start.</h1>
          <p className="mt-2 text-sm text-slate-300">
            Refresh the page once. If it keeps happening, open the page with <code className="rounded bg-black/30 px-1">?debug</code> and check the browser console.
          </p>
          <pre className="mt-4 max-h-56 overflow-auto rounded-md bg-black/35 p-3 text-xs text-red-100">
            {this.state.error.message}
          </pre>
        </section>
      </main>
    );
  }
}
