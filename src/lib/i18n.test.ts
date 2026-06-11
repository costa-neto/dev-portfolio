import { describe, it, expect } from "vitest";
import { tr } from "./i18n";

describe("tr (translate helper)", () => {
  it("returns the value for the active language", () => {
    expect(tr({ en: "Home", pt: "Início" }, "en")).toBe("Home");
    expect(tr({ en: "Home", pt: "Início" }, "pt")).toBe("Início");
  });

  it("passes plain strings through unchanged", () => {
    expect(tr("Neto Costa", "en")).toBe("Neto Costa");
    expect(tr("Neto Costa", "pt")).toBe("Neto Costa");
  });

  it("returns an empty string for null/undefined", () => {
    expect(tr(null, "en")).toBe("");
    expect(tr(undefined, "pt")).toBe("");
  });

  it("falls back to English when the language key is missing", () => {
    // @ts-expect-error — intentionally partial to exercise the fallback
    expect(tr({ en: "only-en" }, "pt")).toBe("only-en");
  });

  it("works for localized arrays (e.g. studying list)", () => {
    const studying = { en: ["Blockchain", "FP"], pt: ["Blockchain", "PF"] };
    expect(tr(studying, "pt")).toEqual(["Blockchain", "PF"]);
  });
});
