import Link from 'next/link';
import Image from 'next/image';
import { FRENCHIE_TYPES } from '@/lib/genetics';
import { Dna, Baby, TrendingUp, Star, ChevronRight, AlertTriangle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#ffc0cb]/40 border border-[#ff69b4]/30 rounded-full px-4 py-1.5 text-sm font-medium text-[#d81b60]">
          <Star size={14} className="fill-[#ffd700] text-[#ffd700]" />
          Premium Genetics Platform
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-[#d81b60] tracking-tight leading-tight">
          Frenchie
          <span className="text-[#ff69b4]"> Now</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#8a4d65] max-w-2xl mx-auto leading-relaxed">
          Professional-grade DNA, breeding probabilities, and market intelligence
          for the world&apos;s most sought-after French Bulldogs.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard
          href="/dna"
          icon={Dna}
          title="DNA Visualizer"
          desc="Interactive genotype diagrams for every Frenchie color and pattern."
        />
        <FeatureCard
          href="/breeding"
          icon={Baby}
          title="Breeding Calculator"
          desc="Select two parents and see offspring probabilities with Punnett squares."
        />
        <FeatureCard
          href="/market"
          icon={TrendingUp}
          title="Market Data"
          desc="Price charts, rarity distribution, and demand/supply analytics."
        />
        <FeatureCard
          href="/recommend"
          icon={Star}
          title="Recommendations"
          desc="Ranked purchase suggestions based on ROI, health, and rarity."
        />
      </section>

      {/* Warning */}
      <section className="bg-white rounded-3xl border border-[#ffc0cb] p-6 flex items-start gap-4 shadow-[0_8px_32px_rgba(224,33,138,0.08)]">
        <div className="p-2.5 rounded-2xl bg-[#ffc0cb]/30 shrink-0">
          <AlertTriangle className="text-[#d81b60]" size={22} />
        </div>
        <div>
          <h3 className="text-[#d81b60] font-bold text-lg">Ethical Breeding Reminder</h3>
          <p className="text-[#8a4d65] mt-1 text-sm leading-relaxed">
            This tool is for education and responsible breeding decisions. Never breed double-merle (MM) pairings.
            Always verify parent health tests and genetic screening before breeding.
          </p>
        </div>
      </section>

      {/* Frenchie Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#d81b60]">All Frenchie Types</h2>
          <span className="text-xs font-medium text-[#ff69b4] bg-[#ffc0cb]/30 rounded-full px-3 py-1">
            {FRENCHIE_TYPES.length} Types
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FRENCHIE_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/dna?type=${type.id}`}
              className="group relative bg-white rounded-2xl border border-[#ffc0cb]/50 hover:border-[#ff69b4] overflow-hidden shadow-[0_4px_20px_rgba(224,33,138,0.06)] hover:shadow-[0_8px_32px_rgba(224,33,138,0.14)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden bg-[#ffe6f0]">
                <img
                  src={type.imageUrl}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border shadow-sm ${
                    type.rarity === 'common' ? 'bg-gray-100/90 text-gray-600 border-gray-200' :
                    type.rarity === 'uncommon' ? 'bg-blue-50/90 text-blue-600 border-blue-100' :
                    type.rarity === 'rare' ? 'bg-violet-50/90 text-violet-600 border-violet-100' :
                    type.rarity === 'very-rare' ? 'bg-pink-50/90 text-pink-600 border-pink-100' :
                    'bg-amber-50/90 text-amber-600 border-amber-100'
                  }`}>
                    {type.rarity.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1a0510]">{type.name}</p>
                    <p className="text-xs text-[#8a4d65] line-clamp-2 mt-0.5">{type.description}</p>
                  </div>
                  <ChevronRight className="text-[#ffc0cb] group-hover:text-[#ff69b4] shrink-0 transition-colors" size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 p-5 rounded-2xl border border-[#ffc0cb]/50 bg-white/80 hover:bg-white hover:border-[#ff69b4] shadow-[0_4px_16px_rgba(224,33,138,0.04)] hover:shadow-[0_8px_24px_rgba(224,33,138,0.12)] transition-all group"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-xl bg-[#ffc0cb]/20 group-hover:bg-[#e0218a] transition-colors">
          <Icon className="text-[#d81b60] group-hover:text-white transition-colors" size={20} />
        </div>
        <span className="font-bold text-[#1a0510] group-hover:text-[#d81b60] transition-colors">{title}</span>
      </div>
      <p className="text-sm text-[#8a4d65]">{desc}</p>
    </Link>
  );
}
