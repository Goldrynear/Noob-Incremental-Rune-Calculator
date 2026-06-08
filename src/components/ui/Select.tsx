import type { SelectHTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cx(
        "h-9 w-full rounded-md border border-cyan-300/18 bg-cyan-950/20 px-3 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_0_0_1px_rgba(8,145,178,.04)] transition focus:border-cyan-300/55 focus:bg-cyan-950/28 focus:outline-none focus:ring-2 focus:ring-cyan-300/25",
        className,
      )}
      {...props}
    />
  );
}
