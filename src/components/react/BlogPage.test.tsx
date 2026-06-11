import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogPage } from "./BlogPage";
import { DATA } from "../../lib/data";
import { setLang } from "../../stores/prefs";

beforeEach(() => setLang("en"));

const titleEn = (id: string) => DATA.blog.items.find((p) => p.id === id)!.title.en;

describe("BlogPage", () => {
  it("defaults to the minimal view and lists all posts", () => {
    render(<BlogPage />);
    for (const post of DATA.blog.items) {
      expect(screen.getByText(post.title.en)).toBeInTheDocument();
    }
  });

  it("filters posts by tag", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);
    await user.click(screen.getByRole("button", { name: "Go" }));
    // Go posts stay
    expect(screen.getByText(titleEn("idempotent"))).toBeInTheDocument();
    expect(screen.getByText(titleEn("grpc-errors"))).toBeInTheDocument();
    // non-Go post is filtered out
    expect(screen.queryByText(titleEn("postgres-first"))).not.toBeInTheDocument();
  });

  it("clears the filter with the 'all' chip", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(screen.queryByText(titleEn("postgres-first"))).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "all" }));
    expect(screen.getByText(titleEn("postgres-first"))).toBeInTheDocument();
  });

  it("switches to cards view (excerpts become visible)", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);
    const excerpt = DATA.blog.items[0].excerpt.en;
    expect(screen.queryByText(excerpt)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cards" }));
    expect(screen.getByText(excerpt)).toBeInTheDocument();
  });

  it("switches to featured view (featured post is the hero heading)", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);
    await user.click(screen.getByRole("button", { name: "Featured" }));
    const featured = DATA.blog.items.find((p) => p.featured)!;
    expect(screen.getByRole("heading", { name: featured.title.en })).toBeInTheDocument();
  });

  it("persists the chosen view to localStorage", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);
    await user.click(screen.getByRole("button", { name: "Cards" }));
    expect(localStorage.getItem("nc_blogview")).toBe("cards");
  });
});
