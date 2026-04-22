// lib/market-data.ts
// Price data, rarity weights, and recommendation scores

import { FRENCHIE_TYPES, FrenchieType, getHealthRiskScore, getRarityMultiplier } from './genetics';

export interface PriceData {
  min: number;
  max: number;
  avg: number;
  median: number;
  trend: 'rising' | 'stable' | 'falling';
  demandScore: number; // 1-10
  supplyScore: number; // 1-10
}

export interface Recommendation {
  type: FrenchieType;
  buyScore: number;
  holdScore: number;
  breedScore: number;
  flipScore: number;
  rationale: string[];
  tags: string[];
}

export const PRICE_DATA: Record<string, PriceData> = {
  brindle: { min: 3000, max: 5000, avg: 3800, median: 3500, trend: 'stable', demandScore: 6, supplyScore: 8 },
  fawn: { min: 3500, max: 6000, avg: 4500, median: 4200, trend: 'stable', demandScore: 7, supplyScore: 7 },
  cream: { min: 4000, max: 7000, avg: 5200, median: 5000, trend: 'rising', demandScore: 7, supplyScore: 6 },
  blue: { min: 6000, max: 12000, avg: 8500, median: 8000, trend: 'rising', demandScore: 8, supplyScore: 5 },
  chocolate: { min: 7000, max: 15000, avg: 10000, median: 9500, trend: 'rising', demandScore: 8, supplyScore: 4 },
  lilac: { min: 15000, max: 35000, avg: 22000, median: 20000, trend: 'rising', demandScore: 9, supplyScore: 2 },
  isabella: { min: 25000, max: 60000, avg: 38000, median: 35000, trend: 'rising', demandScore: 9, supplyScore: 1 },
  'new-shade-isabella': { min: 40000, max: 100000, avg: 65000, median: 60000, trend: 'rising', demandScore: 10, supplyScore: 1 },
  black: { min: 5000, max: 9000, avg: 6500, median: 6000, trend: 'stable', demandScore: 7, supplyScore: 6 },
  'blue-tan': { min: 12000, max: 25000, avg: 17000, median: 16000, trend: 'rising', demandScore: 9, supplyScore: 2 },
  'chocolate-tan': { min: 15000, max: 30000, avg: 20000, median: 18000, trend: 'rising', demandScore: 9, supplyScore: 2 },
  'lilac-tan': { min: 25000, max: 55000, avg: 35000, median: 32000, trend: 'rising', demandScore: 10, supplyScore: 1 },
  'blue-merle': { min: 18000, max: 40000, avg: 26000, median: 24000, trend: 'rising', demandScore: 9, supplyScore: 1 },
  'chocolate-merle': { min: 22000, max: 50000, avg: 32000, median: 30000, trend: 'rising', demandScore: 9, supplyScore: 1 },
  'lilac-merle': { min: 35000, max: 80000, avg: 52000, median: 48000, trend: 'rising', demandScore: 10, supplyScore: 1 },
  pied: { min: 4000, max: 8000, avg: 5800, median: 5500, trend: 'stable', demandScore: 7, supplyScore: 6 },
  fluffy: { min: 15000, max: 40000, avg: 24000, median: 22000, trend: 'rising', demandScore: 9, supplyScore: 1 },
  platinum: { min: 12000, max: 30000, avg: 18000, median: 16000, trend: 'rising', demandScore: 8, supplyScore: 2 },
};

export function getPriceData(typeId: string): PriceData {
  return PRICE_DATA[typeId] || PRICE_DATA['brindle'];
}

export function generateRecommendations(): Recommendation[] {
  const recs: Recommendation[] = FRENCHIE_TYPES.map((t) => {
    const price = getPriceData(t.id);
    const rarityMult = getRarityMultiplier(t.rarity);
    const healthRisk = getHealthRiskScore(t);
    const roi = (price.demandScore / price.supplyScore) * rarityMult;
    const affordability = 10 - Math.min(10, Math.log10(price.avg / 1000) * 2);

    const buyScore = Math.min(100, Math.round((affordability * 0.4 + (10 - healthRisk) * 0.3 + price.demandScore * 0.3) * 10));
    const holdScore = Math.min(100, Math.round((price.trend === 'rising' ? 8 : price.trend === 'stable' ? 5 : 3) * 10));
    const breedScore = Math.min(100, Math.round(((10 - healthRisk) * 0.5 + price.demandScore * 0.3 + rarityMult * 5) * 5));
    const flipScore = Math.min(100, Math.round((roi * 2 + price.demandScore * 3 + (price.trend === 'rising' ? 10 : 5) * 2)));

    const rationale: string[] = [];
    const tags: string[] = [];

    if (buyScore >= 80) {
      rationale.push('Excellent entry price point for the market.');
      tags.push('Best Value');
    }
    if (holdScore >= 80) {
      rationale.push('Strong upward price trend — hold for appreciation.');
      tags.push('Appreciation');
    }
    if (breedScore >= 80 && healthRisk <= 2) {
      rationale.push('Low health risk + high demand makes this ideal for breeding programs.');
      tags.push('Breeding Stock');
    }
    if (flipScore >= 70 && rarityMult >= 4) {
      rationale.push('High rarity + strong demand = fastest resale margin.');
      tags.push('Flip Potential');
    }
    if (rarityMult >= 8) {
      rationale.push('Ultra-rare genetic profile — blue-chip asset in Frenchie market.');
      tags.push('Blue Chip');
    }
    if (healthRisk >= 3) {
      rationale.push('Higher health risk requires careful vetting of breeder lines.');
      tags.push('High Risk');
    }
    if (price.avg < 6000) {
      rationale.push('Low barrier to entry for new breeders.');
      tags.push('Beginner Friendly');
    }
    if (rationale.length === 0) {
      rationale.push('Solid all-around choice with balanced risk/reward.');
      tags.push('Balanced');
    }

    return { type: t, buyScore, holdScore, breedScore, flipScore, rationale, tags };
  });

  return recs.sort((a, b) => b.flipScore - a.flipScore);
}

export const BREEDING_TIPS = [
  'Always health test both parents for hip dysplasia, patella, BOAS, and degenerative myelopathy.',
  'Never breed Merle to Merle (MM double merles risk deafness/blindness).',
  'Dilutes (dd) can develop color dilution alopecia — verify coat quality in bloodlines.',
  'Breeding common colors often produces better litter size and maternal health.',
  'Rares command premium prices but require established buyer networks.',
  'Pairing a carrier (e.g., blue) with a visual of a rarer type maximizes diversity.',
];

export const MARKET_TRENDS = [
  { year: 2020, avgPrice: 3200, volume: 100 },
  { year: 2021, avgPrice: 4500, volume: 140 },
  { year: 2022, avgPrice: 5200, volume: 120 },
  { year: 2023, avgPrice: 5800, volume: 110 },
  { year: 2024, avgPrice: 6500, volume: 105 },
  { year: 2025, avgPrice: 7200, volume: 100 },
];

export const RARITY_DISTRIBUTION = [
  { name: 'Common', value: 45, color: '#ffc0cb' },
  { name: 'Uncommon', value: 25, color: '#ff69b4' },
  { name: 'Rare', value: 15, color: '#e0218a' },
  { name: 'Very Rare', value: 10, color: '#f06292' },
  { name: 'Ultra Rare', value: 5, color: '#d81b60' },
];
