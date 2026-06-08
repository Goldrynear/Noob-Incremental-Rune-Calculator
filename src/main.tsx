import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";
import { debug, installGlobalDebugHandlers } from "./lib/debug";
import "./index.css";

installGlobalDebugHandlers();

debug.info("Booting app", {
  baseUrl: import.meta.env.BASE_URL,
  mode: import.meta.env.MODE,
  path: window.location.pathname,
});

const root = document.getElementById("root");

if (!root) {
  debug.error("Missing root element. Expected <div id=\"root\"></div> in index.html.");
  const fallback = document.createElement("main");
  fallback.className = "min-h-screen bg-[#05080d] p-4 text-slate-100";
  fallback.textContent = "NI Rune Calculator could not start because the page is missing its root element.";
  document.body.appendChild(fallback);
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </React.StrictMode>,
  );
}
