import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";
import { langStore, themeStore, setLang, setTheme } from "../../stores/prefs";

// stores are module singletons — reset before each test
beforeEach(() => {
  setLang("en");
  setTheme("dark");
});

describe("Nav", () => {
  it("renders the four primary routes with real (non-hash) hrefs", () => {
    render(<Nav pathname="/" />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume");
  });

  it("marks the active route (and only it)", () => {
    render(<Nav pathname="/projetos" />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveClass("on");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveClass("on");
  });

  it("treats trailing-slash paths as the same route", () => {
    render(<Nav pathname="/blog/" />);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveClass("on");
  });

  it("switches language via the EN/PT pill and relocalizes labels", async () => {
    const user = userEvent.setup();
    render(<Nav pathname="/" />);
    await user.click(screen.getByRole("button", { name: "PT" }));
    expect(langStore.get()).toBe("pt");
    // "Resume" → "Currículo" in PT
    expect(screen.getByRole("link", { name: "Currículo" })).toBeInTheDocument();
  });

  it("toggles the theme via the icon button", async () => {
    const user = userEvent.setup();
    render(<Nav pathname="/" />);
    expect(themeStore.get()).toBe("dark");
    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(themeStore.get()).toBe("light");
  });
});
