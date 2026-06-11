import { useStore } from "@nanostores/react";
import { DATA } from "../../lib/data";
import { tr, type Localized } from "../../lib/i18n";
import { langStore } from "../../stores/prefs";
import { ArchDiagram, MiniDiagram, Reveal, SectionIdx, StatusBadge, Term } from "./primitives";

export function HomePage() {
  const lang = useStore(langStore);
  const p = DATA.profile;
  const H = DATA.home;
  const featured = DATA.projects.items.slice(0, 3);
  const posts = DATA.blog.items.slice(0, 3);

  const stats: Array<[string, Localized]> = [
    ["5", { en: "years shipping", pt: "anos entregando" }],
    ["3", { en: "years freelance", pt: "anos freelance" }],
    ["8", { en: "core technologies", pt: "tecnologias core" }],
    ["∞", { en: "cups of coffee", pt: "xícaras de café" }],
  ];

  return (
    <div className="page page-enter">
      {/* HERO */}
      <section className="grid-bg" style={{ paddingTop: 54, paddingBottom: 40 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.04fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div className="hero-left">
            <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20, letterSpacing: ".03em" }}>
              <span style={{ color: "var(--acc)" }}>~/</span> neto-costa <span style={{ color: "var(--ink-3)" }}>—  zsh</span>
            </div>
            <div className="mono" style={{ fontSize: 14.5, lineHeight: 1.5, marginBottom: 6 }}>
              <span style={{ color: "var(--acc)" }}>$</span> whoami
            </div>
            <h1 className="display" style={{ fontSize: "clamp(40px,5.6vw,68px)", margin: "4px 0 6px" }}>
              <span style={{ color: "var(--acc)" }}>Neto</span> Costa
            </h1>
            <p className="mono" style={{ fontSize: 15.5, color: "var(--ink-2)", margin: "0 0 22px" }}>{tr(p.role, lang)}</p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: "46ch", margin: "0 0 26px" }}>
              {tr(H.about, lang)}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <a className="btn solid" href={`mailto:${p.email}`}>{tr(H.ctaPrimary, lang)} <span className="arr">→</span></a>
              <a className="btn ghost" href="/projetos">{tr(H.ctaSecondary, lang)}</a>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-3)" }}>
              <span><span className="live" style={{ marginRight: 8 }} /><span style={{ color: "var(--ink-2)" }}>{tr(H.available, lang)}</span></span>
              <span>📍 <span style={{ color: "var(--ink-2)" }}>{tr(p.location, lang)}</span></span>
              <span>uptime <span style={{ color: "var(--ink-2)" }}>{p.uptime}</span></span>
            </div>
          </div>
          <div className="hero-right">
            <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 12, textAlign: "right" }}>
              <span style={{ color: "var(--acc)" }}>$</span> ./architecture --live
            </div>
            <div className="card" style={{ padding: "26px 22px", background: "var(--bg-2)" }}>
              <ArchDiagram />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* STATS strip */}
        <Reveal className="card" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 8 }}>
          {stats.map(([v, l], i) => (
            <div key={i} style={{ padding: "24px 26px", borderRight: i < 3 ? "1px solid var(--line-soft)" : "none" }}>
              <div className="display" style={{ fontSize: 34 }}>{v}<span style={{ color: "var(--acc)" }}>{i < 2 ? "+" : ""}</span></div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 5 }}>{tr(l, lang)}</div>
            </div>
          ))}
        </Reveal>

        {/* STACK */}
        <Reveal style={{ marginTop: 84 }}>
          <SectionIdx num="01">{tr(H.sectionStack, lang)}</SectionIdx>
          <div className="chips" style={{ gap: 10 }}>
            {p.stack.map((s) => (<span key={s} className="chip" style={{ fontSize: 13.5, padding: "8px 14px" }}><span className="t">~</span>{s}</span>))}
          </div>
        </Reveal>

        {/* ARCH NOTE / how I think */}
        <Reveal style={{ marginTop: 84 }}>
          <SectionIdx num="02">{tr(H.sectionArch, lang)}</SectionIdx>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>
            <Term title="neto@costa: ~/notes">
              <div><span className="pr">$</span> cat principles.md</div>
              <div style={{ color: "var(--ink-2)", fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.7, marginTop: 8 }}>
                {tr(H.archNote, lang)}
              </div>
              <div style={{ marginTop: 14 }}>
                <span className="cm"># reliability first</span><br />
                <span className="cm"># boring tech, on purpose</span><br />
                <span className="cm"># observable by default</span>
                <span className="cursor" />
              </div>
            </Term>
            <div className="card" style={{ padding: "24px 20px", background: "var(--bg-2)" }}>
              <ArchDiagram />
            </div>
          </div>
        </Reveal>

        {/* SELECTED WORK */}
        <Reveal style={{ marginTop: 84 }}>
          <SectionIdx num="03">{tr(H.sectionWork, lang)}</SectionIdx>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {featured.map((pr) => (
              <a key={pr.id} className="card hov" href="/projetos" style={{ padding: "22px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <StatusBadge kind={pr.status} label={tr(DATA.projects.statusLabels[pr.status], lang)} />
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{pr.year}</span>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{pr.name}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{tr(pr.blurb, lang)}</div>
                </div>
                <MiniDiagram nodes={pr.nodes} />
                <div className="chips" style={{ marginTop: "auto" }}>
                  {pr.stack.slice(0, 3).map((s) => (<span key={s} className="chip">{s}</span>))}
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <a className="btn ghost" href="/projetos">
              {lang === "pt" ? "Ver todos os projetos" : "View all projects"} <span className="arr">→</span>
            </a>
          </div>
        </Reveal>

        {/* LATEST WRITING */}
        <Reveal style={{ marginTop: 84 }}>
          <SectionIdx num="04">{tr(H.sectionWriting, lang)}</SectionIdx>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {posts.map((po) => (
              <a key={po.id} href="/blog" className="post-row"
                style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: 20, alignItems: "center", padding: "20px 6px", borderBottom: "1px solid var(--line-soft)" }}>
                <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{po.date}</span>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{tr(po.title, lang)}</span>
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{po.read} {tr(DATA.blog.readLabel, lang)}</span>
                  <span style={{ color: "var(--acc)" }}>→</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* STUDYING NOW + FUN FACT */}
        <Reveal style={{ marginTop: 84, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <div className="card" style={{ padding: "26px 28px" }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 16 }}>{tr(H.studyingNow, lang)}</div>
            <div className="chips" style={{ gap: 10 }}>
              {tr(p.studying, lang).map((s) => (<span key={s} className="chip" style={{ fontSize: 13.5, padding: "8px 14px" }}><span className="live c2" style={{ width: 6, height: 6 }} />{s}</span>))}
            </div>
          </div>
          <div className="card" style={{ padding: "26px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>Fun fact</div>
            <div style={{ fontSize: 16, lineHeight: 1.5 }}>{tr(p.funfact, lang)}</div>
          </div>
        </Reveal>

        {/* BIG CTA */}
        <Reveal className="grid-bg card" style={{ marginTop: 84, padding: "56px 44px", textAlign: "center", overflow: "hidden" }}>
          <h2 className="display" style={{ fontSize: "clamp(28px,4vw,46px)", marginBottom: 14 }}>{tr(H.ctaBig, lang)}</h2>
          <p style={{ color: "var(--ink-2)", fontSize: 17, maxWidth: "48ch", margin: "0 auto 28px" }}>{tr(H.ctaBigSub, lang)}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn solid" href={`mailto:${p.email}`}>{tr(H.ctaPrimary, lang)} <span className="arr">→</span></a>
            <a className="btn ghost" href="/resume">{tr(DATA.nav.resume, lang)}</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
