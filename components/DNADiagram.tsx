import { Genotype, LOCI_NAMES } from "@/lib/genetics";
import { Badge } from "./ui/badge";

export function DNADiagram({ genotype }: { genotype: Genotype }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {LOCI_NAMES.map((locusName) => {
        const locus = genotype[locusName.replace(" ", "") as keyof Genotype];
        if (!locus) return null;
        return (
          <div key={locusName} className="flex flex-col p-4 border rounded-xl bg-card shadow-sm">
            <div className="text-sm font-semibold mb-2 text-muted-foreground">{locusName}</div>
            <div className="flex gap-2">
              {locus.alleles.map((allele, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 ${
                    allele.isDominant 
                      ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400" 
                      : "border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                  }`}
                  title={allele.label}
                >
                  <span className="text-lg font-bold">{allele.symbol}</span>
                  <span className="text-xs opacity-80 mt-1">{allele.isDominant ? "Dominant" : "Recessive"}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
