import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsPage } from "./ProjectsPage";
import { DATA } from "../../lib/data";
import { setLang } from "../../stores/prefs";

beforeEach(() => setLang("en"));

describe("ProjectsPage", () => {
  it("defaults to the grid view and lists every project", () => {
    render(<ProjectsPage />);
    for (const p of DATA.projects.items) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
    expect(screen.getByText(/ls ~\/projects --view=grid/)).toBeInTheDocument();
  });

  it("shows a count summary of total and in-production projects", () => {
    render(<ProjectsPage />);
    const prod = DATA.projects.items.filter((p) => p.status === "production").length;
    expect(screen.getByText(String(DATA.projects.items.length))).toBeInTheDocument();
    expect(screen.getByText(String(prod))).toBeInTheDocument();
    expect(screen.getByText(/in production/)).toBeInTheDocument();
  });

  it("switches to the list view (which reveals project metrics)", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    // metric values are a list/featured-only affordance
    expect(screen.queryByText("2M+")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "List" }));
    expect(screen.getByText("2M+")).toBeInTheDocument();
    expect(screen.getByText(/ls ~\/projects --view=list/)).toBeInTheDocument();
  });

  it("switches to the featured view (first project becomes the hero)", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    await user.click(screen.getByRole("button", { name: "Featured" }));
    expect(
      screen.getByRole("heading", { name: DATA.projects.items[0].name }),
    ).toBeInTheDocument();
  });

  it("persists the chosen view to localStorage", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    await user.click(screen.getByRole("button", { name: "List" }));
    expect(localStorage.getItem("nc_projview")).toBe("list");
  });

  it("restores the persisted view on a fresh mount", () => {
    localStorage.setItem("nc_projview", "list");
    render(<ProjectsPage />);
    expect(screen.getByText(/ls ~\/projects --view=list/)).toBeInTheDocument();
  });
});
