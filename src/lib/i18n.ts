/* ============================================================
   Bilingual helpers (pt / en)
   ============================================================ */
export type Lang = "en" | "pt";

/** A value that exists in both supported languages. */
export type Localized<T = string> = { en: T; pt: T };

export function tr<T>(obj: Localized<T>, lang: Lang): T;
export function tr(obj: string, lang: Lang): string;
export function tr(obj: null | undefined, lang: Lang): "";
export function tr(obj: unknown, lang: Lang): unknown {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  const loc = obj as Partial<Localized<unknown>>;
  return loc[lang] ?? loc.en ?? "";
}
