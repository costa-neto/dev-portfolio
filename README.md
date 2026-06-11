# Neto Costa — Portfolio

Personal portfolio for **Neto Costa**, a back-end-focused software engineer
(São Paulo, Brazil). Terminal / systems-inspired design, bilingual (PT/EN),
with dark and light themes.

Built with **Astro** + **Tailwind**, using **React islands** for the
interactive, stateful pieces.

## Stack

- **Astro** — file-based routing, static output (no SSR adapter).
- **Tailwind v4** (`@tailwindcss/vite`) — available alongside the custom
  design-system stylesheet (`src/assets/styles/global.css`).
- **React islands** (`@astrojs/react`) — for the parts that need client state
  (language/theme toggles, project & blog view switchers, résumé skill filter).
- **nanostores** (`@nanostores/react` / `persistent`) — shared language + theme
  state across islands, persisted to `localStorage` and synced to the
  `<html data-theme>` / `lang` attributes (no flash of the wrong theme).
- **Vitest** + **Testing Library** + **jsdom** — unit/component tests.

## Design system

The look is driven by `src/assets/styles/global.css` (OKLCH tokens, Geist +
Geist Mono type, terminal/diagram motifs). Accents are baked to the final
choice from design: **bone (off-white) on dark**, **cyan on light**.

## Content

`src/lib/data.ts` is the single bilingual content model.

- **Profile & résumé** — real data (experience, education, certifications).
- **Projects & blog** — placeholder samples until real case studies / posts
  land. Swap `DATA.projects.items` / `DATA.blog.items` when ready.

## Project structure

```text
src/
├── assets/styles/global.css   # design system + Tailwind import
├── components/react/          # React islands (Nav, Footer, page bodies, primitives)
├── layouts/Layout.astro       # shell: fonts, no-FOUC script, Nav + Footer
├── lib/                       # data model (data.ts) + i18n helper (i18n.ts)
├── pages/                     # /, /projetos, /blog, /resume
└── stores/prefs.ts            # shared lang + theme nanostores
```

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `pnpm install`    | Install dependencies                     |
| `pnpm dev`        | Start the dev server at `localhost:4321` |
| `pnpm build`      | Build the production site                |
| `pnpm preview`    | Preview the build locally                |
| `pnpm test`       | Run the test suite once                  |
| `pnpm test:watch` | Run tests in watch mode                  |
| `pnpm deploy`     | Build and deploy to Cloudflare Pages     |

> Requires **Node ≥ 22.12** (Astro 6). The repo pins it via `.nvmrc` and
> `engines.node` — run `nvm use` before the commands above.

## Deployment — Cloudflare Pages

The site is fully static, so it deploys to **Cloudflare Pages** with no SSR
adapter. Config lives in `wrangler.toml` (`pages_build_output_dir = "dist"`).

**CLI:** `pnpm deploy` runs `astro build` then `wrangler pages deploy`
(authenticate once with `pnpm exec wrangler login`).

**Git integration (dashboard):** point Cloudflare Pages at the repo with
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `22` (picked up from `.nvmrc`)

