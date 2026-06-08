import { Star } from "lucide-react";
import { calculateRuneETA } from "../../lib/calculations";
import type { CalculatorInput, Rune } from "../../lib/types";
import { cx, getCategory, runeDomId } from "../../lib/utils";
import { Badge } from "../ui/Badge";

export function RuneCard({ rune, input, highlighted }: { rune: Rune; input: CalculatorInput; highlighted?: boolean }) {
  const category = getCategory(rune.type);

  return (
    <article
      id={runeDomId(rune)}
      className={cx(
        "group scroll-mt-28 overflow-hidden rounded-md border border-white/[.08] bg-[#0b111a]/78 px-3 py-2.5 transition hover:border-white/16 hover:bg-white/[.045]",
        highlighted && "border-cyan-300/70 bg-cyan-300/12 ring-2 ring-cyan-300/30",
      )}
      style={{ borderLeftColor: rune.color, borderLeftWidth: 3, borderTopColor: `${rune.color}66` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5">
            {rune.premium && <Star className="shrink-0 text-amber-200" size={13} fill="currentColor" />}
            <h3 className="truncate text-sm font-semibold text-slate-50">{rune.name}</h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{rune.cls}</p>
        </div>
        <Badge color={category.color}>{category.label}</Badge>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <div className="min-w-0 text-slate-500">
          Chance: <span className="font-medium text-slate-300">1 / {rune.raw}</span>
        </div>
        <div className="shrink-0 text-slate-500">
          ETA: <span className="font-semibold text-cyan-100">{calculateRuneETA(rune, input)}</span>
        </div>
      </div>
    </article>
  );
}
