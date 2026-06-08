import type { RuneMode } from "../../lib/types";
import { cx } from "../../lib/utils";

const tabs: Array<{ id: RuneMode; label: string }> = [
  { id: "category", label: "Runes Category" },
  { id: "special", label: "Special Runes" },
  { id: "all", label: "All Runes" },
];

export function RuneModeTabs({ mode, onModeChange }: { mode: RuneMode; onModeChange: (mode: RuneMode) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-black/16 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onModeChange(tab.id)}
          className={cx(
            "h-8 rounded-md px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300/35",
            mode === tab.id ? "bg-cyan-300/16 text-cyan-50" : "text-slate-400 hover:bg-white/[.055] hover:text-slate-100",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
