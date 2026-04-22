'use client';

import { LOCI, FrenchieType } from '@/lib/genetics';

export default function DNADiagram({ frenchie }: { frenchie: FrenchieType }) {
  return (
    <div className="w-full">
      {frenchie.carriers && frenchie.carriers.length > 0 && (
        <div className="text-xs text-[#8a4d65] mb-3 bg-[#fff8f0] rounded-xl px-3 py-2 border border-[#ffc0cb]/40">
          <span className="font-semibold">Carriers:</span> {frenchie.carriers.join(', ')}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LOCI.map((locus) => {
          const genotype = frenchie.genotype[locus.gene] || 'N/N';
          const alleles = genotype.split('/');
          const isHomozygous = alleles[0] === alleles[1];

          return (
            <div
              key={locus.gene}
              className="bg-white rounded-2xl p-4 border border-[#ffc0cb]/40 shadow-[0_2px_10px_rgba(224,33,138,0.04)]"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-[#1a0510]">{locus.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#fff8f0] text-[#d81b60] font-mono font-bold border border-[#ffc0cb]/30">
                  {locus.gene}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between bg-[#fff8f0] rounded-xl overflow-hidden border border-[#ffc0cb]/40">
                    <AlleleBox allele={alleles[0]} locus={locus} />
                    <div className="text-[#ff69b4] text-xs font-bold px-1">/</div>
                    <AlleleBox allele={alleles[1]} locus={locus} />
                  </div>
                  <div className="mt-1 text-[10px] font-medium text-[#8a4d65]">
                    {isHomozygous ? 'Homozygous' : 'Heterozygous'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-2xl p-4 border border-[#ffc0cb]/40 shadow-[0_2px_12px_rgba(224,33,138,0.06)]">
        <h4 className="text-xs font-bold text-[#d81b60] mb-1.5 uppercase tracking-wide">Health Notes</h4>
        <p className="text-sm text-[#8a4d65] leading-relaxed">
          {frenchie.healthNotes || 'No specific genetic health concerns for this type.'}
        </p>
      </div>
    </div>
  );
}

function AlleleBox({ allele, locus }: { allele: string; locus: (typeof LOCI)[number] }) {
  const alleleInfo = locus.alleles.find((a) => a.symbol === allele);
  const isDominant = alleleInfo?.dominant ?? false;
  return (
    <div
      className={`flex-1 py-2 text-center text-xs font-mono font-bold ${
        isDominant
          ? 'bg-[#d1fae5] text-[#065f46] border-x border-[#6ee7b7]'
          : 'bg-[#fce7f3] text-[#9d174d] border-x border-[#f9a8d4]'
      }`}
      title={alleleInfo?.name || allele}
    >
      {allele}
    </div>
  );
}
