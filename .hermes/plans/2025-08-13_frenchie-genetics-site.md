# French Bulldog Breeding Genetics Site — Implementation Plan

## Goal
Build a Next.js website for understanding French Bulldog breeding genetics, DNA diagrams, offspring probabilities, pricing data, and purchase recommendations.

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- Recharts for charts
- lucide-react for icons
- no external UI library (clean Tailwind implementation)

## Pages
1. **Home** — Overview of Frenchie genetics & types
2. **DNA Visualizer** — Visual diagrams showing genotype for each color/pattern type
3. **Breeding Calculator** — Select two parents, see offspring probabilities with Punnett-square style display
4. **Market Data** — Price charts by type, rarity factors, value over time
5. **Recommendations** — Best dogs to purchase with ROI/data-driven rankings

## Data Model (Frenchie Types)
- Base colors: Brindle, Fawn, Cream, White
- Dilutes: Blue, Lilac, Chocolate
- Patterns: Merle, Pied, Tan points
- Rare combos: Isabella, New Shade Isabella, Fluffy
- Genotypes tracked per type (e.g., B/b, D/d, M/m, K/k)

## Key Components
- `DNADiagram` — SVG visualization of allele pairs
- `PunnettSquare` — Offspring probability grid
- `ProbabilityChart` — Bar/pie chart for litter outcomes
- `PriceChart` — Value ranges by type
- `RecommendationCard` — Ranked purchase suggestions

## File Structure
```
app/
  page.tsx                 # Home
  layout.tsx               # Root layout
  globals.css              # Tailwind
  dna/
    page.tsx               # DNA diagrams per type
  breeding/
    page.tsx               # Mating calculator
  market/
    page.tsx               # Price/value data
  recommend/
    page.tsx               # Purchase recommendations
components/
  Navbar.tsx
  DNADiagram.tsx
  PunnettSquare.tsx
  ProbabilityChart.tsx
  PriceChart.tsx
  RecommendationList.tsx
lib/
  genetics.ts              # Genotype definitions, probability math
  market-data.ts           # Price data, rarity weights
```

## Implementation Steps
1. `npx create-next-app` with Tailwind, clean project
2. Install recharts, lucide-react
3. Build `lib/genetics.ts` — all genotype data and probability calculator
4. Build `lib/market-data.ts` — pricing tables
5. Build shared components (Navbar, Container)
6. Build DNA diagram page with SVG allele visuals
7. Build breeding calculator with interactive parent selection
8. Build market data page with Recharts bar/line charts
9. Build recommendations page with ranked cards and reasoning
10. Polish responsive design and verify build
