import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { DATA } from "../../lib/data";
import { setLang } from "../../stores/prefs";

beforeEach(() => setLang("en"));

describe("Footer", () => {
  it("renders the primary nav links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume");
  });

  it("renders connect links with the real profile targets", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", DATA.profile.github);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", DATA.profile.linkedin);
    expect(screen.getByRole("link", { name: /Email/ })).toHaveAttribute("href", `mailto:${DATA.profile.email}`);
  });
});
