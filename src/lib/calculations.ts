import { runeConfig } from "../config/runeConfig";
import type { CalculatorInput, Rune } from "./types";

const sortedSuffixes = [...runeConfig.suffixes].sort((a, b) => b.sym.length - a.sym.length);
const displaySuffixes = [...runeConfig.suffixes].sort((a, b) => b.val - a.val);

export function parseValue(value: string): number {
  const cleaned = value.trim().replace(/,/g, "");
  if (!cleaned) return 0;
  const match = cleaned.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-zA-Z]*)$/);
  if (!match) return Number(cleaned) || 0;
  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) return 0;
  const suffix = match[2].toLowerCase();
  if (!suffix) return amount;
  const found = sortedSuffixes.find((entry) => entry.sym.toLowerCase() === suffix);
  return found ? amount * found.val : amount;
}

export function formatValue(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const sign = value < 0 ? "-" : "";
  const absolute = Math.abs(value);
  const suffix = displaySuffixes.find((entry) => absolute >= entry.val);
  if (!suffix) {
    return `${sign}${absolute >= 100 ? absolute.toFixed(0) : absolute >= 10 ? absolute.toFixed(1) : absolute.toFixed(2)}`;
  }
  const scaled = absolute / suffix.val;
  const text = scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2);
  return `${sign}${text}${suffix.sym}`;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "--";
  if (seconds < 1) return "<1s";
  const units = [
    { label: "y", size: 31536000 },
    { label: "d", size: 86400 },
    { label: "h", size: 3600 },
    { label: "m", size: 60 },
    { label: "s", size: 1 },
  ];
  let remaining = Math.floor(seconds);
  const parts: string[] = [];
  for (const unit of units) {
    const amount = Math.floor(remaining / unit.size);
    if (amount > 0) {
      parts.push(`${amount}${unit.label}`);
      remaining -= amount * unit.size;
    }
    if (parts.length === 2) break;
  }
  return parts.join(" ") || "0s";
}

export function calculateEffectiveRPS(input: CalculatorInput): number {
  const bulk = parseValue(input.runeBulk) * (input.bulkPotion ? 2 : 1);
  const cooldown = parseValue(input.cooldownSpeed) / (input.speedPotion ? 2 : 1);
  if (!Number.isFinite(bulk) || !Number.isFinite(cooldown) || cooldown <= 0) return 0;
  return bulk / cooldown;
}

export function calculateRunePower(rune: Rune, input: CalculatorInput): number {
  const isSpecial = (runeConfig.specialOrder as readonly string[]).includes(rune.type);
  const bulk = parseValue(input.runeBulk) * (input.bulkPotion ? 2 : 1);
  const cooldown = isSpecial ? parseValue(input.cooldownSpeed) : parseValue(input.cooldownSpeed) / (input.speedPotion ? 2 : 1);
  if (!Number.isFinite(bulk) || !Number.isFinite(cooldown) || cooldown <= 0) return 0;

  const rps = bulk / cooldown;
  if (rune.cls === "Noobinial") return rps;

  const luck = parseValue(input.runeLuck) * (isSpecial ? 1 : input.luckPotion ? 2 : 1);
  if (!Number.isFinite(luck) || luck <= 0) return 0;
  return rps * luck;
}

export function calculateRuneETA(rune: Rune, input: CalculatorInput): string {
  const chance = parseValue(rune.raw);
  const power = calculateRunePower(rune, input);
  if (!Number.isFinite(chance) || chance <= 0 || !Number.isFinite(power) || power <= 0) return "--";
  return formatTime(chance / power);
}
