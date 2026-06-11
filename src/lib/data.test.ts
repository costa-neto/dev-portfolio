import { describe, it, expect } from "vitest";
import { DATA } from "./data";
import { tr } from "./i18n";

describe("DATA content model", () => {
  it("exposes the real profile", () => {
    expect(DATA.profile.name).toBe("Neto Costa");
    expect(DATA.profile.email).toBe("neto1809costa@gmail.com");
    expect(DATA.profile.github).toMatch(/github\.com/);
    expect(DATA.profile.linkedin).toMatch(/linkedin\.com/);
  });

  it("carries the real résumé experience (not the design placeholders)", () => {
    const orgs = DATA.resume.experience.map((j) => j.org);
    expect(orgs).toContain("Banco do Brasil");
    expect(orgs).toContain("StudioSol");
    expect(orgs).toContain("Zipper");
    expect(orgs).toContain("Code49");
    // the design's fake jobs must be gone
    expect(orgs).not.toContain("Independent / Various");
  });

  it("marks exactly one current role and orders it first", () => {
    const current = DATA.resume.experience.filter((j) => j.current);
    expect(current).toHaveLength(1);
    expect(DATA.resume.experience[0].current).toBe(true);
    expect(DATA.resume.experience[0].org).toBe("Banco do Brasil");
  });

  it("carries the real education", () => {
    const orgs = DATA.resume.education.map((e) => e.org);
    expect(orgs).toContain("UNESP/FMU");
  });

  it("carries the real certifications", () => {
    expect(DATA.resume.certifications.length).toBeGreaterThanOrEqual(2);
    const titles = DATA.resume.certifications.map((c) => tr(c.title, "en"));
    expect(titles.join(" ")).toMatch(/English/i);
    expect(titles.join(" ")).toMatch(/Spanish/i);
  });

  it("has a status label for every project status in use", () => {
    for (const p of DATA.projects.items) {
      expect(DATA.projects.statusLabels[p.status]).toBeDefined();
    }
  });

  it("gives every project the fields the cards need", () => {
    for (const p of DATA.projects.items) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.nodes.length).toBeGreaterThan(0);
      expect(p.metric.v).toBeTruthy();
    }
  });

  it("gives every blog post the fields the list needs", () => {
    for (const post of DATA.blog.items) {
      expect(post.id).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(typeof post.read).toBe("number");
    }
  });

  it("keeps every localized field bilingual (en + pt)", () => {
    expect(DATA.profile.role.en).toBeTruthy();
    expect(DATA.profile.role.pt).toBeTruthy();
    for (const job of DATA.resume.experience) {
      expect(job.role.en).toBeTruthy();
      expect(job.role.pt).toBeTruthy();
      expect(job.bullets.en.length).toBeGreaterThan(0);
      expect(job.bullets.pt.length).toBeGreaterThan(0);
    }
  });
});
