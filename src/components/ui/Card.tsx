import type { HTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("rounded-lg border border-white/10 bg-slate-950/48 p-4 shadow-[0_10px_28px_rgba(0,0,0,.18)] backdrop-blur", className)}
      {...props}
    />
  );
}
