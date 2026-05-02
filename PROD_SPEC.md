# PROD_SPEC.md — FRENCHIE_NOW

> **Living Contract.** This document is the source of truth for this repository's mission, production targets, critical path, and health baselines. AI agents must consult it before triage, refactoring, or feature work, and must obtain explicit human approval before modifying it (per `AGENTS.md`).

---

## 1. Mission

FRENCHIE.NOW is a static-data, single-tenant **Next.js 16 App Router** web experience that educates breeders, buyers, and enthusiasts about French Bulldog coat genetics and the speculative market around exotic variations. It does this through four product surfaces:

1. **DNA Visualizer** (`/dna`) — inspect the nine-locus genotype of any of 18 curated Frenchie types.
2. **Breeding Calculator** (`/breeding`) — pick a sire and dam, see a probability distribution of likely offspring, and get an explicit safety warning on Merle × Merle pairings.
3. **Market Insights** (`/market`) — visualize price trends, demand vs. supply, and rarity-tier distribution.
4. **Investment Recommendations** (`/recommend`) — rank types by Buy/Hold/Breed/Flip score using a deterministic, rarity-driven scoring engine.

The site does **not** ingest real market data, store user accounts, or persist anything. All numbers shown to users come from `lib/genetics.ts` and `lib/market-data.ts`, computed at build / render time.

---

## 2. Production targets

| Target | Value | Where it lives |
|--------|-------|----------------|
| Runtime | Vercel serverless (Edge-compatible Next.js 16) | `vercel.json` (`name: frenchie-now`) |
| Deploy trigger | Push to `main` on `BRYNTLY-ORG/FRENCHIE_NOW` | Vercel GitHub integration |
| Node baseline | Node 18+ (Bun supported; both lockfiles checked in) | `package.json`, `bun.lock`, `package-lock.json` |
| Bundler | Turbopack in dev (`next dev --turbopack`); Next default for `build` | `package.json` scripts |
| Browser baseline | Modern evergreen (ES2017 target, `dom.iterable`, `esnext` libs) | `tsconfig.json` |
| Image strategy | Local-only PNG assets under `public/images/` served via `next/image` | `app/page.tsx`, `app/dna/page.tsx`, etc. |

There is no staging environment, no custom domain configured in-repo, and no environment-variable surface (no `.env*` references in source).

---

## 3. Critical path

The user-visible critical path that must keep working on every change:

1. **Landing render** (`/`) — `app/page.tsx` iterates `frenchieTypes` from `lib/genetics.ts`. Each card requires:
   - the matching PNG at `/images/<id>.png`,
   - a non-empty `name`, `description`, `rarity`, `healthNotes`,
   - shadcn `Card`, `Badge`, `Button` primitives.
2. **DNA deep link** (`/dna?type=<id>`) — `app/dna/page.tsx` reads `useSearchParams()` inside a `<Suspense>` boundary. Breaking the Suspense wrapper or removing the param contract breaks the homepage CTA.
3. **DNA diagram** (`components/DNADiagram.tsx`) — depends on the `LOCI_NAMES` array shape and on `Genotype` keys matching `LOCI_NAMES.map(n => n.replace(" ", ""))`. Renaming a locus name without updating both sides breaks every type's diagram silently.
4. **Breeding safety alert** (`app/breeding/page.tsx` + `calculateOffspring`) — the **Merle × Merle unsafe flag** is a non-negotiable user-facing safety message. Any refactor of `calculateOffspring` must preserve the `isUnsafe` boolean and its derivation from `genotype.Merle.alleles`.
5. **Recharts pipeline** — `/breeding`, `/market`, `/recommend` all rely on Recharts `3.8.0`. CSS variables consumed (`--color-primary`, `--color-chart-1..5`, `--color-common/uncommon/rare/exotic/ultra`) are declared in `app/globals.css`; renaming or deleting them silently breaks chart colors.
6. **Build + lint + typecheck must pass** — `next build`, `eslint`, and `tsc --noEmit` are the only automated correctness gates. There is no test suite.

---

## 4. Data contracts

### `FrenchieType` (`lib/genetics.ts`)
- `id: string` — kebab-case, must match a PNG filename in `public/images/`.
- `name, description, healthNotes: string` — surfaced in cards and detail panels.
- `rarity: "Common" | "Uncommon" | "Rare" | "Exotic" | "Ultra-Exotic"` — drives every market-data lookup; new values require simultaneous updates in `lib/market-data.ts` and `app/globals.css` (`--color-<rarity>` tokens).
- `genotype: Record<LocusKey, Locus>` — must include all nine loci. Missing loci silently break the DNA diagram.
- `imageUrl: string` — must resolve from `/public`.

### `MarketData` (`lib/market-data.ts`)
- `priceRange: [number, number]`
- `demandScore, supplyScore, buyScore, holdScore, breedScore, flipScore: 0..100`
- `recommendation: "Buy" | "Hold" | "Breed" | "Flip"` — derived from the maximum action score.

Special-case overrides (must be preserved on refactor):
- Any `id.includes("fluffy")` → `maxPrice = 45000`.
- `id === "new-shade-isabella"` → `maxPrice = 40000`.

### Static datasets
- `marketTrendData` — six points, 2020–2025.
- `rarityDistribution` — five tiers, must sum to 100.
- `LOCI_NAMES` — the canonical render order for `DNADiagram`.

---

## 5. Health baselines

| Signal | Baseline | How to verify |
|--------|----------|---------------|
| `next build` | succeeds with zero type errors | `bun run build` |
| `tsc --noEmit` | clean | `bun run typecheck` |
| `eslint` | clean (Next core-web-vitals + TS configs) | `bun run lint` |
| Image integrity | every `frenchieTypes[i].imageUrl` resolves | manual grep / 200 OK in browser |
| Rarity tokens | `--color-{common,uncommon,rare,exotic,ultra}` defined in `app/globals.css` | grep `app/globals.css` |
| Suspense contract | `app/dna/page.tsx` keeps `useSearchParams()` inside `<Suspense>` | inspect file |
| Merle safety flag | `calculateOffspring` returns `isUnsafe: true` for Merle × Merle | inspect `lib/genetics.ts` |

There is **no production telemetry, error tracker, or RUM** wired in this repo today. Sentry is referenced in the org-wide agent fleet but no DSN, init call, or `Sentry.init` exists in source.

---

## 6. Infrastructure & automation

### Hosting
- **Vercel** — sole runtime. No Docker, no self-hosting, no external services. The deployment unit is the entire repo.

### CI / Agent fleet (`.github/workflows/`)
This repo participates in the org-wide automated review fleet defined in `AGENTS.md`. Active workflows:
- `auto-assign-agents.yml`, `auto-fix-review.yml`, `auto-merge.yml`, `auto-resolve-conflicts.yml`, `auto-rollback.yml`
- `agent-thread-dispatch.yml`, `auto-approve-bot-runs.yml`, `dependabot-auto-approve.yml`
- `claude-code-action.yml`, `copilot-setup-steps.yml`, `ollama-pr-review.yml`
- `delete-old-workflow-runs.yml`, `stale.yml`
- `ci-doctor-{claude,codex,copilot}.md` — `gh aw` agentic CI doctor specs.

### Reviewer agents (per `AGENTS.md`)
Copilot, Claude (Anthropic), Codex (OpenAI), Gemini Code Assist, ChatGPT Codex Connector, Sentry, and Ollama Cloud (Kimi `kimi-k2.6:cloud`, GLM `glm-5.1:cloud`, MiniMax `minimax-m2.7:cloud`).

### Secrets / variables expected at the org level
`AGENT_APP_ID`, `AGENT_APP_PRIVATE_KEY`, `BOOTSTRAP_APP_ID`, `BOOTSTRAP_APP_PRIVATE_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, `ANTHROPIC_API_KEY`, `CODEX_API_KEY`/`OPENAI_API_KEY`, `OLLAMA_API_KEY`, `AGENT_PAT`, `REPO_BOOTSTRAP_PAT`. None are required by the app code itself.

### `deploy.sh` defect (open)
The script appends a cache-buster comment to `next.config.ts`, but the actual config is `next.config.mjs`. Running it creates a stray `next.config.ts` instead of busting the real config. Do not rely on this script as a deploy mechanism — push to `main` instead.

---

## 7. Known dead weight

These exist in the repo but are **not on the critical path**. Removing them is safe but should be done deliberately:

- `framer-motion ^12.38.0` — declared in `package.json`; zero imports in any `.tsx` source.
- `next-themes ^0.4.6` + `components/theme-provider.tsx` — provider is exported but never mounted in `app/layout.tsx`. The `d`-key dark-mode hotkey is therefore dormant.
- `hooks/.gitkeep`, `components/.gitkeep`, `lib/.gitkeep` — placeholder scaffolding.

---

## 8. Safety rules (forbidden without explicit human approval)

- Modifying this `PROD_SPEC.md` (per `AGENTS.md` § Repository Contracts).
- Removing or weakening the Merle × Merle unsafe warning in `/breeding`.
- Changing the `FrenchieType.rarity` union without updating `lib/market-data.ts` and `app/globals.css` rarity tokens together.
- Deleting any of the 18 entries in `frenchieTypes` (each is a published deep-link target via `/dna?type=<id>` from the homepage).
- Skipping pre-commit hooks (`--no-verify`) or signing (`--no-gpg-sign`) in agent commits.
- Using mutable GitHub Action tags; pin to commit SHA per `AGENTS.md` § Immutable Security Standards.

---

## 9. Roadmap-shaped follow-ups

These are enhancements, not contracts. Recorded here so agents can pick them up when prompted:

1. Wire `ThemeProvider` into `app/layout.tsx` (or remove `next-themes` + `theme-provider.tsx`).
2. Replace `calculateOffspring`'s rarity-bucket heuristic with an actual nine-locus Punnett-square solver.
3. Fix `deploy.sh` to target `next.config.mjs`, or delete the script and document `git push origin main` as the deploy path.
4. Introduce a test runner (`vitest` is the natural fit given the ESM setup) and seed it with regression tests around `calculateOffspring` and the Merle-safety rule.
5. Decide on real market-data ingestion vs. permanently labelling the current dashboards as illustrative mock data.

---

*Source of truth maintained by humans. Last comprehensive audit performed by Claude Opus 4.7 on 2026-05-02.*
