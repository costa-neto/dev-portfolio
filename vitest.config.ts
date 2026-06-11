/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Use esbuild's automatic JSX runtime instead of @vitejs/plugin-react,
  // which avoids a Vite peer-version conflict and is all tests need
  // (Fast Refresh isn't relevant in a test run).
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
