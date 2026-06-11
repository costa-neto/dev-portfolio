import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function installedVersion(pkg: string): string {
  const p = resolve(process.cwd(), "node_modules", pkg, "package.json");
  return JSON.parse(readFileSync(p, "utf8")).version as string;
}
const major = (v: string) => Number(v.split(".")[0]);
const minor = (v: string) => Number(v.split(".")[1]);

describe("dependencies are on their target latest versions", () => {
  it("Tailwind (core + vite plugin) is >= 4.3", () => {
    for (const pkg of ["tailwindcss", "@tailwindcss/vite"]) {
      const v = installedVersion(pkg);
      expect(major(v), `${pkg} ${v}`).toBe(4);
      expect(minor(v), `${pkg} ${v}`).toBeGreaterThanOrEqual(3);
    }
  });

  it("Astro core is on v6+", () => {
    expect(major(installedVersion("astro"))).toBeGreaterThanOrEqual(6);
  });
});
