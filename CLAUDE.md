# CLAUDE.md — FRENCHIE_NOW (Canine Genetics & Market)

Next.js 16 application for managing and analyzing canine genetics, breeding, and market data. Built for breeders and enthusiasts.

## Routes / surfaces

- `/dna` — DNA analysis: visualize and analyze genetic traits, custom DNA diagram component
- `/breeding` — breeding planner / outcome simulator
- `/market` — marketplace: browse + analyze market trends
- `/recommend` — recommendations based on genetic + market data
- Light/dark theme via `next-themes`; built with shadcn/ui and Tailwind

## Stack

- Next.js 16.1.7 (App Router) with **Turbopack** (`next dev --turbopack`)
- React 19.2.4, TypeScript
- Tailwind CSS, shadcn/ui (Radix primitives)
- Framer Motion (`motion`) for animations
- Recharts for charts
- `next-themes` for light/dark
- Node 18+ (or Bun) for tooling

## Dev commands

```bash
npm install                  # or bun install / yarn
npm run dev                  # next dev --turbopack
npm run build                # next build
npm run start                # next start
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
npm run format               # prettier --write "**/*.{ts,tsx}"
```

## Layout

- `app/` — Next.js App Router routes (`/dna`, `/breeding`, `/market`, `/recommend`, root, layouts)
- `components/` — React components (incl. custom DNA diagram, charts, marketplace UI)
- `hooks/` — React hooks
- `lib/` — utilities (data, helpers, integrations)
- `public/` — static assets
- `node_modules/`, `.next/` — generated; ignore

## Entry points

- `app/page.tsx` (and per-route `page.tsx`)
- `components/` — DNA diagram, breeding planner UI, marketplace tables
- `lib/` — data sources / helpers (likely the place to wire real data sources)

## Gotchas

- Dev server uses **Turbopack** (not webpack). Some Webpack-only plugins won't work as-is.
- `next-themes` requires a client-side hydration step — pages that render theme-conditional UI must avoid SSR mismatch (`mounted` flag).
- `motion` (Framer Motion successor) and `recharts` interact awkwardly with React 19 strict effects in some cases — when you see double-mount artifacts, suspect this.
- shadcn/ui components are pulled in at install time, not as a dependency — diff `components/ui/` rather than upgrading a package.

## Don't touch

- `node_modules/`, `.next/`
- `PROJECT/Docs/` — incident-driven additions to `LESSONS_LEARNED.md` only
