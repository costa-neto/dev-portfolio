import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { DATA } from "../../lib/data";
import { setLang } from "../../stores/prefs";

beforeEach(() => setLang("en"));

describe("HomePage", () => {
  it("renders the hero identity and role", () => {
    render(<HomePage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Neto");
    expect(h1.textContent).toContain("Costa");
    expect(screen.getAllByText(DATA.profile.role.en).length).toBeGreaterThan(0);
  });

  it("links the primary CTA to email and secondary to projects", () => {
    render(<HomePage />);
    const contact = screen.getAllByRole("link", { name: /Get in touch/ });
    expect(contact[0]).toHaveAttribute("href", `mailto:${DATA.profile.email}`);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "/projetos");
  });

  it("surfaces the three featured projects", () => {
    render(<HomePage />);
    for (const p of DATA.projects.items.slice(0, 3)) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });

  it("surfaces the three latest posts", () => {
    render(<HomePage />);
    for (const post of DATA.blog.items.slice(0, 3)) {
      expect(screen.getByText(post.title.en)).toBeInTheDocument();
    }
  });

  it("renders the stack chips", () => {
    render(<HomePage />);
    expect(screen.getByText("Golang")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("relocalizes when language switches to PT", () => {
    render(<HomePage />);
    act(() => setLang("pt"));
    expect(screen.getByRole("link", { name: "Ver projetos" })).toBeInTheDocument();
  });
});
