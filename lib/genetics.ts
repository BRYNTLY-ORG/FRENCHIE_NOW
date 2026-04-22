// lib/genetics.ts - Updated with imageUrl field and luxury theming

export interface Allele {
  symbol: string;
  name: string;
  dominant: boolean;
}

export interface Locus {
  name: string;
  gene: string;
  description: string;
  alleles: Allele[];
}

export interface FrenchieType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  genotype: Record<string, string>;
  rarity: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'ultra-rare';
  visualColor: string;
  textColor: string;
  imageUrl: string;
  carriers?: string[];
  healthNotes?: string;
}

export const LOCI: Locus[] = [
  {
    name: 'Brown/Chocolate',
    gene: 'B',
    description: 'Determines brown/chocolate pigment. B is black/brown dominant, b produces chocolate.',
    alleles: [
      { symbol: 'B', name: 'Black/Brown', dominant: true },
      { symbol: 'b', name: 'Chocolate', dominant: false },
    ],
  },
  {
    name: 'Dilution',
    gene: 'D',
    description: 'Dilutes pigment. D is dense color, dd produces blue, lilac when combined with bb.',
    alleles: [
      { symbol: 'D', name: 'Dense', dominant: true },
      { symbol: 'd', name: 'Dilute (Blue)', dominant: false },
    ],
  },
  {
    name: 'Dominant Black / Brindle',
    gene: 'K',
    description: 'K is dominant black (solid), kbr is brindle, ky is recessive (allows agouti).',
    alleles: [
      { symbol: 'K', name: 'Dominant Black (Solid)', dominant: true },
      { symbol: 'kbr', name: 'Brindle', dominant: true },
      { symbol: 'ky', name: 'Recessive (Fawn/Agouti)', dominant: false },
    ],
  },
  {
    name: 'Agouti / Tan Points',
    gene: 'A',
    description: 'Pattern distribution. at produces tan points when ky/ky.',
    alleles: [
      { symbol: 'Ay', name: 'Sable/Fawn', dominant: true },
      { symbol: 'at', name: 'Tan Points', dominant: false },
      { symbol: 'a', name: 'Recessive Black', dominant: false },
    ],
  },
  {
    name: 'Merle',
    gene: 'M',
    description: 'M produces merle pattern. MM (double merle) is dangerous.',
    alleles: [
      { symbol: 'M', name: 'Merle', dominant: true },
      { symbol: 'm', name: 'Non-merle', dominant: false },
    ],
  },
  {
    name: 'Piebald',
    gene: 'S',
    description: 'White spotting. S is solid, sp is pied.',
    alleles: [
      { symbol: 'S', name: 'Solid', dominant: true },
      { symbol: 'sp', name: 'Piebald', dominant: false },
    ],
  },
  {
    name: 'Extension / Mask',
    gene: 'E',
    description: 'EM produces a black mask. E is normal extension.',
    alleles: [
      { symbol: 'EM', name: 'Masked', dominant: true },
      { symbol: 'E', name: 'Non-masked', dominant: false },
      { symbol: 'e', name: 'Recessive red (Cream)', dominant: false },
    ],
  },
  {
    name: 'Cocoa',
    gene: 'Co',
    description: 'Additional brown dilution affecting tone.',
    alleles: [
      { symbol: 'Co', name: 'Standard', dominant: true },
      { symbol: 'co', name: 'Cocoa', dominant: false },
    ],
  },
  {
    name: 'Fluffy',
    gene: 'Lh',
    description: 'Longhair gene. Lh/Lh produces fluffy coat.',
    alleles: [
      { symbol: 'Lh', name: 'Longhair', dominant: false },
      { symbol: 'sh', name: 'Shorthair', dominant: true },
    ],
  },
];

export const FRENCHIE_TYPES: FrenchieType[] = [
  {
    id: 'brindle',
    name: 'Brindle',
    shortName: 'Brindle',
    description: 'Classic striped pattern. The most common and historically standard Frenchie color.',
    genotype: { B: 'B/B', D: 'D/D', K: 'kbr/kbr', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'common',
    visualColor: '#5C4033',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=1',
    healthNotes: 'Generally healthiest — minimal genetic bottlenecking.',
  },
  {
    id: 'fawn',
    name: 'Fawn',
    shortName: 'Fawn',
    description: 'Light tan/golden color with a black mask. The second most common color.',
    genotype: { B: 'B/B', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'EM/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'common',
    visualColor: '#D2A679',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=1',
    healthNotes: 'Robust genetics, widely available.',
  },
  {
    id: 'cream',
    name: 'Cream',
    shortName: 'Cream',
    description: 'Pale ivory to off-white. Recessive red (e/e) overrides other pigments.',
    genotype: { B: 'B/B', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'e/e', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'uncommon',
    visualColor: '#F5F5DC',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=2',
    healthNotes: 'Generally healthy; coat color does not correlate with issues.',
  },
  {
    id: 'blue',
    name: 'Blue',
    shortName: 'Blue',
    description: 'Black pigment diluted to a blue/gray. dd genotype.',
    genotype: { B: 'B/B', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'rare',
    visualColor: '#708090',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=3',
    healthNotes: 'Color dilution alopecia risk — thinning coat/skin issues possible.',
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    shortName: 'Choco',
    description: 'Rich brown pigment. b/b genotype. Often with yellow/green eyes.',
    genotype: { B: 'b/b', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'rare',
    visualColor: '#7B3F00',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=4',
    healthNotes: 'Monitor for skin allergies; no major genetic concerns vs standard.',
  },
  {
    id: 'lilac',
    name: 'Lilac',
    shortName: 'Lilac',
    description: 'bb + dd combined. A pale silvery-brown. Highly sought after.',
    genotype: { B: 'b/b', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'rare',
    visualColor: '#C8A2C8',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=5',
    healthNotes: 'Highest dilution alopecia risk; choose lines with proven coat quality.',
  },
  {
    id: 'isabella',
    name: 'Isabella',
    shortName: 'Isabella',
    description: 'bb + dd + coco. An even rarer pale champagne-lilac shade.',
    genotype: { B: 'b/b', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'co/co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#E8D5C4',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=6',
    healthNotes: 'Very rare; verify breeder health testing.',
  },
  {
    id: 'new-shade-isabella',
    name: 'New Shade Isabella',
    shortName: 'NSI',
    description: 'The rarest shade — almost pinkish-lavender with additional modifiers.',
    genotype: { B: 'b/b', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'co/co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#D8BFD8',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=7',
    healthNotes: 'Extremely rare; extremely expensive; demand thorough health screening.',
  },
  {
    id: 'black',
    name: 'Solid Black',
    shortName: 'Black',
    description: 'Solid black without brindle. K/K or K/kbr dominant black.',
    genotype: { B: 'B/B', D: 'D/D', K: 'K/K', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'uncommon',
    visualColor: '#1a1a1a',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=8',
    healthNotes: 'Considered non-standard by AKC but prized by collectors.',
  },
  {
    id: 'blue-tan',
    name: 'Blue & Tan',
    shortName: 'Blue Tan',
    description: 'dd + at/at. Blue body with tan points on cheeks, chest, legs.',
    genotype: { B: 'B/B', D: 'd/d', K: 'ky/ky', A: 'at/at', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'rare',
    visualColor: '#708090',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=9',
    healthNotes: 'Standard dilute health watch applies.',
  },
  {
    id: 'chocolate-tan',
    name: 'Chocolate & Tan',
    shortName: 'Choco Tan',
    description: 'bb + at/at. Chocolate with tan points. Very popular.',
    genotype: { B: 'b/b', D: 'D/D', K: 'ky/ky', A: 'at/at', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'rare',
    visualColor: '#7B3F00',
    textColor: '#ffffff',
    imageUrl: 'https://placedog.net/400/300?id=10',
    healthNotes: 'Generally healthy; popular for breeding programs.',
  },
  {
    id: 'lilac-tan',
    name: 'Lilac & Tan',
    shortName: 'Lilac Tan',
    description: 'bb + dd + at/at. Lilac with tan points. Premium combination.',
    genotype: { B: 'b/b', D: 'd/d', K: 'ky/ky', A: 'at/at', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#C8A2C8',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=11',
    healthNotes: 'Same dilute cautions as standard lilac.',
  },
  {
    id: 'blue-merle',
    name: 'Blue Merle',
    shortName: 'Blue Merle',
    description: 'dd + Mm. Marbled blue/gray pattern. Mm only — never MM.',
    genotype: { B: 'B/B', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'M/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#A0AEC0',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=12',
    healthNotes: 'NEVER breed merle x merle (25% MM deaf/blind risk). Ethical breeders only use Mm dogs.',
  },
  {
    id: 'chocolate-merle',
    name: 'Chocolate Merle',
    shortName: 'Choco Merle',
    description: 'bb + Mm. Marbled chocolate pattern.',
    genotype: { B: 'b/b', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'M/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#BC8F8F',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=13',
    healthNotes: 'Same merle warning: never breed merle to merle.',
  },
  {
    id: 'lilac-merle',
    name: 'Lilac Merle',
    shortName: 'Lilac Merle',
    description: 'bb + dd + Mm. Marbled lilac pattern. One of the rarest patterns.',
    genotype: { B: 'b/b', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'M/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'ultra-rare',
    visualColor: '#D8BFD8',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=14',
    healthNotes: 'Extremely rare; merle + dilute combination. Ethical breeding critical.',
  },
  {
    id: 'pied',
    name: 'Pied',
    shortName: 'Pied',
    description: 'White patches on colored body. sp/sp or S/sp genotype.',
    genotype: { B: 'B/B', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'sp/sp', E: 'E/E', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'uncommon',
    visualColor: '#ffffff',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=15',
    healthNotes: 'Generally healthy; pigment spots should not correlate with deafness in dogs with pigment.',
  },
  {
    id: 'fluffy',
    name: 'Fluffy',
    shortName: 'Fluffy',
    description: 'Long, soft coat. Lh/Lh recessive. Can appear in any color.',
    genotype: { B: 'B/B', D: 'D/D', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'E/E', Co: 'Co/Co', Lh: 'Lh/Lh' },
    rarity: 'ultra-rare',
    visualColor: '#DEB887',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=16',
    healthNotes: 'Coat type change only — no inherent health issues from Lh itself.',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    shortName: 'Platinum',
    description: 'Extreme dilution near-white. Often dd + ee or heavy dilute modifiers.',
    genotype: { B: 'B/B', D: 'd/d', K: 'ky/ky', A: 'Ay/Ay', M: 'm/m', S: 'S/S', E: 'e/e', Co: 'Co/Co', Lh: 'sh/sh' },
    rarity: 'very-rare',
    visualColor: '#E8E8E8',
    textColor: '#000000',
    imageUrl: 'https://placedog.net/400/300?id=17',
    healthNotes: 'Verify not double merle masked as platinum.',
  },
];

function combineAlleles(a1: string, a2: string): string[] {
  const left = a1.split('/');
  const right = a2.split('/');
  const result: string[] = [];
  for (const l of left) {
    for (const r of right) {
      const pair = [l, r].sort().join('/');
      result.push(pair);
    }
  }
  return result;
}

function genotypeMatches(type: FrenchieType, possible: Record<string, string>): boolean {
  for (const [gene, expected] of Object.entries(type.genotype)) {
    if (possible[gene] !== expected) return false;
  }
  return true;
}

export function calculateOffspring(parent1: FrenchieType, parent2: FrenchieType): Map<string, number> {
  const outcomes = new Map<string, number>();

  const geneKeys = Object.keys(parent1.genotype);
  let combinations: Record<string, string>[] = [{}];

  for (const gene of geneKeys) {
    const p1 = parent1.genotype[gene];
    const p2 = parent2.genotype[gene];
    const alleles = combineAlleles(p1, p2);
    const newCombinations: Record<string, string>[] = [];
    for (const combo of combinations) {
      for (const allele of alleles) {
        newCombinations.push({ ...combo, [gene]: allele });
      }
    }
    combinations = newCombinations;
  }

  for (const combo of combinations) {
    let matched = FRENCHIE_TYPES.find((t) => genotypeMatches(t, combo));
    if (!matched) {
      matched = FRENCHIE_TYPES.find((t) => partialMatch(t, combo));
    }
    if (!matched) {
      matched = FRENCHIE_TYPES[0];
    }
    const key = matched.id;
    outcomes.set(key, (outcomes.get(key) || 0) + 1);
  }

  const total = combinations.length;
  const result = new Map<string, number>();
  outcomes.forEach((count, key) => {
    const type = FRENCHIE_TYPES.find((t) => t.id === key)!;
    result.set(type.name, Math.round((count / total) * 10000) / 100);
  });

  return result;
}

function partialMatch(type: FrenchieType, combo: Record<string, string>): boolean {
  let mismatches = 0;
  for (const [g, v] of Object.entries(type.genotype)) {
    if (combo[g] !== v) mismatches++;
  }
  return mismatches <= 2;
}

export function getRarityMultiplier(rarity: FrenchieType['rarity']): number {
  const map = { common: 1, uncommon: 2, rare: 4, 'very-rare': 8, 'ultra-rare': 16 };
  return map[rarity];
}

export function getHealthRiskScore(type: FrenchieType): number {
  let score = 0;
  if (type.genotype.D === 'd/d') score += 2;
  if (type.genotype.B === 'b/b') score += 1;
  if (type.genotype.M === 'M/m' || type.genotype.M === 'M/M') score += 3;
  if (type.genotype.Co === 'co/co') score += 1;
  return score;
}
