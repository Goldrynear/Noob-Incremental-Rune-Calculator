import type { CalculatorInput, Rune } from "../../lib/types";
import { RuneCard } from "./RuneCard";

export function RuneGrid({
  runes,
  input,
  highlightedKey,
  showCategory = true,
}: {
  runes: Rune[];
  input: CalculatorInput;
  highlightedKey?: string;
  showCategory?: boolean;
}) {
  if (!runes.length) {
    return (
      <div className="rounded-lg border border-dashed border-white/12 bg-black/12 p-8 text-center text-sm text-slate-500">
        No runes match this view.
      </div>
    );
  }

  return (
    <div className="grid gap-2.5 md:grid-cols-2 2xl:grid-cols-3">
      {runes.map((rune) => (
        <RuneCard
          key={`${rune.type}-${rune.name}`}
          rune={rune}
          input={input}
          highlighted={`${rune.type}-${rune.name}` === highlightedKey}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
}
