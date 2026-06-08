const prefix = "[NI Rune Calculator]";

function isDebugEnabled() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.has("debug") || localStorage.getItem("ni-rune-debug") === "1";
  } catch {
    return false;
  }
}

export const debug = {
  enabled: isDebugEnabled(),
  info(message: string, data?: unknown) {
    if (!this.enabled) return;
    console.info(prefix, message, data ?? "");
  },
  warn(message: string, data?: unknown) {
    console.warn(prefix, message, data ?? "");
  },
  error(message: string, data?: unknown) {
    console.error(prefix, message, data ?? "");
  },
};

export function installGlobalDebugHandlers() {
  window.addEventListener("error", (event) => {
    debug.error("Unhandled error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    debug.error("Unhandled promise rejection", event.reason);
  });
}
