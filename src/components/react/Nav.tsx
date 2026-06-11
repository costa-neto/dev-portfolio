import { useState } from "react";
import { useStore } from "@nanostores/react";
import { DATA } from "../../lib/data";
import { tr } from "../../lib/i18n";
import { langStore, themeStore, setLang, toggleTheme } from "../../stores/prefs";
import { Icon } from "./Icon";

const ITEMS: Array<[keyof typeof DATA.nav, string]> = [
  ["home", "/"],
  ["projects", "/projetos"],
  ["blog", "/blog"],
  ["resume", "/resume"],
];

/** Normalize a pathname so "/blog" and "/blog/" compare equal. */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function Nav({ pathname = "/" }: { pathname?: string }) {
  const lang = useStore(langStore);
  const theme = useStore(themeStore);
  const [open, setOpen] = useState(false);
  const current = normalize(pathname);

  return (
    <nav className="nav">
      <div className="wrap">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="mark">NC</span>
          <span>
            neto<span className="dim">.costa</span>
          </span>
        </a>
        <div className="nav-links">
          {ITEMS.map(([key, path]) => (
            <a key={key} href={path} className={current === normalize(path) ? "on" : ""}>
              {tr(DATA.nav[key], lang)}
            </a>
          ))}
        </div>
        <div className="nav-tools">
          <div className="langpill">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={lang === "pt" ? "on" : ""} onClick={() => setLang("pt")}>
              PT
            </button>
          </div>
          <button className="iconbtn" title="Toggle theme" aria-label="Toggle theme" onClick={toggleTheme}>
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button
            className="iconbtn nav-burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <div
          style={{
            position: "absolute", top: "var(--nav-h)", left: 0, right: 0,
            background: "var(--bg)", borderBottom: "1px solid var(--line)",
            padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4,
          }}
        >
          {ITEMS.map(([key, path]) => (
            <a
              key={key}
              href={path}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--mono)", fontSize: 15, padding: "10px 6px",
                color: current === normalize(path) ? "var(--acc)" : "var(--ink-2)",
              }}
            >
              {tr(DATA.nav[key], lang)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
