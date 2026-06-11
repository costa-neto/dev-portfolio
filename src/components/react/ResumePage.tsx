import { useState } from "react";
import { useStore } from "@nanostores/react";
import { DATA } from "../../lib/data";
import { tr } from "../../lib/i18n";
import { langStore } from "../../stores/prefs";
import { Icon } from "./Icon";
import { Reveal } from "./primitives";

const sectionHeading = {
  fontSize: 13, textTransform: "uppercase" as const, letterSpacing: ".1em",
  color: "var(--ink-3)",
};

export function ResumePage() {
  const lang = useStore(langStore);
  const R = DATA.resume;
  const p = DATA.profile;
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const matches = (s: string) => skillFilter != null && s.toLowerCase().includes(skillFilter.toLowerCase());

  return (
    <div className="page page-enter">
      <div className="wrap resume-root" style={{ paddingTop: 48, maxWidth: 980 }}>
        {/* header */}
        <div className="section-idx"><span className="num">//</span><span>{lang === "pt" ? "currículo" : "resume"}</span><span className="ln" /></div>
        <div className="resume-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 30 }}>
          <div>
            <h1 className="display" style={{ fontSize: "clamp(34px,4.6vw,52px)", marginBottom: 10 }}>{p.name}</h1>
            <p className="mono" style={{ fontSize: 15, color: "var(--ink-2)", margin: "0 0 12px" }}>{tr(R.subtitle, lang)}</p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-3)" }}>
              <span><span className="live" style={{ marginRight: 7 }} /><span style={{ color: "var(--ink-2)" }}>{tr(DATA.home.available, lang)}</span></span>
              <a href={`mailto:${p.email}`} style={{ color: "var(--ink-2)" }}>{p.email}</a>
              <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "var(--ink-2)" }}>github/{p.handle}</a>
            </div>
          </div>
          <button className="btn solid no-print" onClick={() => window.print()}>
            <Icon name="download" style={{ width: 15, height: 15 }} /> {tr(R.download, lang)}
          </button>
        </div>

        {/* summary */}
        <div className="card" style={{ padding: "24px 26px", marginBottom: 36 }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}><span style={{ color: "var(--acc)" }}>$</span> cat summary.txt</div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink)", margin: 0, maxWidth: "70ch" }}>{tr(R.summary, lang)}</p>
        </div>

        <div className="resume-grid" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 40, alignItems: "start" }}>
          {/* LEFT: experience + education + certifications */}
          <div>
            <h3 className="mono" style={{ ...sectionHeading, marginBottom: 24 }}>{tr(R.sections.experience, lang)}</h3>
            <div style={{ position: "relative", paddingLeft: 26 }}>
              <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--line)" }} />
              {R.experience.map((job, i) => (
                <Reveal key={i} style={{ position: "relative", marginBottom: 34 }}>
                  <span style={{ position: "absolute", left: -26, top: 5, width: 11, height: 11, borderRadius: "50%", background: job.current ? "var(--acc)" : "var(--surface)", border: "2px solid " + (job.current ? "var(--acc)" : "var(--line)"), boxShadow: job.current ? "0 0 0 4px var(--acc-soft)" : "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{tr(job.role, lang)}</span>
                    <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{job.period}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 13, color: "var(--acc)", margin: "4px 0 12px" }}>{job.org}</div>
                  <ul style={{ margin: "0 0 14px", paddingLeft: 18, color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.65 }}>
                    {tr(job.bullets, lang).map((b, j) => (<li key={j} style={{ marginBottom: 4 }}>{b}</li>))}
                  </ul>
                  <div className="chips">{job.stack.map((s) => (
                    <span key={s} className="chip" style={{ opacity: skillFilter && !matches(s) ? 0.35 : 1, borderColor: matches(s) ? "var(--acc)" : "var(--line)" }}>{s}</span>
                  ))}</div>
                </Reveal>
              ))}
            </div>

            <h3 className="mono" style={{ ...sectionHeading, margin: "38px 0 18px" }}>{tr(R.sections.education, lang)}</h3>
            {R.education.map((ed, i) => (
              <div key={i} className="card" style={{ padding: "18px 22px", marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{tr(ed.degree, lang)}</div>
                    <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{ed.org}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{ed.period}</span>
                </div>
                {ed.note && <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, margin: "12px 0 0" }}>{tr(ed.note, lang)}</p>}
              </div>
            ))}

            <h3 className="mono" style={{ ...sectionHeading, margin: "30px 0 16px" }}>{tr(R.sections.certifications, lang)}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {R.certifications.map((c, i) => (
                <div key={i} className="card" style={{ padding: "16px 18px" }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{tr(c.title, lang)}</div>
                  <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>{c.org}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: skills + studying */}
          <div className="resume-side">
            <h3 className="mono" style={{ ...sectionHeading, marginBottom: 18 }}>{tr(R.sections.skills, lang)}</h3>
            <div className="mono no-print" style={{ fontSize: 11.5, color: "var(--ink-3)", marginBottom: 16 }}>
              {skillFilter ? (
                <span>{lang === "pt" ? "filtrando" : "filtering"}: <span style={{ color: "var(--acc)" }}>{skillFilter}</span> · <button onClick={() => setSkillFilter(null)} style={{ background: "none", border: "none", color: "var(--ink-2)", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}>{lang === "pt" ? "limpar" : "clear"}</button></span>
              ) : (
                <span>{lang === "pt" ? "clique numa skill p/ destacar" : "click a skill to highlight"}</span>
              )}
            </div>
            {R.skills.map((grp, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-2)", marginBottom: 9 }}>{tr(grp.group, lang)}</div>
                <div className="chips">
                  {grp.items.map((s) => (
                    <button key={s} onClick={() => setSkillFilter(skillFilter === s ? null : s)} className="chip"
                      style={{ cursor: "pointer", borderColor: skillFilter === s ? "var(--acc)" : "var(--line)", color: skillFilter === s ? "var(--acc)" : "var(--ink-2)", background: skillFilter === s ? "var(--acc-soft)" : "var(--surface)" }}>{s}</button>
                  ))}
                </div>
              </div>
            ))}

            <h3 className="mono" style={{ ...sectionHeading, margin: "30px 0 14px" }}>{tr(R.sections.now, lang)}</h3>
            <div className="chips">
              {tr(p.studying, lang).map((s) => (<span key={s} className="chip"><span className="live c2" style={{ width: 6, height: 6 }} />{s}</span>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
