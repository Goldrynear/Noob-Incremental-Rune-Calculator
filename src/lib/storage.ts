import { runeConfig } from "../config/runeConfig";
import { debug } from "./debug";
import type { CustomRuneInput, RuneMode, SortDirection, SortKey, StoredSettings, Theme } from "./types";

const key = "noobIncrementalRuneCalculator.settings";

const defaultCustomRune: CustomRuneInput = {
  name: "",
  raw: "",
  type: "",
  cls: "Basic",
  ignoreLuckSpeedPotions: false,
};

export function defaultSettings(): StoredSettings {
  const input = {
    runeBulk: runeConfig.defaults.runeBulk,
    runeLuck: runeConfig.defaults.runeLuck,
    cooldownSpeed: runeConfig.defaults.cooldownSpeed,
    bulkPotion: runeConfig.defaults.bulkPotion,
    luckPotion: runeConfig.defaults.luckPotion,
    speedPotion: runeConfig.defaults.speedPotion,
  };

  return {
    ...input,
    view: "runes",
    theme: runeConfig.defaults.theme as Theme,
    mode: runeConfig.defaults.mode as RuneMode,
    selectedCategory: runeConfig.categoryOrder[0] ?? "All Runes",
    search: "",
    appliedInput: input,
    lastUpdatedAt: "",
    sortKey: "eta",
    sortDirection: "asc",
    customRune: defaultCustomRune,
  };
}

export function loadSettings(): StoredSettings {
  try {
    const raw = localStorage.getItem(key);
    const defaults = defaultSettings();
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...defaults,
      ...parsed,
      appliedInput: {
        ...defaults.appliedInput,
        ...(parsed.appliedInput ?? {}),
      },
      customRune: {
        ...defaults.customRune,
        ...(parsed.customRune ?? {}),
      },
    };
  } catch (error) {
    debug.warn("Could not load saved settings; using defaults.", error);
    return defaultSettings();
  }
}

export function saveSettings(settings: StoredSettings) {
  try {
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    debug.warn("Could not save settings; continuing without persistence.", error);
  }
}

export function isRuneMode(value: string): value is RuneMode {
  return ["category", "special", "all"].includes(value);
}

export function isSortKey(value: string): value is SortKey {
  return ["eta", "name", "chance", "type"].includes(value);
}

export function isSortDirection(value: string): value is SortDirection {
  return value === "asc" || value === "desc";
}
