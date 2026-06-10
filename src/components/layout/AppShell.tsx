import type { ReactNode } from "react";
import { BackgroundEffects } from "./BackgroundEffects";
import { Header } from "./Header";
import { ControlsPanel, RuneListPanel } from "./ControlsPanel";
import type { CalculatorInput, Theme } from "../../lib/types";

export function AppShell({
  children,
  input,
  theme,
  effectiveRps,
  onInputChange,
  onUpdate,
  updated,
  onThemeChange,
  navCategories,
  selectedCategory,
  onSelectCategory,
}: {
  children: ReactNode;
  input: CalculatorInput;
  theme: Theme;
  effectiveRps: number;
  onInputChange: (input: CalculatorInput) => void;
  onUpdate: () => void;
  updated: boolean;
  onThemeChange: (theme: Theme) => void;
  navCategories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  return (
    <div className={theme === "light" ? "light-theme min-h-screen" : "min-h-screen"}>
      <BackgroundEffects theme={theme} />
      <Header effectiveRps={effectiveRps} theme={theme} onThemeChange={onThemeChange} />
      <main className="relative z-10 grid gap-4 p-4 md:p-6 lg:grid-cols-[260px_minmax(0,1fr)_240px] xl:grid-cols-[280px_minmax(0,1fr)_260px]">
        <ControlsPanel
          input={input}
          onChange={onInputChange}
          onUpdate={onUpdate}
          updated={updated}
        />
        {children}
        <RuneListPanel
          navCategories={navCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </main>
    </div>
  );
}
