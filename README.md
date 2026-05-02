# FRENCHIE.NOW

A Next.js 16 App Router site that visualizes French Bulldog coat genetics, simulates breeding outcomes, and presents a mock market and recommendation engine for 18 curated Frenchie variations.

The repository ships entirely as a static-data front end: every Frenchie type, locus, price band, and trend point is hardcoded in `lib/genetics.ts` and `lib/market-data.ts`. There is no database, API route, or external data source in the current code.

## Routes

| Path | File | What it shows |
|------|------|---------------|
| `/` | `app/page.tsx` | Landing grid of all 18 Frenchie types with image, rarity badge, health note, and a deep link into `/dna?type=<id>`. |
| `/dna` | `app/dna/page.tsx` | Search-driven DNA Visualizer. Renders the selected type's nine-locus genotype through `components/DNADiagram.tsx`. Wrapped in `<Suspense>` because it reads `useSearchParams`. |
| `/breeding` | `app/breeding/page.tsx` | Breeding Calculator. Pick a sire and dam, get a Recharts bar chart of offspring probabilities and a detailed table. Flags Merle × Merle pairings as unsafe. |
| `/market` | `app/market/page.tsx` | Market Insights dashboard: 2020-2025 trend line, top-10 valuations bar, demand vs. supply scatter, and a rarity-distribution donut. |
| `/recommend` | `app/recommend/page.tsx` | Investment Recommendations. Radar of the top 5 profiles, stacked Buy/Hold/Breed/Flip score bars, and a ranked card list with `Progress` bars per score. |

The shared shell is `app/layout.tsx` (root metadata + `<Navbar />`) plus `components/Navbar.tsx` (sticky top nav linking Home, DNA Visualizer, Calculator, Market, Recommendations).

## Stack

- **Framework**: Next.js `16.1.7` (App Router) with **Turbopack** dev server (`next dev --turbopack`)
- **Language**: TypeScript `^5.9.3`, strict mode, `@/*` path alias to repo root
- **UI primitives**: Radix UI (`radix-ui ^1.4.3`) plus shadcn/ui components in `components/ui/` (style preset `radix-nova`, see `components.json`)
- **Styling**: Tailwind CSS `^4.2.1` via `@tailwindcss/postcss`, OKLCH theme tokens defined in `app/globals.css`, `tw-animate-css` keyframes, `tailwind-merge` + `clsx` (`lib/utils.ts` exports `cn()`)
- **Charts**: Recharts `3.8.0` (bar, line, scatter, pie, radar, stacked bar)
- **Icons**: `lucide-react`
- **Runtime libraries declared but currently unused in source**: `framer-motion`, `next-themes` (a `ThemeProvider` is defined in `components/theme-provider.tsx` but is **not** mounted in `app/layout.tsx`; the `d`-key dark-mode hotkey it ships is therefore inactive)
- **Lint/format**: `eslint-config-next` flat config (`eslint.config.mjs`), Prettier with `prettier-plugin-tailwindcss`

## Data model

### `lib/genetics.ts`
- 18 `FrenchieType` records (Standard Fawn, Brindle, Blue, Cocoa, Lilac, Merle, Fluffy, Isabella, Platinum, Rojo, Black and Tan, Blue Merle, Pied, Blue Fluffy, Lilac Merle, New Shade Isabella, Cream, Lilac and Tan).
- Nine loci per genotype: `Brown, Dilution, DominantBlack, Agouti, Merle, Piebald, Extension, Cocoa, Fluffy`.
- Rarity ladder: `Common → Uncommon → Rare → Exotic → Ultra-Exotic`.
- `calculateOffspring(sire, dam)` is a **rarity-bucket heuristic**, not a Punnett-square solver. It averages the parents' rarity scores, filters types within ±1.5 of that average, and returns a uniform probability split. The only genotype-level rule is the Merle × Merle "unsafe" flag.

### `lib/market-data.ts`
- `marketTrendData`: six hardcoded year/price/volume points (2020-2025).
- `rarityDistribution`: five-slice market-share pie.
- `getMarketDataForType()`: rarity-keyed lookup that derives `priceRange`, `demandScore`, `supplyScore`, and the four action scores (`buy`, `hold`, `breed`, `flip`). Fluffy variants and `new-shade-isabella` get a hand-tuned `maxPrice` bump.
- `typeMarketData` is the eagerly-computed list consumed by `/market` and `/recommend`.

### `public/images/`
PNG portraits keyed to each `FrenchieType.id` (e.g. `fawn.png`, `lilac-merle.png`, `new-shade-isabella.png`). Eighteen images, one per type.

## Component inventory

- `components/Navbar.tsx` — server component, sticky nav.
- `components/DNADiagram.tsx` — server component, renders nine locus cards with dominant/recessive allele tiles.
- `components/theme-provider.tsx` — client component wrapping `next-themes`. **Not currently rendered** by any layout.
- `components/ui/*.tsx` — shadcn primitives in use: `alert`, `avatar`, `badge`, `button`, `card`, `chart`, `dialog`, `hover-card`, `input`, `progress`, `table`, `tabs`.
- `hooks/`, top-level `lib/.gitkeep` — empty placeholders.

## Dev commands

```bash
bun install          # or: npm install
bun run dev          # next dev --turbopack (http://localhost:3000)
bun run build        # next build
bun run start        # next start
bun run lint         # eslint
bun run typecheck    # tsc --noEmit
bun run format       # prettier --write "**/*.{ts,tsx}"
```

Node 18+ (or Bun) is required; the repo commits both `bun.lock` and `package-lock.json`.

## Deployment

- **Host**: Vercel. `vercel.json` pins the project name to `frenchie-now`. Production deploys are triggered by pushing `main` to `BRYNTLY-ORG/FRENCHIE_NOW`.
- **`deploy.sh`**: a developer convenience that appends a `// Cache buster: <timestamp>` line and force-pushes a commit. Note that the script writes to `next.config.ts`, while the actual config file is `next.config.mjs` — running it as-is creates a stray `next.config.ts` rather than busting the real config.
- **Next config**: `next.config.mjs` exports an empty `NextConfig`; no custom rewrites, headers, or image domains are configured. All `<Image>` sources are local under `/images/`.

## Repository governance

This repo is part of the `BRYNTLY-ORG` automated agent fleet. See:

- `AGENTS.md` — full rundown of the AI reviewer fleet (Copilot, Claude, Codex, Gemini, ChatGPT-Codex-Connector, Sentry, Ollama Cloud Kimi/GLM/MiniMax) and lifecycle workflows under `.github/workflows/`.
- `CLAUDE.md` — Claude Code project instructions.
- `PROD_SPEC.md` — the **living contract** for this repo's mission, critical path, and health baselines. Agents must consult it before triage, refactors, or feature work.
- `PROJECT/Docs/LESSONS_LEARNED.md` — institutional memory; agents append entries after every successful autonomous fix.
- `PROJECT/Docs/GLOBAL_TACTICAL_PLAYBOOK.md` — org-wide tactical playbook synced from `REPO_BOOTSTRAP`.
- `PROJECT/Shared/safety-guard.mjs` — compliance checker agents must run before opening PRs.

## Known gaps and follow-ups

- `next-themes` and `framer-motion` are paid for in the bundle but unused. Either wire the `ThemeProvider` into `app/layout.tsx` and add a toggle, or drop the deps.
- `deploy.sh` targets the wrong config filename (`next.config.ts` vs `next.config.mjs`).
- `calculateOffspring` is a rarity-bucket mock. A real Punnett-square solver across all nine loci is a natural next step.
- `hooks/` and the top-level `lib/.gitkeep` are empty placeholders kept for shadcn-CLI scaffolding.
- No automated tests yet (`vitest`/`jest` are not installed); CI relies on `lint` + `typecheck` + agent review.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```

Components are written to `components/ui/`, matching the aliases in `components.json`. Use them via:

```tsx
import { Button } from "@/components/ui/button";
```
