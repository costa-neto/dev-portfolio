import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an svg", () => {
    const { container } = render(<Icon name="mail" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("fills brand glyphs (github/linkedin) and strokes the rest", () => {
    const { container: gh } = render(<Icon name="github" />);
    expect(gh.querySelector("svg")?.getAttribute("fill")).toBe("currentColor");

    const { container: sun } = render(<Icon name="sun" />);
    expect(sun.querySelector("svg")?.getAttribute("stroke")).toBe("currentColor");
  });

  it("forwards props like style/className through to the svg", () => {
    const { container } = render(<Icon name="arrow" className="arr-icon" />);
    expect(container.querySelector("svg")).toHaveClass("arr-icon");
  });
});
