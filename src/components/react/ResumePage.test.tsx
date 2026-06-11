import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResumePage } from "./ResumePage";
import { setLang } from "../../stores/prefs";

beforeEach(() => setLang("en"));
afterEach(() => vi.restoreAllMocks());

describe("ResumePage", () => {
  it("renders the real work history", () => {
    render(<ResumePage />);
    for (const org of ["Banco do Brasil", "StudioSol", "Zipper", "Code49"]) {
      expect(screen.getByText(org)).toBeInTheDocument();
    }
  });

  it("renders real education and certifications", () => {
    render(<ResumePage />);
    expect(screen.getByText("UNESP/FMU")).toBeInTheDocument();
    expect(screen.getByText("English C1+")).toBeInTheDocument();
    expect(screen.getByText("Spanish B2")).toBeInTheDocument();
  });

  it("highlights a clicked skill and can clear the filter", async () => {
    const user = userEvent.setup();
    render(<ResumePage />);
    expect(screen.getByText(/click a skill to highlight/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Go" }));
    const clear = screen.getByRole("button", { name: /clear/i });
    expect(clear).toBeInTheDocument();
    await user.click(clear);
    expect(screen.getByText(/click a skill to highlight/i)).toBeInTheDocument();
  });

  it("triggers browser print-to-PDF from the download button", async () => {
    const user = userEvent.setup();
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ResumePage />);
    await user.click(screen.getByRole("button", { name: /Download PDF/i }));
    expect(printSpy).toHaveBeenCalledOnce();
  });
});
