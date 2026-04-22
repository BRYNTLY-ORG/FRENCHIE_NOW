'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FRENCHIE_TYPES } from '@/lib/genetics';
import DNADiagram from '@/components/DNADiagram';
import Link from 'next/link';
import { ArrowLeft, Dna, Search, Filter } from 'lucide-react';

export default function DNAPageClient() {
  const search = useSearchParams();
  const selectedId = search.get('type');
  const [filter, setFilter] = useState('');

  if (selectedId) {
    const selected = FRENCHIE_TYPES.find((t) => t.id === selectedId);
    if (selected) {
      return <TypeDetail type={selected} />;
    }
  }

  const filtered = FRENCHIE_TYPES.filter(
    (t) =>
      t.name.toLowerCase().includes(filter.toLowerCase()) ||
      t.shortName.toLowerCase().includes(filter.toLowerCase()) ||
      t.rarity.includes(filter.toLowerCase().replace(' ', '-'))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#d81b60]">DNA Visualizer</h1>
          <p className="text-sm text-[#8a4d65] mt-1">Explore the genotype of every Frenchie color and pattern.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff69b4]" size={16} />
          <input
            type="text"
            placeholder="Search types..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-72 bg-white border border-[#ffc0cb] text-[#1a0510] text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0218a]/30 shadow-[0_2px_8px_rgba(224,33,138,0.06)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((type) => (
          <Link
            key={type.id}
            href={`/dna?type=${type.id}`}
            className="group block bg-white border border-[#ffc0cb]/40 rounded-2xl p-4 hover:border-[#ff69b4] hover:shadow-[0_8px_24px_rgba(224,33,138,0.1)] transition-all"
          >
            <div className="flex items-start gap-4">
              <img
                src={type.imageUrl}
                alt={type.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#ffc0cb]/40 group-hover:border-[#ff69b4] group-hover:scale-105 transition-all"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#1a0510] group-hover:text-[#d81b60] transition-colors">{type.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    type.rarity === 'common' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                    type.rarity === 'uncommon' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    type.rarity === 'rare' ? 'bg-violet-50 text-violet-600 border-violet-100' :
                    type.rarity === 'very-rare' ? 'bg-pink-50 text-pink-600 border-pink-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {type.rarity.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-xs text-[#8a4d65] mt-1 line-clamp-2">{type.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(type.genotype).slice(0, 4).map(([gene, val]) => (
                    <span key={gene} className="text-[10px] font-mono bg-[#fff8f0] text-[#d81b60] border border-[#ffc0cb]/30 px-2 py-0.5 rounded-md">
                      {gene}:{val}
                    </span>
                  ))}
                  <span className="text-[10px] text-[#ff69b4]">...</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Filter className="mx-auto text-[#ffc0cb] mb-3" size={32} />
          <p className="text-[#8a4d65]">No types match your search.</p>
        </div>
      )}
    </div>
  );
}

function TypeDetail({ type }: { type: (typeof FRENCHIE_TYPES)[number] }) {
  return (
    <div className="space-y-8">
      <Link
        href="/dna"
        className="inline-flex items-center gap-1 text-sm text-[#ff69b4] hover:text-[#d81b60] font-medium transition-colors"
      >
        <ArrowLeft size={16} /> Back to all types
      </Link>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={type.imageUrl}
          alt={type.name}
          className="w-full md:w-72 h-72 object-cover rounded-3xl border-4 border-[#ffc0cb]/30 shadow-[0_8px_32px_rgba(224,33,138,0.12)]"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-black text-[#d81b60]">{type.name}</h1>
          <p className="text-[#8a4d65] mt-2 text-lg">{type.description}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
              type.rarity === 'common' ? 'bg-gray-50 text-gray-600 border-gray-200' :
              type.rarity === 'uncommon' ? 'bg-blue-50 text-blue-600 border-blue-100' :
              type.rarity === 'rare' ? 'bg-violet-50 text-violet-600 border-violet-100' :
              type.rarity === 'very-rare' ? 'bg-pink-50 text-pink-600 border-pink-100' :
              'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              Rarity: {type.rarity.replace('-', ' ')}
            </span>
            <span className="text-xs font-mono bg-[#fff8f0] text-[#d81b60] border border-[#ffc0cb]/40 px-3 py-1.5 rounded-full">
              Health Risk: {type.genotype.D === 'd/d' ? 2 : type.genotype.B === 'b/b' ? 1 : 0}/5
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-6 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#ffc0cb]/20">
            <Dna className="text-[#d81b60]" size={20} />
          </div>
          <h2 className="text-xl font-bold text-[#d81b60]">Genotype</h2>
        </div>
        <DNADiagram frenchie={type} />
      </div>
    </div>
  );
}
