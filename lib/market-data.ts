import { FrenchieType, frenchieTypes } from "./genetics";

export interface MarketData {
  priceRange: [number, number];
  demandScore: number; // 1-100
  supplyScore: number; // 1-100
  recommendation: "Buy" | "Hold" | "Breed" | "Flip";
  buyScore: number;
  holdScore: number;
  breedScore: number;
  flipScore: number;
}

export const marketTrendData = [
  { year: "2020", price: 4500, volume: 1200 },
  { year: "2021", price: 6000, volume: 2000 },
  { year: "2022", price: 8500, volume: 3500 },
  { year: "2023", price: 7200, volume: 4200 },
  { year: "2024", price: 9500, volume: 5000 },
  { year: "2025", price: 12000, volume: 6500 },
];

export const rarityDistribution = [
  { name: "Common", value: 45, fill: "var(--color-common)" },
  { name: "Uncommon", value: 25, fill: "var(--color-uncommon)" },
  { name: "Rare", value: 15, fill: "var(--color-rare)" },
  { name: "Exotic", value: 10, fill: "var(--color-exotic)" },
  { name: "Ultra-Exotic", value: 5, fill: "var(--color-ultra)" },
];

// Mock pricing and scores based on rarity
export function getMarketDataForType(type: FrenchieType): MarketData {
  let basePrice = 3000;
  let maxPrice = 5000;
  let demand = 50;
  let supply = 80;

  switch (type.rarity) {
    case "Common":
      basePrice = 3000;
      maxPrice = 5000;
      demand = 60;
      supply = 90;
      break;
    case "Uncommon":
      basePrice = 4000;
      maxPrice = 7000;
      demand = 70;
      supply = 60;
      break;
    case "Rare":
      basePrice = 6000;
      maxPrice = 12000;
      demand = 85;
      supply = 40;
      break;
    case "Exotic":
      basePrice = 15000;
      maxPrice = 40000;
      demand = 95;
      supply = 15;
      break;
    case "Ultra-Exotic":
      basePrice = 35000;
      maxPrice = 100000;
      demand = 99;
      supply = 5;
      break;
  }

  // Adjust specific ones
  if (type.id === "fluffy") maxPrice = 80000;

  const buyScore = Math.min(100, Math.round((demand / supply) * 30));
  const holdScore = Math.min(100, Math.round(demand * 0.8));
  const breedScore = Math.min(100, Math.round((100 - supply) * 1.1));
  const flipScore = Math.min(100, Math.round((maxPrice / basePrice) * 20 + demand * 0.5));

  const maxScore = Math.max(buyScore, holdScore, breedScore, flipScore);
  let recommendation: "Buy" | "Hold" | "Breed" | "Flip" = "Hold";
  if (maxScore === buyScore) recommendation = "Buy";
  else if (maxScore === breedScore) recommendation = "Breed";
  else if (maxScore === flipScore) recommendation = "Flip";

  return {
    priceRange: [basePrice, maxPrice],
    demandScore: demand,
    supplyScore: supply,
    recommendation,
    buyScore,
    holdScore,
    breedScore,
    flipScore,
  };
}

export const typeMarketData = frenchieTypes.map(t => ({
  type: t,
  market: getMarketDataForType(t)
}));
