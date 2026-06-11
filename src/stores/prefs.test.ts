import { describe, it, expect, beforeEach, vi } from "vitest";

// Each test imports a fresh copy of the module so we can exercise how the
// stores seed themselves from localStorage / the data-theme attribute.
async function freshPrefs() {
  vi.resetModules();
  return import("./prefs");
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("lang");
});

describe("prefs stores", () => {
  it("defaults to en + dark with nothing saved", async () => {
    const { langStore, themeStore } = await freshPrefs();
    expect(langStore.get()).toBe("en");
    expect(themeStore.get()).toBe("dark");
  });

  it("seeds lang from localStorage", async () => {
    localStorage.setItem("nc_lang", "pt");
    const { langStore } = await freshPrefs();
    expect(langStore.get()).toBe("pt");
  });

  it("seeds theme from the data-theme attribute set before hydration", async () => {
    document.documentElement.dataset.theme = "light";
    const { themeStore } = await freshPrefs();
    expect(themeStore.get()).toBe("light");
  });

  it("setLang persists and syncs the html lang attribute", async () => {
    const { setLang, langStore } = await freshPrefs();
    setLang("pt");
    expect(langStore.get()).toBe("pt");
    expect(localStorage.getItem("nc_lang")).toBe("pt");
    expect(document.documentElement.lang).toBe("pt");
  });

  it("setTheme persists and syncs the data-theme attribute", async () => {
    const { setTheme, themeStore } = await freshPrefs();
    setTheme("light");
    expect(themeStore.get()).toBe("light");
    expect(localStorage.getItem("nc_theme")).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
