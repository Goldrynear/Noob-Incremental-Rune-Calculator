import { Moon, Sun } from "lucide-react";
import { runeConfig } from "../../config/runeConfig";
import { formatValue } from "../../lib/calculations";
import type { Theme } from "../../lib/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function Header({ effectiveRps, theme, onThemeChange }: { effectiveRps: number; theme: Theme; onThemeChange: (theme: Theme) => void }) {
  return (
    <header className="sticky top-0 z-50 flex flex-col gap-3 border-b border-white/10 bg-slate-950/82 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,.22)] backdrop-blur-xl md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg font-semibold tracking-wide text-slate-50 md:text-xl">{runeConfig.app.title}</h1>
          {runeConfig.app.chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}
        </div>
        <p className="mt-0.5 text-sm text-slate-400">{runeConfig.app.subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-2">
          <div className="text-[11px] uppercase text-cyan-100/70">Effective RPS</div>
          <div className="font-semibold text-cyan-50">{formatValue(effectiveRps)}/s</div>
        </div>
        <Button
          aria-label="Toggle theme"
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
          icon={theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        >
          {theme === "dark" ? "Dark" : "Light"}
        </Button>
      </div>
    </header>
  );
}
