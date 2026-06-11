/* ============================================================
   Shared language + theme state across Astro React islands.

   Plain nanostores atoms (singletons in the browser bundle) seeded
   from what the no-FOUC inline script in Layout.astro already resolved.
   Subscriptions persist changes and keep the <html> attributes in sync.
   ============================================================ */
import { atom } from "nanostores";
import type { Lang } from "../lib/i18n";

export type Theme = "dark" | "light";

const isBrowser = typeof document !== "undefined";

function initialLang(): Lang {
  if (!isBrowser) return "en";
  return localStorage.getItem("nc_lang") === "pt" ? "pt" : "en";
}

function initialTheme(): Theme {
  if (!isBrowser) return "dark";
  // the inline script in Layout.astro resolves + applies this before paint
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  const saved = localStorage.getItem("nc_theme");
  if (saved === "light" || saved === "dark") return saved;
  const mq = window.matchMedia?.("(prefers-color-scheme: light)");
  return mq?.matches ? "light" : "dark";
}

export const langStore = atom<Lang>(initialLang());
export const themeStore = atom<Theme>(initialTheme());

export function setLang(lang: Lang): void {
  langStore.set(lang);
}

export function setTheme(theme: Theme): void {
  themeStore.set(theme);
}

export function toggleTheme(): void {
  setTheme(themeStore.get() === "dark" ? "light" : "dark");
}

if (isBrowser) {
  langStore.subscribe((lang) => {
    localStorage.setItem("nc_lang", lang);
    document.documentElement.lang = lang;
  });
  themeStore.subscribe((theme) => {
    localStorage.setItem("nc_theme", theme);
    document.documentElement.dataset.theme = theme;
  });
}
