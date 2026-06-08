import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(
        "h-9 w-full rounded-md border border-white/[.09] bg-[#111923]/88 px-3 text-sm text-slate-100 shadow-inner shadow-black/20 placeholder:text-slate-500 focus:border-cyan-300/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/30",
        className,
      )}
      {...props}
    />
  );
}
