import type { ReactNode } from "react";
import { Header } from "./Header";
import { ControlsPanel } from "./ControlsPanel";
import type { CalculatorInput, Rune, Theme } from "../../lib/types";

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
  selectedRunes,
  onSelectCategory,
  onRuneClick,
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
  selectedRunes: Rune[];
  onSelectCategory: (category: string) => void;
  onRuneClick: (rune: Rune) => void;
}) {
  return (
    <div className={theme === "light" ? "light-theme min-h-screen" : "min-h-screen"}>
      <Header effectiveRps={effectiveRps} theme={theme} onThemeChange={onThemeChange} />
      <main className="grid gap-4 p-4 md:p-6 lg:grid-cols-[280px_1fr]">
        <ControlsPanel
          input={input}
          onChange={onInputChange}
          onUpdate={onUpdate}
          updated={updated}
          navCategories={navCategories}
          selectedCategory={selectedCategory}
          selectedRunes={selectedRunes}
          onSelectCategory={onSelectCategory}
          onRuneClick={onRuneClick}
        />
        {children}
      </main>
    </div>
  );
}
