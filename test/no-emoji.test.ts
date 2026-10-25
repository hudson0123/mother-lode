// @vitest-environment node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SCAN = [
  "app",
  "test",
  "docs",
  "README.md",
  "package.json",
  "vitest.config.mts",
  "next.config.ts",
  "eslint.config.mjs",
  "tsconfig.json",
];
const SKIP_DIRS = new Set(["node_modules", ".next", ".superpowers"]);
const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".md", ".json", ".mjs", ".mts"]);

function collect(path: string): string[] {
  if (!statSync(path).isDirectory()) {
    return EXTENSIONS.has(extname(path)) ? [path] : [];
  }
  return readdirSync(path)
    .filter((name) => !SKIP_DIRS.has(name))
    .flatMap((name) => collect(join(path, name)));
}

const files = SCAN.flatMap((entry) => collect(join(ROOT, entry)));

it("scans the project's text files", () => {
  expect(files.length).toBeGreaterThan(0);
});

it("contains no emoji in project text files", () => {
  const offenders = files.filter((f) =>
    /\p{Extended_Pictographic}/u.test(readFileSync(f, "utf8")),
  );
  expect(offenders).toEqual([]);
});
