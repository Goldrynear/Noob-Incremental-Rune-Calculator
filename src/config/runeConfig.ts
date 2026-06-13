import type { Rune } from "../lib/types";

type RuneEntry = Omit<Rune, "type">;
type RuneGroup = {
  category: string;
  runes: readonly RuneEntry[];
};

const runeGroups = {
  basic: {
    category: "Basic Rune",
    runes: [
      { name: "Rookie", cls: "Basic", raw: "1.25", level: 500, color: "#64748b", premium: false },
      { name: "Learner", cls: "Basic", raw: "6.67", level: 400, color: "#16a34a", premium: false },
      { name: "Trained", cls: "Basic", raw: "33.29", level: 300, color: "#0891b2", premium: false },
      { name: "Skilled", cls: "Basic", raw: "200", level: 200, color: "#9333ea", premium: false },
      { name: "Expert", cls: "Basic", raw: "50k", level: 150, color: "#ca8a04", premium: false },
      { name: "Master", cls: "Basic", raw: "1M", level: 115, color: "#dc2626", premium: false },
      { name: "Grandmaster", cls: "Basic", raw: "40M", level: 95, color: "#ea580c", premium: true },
      { name: "Celestial", cls: "Basic", raw: "625B", level: 75, color: "#c026d3", premium: true },
      { name: "Immortal", cls: "Basic", raw: "769Sp", level: 50, color: "#0d9488", premium: true },
      { name: "Shadow", cls: "Noobinial", raw: "10Sx", level: 5, color: "#6d28d9", premium: true },
      { name: "Phantom", cls: "Noobinial", raw: "10Oc", level: 20, color: "#a21caf", premium: true },
      { name: "Atomic", cls: "Noobinial", raw: "2QnDe", level: 9999, color: "#00ffe1", premium: true },
      { name: "Chronos Core", cls: "Noobinial", raw: "30.8QnDe", level: 9999, color: "#95ff00", premium: true },
    ],
  },

  super: {
    category: "Super Runes",
    runes: [
      { name: "Initiate", cls: "Basic", raw: "1.11", level: 1500, color: "#16a34a", premium: false },
      { name: "Adept", cls: "Basic", raw: "13.3", level: 1500, color: "#ca8a04", premium: false },
      { name: "Veteran", cls: "Basic", raw: "50", level: 1500, color: "#7c3aed", premium: false },
      { name: "Elite", cls: "Basic", raw: "5k", level: 250, color: "#c2410c", premium: false },
      { name: "Champion", cls: "Basic", raw: "200k", level: 175, color: "#65a30d", premium: false },
      { name: "Ascended", cls: "Basic", raw: "2M", level: 125, color: "#0d9488", premium: false },
      { name: "Transcendent", cls: "Basic", raw: "50M", level: 100, color: "#be123c", premium: false },
      { name: "Universal", cls: "Basic", raw: "20Qn", level: 75, color: "#9333ea", premium: false },
      { name: "Omnipotent", cls: "Basic", raw: "17.5Oc", level: 50, color: "#65a30d", premium: true },
      { name: "Eclipse", cls: "Noobinial", raw: "15Sp", level: 10, color: "#c026d3", premium: true },
      { name: "Void", cls: "Noobinial", raw: "10No", level: 25, color: "#2563eb", premium: true },
      { name: "Primordial", cls: "Noobinial", raw: "25UDe", level: 25, color: "#15803d", premium: true },
      { name: "Oblivion Sigil", cls: "Noobinial", raw: "2.35SxDe", level: 25, color: "#801515", premium: true },
    ],
  },

  advanced: {
    category: "Advanced Runes",
    runes: [
      { name: "Little", cls: "Basic", raw: "1.01", level: 600, color: "#9333ea", premium: false },
      { name: "Lesser", cls: "Basic", raw: "100k", level: 500, color: "#2563eb", premium: false },
      { name: "Standard", cls: "Basic", raw: "1M", level: 400, color: "#475569", premium: false },
      { name: "Greater", cls: "Basic", raw: "50M", level: 300, color: "#e11d48", premium: false },
      { name: "Superior", cls: "Basic", raw: "200M", level: 200, color: "#16a34a", premium: false },
      { name: "Prime", cls: "Basic", raw: "100B", level: 150, color: "#4f46e5", premium: false },
      { name: "Apex", cls: "Basic", raw: "1T", level: 125, color: "#991b1b", premium: false },
      { name: "Ethereal", cls: "Basic", raw: "50T", level: 100, color: "#0891b2", premium: false },
      { name: "Divine", cls: "Basic", raw: "200Qd", level: 75, color: "#64748b", premium: false },
      { name: "Infinite", cls: "Basic", raw: "17.5Oc", level: 50, color: "#ea580c", premium: true },
      { name: "Abyss", cls: "Noobinial", raw: "100Sp", level: 15, color: "#b91c1c", premium: true },
      { name: "Enigma", cls: "Noobinial", raw: "10De", level: 30, color: "#65a30d", premium: true },
      { name: "Seraphim's Tear", cls: "Noobinial", raw: "400TDe", level: 6, color: "#6366f1", premium: true },
      { name: "Aetherion", cls: "Noobinial", raw: "121SxDe", level: 6, color: "#7507f3", premium: true },

    ],
  },

  cosmic: {
    category: "Cosmic Prism",
    runes: [
      { name: "Lucent", cls: "Basic", raw: "2.5", level: 85, color: "#3b82f6", premium: false },
      { name: "Chroma", cls: "Basic", raw: "4", level: 157, color: "#dc2626", premium: false },
      { name: "Fractal", cls: "Basic", raw: "20", level: 213, color: "#ca8a04", premium: false },
      { name: "Refraction", cls: "Basic", raw: "100", level: 253, color: "#991b1b", premium: false },
      { name: "Tessellation", cls: "Basic", raw: "200", level: 399, color: "#a16207", premium: false },
      { name: "Hyperlight", cls: "Basic", raw: "333", level: 678, color: "#16a34a", premium: false },
      { name: "PrismGod", cls: "Basic", raw: "1k", level: 926, color: "#2563eb", premium: true },
      { name: "Voidglass", cls: "Basic", raw: "1M", level: 75, color: "#a21caf", premium: true },
      { name: "Godshard", cls: "Noobinial", raw: "100M", level: 25, color: "#d97706", premium: true },
      { name: "Ultimate Shard", cls: "Noobinial", raw: "667B", level: 25, color: "#4206d9", premium: true },
    ],
  },

  hacker: {
    category: "Hacker Runes",
    runes: [
      { name: "Script", cls: "Basic", raw: "1.01", level: 0, color: "#22c55e", premium: false },
      { name: "Protocol", cls: "Basic", raw: "4.29", level: 0, color: "#16a34a", premium: false },
      { name: "Cipher", cls: "Basic", raw: "3.43M", level: 0, color: "#06b6d4", premium: false },
      { name: "Exploit", cls: "Basic", raw: "543B", level: 0, color: "#3b82f6", premium: false },
      { name: "Kernel", cls: "Basic", raw: "543T", level: 0, color: "#8b5cf6", premium: false },
      { name: "Root", cls: "Basic", raw: "53Qd", level: 0, color: "#ec4899", premium: false },
      { name: "Backdoor", cls: "Basic", raw: "43Qn", level: 0, color: "#f97316", premium: false },
      { name: "Rootkit", cls: "Noobinial", raw: "10Oc", level: 0, color: "#ef4444", premium: true },
      { name: "Masterkey", cls: "Noobinial", raw: "200Oc", level: 0, color: "#10b981", premium: true },
      { name: "Stuxnet", cls: "Noobinial", raw: "105No", level: 0, color: "#a010b9", premium: true },
    ],
  },
} satisfies Record<string, RuneGroup>;

function buildRunes(groups: Record<string, RuneGroup>): Rune[] {
  return Object.values(groups).flatMap((group) =>
    group.runes.map((rune) => ({
      ...rune,
      type: group.category,
    })),
  );
}

export const runeConfig = {
  app: {
    title: "NOOB INCREMENTAL",
    subtitle: "Rune Calculator",
    chips: ["Runes", "Luck", "Idle"],
    version: "1.0.0",
  },

  tips: [
    "Add Walmart parking lot",
    "Add cheeseburgers",
    "Use Update after changing stats",
  ],

  background: {
    balls: {
      count: 12,
      colors: {
        dark: "255, 255, 255",
        light: "0, 0, 0",
      },
      minSize: 1.2,
      maxSize: 1.8,
      minSpeed: 0.045,
      maxSpeed: 0.075,
      minOpacity: 0.4,
      maxOpacity: 0.6,
      minBounces: 3,
      maxBounces: 6,
      entryAngleVariance: 0.7,
      glow: {
        enabled: false,
        sizeMultiplier: 2.4,
        opacityMultiplier: 0.32,
      },
    },
    stars: {
      count: 150,
      colors: {
        dark: "255, 255, 255",
        light: "0, 0, 0",
      },
      minSize: 0.6,
      maxSize: 1.9,
      minOpacity: 0.32,
      maxOpacity: 0.55,
      minLifetimeSeconds: 15,
      maxLifetimeSeconds: 60,
      fadePortion: 0.22,
    },
  },

  defaults: {
    runeBulk: "100b",
    runeLuck: "25.5k",
    cooldownSpeed: "0.05",
    bulkPotion: false,
    luckPotion: false,
    speedPotion: false,
    theme: "dark",
    mode: "category",
  },

  suffixes: [
    { val: 1e3, sym: "k" },
    { val: 1e6, sym: "m" },
    { val: 1e9, sym: "b" },
    { val: 1e12, sym: "t" },
    { val: 1e15, sym: "qd" },
    { val: 1e18, sym: "qn" },
    { val: 1e21, sym: "sx" },
    { val: 1e24, sym: "sp" },
    { val: 1e27, sym: "oc" },
    { val: 1e30, sym: "no" },
    { val: 1e33, sym: "de" },
    { val: 1e36, sym: "ude" },
    { val: 1e39, sym: "dde" },
    { val: 1e42, sym: "tde" },
    { val: 1e45, sym: "qdde" },
    { val: 1e48, sym: "qnde" },
    { val: 1e51, sym: "sxde" },
    { val: 1e54, sym: "spde" },
    { val: 1e57, sym: "ocde" },
    { val: 1e60, sym: "node" },
    { val: 1e63, sym: "vgde" },
  ],

  categoryOrder: [
    "Basic Rune",
    "Super Runes",
    "Advanced Runes",
    "Hacker Runes"
  ],

  specialOrder: [
    "Cosmic Prism",
  ],

  categories: {
    "Basic Rune": {
      label: "Basic Rune",
      color: "#0ea5b7",
      icon: "cube",
    },
    "Super Runes": {
      label: "Super Runes",
      color: "#fb923c",
      icon: "fire",
    },
    "Advanced Runes": {
      label: "Advanced Runes",
      color: "#a855f7",
      icon: "atom",
    },
    "Cosmic Prism": {
      label: "Cosmic Prism",
      color: "#22d3ee",
      icon: "gem",
    },
    "Hacker Runes": {
      label: "Hacker Runes",
      color: "#22c55e",
      icon: "terminal",
    },
  },

  runeGroups,
  runes: buildRunes(runeGroups),
} as const;
