import { useState } from "react";
import { useStore } from "@nanostores/react";
import { DATA, type Project } from "../../lib/data";
import { tr, type Lang } from "../../lib/i18n";
import { langStore } from "../../stores/prefs";
import { Icon } from "./Icon";
import { MiniDiagram, Reveal, SectionIdx, StatusBadge } from "./primitives";

type View = "grid" | "list" | "featured";

function readView(): View {
  if (typeof localStorage === "undefined") return "grid";
  const v = localStorage.getItem("nc_projview");
  return v === "list" || v === "featured" ? v : "grid";
}

function ProjectCard({ pr, lang }: { pr: Project; lang: Lang }) {
  return (
    <a className="card hov" href="#" onClick={(e) => e.preventDefault()}
      style={{ padding: "24px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StatusBadge kind={pr.status} label={tr(DATA.projects.statusLabels[pr.status], lang)} />
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{pr.year}</span>
      </div>
      <div className="ph" style={{ height: 120 }}><span className="ph-lbl">{pr.id}.svg — diagram / shot</span></div>
      <div>
        <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 6 }}>{pr.name}</div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>{tr(pr.blurb, lang)}</div>
      </div>
      <div className="chips" style={{ marginTop: "auto" }}>
        {pr.stack.map((s) => (<span key={s} className="chip">{s}</span>))}
      </div>
    </a>
  );
}

function ProjectListRow({ pr, lang }: { pr: Project; lang: Lang }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className="card hov"
      style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center", padding: "22px 26px", marginBottom: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 130 }}>
        <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{pr.year}</span>
        <StatusBadge kind={pr.status} label={tr(DATA.projects.statusLabels[pr.status], lang)} />
        <div className="display" style={{ fontSize: 30, color: "var(--acc)" }}>{pr.metric.v}</div>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{tr(pr.metric.l, lang)}</span>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 600 }}>{pr.name}</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{tr(pr.tag, lang)}</span>
        </div>
        <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "60ch", marginBottom: 14 }}>{tr(pr.blurb, lang)}</div>
        <MiniDiagram nodes={pr.nodes} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14, alignSelf: "stretch" }}>
        <span style={{ color: "var(--acc)", fontSize: 20 }}>↗</span>
        <div className="chips" style={{ justifyContent: "flex-end", maxWidth: 160 }}>
          {pr.stack.map((s) => (<span key={s} className="chip">{s}</span>))}
        </div>
      </div>
    </a>
  );
}

export function ProjectsPage() {
  const lang = useStore(langStore);
  const P = DATA.projects;
  const [view, setView] = useState<View>(readView);
  const setV = (v: View) => {
    setView(v);
    if (typeof localStorage !== "undefined") localStorage.setItem("nc_projview", v);
  };
  const items = P.items;

  return (
    <div className="page page-enter">
      <div className="wrap" style={{ paddingTop: 48 }}>
        {/* header */}
        <SectionIdx num="//">{lang === "pt" ? "projetos" : "projects"}</SectionIdx>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <h1 className="display" style={{ fontSize: "clamp(34px,4.6vw,56px)", marginBottom: 14 }}>{tr(P.title, lang)}</h1>
            <p style={{ color: "var(--ink-2)", fontSize: 16.5, lineHeight: 1.55, maxWidth: "54ch" }}>{tr(P.subtitle, lang)}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em" }}>layout</span>
            <div className="viewswitch">
              <button className={view === "grid" ? "on" : ""} onClick={() => setV("grid")}><Icon name="grid" style={{ width: 14, height: 14 }} />Grid</button>
              <button className={view === "list" ? "on" : ""} onClick={() => setV("list")}><Icon name="list" style={{ width: 14, height: 14 }} />List</button>
              <button className={view === "featured" ? "on" : ""} onClick={() => setV("featured")}><Icon name="layers" style={{ width: 14, height: 14 }} />Featured</button>
            </div>
          </div>
        </div>

        {/* count bar */}
        <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "12px 2px", margin: "22px 0 28px", display: "flex", gap: 22 }}>
          <span><span style={{ color: "var(--acc)" }}>{items.length}</span> {lang === "pt" ? "projetos" : "projects"}</span>
          <span><span style={{ color: "var(--acc)" }}>{items.filter((i) => i.status === "production").length}</span> {lang === "pt" ? "em produção" : "in production"}</span>
          <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>$ ls ~/projects --view={view}</span>
        </div>

        {/* GRID */}
        {view === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {items.map((pr) => (<Reveal key={pr.id}><ProjectCard pr={pr} lang={lang} /></Reveal>))}
          </div>
        )}

        {/* LIST */}
        {view === "list" && (
          <div>
            {items.map((pr) => (<Reveal key={pr.id}><ProjectListRow pr={pr} lang={lang} /></Reveal>))}
          </div>
        )}

        {/* FEATURED */}
        {view === "featured" && (
          <div>
            <Reveal className="card hov" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 0, overflow: "hidden", marginBottom: 18 }}>
              <div style={{ padding: "36px 36px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <StatusBadge kind={items[0].status} label={tr(DATA.projects.statusLabels[items[0].status], lang)} />
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{items[0].year} · {tr(items[0].tag, lang)}</span>
                </div>
                <h2 className="display" style={{ fontSize: 36, marginBottom: 14 }}>{items[0].name}</h2>
                <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginBottom: 22, maxWidth: "46ch" }}>{tr(items[0].blurb, lang)}</p>
                <div style={{ display: "flex", gap: 28, marginBottom: 24 }}>
                  <div>
                    <div className="display" style={{ fontSize: 32, color: "var(--acc)" }}>{items[0].metric.v}</div>
                    <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{tr(items[0].metric.l, lang)}</div>
                  </div>
                </div>
                <div className="chips">{items[0].stack.map((s) => (<span key={s} className="chip">{s}</span>))}</div>
              </div>
              <div className="grid-bg" style={{ padding: "36px 30px", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid var(--line)", background: "var(--bg-2)" }}>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 16 }}><span style={{ color: "var(--acc)" }}>$</span> architecture</div>
                <MiniDiagram nodes={items[0].nodes} />
                <div className="ph" style={{ height: 120, marginTop: 20 }}><span className="ph-lbl">{items[0].id}.svg — system diagram</span></div>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {items.slice(1).map((pr) => (<Reveal key={pr.id}><ProjectCard pr={pr} lang={lang} /></Reveal>))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
