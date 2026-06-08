# Noob Incremental Rune Calculator

A local-only Vite, React, TypeScript, and Tailwind CSS rune ETA calculator for Noob Incremental. It has no backend, no login, no database, and no unrelated game systems.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in your terminal. The app does not require hosting, login, a database, or paid APIs.

## Build

```bash
npm run build
```

## GitHub Pages

This app must be deployed from the built `dist` folder. The included GitHub Actions workflow builds the app and uploads `dist` to Pages.

In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**. If Pages serves the repository root instead, the browser will request `/src/main.tsx` directly and show a 404 because Vite source files are not valid static deployment output.

Before pushing, you can run:

```bash
npm run diagnose
```

To enable extra browser console diagnostics, open the app with `?debug` at the end of the URL.

## Edit Rune Config

All editable calculator data lives in:

`src/config/runeConfig.ts`

Use this file to edit:

- App title, subtitle, chips, and version
- Default inputs and potion states
- Number suffixes
- Category order and special rune order
- Category colors/icons
- Rune data

## Add A Rune

Edit `runeConfig.runes` in `src/config/runeConfig.ts` and add another object:

```ts
{
  name: "Example",
  type: "Basic Rune",
  cls: "Basic",
  raw: "10Oc",
  level: 25,
  color: "#22d3ee",
  premium: true
}
```

To add a category, edit `categoryOrder`, `specialOrder`, and `categories` in the same config file. Components do not hardcode rune names.

## Edit Suffixes

Edit `runeConfig.suffixes`. The parser is case-insensitive, so values like `1.36UDe`, `450T`, and `400TDe` are valid.

## ETA Calculation

Rune Bulk is parsed from the input. If the Rune Bulk potion is on, bulk is multiplied by `2`.

Cooldown Speed is parsed as seconds. If the Rune Speed potion is on, cooldown is divided by `2`.

Effective RPS is:

```txt
finalBulk / finalCooldown
```

Normal `Basic` class runes use:

```txt
effectiveRPS * finalLuck
```

ETA is:

```txt
runeChance / runePower
```

## Noobinial Luck Rule

`Noobinial` runes ignore Rune Luck because the source calculator treats them as their own class of rune chance. Their ETA uses rune generation power without the luck multiplier.

## Special Runes

Special rune groups are controlled by `specialOrder`. Add a special category such as `Cosmic Prism` there, define it in `categories`, then add runes with that `type` in `runeConfig.runes`.

Cosmic Prism/special runes use base cooldown rather than speed-potion cooldown and do not use doubled luck.
