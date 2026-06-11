import { useState } from "react";
import { useStore } from "@nanostores/react";
import { DATA } from "../../lib/data";
import { tr, type Lang } from "../../lib/i18n";
import { langStore } from "../../stores/prefs";
import { Icon } from "./Icon";
import { Reveal, SectionIdx } from "./primitives";

type View = "minimal" | "featured" | "cards";

function readView(): View {
  if (typeof localStorage === "undefined") return "minimal";
  const v = localStorage.getItem("nc_blogview");
  return v === "featured" || v === "cards" ? v : "minimal";
}

function fmtDate(s: string, lang: Lang): string {
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="chips">
      {tags.map((t) => (<span key={t} className="chip" style={{ fontSize: 11.5, padding: "3px 9px" }}>{t}</span>))}
    </div>
  );
}

export function BlogPage() {
  const lang = useStore(langStore);
  const B = DATA.blog;
  const [view, setView] = useState<View>(readView);
  const [tag, setTag] = useState("all");
  const setV = (v: View) => {
    setView(v);
    if (typeof localStorage !== "undefined") localStorage.setItem("nc_blogview", v);
  };

  const allTags = ["all", ...Array.from(new Set(B.items.flatMap((p) => p.tags)))];
  const items = tag === "all" ? B.items : B.items.filter((p) => p.tags.includes(tag));
  const featured = B.items.find((p) => p.featured) || B.items[0];

  return (
    <div className="page page-enter">
      <div className="wrap" style={{ paddingTop: 48 }}>
        <SectionIdx num="//">blog</SectionIdx>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <h1 className="display" style={{ fontSize: "clamp(34px,4.6vw,56px)", marginBottom: 14 }}>{tr(B.title, lang)}</h1>
            <p style={{ color: "var(--ink-2)", fontSize: 16.5, lineHeight: 1.55, maxWidth: "54ch" }}>{tr(B.subtitle, lang)}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em" }}>layout</span>
            <div className="viewswitch">
              <button className={view === "minimal" ? "on" : ""} onClick={() => setV("minimal")}><Icon name="list" style={{ width: 14, height: 14 }} />Minimal</button>
              <button className={view === "featured" ? "on" : ""} onClick={() => setV("featured")}><Icon name="layers" style={{ width: 14, height: 14 }} />Featured</button>
              <button className={view === "cards" ? "on" : ""} onClick={() => setV("cards")}><Icon name="grid" style={{ width: 14, height: 14 }} />Cards</button>
            </div>
          </div>
        </div>

        {/* tag filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "14px 2px", margin: "22px 0 30px" }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginRight: 6 }}>$ grep --tag</span>
          {allTags.map((t) => (
            <button key={t} onClick={() => setTag(t)} className="chip"
              style={{ cursor: "pointer", borderColor: tag === t ? "var(--acc)" : "var(--line)", color: tag === t ? "var(--acc)" : "var(--ink-2)", background: tag === t ? "var(--acc-soft)" : "var(--surface)" }}>
              {t === "all" ? (lang === "pt" ? "todos" : "all") : t}
            </button>
          ))}
        </div>

        {/* MINIMAL */}
        {view === "minimal" && (
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {items.map((po) => (
              <Reveal key={po.id}>
                <a href="#" onClick={(e) => e.preventDefault()} className="post-row"
                  style={{ display: "grid", gridTemplateColumns: "130px 1fr auto", gap: 24, alignItems: "center", padding: "22px 6px", borderBottom: "1px solid var(--line-soft)" }}>
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{fmtDate(po.date, lang)}</span>
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{tr(po.title, lang)}</div>
                    <TagRow tags={po.tags} />
                  </div>
                  <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{po.read} {tr(B.readLabel, lang)}</span>
                    <span style={{ color: "var(--acc)" }}>→</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {/* FEATURED */}
        {view === "featured" && (
          <div>
            <Reveal className="card hov grid-bg" style={{ padding: "40px 38px", marginBottom: 24, overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--acc)", border: "1px solid var(--acc-line)", borderRadius: 6, padding: "3px 9px", background: "var(--acc-soft)" }}>★ {lang === "pt" ? "destaque" : "featured"}</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{fmtDate(featured.date, lang)} · {featured.read} {tr(B.readLabel, lang)}</span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(26px,3.4vw,40px)", marginBottom: 16, maxWidth: "20ch" }}>{tr(featured.title, lang)}</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.65, maxWidth: "62ch", marginBottom: 22 }}>{tr(featured.excerpt, lang)}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <TagRow tags={featured.tags} />
                <a className="btn ghost" href="#" onClick={(e) => e.preventDefault()}>{lang === "pt" ? "Ler artigo" : "Read article"} <span className="arr">→</span></a>
              </div>
            </Reveal>
            <div style={{ borderTop: "1px solid var(--line)" }}>
              {items.filter((p) => p.id !== featured.id).map((po) => (
                <Reveal key={po.id}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="post-row"
                    style={{ display: "grid", gridTemplateColumns: "130px 1fr auto", gap: 24, alignItems: "center", padding: "20px 6px", borderBottom: "1px solid var(--line-soft)" }}>
                    <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{fmtDate(po.date, lang)}</span>
                    <div><div style={{ fontSize: 18, fontWeight: 600, marginBottom: 7 }}>{tr(po.title, lang)}</div><TagRow tags={po.tags} /></div>
                    <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{po.read} {tr(B.readLabel, lang)} →</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* CARDS */}
        {view === "cards" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
            {items.map((po) => (
              <Reveal key={po.id}>
                <a href="#" onClick={(e) => e.preventDefault()} className="card hov"
                  style={{ padding: "24px 24px", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
                  <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
                    <span>{fmtDate(po.date, lang)}</span><span>{po.read} {tr(B.readLabel, lang)}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.25 }}>{tr(po.title, lang)}</div>
                  <div style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6 }}>{tr(po.excerpt, lang)}</div>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <TagRow tags={po.tags} /><span style={{ color: "var(--acc)" }}>→</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {items.length === 0 && <div className="mono" style={{ color: "var(--ink-3)", padding: "40px 0" }}>$ no posts match "{tag}"</div>}
      </div>
    </div>
  );
}
