import type { ReactNode } from "react";
import { calculateCustomRuneETA, calculateCustomRunePower, formatValue } from "../../lib/calculations";
import type { CalculatorInput, CustomRuneInput } from "../../lib/types";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Toggle } from "../ui/Toggle";

export function CustomRuneCalc({
  customRune,
  input,
  onChange,
}: {
  customRune: CustomRuneInput;
  input: CalculatorInput;
  onChange: (customRune: CustomRuneInput) => void;
}) {
  const power = calculateCustomRunePower(customRune, input);
  const eta = calculateCustomRuneETA(customRune, input);
  const chance = customRune.raw.trim() || "--";
  const name = customRune.name.trim() || "Custom Rune";
  const type = customRune.type.trim() || "Custom";

  return (
    <Card className="p-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-50">Custom Rune Calculator</h2>
        <p className="mt-1 text-sm text-slate-500">Enter any rune chance to estimate how long it will take.</p>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
        <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Custom rune name">
              <Input value={customRune.name} onChange={(event) => onChange({ ...customRune, name: event.target.value })} placeholder="Example Rune" />
            </Field>
            <Field label="Rune chance/raw value">
              <Input value={customRune.raw} onChange={(event) => onChange({ ...customRune, raw: event.target.value })} placeholder="1.36UDe" />
            </Field>
            <Field label="Optional category/type">
              <Input value={customRune.type} onChange={(event) => onChange({ ...customRune, type: event.target.value })} placeholder="Cosmic Prism" />
            </Field>
            <label className="block text-xs font-medium text-slate-400">
              <span className="mb-1 block">Optional class</span>
              <select
                className="h-9 w-full rounded-md border border-white/10 bg-black/20 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/35"
                value={customRune.cls}
                onChange={(event) => onChange({ ...customRune, cls: event.target.value === "Noobinial" ? "Noobinial" : "Basic" })}
              >
                <option>Basic</option>
                <option>Noobinial</option>
              </select>
            </label>
          <div className="sm:col-span-2">
            <Toggle
              label="Ignore luck/speed potions"
              checked={customRune.ignoreLuckSpeedPotions}
              onChange={(ignoreLuckSpeedPotions) => onChange({ ...customRune, ignoreLuckSpeedPotions })}
            />
          </div>
        </div>

        <div className="rounded-md border border-cyan-300/18 bg-cyan-300/[.055] p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-50">{name}</div>
              <div className="mt-0.5 text-xs text-slate-500">{customRune.cls} - {type}</div>
            </div>
            <div className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">1 / {chance}</div>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between gap-3 text-slate-400">
              <span>Chance</span>
              <span className="font-medium text-slate-100">1 / {chance}</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-400">
              <span>Effective power used</span>
              <span className="font-medium text-slate-100">{formatValue(power)}/s</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-400">
              <span>Estimated time</span>
              <span className="font-semibold text-cyan-100">{eta}</span>
            </div>
            <div className="mt-2 rounded-md bg-black/14 px-3 py-2 text-sm font-medium text-slate-100">You can get this in: {eta}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-medium text-slate-400">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
