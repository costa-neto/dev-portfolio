// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
// Static site → no SSR adapter. The `astro build` output in dist/ is
// deployed to Cloudflare Pages (see wrangler.toml).
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
