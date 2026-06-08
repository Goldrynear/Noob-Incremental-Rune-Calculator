import { readFileSync } from "node:fs";
import { join } from "node:path";

const indexPath = join(process.cwd(), "dist", "index.html");
const html = readFileSync(indexPath, "utf8");

const checks = [
  {
    label: "dist/index.html does not reference /src/main.tsx",
    ok: !html.includes("/src/main.tsx") && !html.includes("src/main.tsx"),
  },
  {
    label: "dist/index.html references built assets",
    ok: html.includes("/assets/") || html.includes("assets/"),
  },
  {
    label: "dist/index.html uses the GitHub Pages project base",
    ok: html.includes("/Noob-Incremental-Rune-Calculator/"),
  },
];

let failed = false;

for (const check of checks) {
  const status = check.ok ? "PASS" : "FAIL";
  console.log(`${status} ${check.label}`);
  failed ||= !check.ok;
}

if (failed) {
  process.exitCode = 1;
}
