import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  Reveal,
  Term,
  SectionIdx,
  ArchDiagram,
  MiniDiagram,
  StatusBadge,
} from "./primitives";

describe("Reveal", () => {
  it("renders children with the reveal class on the requested tag", () => {
    render(
      <Reveal as="section" className="extra">
        hello
      </Reveal>,
    );
    const el = screen.getByText("hello");
    expect(el.tagName.toLowerCase()).toBe("section");
    expect(el).toHaveClass("reveal", "extra");
  });

  it("becomes visible (adds .in) once mounted", async () => {
    render(<Reveal>peekaboo</Reveal>);
    const el = screen.getByText("peekaboo");
    await waitFor(() => expect(el).toHaveClass("in"));
  });
});

describe("Term", () => {
  it("renders its title and body", () => {
    render(<Term title="neto@costa">$ whoami</Term>);
    expect(screen.getByText("neto@costa")).toBeInTheDocument();
    expect(screen.getByText("$ whoami")).toBeInTheDocument();
  });
});

describe("SectionIdx", () => {
  it("renders the index number and label", () => {
    render(<SectionIdx num="01">Stack &amp; tooling</SectionIdx>);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText(/Stack/)).toBeInTheDocument();
  });
});

describe("MiniDiagram", () => {
  it("renders every node with arrows between them", () => {
    render(<MiniDiagram nodes={["API", "Worker", "DB"]} />);
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("Worker")).toBeInTheDocument();
    expect(screen.getByText("DB")).toBeInTheDocument();
    // n-1 arrows
    expect(screen.getAllByText("→")).toHaveLength(2);
  });
});

describe("StatusBadge", () => {
  it("renders the label", () => {
    render(<StatusBadge kind="production" label="production" />);
    expect(screen.getByText("production")).toBeInTheDocument();
  });
});

describe("ArchDiagram", () => {
  it("renders the system nodes", () => {
    render(<ArchDiagram />);
    expect(screen.getByText("Core API")).toBeInTheDocument();
    expect(screen.getByText("Postgres")).toBeInTheDocument();
    expect(screen.getByText("Kafka")).toBeInTheDocument();
  });
});
