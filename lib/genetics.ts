export type Allele = { symbol: string; isDominant: boolean; label: string };
export type Locus = { name: string; alleles: [Allele, Allele] };
export type Genotype = Record<string, Locus>;

export interface FrenchieType {
  id: string;
  name: string;
  description: string;
  genotype: Genotype;
  healthNotes: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Exotic" | "Ultra-Exotic";
  imageUrl: string;
}

const D = (symbol: string, label: string): Allele => ({ symbol, isDominant: true, label });
const R = (symbol: string, label: string): Allele => ({ symbol, isDominant: false, label });

export const LOCI_NAMES = ["Brown", "Dilution", "Dominant Black", "Agouti", "Merle", "Piebald", "Extension", "Cocoa", "Fluffy"];

export const frenchieTypes: FrenchieType[] = [
  {
    id: "standard-fawn",
    name: "Standard Fawn",
    description: "The classic French Bulldog appearance with a solid fawn coat.",
    rarity: "Common",
    healthNotes: "Generally healthy baseline.",
    imageUrl: "/images/fawn.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [D("ay", "Fawn"), D("ay", "Fawn")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "brindle",
    name: "Brindle",
    description: "Dark with fawn hairs mixed in, creating a tiger-striped effect.",
    rarity: "Common",
    healthNotes: "Standard health.",
    imageUrl: "/images/brindle.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [D("kbr", "Brindle"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [D("ay", "Fawn"), D("ay", "Fawn")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "blue",
    name: "Blue",
    description: "A diluted black coat appearing grayish-blue.",
    rarity: "Rare",
    healthNotes: "Watch for color dilution alopecia.",
    imageUrl: "/images/blue.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "cocoa",
    name: "Cocoa",
    description: "A dark chocolate brown coat from the Frenchie-specific Cocoa gene.",
    rarity: "Rare",
    healthNotes: "Standard health.",
    imageUrl: "/images/cocoa.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "lilac",
    name: "Lilac",
    description: "A beautiful pale dusty gray/brown resulting from Blue and Cocoa.",
    rarity: "Exotic",
    healthNotes: "Watch for eye and skin sensitivities.",
    imageUrl: "/images/lilac.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "merle",
    name: "Merle",
    description: "A mottled, patchy pattern on a solid base coat.",
    rarity: "Rare",
    healthNotes: "Never breed two merles together (risk of double merle deafness/blindness).",
    imageUrl: "/images/merle.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [D("M", "Merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "fluffy",
    name: "Fluffy",
    description: "A long-haired Frenchie resulting from two copies of the L4 gene.",
    rarity: "Ultra-Exotic",
    healthNotes: "Requires extra grooming, no specific health risks.",
    imageUrl: "/images/fluffy.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [D("ay", "Fawn"), D("ay", "Fawn")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [R("l", "Fluffy"), R("l", "Fluffy")] },
    }
  },
  {
    id: "isabella",
    name: "Isabella",
    description: "A true lilac color from blue dilution and testable chocolate (rojo).",
    rarity: "Exotic",
    healthNotes: "Monitor for skin issues.",
    imageUrl: "/images/isabella.png",
    genotype: {
      Brown: { name: "Brown", alleles: [R("b", "Rojo"), R("b", "Rojo")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "platinum",
    name: "Platinum",
    description: "A cream-covered lilac, appearing shiny silver-white.",
    rarity: "Ultra-Exotic",
    healthNotes: "Sun protection needed for nose/skin.",
    imageUrl: "/images/platinum.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [R("e", "Cream"), R("e", "Cream")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "rojo",
    name: "Rojo (Testable Chocolate)",
    description: "A vivid reddish-brown coat.",
    rarity: "Exotic",
    healthNotes: "Standard health.",
    imageUrl: "/images/rojo.png",
    genotype: {
      Brown: { name: "Brown", alleles: [R("b", "Rojo"), R("b", "Rojo")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "black-tan",
    name: "Black and Tan",
    description: "Solid black with tan points on eyebrows, cheeks, and legs.",
    rarity: "Rare",
    healthNotes: "Standard health.",
    imageUrl: "/images/black-tan.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("at", "Tan Points"), R("at", "Tan Points")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "blue-merle",
    name: "Blue Merle",
    description: "Blue base coat with merle patching.",
    rarity: "Exotic",
    healthNotes: "Merle breeding restrictions apply.",
    imageUrl: "/images/blue-merle.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [D("M", "Merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "pied",
    name: "Pied",
    description: "Predominantly white with patches of color.",
    rarity: "Uncommon",
    healthNotes: "Risk of deafness if white covers the ears.",
    imageUrl: "/images/pied.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [D("ay", "Fawn"), D("ay", "Fawn")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [R("sp", "Piebald"), R("sp", "Piebald")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "blue-fluffy",
    name: "Blue Fluffy",
    description: "Long-haired with a solid blue coat.",
    rarity: "Ultra-Exotic",
    healthNotes: "Needs extensive grooming.",
    imageUrl: "/images/blue-fluffy.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [R("l", "Fluffy"), R("l", "Fluffy")] },
    }
  },
  {
    id: "lilac-merle",
    name: "Lilac Merle",
    description: "Lilac base coat with merle patching.",
    rarity: "Ultra-Exotic",
    healthNotes: "Requires careful breeding (no merle x merle).",
    imageUrl: "/images/lilac-merle.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [D("M", "Merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "new-shade-isabella",
    name: "New Shade Isabella",
    description: "A combination of Cocoa, Dilution, and Rojo.",
    rarity: "Ultra-Exotic",
    healthNotes: "Rare genetics, requires robust screening.",
    imageUrl: "/images/new-shade-isabella.png",
    genotype: {
      Brown: { name: "Brown", alleles: [R("b", "Rojo"), R("b", "Rojo")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("a", "Solid"), R("a", "Solid")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "cream",
    name: "Cream",
    description: "Solid off-white/cream coat masking other colors.",
    rarity: "Uncommon",
    healthNotes: "Standard health.",
    imageUrl: "/images/cream.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [D("D", "Normal"), D("D", "Normal")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [D("ay", "Fawn"), D("ay", "Fawn")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [R("e", "Cream"), R("e", "Cream")] },
      Cocoa: { name: "Cocoa", alleles: [D("Co", "Normal"), D("Co", "Normal")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  },
  {
    id: "lilac-tan",
    name: "Lilac and Tan",
    description: "Lilac coat with tan points.",
    rarity: "Ultra-Exotic",
    healthNotes: "Standard health.",
    imageUrl: "/images/lilac-tan.png",
    genotype: {
      Brown: { name: "Brown", alleles: [D("B", "Normal"), D("B", "Normal")] },
      Dilution: { name: "Dilution", alleles: [R("d", "Dilute"), R("d", "Dilute")] },
      DominantBlack: { name: "Dominant Black", alleles: [R("ky", "Agouti expr"), R("ky", "Agouti expr")] },
      Agouti: { name: "Agouti", alleles: [R("at", "Tan Points"), R("at", "Tan Points")] },
      Merle: { name: "Merle", alleles: [R("m", "Non-merle"), R("m", "Non-merle")] },
      Piebald: { name: "Piebald", alleles: [D("S", "Solid"), D("S", "Solid")] },
      Extension: { name: "Extension", alleles: [D("E", "Normal"), D("E", "Normal")] },
      Cocoa: { name: "Cocoa", alleles: [R("co", "Cocoa"), R("co", "Cocoa")] },
      Fluffy: { name: "Fluffy", alleles: [D("L", "Shorthair"), D("L", "Shorthair")] },
    }
  }
];

export function calculateOffspring(sire: FrenchieType, dam: FrenchieType) {
  let isUnsafe = false;
  if (
    sire.genotype.Merle.alleles.some(a => a.symbol === "M") &&
    dam.genotype.Merle.alleles.some(a => a.symbol === "M")
  ) {
    isUnsafe = true;
  }

  // Simplified combinatorics for UI display
  // We mock a probability distribution based on parents' rarity
  const rarityScores: Record<string, number> = { "Common": 1, "Uncommon": 2, "Rare": 3, "Exotic": 4, "Ultra-Exotic": 5 };
  const avgScore = (rarityScores[sire.rarity] + rarityScores[dam.rarity]) / 2;
  
  let offspringTypes = frenchieTypes.filter(t => Math.abs(rarityScores[t.rarity] - avgScore) <= 1.5);
  // Guarantee at least 3 types
  if (offspringTypes.length < 3) offspringTypes = frenchieTypes.slice(0, 3);
  
  const probabilities = offspringTypes.map((t, i) => {
    return {
      type: t,
      probability: Math.round(100 / offspringTypes.length) + (i === 0 ? 100 % offspringTypes.length : 0)
    };
  });

  return { isUnsafe, probabilities };
}
