import { cx } from "../../lib/utils";

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex h-9 items-center justify-between gap-3 rounded-md border border-white/10 bg-black/16 px-3 text-sm text-slate-200 transition hover:bg-white/[.055] focus:outline-none focus:ring-2 focus:ring-cyan-300/35"
      aria-pressed={checked}
    >
      <span>{label}</span>
      <span className={cx("relative h-5 w-9 rounded-full border transition", checked ? "border-cyan-300/60 bg-cyan-300/30" : "border-white/15 bg-white/10")}>
        <span className={cx("absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition", checked ? "left-[18px]" : "left-0.5")} />
      </span>
    </button>
  );
}
