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
        "group scroll-mt-28 overflow-hidden rounded-md border border-white/10 bg-slate-950/38 p-2.5 transition hover:border-white/18 hover:bg-white/[.05]",
        highlighted && "border-cyan-300/70 bg-cyan-300/12 ring-2 ring-cyan-300/30",
      )}
      style={{ borderLeftColor: rune.color, borderLeftWidth: 3 }}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge color={category.color}>{category.label}</Badge>
        {rune.premium && (
          <span className="inline-flex h-6 items-center gap-1 rounded-md border border-amber-300/35 bg-amber-300/10 px-2 text-xs font-medium text-amber-100">
            <Star size={12} fill="currentColor" />
            Premium
          </span>
        )}
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-50">{rune.name}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{rune.cls}</p>
        </div>
        <div className="shrink-0 text-right text-xs">
          <div className="text-slate-500">
            Chance: <span className="font-medium text-slate-300">1 / {rune.raw}</span>
          </div>
          <div className="mt-1 text-slate-500">
            ETA: <span className="font-semibold text-cyan-100">{calculateRuneETA(rune, input)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
