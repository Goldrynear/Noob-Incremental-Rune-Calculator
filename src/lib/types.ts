export type RuneClass = "Basic" | "Noobinial";

export type Rune = {
  name: string;
  type: string;
  cls: RuneClass;
  raw: string;
  level: number;
  color: string;
  premium: boolean;
  prog?: string;
};

export type CalculatorInput = {
  runeBulk: string;
  runeLuck: string;
  cooldownSpeed: string;
  bulkPotion: boolean;
  luckPotion: boolean;
  speedPotion: boolean;
};

export type Theme = "dark" | "light";
export type RuneMode = "category" | "special" | "all";
export type SortKey = "eta" | "name" | "chance" | "type";
export type SortDirection = "asc" | "desc";

export type CustomRuneInput = {
  name: string;
  raw: string;
  type: string;
  cls: RuneClass;
  ignoreLuckSpeedPotions: boolean;
};

export type StoredSettings = CalculatorInput & {
  theme: Theme;
  mode: RuneMode;
  search: string;
  selectedCategory: string;
  appliedInput: CalculatorInput;
  lastUpdatedAt: string;
  sortKey: SortKey;
  sortDirection: SortDirection;
  customRune: CustomRuneInput;
};
