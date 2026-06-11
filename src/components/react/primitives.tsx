import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import type { ProjectStatus } from "../../lib/data";

/* ---- reveal-on-scroll ---- */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    let io: IntersectionObserver | null = null;
    let safety: ReturnType<typeof setTimeout> | null = null;
    const show = () => {
      if (done) return;
      done = true;
      window.setTimeout(() => el.classList.add("in"), delay);
      io?.disconnect();
      if (safety) clearTimeout(safety);
    };
    // progressive enhancement: no IO (SSR/old browsers/tests) → just reveal
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && show()),
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    safety = setTimeout(show, 1400);
    if (el.getBoundingClientRect().top < window.innerHeight * 1.05) show();
    return () => {
      io?.disconnect();
      if (safety) clearTimeout(safety);
    };
  }, [delay]);
  return (
    <Tag ref={ref} className={"reveal " + className} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- terminal window ---- */
export function Term({
  title = "neto@costa: ~",
  children,
  style,
}: {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="term" style={style}>
      <div className="term-bar">
        <span className="tl" style={{ background: "#ff5f57" }} />
        <span className="tl" style={{ background: "#febc2e" }} />
        <span className="tl" style={{ background: "#28c840" }} />
        <span className="tt">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

/* ---- section index header ---- */
export function SectionIdx({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="section-idx">
      <span className="num">{num}</span>
      <span>{children}</span>
      <span className="ln" />
    </div>
  );
}

/* ---- architecture diagram (home hero) ----
   Wires and nodes share ONE fixed 460×392 coordinate space so every line
   meets its box exactly. Reflects a real stack: Node edge → Go/gRPC core →
   Postgres / Redis / Kafka. */
export function ArchDiagram() {
  const nodeBox: CSSProperties = { width: 128, height: 64, boxSizing: "border-box" };
  return (
    <div className="diagram">
      <svg className="wires" viewBox="0 0 460 392">
        <path className="wire" d="M136,40 H324" />
        <path className="flow" d="M136,40 H324" />
        <path className="wire" d="M388,72 V116 H230 V160" />
        <path className="flow" d="M388,72 V116 H230 V160" />
        <path className="wire" d="M230,224 V286" />
        <path className="flow" d="M230,224 V286" />
        <path className="wire" d="M72,286 H388" />
        <path className="wire" d="M72,286 V312" />
        <path className="flow" d="M72,286 V312" />
        <path className="wire" d="M230,286 V312" />
        <path className="flow" d="M230,286 V312" />
        <path className="wire" d="M388,286 V312" />
        <path className="flow c2" d="M388,286 V312" />
      </svg>
      <div className="node" style={{ top: 8, left: 8, ...nodeBox }}>
        <div className="nh">client</div>
        <div className="nn">Web / App</div>
        <span className="ndot" />
      </div>
      <div className="node live-node" style={{ top: 8, left: 324, ...nodeBox }}>
        <div className="nh">edge · node</div>
        <div className="nn">API Gateway</div>
        <span className="ndot" />
      </div>
      <div className="node" style={{ top: 160, left: 166, ...nodeBox }}>
        <div className="nh">go · grpc</div>
        <div className="nn">Core API</div>
        <span className="ndot" />
      </div>
      <div className="node" style={{ top: 312, left: 8, ...nodeBox }}>
        <div className="nh">store</div>
        <div className="nn">Postgres</div>
        <span className="ndot" />
      </div>
      <div className="node" style={{ top: 312, left: 166, ...nodeBox }}>
        <div className="nh">cache</div>
        <div className="nn">Redis</div>
        <span className="ndot" />
      </div>
      <div className="node q" style={{ top: 312, left: 324, ...nodeBox }}>
        <div className="nh">events</div>
        <div className="nn">Kafka</div>
        <span className="ndot" />
      </div>
    </div>
  );
}

/* ---- small inline diagram (project cards) ---- */
export function MiniDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div
      className="mini-diagram"
      style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}
    >
      {nodes.map((n, i) => (
        <Fragment key={i}>
          <span
            style={{
              fontFamily: "var(--mono)", fontSize: 11.5, padding: "4px 9px",
              border: "1px solid var(--line)", borderRadius: 6,
              color: i === 0 ? "var(--acc)" : "var(--ink-2)",
              background: "var(--bg-2)", whiteSpace: "nowrap",
            }}
          >
            {n}
          </span>
          {i < nodes.length - 1 && (
            <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 12, padding: "0 7px" }}>
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ---- status badge ---- */
export function StatusBadge({ kind, label }: { kind: ProjectStatus; label: string }) {
  const colors: Record<ProjectStatus, string> = {
    production: "var(--acc)",
    wip: "var(--acc-2)",
    archived: "var(--ink-3)",
  };
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-2)" }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 2, background: colors[kind] || "var(--ink-3)" }} />
      {label}
    </span>
  );
}
