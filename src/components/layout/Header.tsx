import { Moon, Sun } from "lucide-react";
import { runeConfig } from "../../config/runeConfig";
import { formatValue } from "../../lib/calculations";
import type { Theme } from "../../lib/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function Header({ effectiveRps, theme, onThemeChange }: { effectiveRps: number; theme: Theme; onThemeChange: (theme: Theme) => void }) {
  const logoPath = `${import.meta.env.BASE_URL}Images/Logo.png`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#070b12]/90 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,.26)] backdrop-blur-xl md:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logoPath}
            alt=""
            className="h-11 w-11 shrink-0 rounded-md object-contain"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className="text-lg font-semibold tracking-wide text-slate-50 md:text-xl">{runeConfig.app.title}</h1>
              <div className="flex flex-wrap items-center gap-1.5">
                {runeConfig.app.chips.map((chip) => <Badge key={chip}>{chip}</Badge>)}
              </div>
            </div>
            <p className="mt-0.5 text-sm text-slate-400">{runeConfig.app.subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 md:justify-end">
          <div className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5">
            <div className="text-[11px] uppercase text-cyan-100/70">Effective RPS</div>
            <div className="font-semibold leading-5 text-cyan-50">{formatValue(effectiveRps)}/s</div>
          </div>
          <Button
            aria-label="Toggle theme"
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            icon={theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
          >
            {theme === "dark" ? "Dark" : "Light"}
          </Button>
        </div>
      </div>
    </header>
  );
}
