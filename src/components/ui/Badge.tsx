import type { ReactNode } from "react";

export function Badge({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium"
      style={{
        borderColor: color ? `${color}88` : "rgba(255,255,255,.12)",
        backgroundColor: color ? `${color}18` : "rgba(255,255,255,.055)",
        color: color ?? "#cbd5e1",
      }}
    >
      {children}
    </span>
  );
}
