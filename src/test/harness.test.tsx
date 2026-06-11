import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("test harness", () => {
  it("runs jsdom + React Testing Library + jest-dom matchers", () => {
    render(<button type="button">click me</button>);
    expect(screen.getByRole("button", { name: "click me" })).toBeInTheDocument();
  });
});
