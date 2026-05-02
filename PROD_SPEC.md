# PROD_SPEC.md — FRENCHIE_NOW

> **Living Contract.** This is the source of truth for this repository's product mission, baseline contract, and current actual state. The document has two parts with two different owners:
>
> - **Part 1 (Intended Specification)** — governed by **humans**. AI agents must obtain explicit human approval (per `AGENTS.md`) before modifying anything in Part 1.
> - **Part 2 (Current Actual State)** — governed by **autonomous agents**. Agents may (and should) update Part 2 to reflect what is actually implemented in the repository, without human pre-approval, as long as the update is faithful to the code on disk.
>
> Whenever Part 2 drifts from Part 1, the drift itself is a signal. Either the implementation must catch up to Part 1, or a human must consciously update Part 1 to match the new reality.

---

# Part 1 — Intended Specification (Human-Governed Baseline Contract)

> Owner: humans. Agents must request explicit approval before editing this section.

## 1.1 Product mission

FRENCHIE.NOW is a **static-data, single-tenant, education-first web experience** about French Bulldog coat genetics and the speculative market around exotic variations. It exists to:

1. Teach breeders, buyers, and enthusiasts how the nine canine color/coat loci compose into the visible Frenchie phenotype.
2. Make breeding outcomes legible — including the **non-negotiable Merle × Merle safety warning**.
3. Visualize the speculative market (price, demand, supply, rarity) using deterministic, reproducible, illustrative data.
4. Rank types by Buy / Hold / Breed / Flip score using a transparent, rarity-driven scoring engine.

Out of scope by design (today):
- No user accounts, no auth, no persistence.
- No real-time market ingestion. All "market" numbers are illustrative and computed deterministically from `lib/market-data.ts`.
- No backend services. The deployment unit is a single Next.js app on Vercel.

## 1.2 Future goals (intent, not yet implemented)

These are the directional goals Part 1 commits to. They define the runway Part 2 should be migrating toward. Reorder or remove only with human approval.

1. **Real Punnett-square solver** — replace the rarity-bucket heuristic in `calculateOffspring` with an actual nine-locus Mendelian solver that produces correct allele probabilities per locus.
2. **Working dark mode** — wire `ThemeProvider` from `components/theme-provider.tsx` into `app/layout.tsx` so the `d`-key dark/light hotkey actually toggles the theme.
3. **Test runner** — introduce `vitest` (chosen for ESM compatibility with this Next 16 / Tailwind 4 stack) with regression tests for the Merle-safety rule and the rarity scoring engine.
4. **Real or honestly-labelled market data** — either (a) ingest a real data source for `marketTrendData`, or (b) prominently label all market dashboards as "illustrative model output, not real transactions."
5. **Deploy script repaired or removed** — fix `deploy.sh` so it targets `next.config.mjs` (not the non-existent `next.config.ts`), or delete it and document `git push origin main` as the only deploy path.
6. **Telemetry** — wire a real production error tracker (Sentry is referenced org-wide; no DSN currently in this repo) so production regressions are observable.

## 1.3 Critical path (must keep working on every change)

1. **Landing render** (`/`) renders one card per entry in `frenchieTypes` from `lib/genetics.ts`. Each card requires a resolvable `imageUrl`, a non-empty `name`, `description`, `rarity`, and `healthNotes`.
2. **DNA deep link** (`/dna?type=<id>`) — `app/dna/page.tsx` reads `useSearchParams()` from inside a `<Suspense>` boundary. Removing the Suspense wrapper or breaking the `?type=<id>` contract breaks the homepage CTA.
3. **DNA diagram** — `components/DNADiagram.tsx` depends on `LOCI_NAMES` and on `Genotype` keys matching `LOCI_NAMES.map(n => n.replace(" ", ""))`. Renaming a locus on one side without the other silently empties the diagram.
4. **Breeding safety alert** — `app/breeding/page.tsx` must surface the destructive `<Alert>` whenever both parents have an `M` allele in `genotype.Merle`. The `isUnsafe` boolean returned by `calculateOffspring` is the contract; it must remain a public part of that function's return type.
5. **Recharts pipeline** — `/breeding`, `/market`, `/recommend` all rely on Recharts. The CSS variables `--color-primary`, `--color-chart-1..5`, and `--color-{common,uncommon,rare,exotic,ultra}` declared in `app/globals.css` are consumed by these charts.
6. **Build + lint + typecheck must pass.** `next build`, `eslint`, and `tsc --noEmit` are the only automated correctness gates today; there is no test suite yet (see goal 1.2.3).

## 1.4 Service-Level Agreements (SLAs)

Because this is a static-data marketing/education site on Vercel with no backend, SLAs are framed as render and integrity targets, not uptime against external systems.

| Surface | Target | Owner |
|---------|--------|-------|
| Build | `next build` succeeds with zero TypeScript errors and zero ESLint errors | CI / `auto-fix-review` agents |
| Cold render p95 (Vercel CDN) | ≤ 1.5s for `/`, `/dna`, `/breeding`, `/market`, `/recommend` (server-rendered or static; no client data fetches) | Vercel |
| Image load | Every `frenchieTypes[i].imageUrl` resolves to an asset under `public/images/` (200 OK) | Repo contributors |
| Deploy lead time | Push-to-`main` → Vercel preview live ≤ 5 minutes (Vercel GitHub integration) | Vercel |
| Merle × Merle safety alert | Surfaced on **100%** of pairings where both parents carry an `M` allele. Zero tolerance for regression. | Repo contributors + agent reviewers |
| DNA diagram completeness | 9 / 9 loci rendered for every type in `frenchieTypes` | Repo contributors |
| Rarity token integrity | All five tiers (`common`, `uncommon`, `rare`, `exotic`, `ultra`) defined as CSS custom properties before any chart consumes them | Repo contributors |
| Telemetry | None today — see goal 1.2.6. Until that goal lands, "SLA" for production errors is best-effort, surfaced via Vercel deployment logs only | (gap) |

## 1.5 Safety rules (forbidden without explicit human approval)

- Modifying anything in **Part 1** of this `PROD_SPEC.md`. (Part 2 is agent-governed and may be updated freely as long as it stays faithful to the code.)
- Removing or weakening the Merle × Merle unsafe warning in `/breeding`.
- Changing the `FrenchieType.rarity` union without simultaneously updating `lib/market-data.ts` and `app/globals.css` rarity tokens.
- Deleting any of the entries in `frenchieTypes` (each is a published deep-link target via `/dna?type=<id>`).
- Skipping pre-commit hooks (`--no-verify`) or signing (`--no-gpg-sign`) in agent commits.
- Using mutable GitHub Action tags; pin to commit SHA per `AGENTS.md` § Immutable Security Standards.

---

# Part 2 — Current Actual State (Agent-Governed Snapshot)

> Owner: autonomous agents. Update this section whenever the implementation drifts. Keep it faithful to the code on disk; do not mistake intent for implementation.

## 2.1 Implemented features (as of this snapshot)

| Feature | Route / file | Status |
|---------|--------------|--------|
| Landing grid of 18 Frenchie types | `app/page.tsx` + `lib/genetics.ts#frenchieTypes` | ✅ implemented |
| DNA Visualizer with `?type=<id>` deep link | `app/dna/page.tsx` (`<Suspense>` wrapped), `components/DNADiagram.tsx` | ✅ implemented |
| Search-by-name on `/dna` | `app/dna/page.tsx` (`useState` + `useMemo` filter) | ✅ implemented |
| Breeding Calculator (sire + dam pickers) | `app/breeding/page.tsx`, `lib/genetics.ts#calculateOffspring` | ✅ implemented |
| Merle × Merle unsafe alert | `app/breeding/page.tsx` (destructive `<Alert>`) gated on `isUnsafe` from `calculateOffspring` | ✅ implemented |
| Offspring probability bar chart + table | `app/breeding/page.tsx` via Recharts `BarChart` | ✅ implemented |
| Market Insights (4 charts) | `app/market/page.tsx` — `LineChart`, `BarChart`, `ScatterChart`, `PieChart` | ✅ implemented |
| Investment Recommendations (radar + ranked cards) | `app/recommend/page.tsx` — `RadarChart`, stacked `BarChart`, ranked `<Card>` grid | ✅ implemented |
| shadcn/ui primitives | `components/ui/` (alert, avatar, badge, button, card, chart, dialog, hover-card, input, progress, table, tabs) | ✅ present |
| Sticky top navbar with route links | `components/Navbar.tsx` | ✅ implemented |
| Light/dark CSS variables and `.dark` class block | `app/globals.css` | ✅ defined |
| Active dark-mode toggle | `components/theme-provider.tsx` exists with a `d`-key hotkey **but is never mounted in `app/layout.tsx`** | ⚠️ dormant — does not work in production |
| Real Punnett-square offspring solver | — | ❌ not implemented (current logic in `calculateOffspring` is a rarity-bucket heuristic with `Math.abs(...) <= 1.5` filtering) |
| Test suite | `package.json` defines no `test` script; no `vitest` / `jest` config; no `__tests__/` directory | ❌ not implemented |
| Production telemetry / error tracker (Sentry, etc.) | No `Sentry.init`, no DSN, no `process.env` references in `app/`, `lib/`, or `components/` | ❌ not implemented |
| Working `deploy.sh` | Script appends a cache-buster comment to `next.config.ts`, but the actual config file is `next.config.mjs` — running it creates a stray `next.config.ts` instead of busting the real one | 🐞 broken |

## 2.2 Routes and exposed endpoints

The app exposes only static / Vercel-rendered Next.js routes. There are no API routes, no edge functions, no webhooks, no server actions in this repo today.

| Method | Path | Handler | Notes |
|--------|------|---------|-------|
| GET | `/` | `app/page.tsx` | Server component; renders 18 cards from `frenchieTypes` |
| GET | `/dna` | `app/dna/page.tsx` | Client component (`"use client"`); reads `?type=<id>` via `useSearchParams()` inside `<Suspense>` |
| GET | `/breeding` | `app/breeding/page.tsx` | Client component; sire/dam `<select>` + Recharts `BarChart` + table |
| GET | `/market` | `app/market/page.tsx` | Client component; 4 Recharts charts + tips card |
| GET | `/recommend` | `app/recommend/page.tsx` | Client component; radar + stacked bar + ranked card grid |
| GET | `/favicon.ico` | `app/favicon.ico` | Static |
| GET | `/images/*.png` | `public/images/` | 18 PNG assets, one per `frenchieTypes` entry |

No `app/api/` directory exists. No `route.ts` / `route.tsx` files exist.

## 2.3 Data contracts (as encoded in code)

### `FrenchieType` — `lib/genetics.ts`
- `id: string` — kebab-case; must match a PNG in `public/images/`.
- `name`, `description`, `healthNotes`: `string`.
- `rarity`: `"Common" | "Uncommon" | "Rare" | "Exotic" | "Ultra-Exotic"` — the union is consumed by `lib/market-data.ts#getMarketDataForType` (switch) and by `app/globals.css` (`--color-{common,uncommon,rare,exotic,ultra}`).
- `genotype: Record<LocusKey, Locus>` — must include all nine loci named in `LOCI_NAMES`.
- `imageUrl: string` — must resolve under `/public`.
- `frenchieTypes` array currently contains **18** entries.

### `MarketData` — `lib/market-data.ts`
- `priceRange: [number, number]`.
- `demandScore`, `supplyScore`, `buyScore`, `holdScore`, `breedScore`, `flipScore`: numbers in `0..100`.
- `recommendation: "Buy" | "Hold" | "Breed" | "Flip"` — derived from the maximum action score (with fallback to `"Hold"`).
- Hard-coded overrides currently present:
  - `id.includes("fluffy")` → `maxPrice = 45000`.
  - `id === "new-shade-isabella"` → `maxPrice = 40000`.

### Static datasets
- `marketTrendData` — six points, `2020`–`2025`.
- `rarityDistribution` — five tiers; values sum to `100`.
- `LOCI_NAMES = ["Brown", "Dilution", "Dominant Black", "Agouti", "Merle", "Piebald", "Extension", "Cocoa", "Fluffy"]` — the canonical render order for `DNADiagram`.

## 2.4 Dependencies (from `package.json`)

### Runtime
- `next@16.1.7` (App Router, Turbopack in dev)
- `react@^19.2.4`, `react-dom@^19.2.4`
- `recharts@3.8.0`
- `radix-ui@^1.4.3`
- `lucide-react@^1.8.0`
- `class-variance-authority@^0.7.1`, `clsx@^2.1.1`, `tailwind-merge@^3.5.0`
- `tw-animate-css@^1.4.0`
- `shadcn@^4.4.0`
- `framer-motion@^12.38.0` — **declared but not imported anywhere in `app/`, `components/`, or `lib/`** (dead weight)
- `next-themes@^0.4.6` — **imported by `components/theme-provider.tsx` but the provider is never mounted** (dormant)

### Dev
- `typescript@^5.9.3`, `@types/node@^25.5.0`, `@types/react@^19.2.14`, `@types/react-dom@^19.2.3`
- `eslint@^9.39.4`, `eslint-config-next@16.1.7`, `@eslint/eslintrc@^3`
- `tailwindcss@^4.2.1`, `@tailwindcss/postcss@^4.2.1`, `postcss@^8`
- `prettier@^3.8.1`, `prettier-plugin-tailwindcss@^0.7.2`

Lockfiles checked in: both `bun.lock` and `package-lock.json`.

## 2.5 Build / runtime configuration

- `next.config.mjs` — empty config object.
- `tsconfig.json` — `target: "ES2017"`, `strict: true`, `moduleResolution: "bundler"`, path alias `@/* → ./*`.
- `eslint.config.mjs` — extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`; explicitly re-applies the default ignore list.
- `postcss.config.mjs` — `@tailwindcss/postcss` plugin only.
- `vercel.json` — `{ "name": "frenchie-now" }` only. No regions, no env, no rewrites.
- `components.json` — shadcn config; style `radix-nova`, base color `neutral`, RSC enabled, icon library `lucide`.
- npm scripts: `dev` (`next dev --turbopack`), `build`, `start`, `lint`, `format`, `typecheck`. **No `test` script.**

## 2.6 Secrets and environment surface

**The application code itself reads zero environment variables.** A repo-wide search across `app/`, `lib/`, and `components/` for `process.env`, `API_KEY`, `TOKEN`, `SECRET`, and `Sentry` returns no matches. There is no `.env`, `.env.local`, or `.env.example` checked in. `.gitignore` excludes `.env*.local`.

The org-level secrets and variables referenced by `AGENTS.md` are consumed only by GitHub Actions / agent infrastructure, **not by the deployed app**:

| Name | Type | Used by |
|------|------|---------|
| `AGENT_APP_ID` | variable | GitHub App auth for agent workflows |
| `AGENT_APP_PRIVATE_KEY` | secret | GitHub App auth for agent workflows |
| `BOOTSTRAP_APP_ID` | variable | Bootstrap tooling for agent workflows |
| `BOOTSTRAP_APP_PRIVATE_KEY` | secret | Bootstrap tooling for agent workflows |
| `CLAUDE_CODE_OAUTH_TOKEN` | secret | `claude-code-action` workflow |
| `ANTHROPIC_API_KEY` | secret | Claude / Anthropic agent calls |
| `CODEX_API_KEY` / `OPENAI_API_KEY` | secret | Codex / ChatGPT connector reviews |
| `OLLAMA_API_KEY` | secret | `ollama-pr-review` workflow |
| `AGENT_PAT`, `REPO_BOOTSTRAP_PAT` | secret | PAT-based fallback auth for workflows |

## 2.7 CI / Agent fleet (`.github/workflows/`)

YAML workflows currently present:
`agent-thread-dispatch.yml`, `auto-approve-bot-runs.yml`, `auto-assign-agents.yml`, `auto-fix-review.yml`, `auto-merge.yml`, `auto-resolve-conflicts.yml`, `auto-rollback.yml`, `claude-code-action.yml`, `copilot-setup-steps.yml`, `delete-old-workflow-runs.yml`, `dependabot-auto-approve.yml`, `ollama-pr-review.yml`, `stale.yml`.

`gh aw` agentic specs (Markdown):
`ci-doctor-claude.md`, `ci-doctor-codex.md`, `ci-doctor-copilot.md`.

Reviewer agents wired (per `AGENTS.md`): GitHub Copilot, Claude (Anthropic), Codex (OpenAI), Gemini Code Assist, ChatGPT Codex Connector, Sentry, Ollama Cloud (`kimi-k2.6:cloud`, `glm-5.1:cloud`, `minimax-m2.7:cloud`).

## 2.8 Hosting / deploy

- **Vercel** — sole runtime. Project name `frenchie-now` (`vercel.json`).
- Deploy trigger: push to `main` on `BRYNTLY-ORG/FRENCHIE_NOW` via Vercel's GitHub integration.
- No Docker, no custom domain configured in-repo, no staging environment.
- `deploy.sh` is present but **broken** (writes to `next.config.ts` while the real config is `next.config.mjs`); do not use it. Push to `main` instead.

## 2.9 Known dead weight (in repo, off the critical path)

- `framer-motion ^12.38.0` — declared in `package.json`; zero imports in `.tsx` source.
- `next-themes ^0.4.6` + `components/theme-provider.tsx` — provider exported but never mounted. The `d`-key hotkey is dormant.
- `hooks/.gitkeep`, `components/.gitkeep`, `lib/.gitkeep` — placeholder scaffolding.
- `deploy.sh` — broken; see 2.5 / 2.8.

---

*Part 1 last reviewed by humans: pending.  
Part 2 last refreshed by an autonomous agent (Claude Opus 4.7) on 2026-05-02.*
