import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "solid" | "soft" | "ghost";
};

export function Button({ icon, variant = "soft", className, children, ...props }: ButtonProps) {
  const variants = {
    solid: "border-cyan-400/60 bg-cyan-400/18 text-cyan-50 hover:bg-cyan-400/25",
    soft: "border-white/10 bg-white/[.055] text-slate-100 hover:bg-white/[.085]",
    ghost: "border-transparent bg-transparent text-slate-300 hover:bg-white/[.06]",
  };

  return (
    <button
      className={cx(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
