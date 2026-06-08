import type { CalculatorInput, Rune } from "../../lib/types";
import { runeConfig } from "../../config/runeConfig";
import { getCategory, getCategoryIcon } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Toggle } from "../ui/Toggle";

export function ControlsPanel({
  input,
  onChange,
  onUpdate,
  updated,
}: {
  input: CalculatorInput;
  onChange: (input: CalculatorInput) => void;
  onUpdate: () => void;
  updated: boolean;
}) {
  return (
    <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
      <Card className="p-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Controls</h2>
        <div className="mt-3 space-y-2.5">
          <Field label="Rune Bulk">
            <Input value={input.runeBulk} onChange={(event) => onChange({ ...input, runeBulk: event.target.value })} />
          </Field>
          <Field label="Rune Luck (x)">
            <Input value={input.runeLuck} onChange={(event) => onChange({ ...input, runeLuck: event.target.value })} />
          </Field>
          <Field label="Cooldown Speed">
            <Input value={input.cooldownSpeed} onChange={(event) => onChange({ ...input, cooldownSpeed: event.target.value })} />
          </Field>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button className="flex-1" variant="solid" onClick={onUpdate}>Update</Button>
          {updated && <span className="text-xs font-medium text-cyan-100">Updated</span>}
        </div>
        <p className="mt-2 text-xs text-slate-500">Click Update after changing stats.</p>
      </Card>
      <Card className="p-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Potions</h2>
        <div className="mt-3 grid gap-2">
          <Toggle label="Rune Bulk 2x" checked={input.bulkPotion} onChange={(bulkPotion) => onChange({ ...input, bulkPotion })} />
          <Toggle label="Rune Luck 2x" checked={input.luckPotion} onChange={(luckPotion) => onChange({ ...input, luckPotion })} />
          <Toggle label="Rune Speed 2x" checked={input.speedPotion} onChange={(speedPotion) => onChange({ ...input, speedPotion })} />
        </div>
        <p className="mt-3 border-t border-white/[.06] pt-2 text-xs text-slate-500">Made by GoldAstro</p>
      </Card>
    </aside>
  );
}

export function RuneListPanel({
  navCategories,
  selectedCategory,
  onSelectCategory,
}: {
  navCategories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  return (
    <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
      <Card className="p-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Rune List</h2>
        <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {navCategories.map((categoryName) => {
            const category = getCategory(categoryName);
            const Icon = getCategoryIcon(category.icon);
            const count = (runeConfig.runes as readonly Rune[]).filter((rune) => rune.type === categoryName).length;
            const active = selectedCategory === categoryName;
            return (
              <button
                key={categoryName}
                type="button"
                onClick={() => onSelectCategory(categoryName)}
                className={`flex min-h-10 w-full items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-300/35 ${
                  active ? "border-cyan-300/35 bg-cyan-300/12 text-cyan-50" : "border-white/10 bg-black/12 text-slate-300 hover:bg-white/[.055]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon size={14} className="shrink-0" style={{ color: category.color }} />
                  <span className="truncate">{category.label}</span>
                </span>
                <span className="shrink-0 text-xs text-slate-500">{categoryName === "All Runes" ? runeConfig.runes.length : count}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-slate-400">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
