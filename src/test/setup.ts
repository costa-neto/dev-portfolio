import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Reset the DOM and any persisted prefs between tests so islands start fresh.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
