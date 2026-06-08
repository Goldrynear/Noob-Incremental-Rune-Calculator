import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { RuneGrid } from "./components/runes/RuneGrid";
import { RuneModeTabs } from "./components/runes/RuneModeTabs";
import { RuneSearch } from "./components/runes/RuneSearch";
import { SortControls } from "./components/runes/SortControls";
import { Calculator } from "lucide-react";
import { CustomRuneCalc } from "./components/runes/CustomRuneCalc";
import { Card } from "./components/ui/Card";
import { runeConfig } from "./config/runeConfig";
import { calculateEffectiveRPS, calculateRunePower } from "./lib/calculations";
import { defaultSettings, loadSettings, saveSettings } from "./lib/storage";
import type { CalculatorInput, Rune, RuneMode, SortDirection, SortKey, StoredSettings, Theme } from "./lib/types";
import { filterRunes, getCategory, runeDomId, sortRunes } from "./lib/utils";

const configRunes = runeConfig.runes as readonly Rune[];

function categoriesForMode(mode: RuneMode) {
  if (mode === "special") return [...runeConfig.specialOrder];
  if (mode === "all") return ["All Runes"];
  return [...runeConfig.categoryOrder];
}

function firstCategoryForMode(mode: RuneMode) {
  return categoriesForMode(mode)[0] ?? "All Runes";
}

export default function App() {
  const [settings, setSettings] = useState<StoredSettings>(() => loadSettings());
  const [updated, setUpdated] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState("");
  const [customOpen, setCustomOpen] = useState(false);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (!updated) return;
    const timeout = window.setTimeout(() => setUpdated(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [updated]);

  useEffect(() => {
    if (!highlightedKey) return;
    const timeout = window.setTimeout(() => setHighlightedKey(""), 1400);
    return () => window.clearTimeout(timeout);
  }, [highlightedKey]);

  const draftInput: CalculatorInput = {
    runeBulk: settings.runeBulk,
    runeLuck: settings.runeLuck,
    cooldownSpeed: settings.cooldownSpeed,
    bulkPotion: settings.bulkPotion,
    luckPotion: settings.luckPotion,
    speedPotion: settings.speedPotion,
  };

  const appliedInput = settings.appliedInput;
  const navCategories = categoriesForMode(settings.mode);
  const selectedCategory = navCategories.includes(settings.selectedCategory) ? settings.selectedCategory : firstCategoryForMode(settings.mode);
  const effectiveRps = calculateEffectiveRPS(appliedInput);

  const categoryRunes = useMemo(() => {
    if (selectedCategory === "All Runes") return [...configRunes];
    return configRunes.filter((rune) => rune.type === selectedCategory);
  }, [selectedCategory]);

  const selectedRunesForSidebar = selectedCategory === "All Runes" ? [] : categoryRunes;

  const visibleRunes = useMemo(() => {
    const searched = filterRunes(categoryRunes, settings.search);
    return sortRunes(
      searched,
      settings.sortKey,
      settings.sortDirection,
      (rune) => calculateRunePower(rune, appliedInput),
    );
  }, [categoryRunes, settings.search, settings.sortKey, settings.sortDirection, appliedInput]);

  const categoryTitle = selectedCategory === "All Runes" ? "All Runes" : getCategory(selectedCategory).label;

  const updateDraft = (input: CalculatorInput) => setSettings((current) => ({ ...current, ...input }));
  const updateTheme = (theme: Theme) => setSettings((current) => ({ ...current, theme }));
  const updateSearch = (search: string) => setSettings((current) => ({ ...current, search }));
  const updateSortKey = (sortKey: SortKey) => setSettings((current) => ({ ...current, sortKey }));
  const updateSortDirection = (sortDirection: SortDirection) => setSettings((current) => ({ ...current, sortDirection }));
  const updateCustomRune = (customRune: StoredSettings["customRune"]) => setSettings((current) => ({ ...current, customRune }));

  const updateMode = (mode: RuneMode) => {
    setSettings((current) => ({
      ...current,
      mode,
      selectedCategory: firstCategoryForMode(mode),
    }));
  };

  const updateSelectedCategory = (category: string) => {
    setSettings((current) => ({
      ...current,
      selectedCategory: category,
    }));
  };

  const applyUpdate = () => {
    setSettings((current) => ({
      ...current,
      appliedInput: {
        runeBulk: current.runeBulk,
        runeLuck: current.runeLuck,
        cooldownSpeed: current.cooldownSpeed,
        bulkPotion: current.bulkPotion,
        luckPotion: current.luckPotion,
        speedPotion: current.speedPotion,
      },
      lastUpdatedAt: new Date().toISOString(),
    }));
    setUpdated(true);
  };

  const scrollToRune = (rune: Rune) => {
    const key = `${rune.type}-${rune.name}`;
    setHighlightedKey(key);
    window.requestAnimationFrame(() => {
      document.getElementById(runeDomId(rune))?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const reset = () => {
    setSettings(defaultSettings());
    setUpdated(false);
    setHighlightedKey("");
  };

  return (
    <AppShell
      input={draftInput}
      theme={settings.theme}
      effectiveRps={effectiveRps}
      onInputChange={updateDraft}
      onUpdate={applyUpdate}
      updated={updated}
      onThemeChange={updateTheme}
      navCategories={navCategories}
      selectedCategory={selectedCategory}
      selectedRunes={selectedRunesForSidebar}
      onSelectCategory={updateSelectedCategory}
      onRuneClick={scrollToRune}
    >
      <section className="min-w-0 space-y-3">
        <Card className="p-3">
          <div className="grid gap-3 xl:grid-cols-[1fr_auto] xl:items-center">
            <RuneSearch search={settings.search} onSearch={updateSearch} />
            <div className="flex flex-wrap items-center gap-2">
              <RuneModeTabs mode={settings.mode} onModeChange={updateMode} />
              <button
                type="button"
                className={`inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300/40 ${
                  customOpen
                    ? "border-cyan-300/55 bg-cyan-300/18 text-cyan-50"
                    : "border-white/10 bg-white/[.055] text-slate-100 hover:bg-white/[.085]"
                }`}
                aria-pressed={customOpen}
                onClick={() => setCustomOpen((open) => !open)}
              >
                <Calculator size={15} />
                Custom Rune Calc
              </button>
              <button className="h-8 rounded-md px-2 text-sm text-slate-500 transition hover:bg-white/[.055] hover:text-slate-200" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </Card>

        {customOpen ? (
          <CustomRuneCalc customRune={settings.customRune} input={appliedInput} onChange={updateCustomRune} />
        ) : (
          <>
            <Card className="p-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-50">{categoryTitle}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {visibleRunes.length} runes shown
                    {settings.search ? ` in ${selectedCategory === "All Runes" ? "all runes" : categoryTitle}` : ""}
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <SortControls
                    sortKey={settings.sortKey}
                    sortDirection={settings.sortDirection}
                    onSortKey={updateSortKey}
                    onSortDirection={updateSortDirection}
                  />
                </div>
              </div>
            </Card>

            <RuneGrid runes={visibleRunes} input={appliedInput} highlightedKey={highlightedKey} />
          </>
        )}
      </section>
    </AppShell>
  );
}
