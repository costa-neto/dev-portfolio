import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(
  resolve(process.cwd(), "src/assets/styles/global.css"),
  "utf8",
);

describe("global.css design system", () => {
  it("keeps Tailwind available", () => {
    expect(css).toContain('@import "tailwindcss"');
  });

  it("uses the Geist type system", () => {
    expect(css).toMatch(/--sans:\s*'Geist'/);
    expect(css).toMatch(/--mono:\s*'Geist Mono'/);
  });

  it("themes via the data-theme attribute", () => {
    expect(css).toContain('html[data-theme="dark"]');
    expect(css).toContain('html[data-theme="light"]');
  });

  it("bakes the bone accent on the dark theme (final design choice)", () => {
    const dark = css.slice(
      css.indexOf('html[data-theme="dark"]'),
      css.indexOf('html[data-theme="light"]'),
    );
    // bone = low-chroma off-white
    expect(dark).toMatch(/--acc:\s*oklch\(0\.92 0\.014 95\)/);
    expect(dark).toMatch(/--on-acc:\s*oklch\(0\.20 0\.018 95\)/);
  });

  it("bakes the cyan accent hue on the light theme (final design choice)", () => {
    const light = css.slice(css.indexOf('html[data-theme="light"]'));
    expect(light).toMatch(/--acc-h:\s*200/);
    expect(light).toMatch(/--acc2-h:\s*258/);
  });

  it("defines the core design-system primitives", () => {
    for (const cls of [".nav", ".card", ".btn", ".chip", ".term", ".diagram", ".viewswitch"]) {
      expect(css).toContain(cls);
    }
  });
});
