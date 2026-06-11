import { useStore } from "@nanostores/react";
import { DATA } from "../../lib/data";
import { tr } from "../../lib/i18n";
import { langStore } from "../../stores/prefs";

const ITEMS: Array<[keyof typeof DATA.nav, string]> = [
  ["home", "/"],
  ["projects", "/projetos"],
  ["blog", "/blog"],
  ["resume", "/resume"],
];

export function Footer() {
  const lang = useStore(langStore);
  const p = DATA.profile;
  const F = DATA.footer;

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="/" style={{ marginBottom: 16, display: "inline-flex" }}>
              <span className="mark">NC</span>
              <span>
                neto<span className="dim">.costa</span>
              </span>
            </a>
            <p>{tr(F.about, lang)}</p>
          </div>
          <div>
            <h4>{tr(F.linksTitle, lang)}</h4>
            {ITEMS.map(([key, path]) => (
              <a key={key} className="fl" href={path}>
                {tr(DATA.nav[key], lang)}
              </a>
            ))}
          </div>
          <div>
            <h4>{tr(F.connectTitle, lang)}</h4>
            <a className="fl" href={p.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="fl" href={p.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="fl" href={`mailto:${p.email}`}>
              Email ↗
            </a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            © {p.name} {new Date().getFullYear()}. {tr(F.rights, lang)}
          </span>
          <span className="built">
            <span className="live" /> {tr(F.built, lang)}
          </span>
        </div>
      </div>
    </footer>
  );
}
