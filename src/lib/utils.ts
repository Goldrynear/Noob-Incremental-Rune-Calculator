import { Atom, Box, Flame, Gem, type LucideIcon } from "lucide-react";
import { runeConfig } from "../config/runeConfig";
import { parseValue } from "./calculations";
import type { Rune, SortDirection, SortKey } from "./types";

const icons: Record<string, LucideIcon> = {
  atom: Atom,
  cube: Box,
  fire: Flame,
  gem: Gem,
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getCategory(type: string) {
  return runeConfig.categories[type as keyof typeof runeConfig.categories] ?? {
    label: type,
    color: "#64748b",
    icon: "cube",
  };
}

export function getCategoryIcon(icon: string) {
  return icons[icon] ?? Box;
}

export function filterRunes(runes: readonly Rune[], search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return [...runes];
  return runes.filter((rune) => {
    const fields = [rune.name, rune.type, rune.cls, rune.raw, String(parseValue(rune.raw))];
    return fields.some((field) => field.toLowerCase().includes(query));
  });
}

export function sortRunes(runes: Rune[], sortKey: SortKey, direction: SortDirection, powerForEta: (rune: Rune) => number) {
  const multiplier = direction === "asc" ? 1 : -1;
  return [...runes].sort((a, b) => {
    if (sortKey === "chance") return (parseValue(a.raw) - parseValue(b.raw)) * multiplier;
    if (sortKey === "type") return a.type.localeCompare(b.type) * multiplier;
    if (sortKey === "eta") {
      const aPower = powerForEta(a);
      const bPower = powerForEta(b);
      const aEta = aPower > 0 ? parseValue(a.raw) / aPower : Number.POSITIVE_INFINITY;
      const bEta = bPower > 0 ? parseValue(b.raw) / bPower : Number.POSITIVE_INFINITY;
      return (aEta - bEta) * multiplier;
    }
    return a.name.localeCompare(b.name) * multiplier;
  });
}

export function runeDomId(rune: Rune) {
  return `rune-${rune.type}-${rune.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
