import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

describe("deployment target is Cloudflare (Vercel removed)", () => {
  it("has no Vercel adapter in package.json", () => {
    const pkg = JSON.parse(read("package.json"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(deps["@astrojs/vercel"]).toBeUndefined();
  });

  it("the Astro config no longer wires the Vercel adapter", () => {
    const cfg = read("astro.config.mjs");
    expect(cfg).not.toMatch(/vercel/i);
    // static site → no SSR adapter at all
    expect(cfg).not.toMatch(/adapter\s*:/);
  });

  it("ships a Cloudflare Workers static-assets config pointing at dist/", () => {
    expect(existsSync(resolve(process.cwd(), "wrangler.toml"))).toBe(true);
    const wrangler = read("wrangler.toml");
    // Workers Static Assets (what `wrangler deploy` expects), not Pages
    expect(wrangler).toMatch(/directory\s*=\s*"\.\/dist"/);
    expect(wrangler).toMatch(/compatibility_date\s*=/);
    expect(wrangler).not.toMatch(/pages_build_output_dir/);
  });

  it("exposes a deploy script that uses wrangler", () => {
    const pkg = JSON.parse(read("package.json"));
    expect(pkg.scripts.deploy).toMatch(/wrangler/);
  });
});
