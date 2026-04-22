'use client';

import { generateRecommendations } from '@/lib/market-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';
import { Star, DollarSign, Heart, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export default function RecommendPage() {
  const recs = generateRecommendations();

  const radarData = recs.slice(0, 5).map((r) => ({
    subject: r.type.shortName,
    Buy: r.buyScore,
    Hold: r.holdScore,
    Breed: r.breedScore,
    Flip: r.flipScore,
  }));

  const barData = recs.slice(0, 8).map((r) => ({
    name: r.type.shortName,
    buyScore: r.buyScore,
    flipScore: r.flipScore,
    breedScore: r.breedScore,
    holdScore: r.holdScore,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#d81b60]">Recommendations</h1>
        <p className="text-sm text-[#8a4d65] mt-1">Data-driven rankings using ROI, health risk, demand trends, and rarity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#e0218a]/10">
              <Star className="text-[#e0218a]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Top 5 Score Comparison (Radar)</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#fce7f3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#8a4d65', fontSize: 10 }} />
                <Radar name="Buy" dataKey="Buy" stroke="#e0218a" fill="#e0218a" fillOpacity={0.1} />
                <Radar name="Hold" dataKey="Hold" stroke="#ff69b4" fill="#ff69b4" fillOpacity={0.1} />
                <Radar name="Breed" dataKey="Breed" stroke="#d81b60" fill="#d81b60" fillOpacity={0.1} />
                <Radar name="Flip" dataKey="Flip" stroke="#f06292" fill="#f06292" fillOpacity={0.1} />
                <Legend />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#ff69b4]/10">
              <TrendingUp className="text-[#ff69b4]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Buy Score vs Flip Score</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="buyScore" name="Buy Score" fill="#ffc0cb" radius={[0, 4, 4, 0]} />
                <Bar dataKey="flipScore" name="Flip Score" fill="#e0218a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-black text-[#d81b60]">Ranked Recommendations</h2>
        {recs.map((rec, i) => (
          <RecommendationCard key={rec.type.id} rank={i + 1} rec={rec} />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ rank, rec }: { rank: number; rec: ReturnType<typeof generateRecommendations>[number] }) {
  const { type, buyScore, holdScore, breedScore, flipScore, rationale, tags } = rec;

  const scoreColor = (s: number) =>
    s >= 80 ? 'text-[#e0218a]' : s >= 60 ? 'text-[#ff69b4]' : 'text-[#8a4d65]';

  return (
    <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 hover:border-[#ff69b4] hover:shadow-[0_8px_32px_rgba(224,33,138,0.12)] transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex items-center gap-3 min-w-[80px]">
          <span className="text-2xl font-black text-[#ffc0cb]">#{rank}</span>
          <img
            src={type.imageUrl}
            alt={type.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#ffc0cb]/40"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-bold text-[#1a0510]">{type.name}</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#e0218a]/10 text-[#d81b60] font-bold border border-[#ffc0cb]/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#8a4d65] mb-2">{type.description}</p>

          <div className="flex flex-wrap gap-2 text-xs">
            <ScoreBadge icon={DollarSign} label="Buy" score={buyScore} colorClass={scoreColor(buyScore)} />
            <ScoreBadge icon={TrendingUp} label="Hold" score={holdScore} colorClass={scoreColor(holdScore)} />
            <ScoreBadge icon={Heart} label="Breed" score={breedScore} colorClass={scoreColor(breedScore)} />
            <ScoreBadge icon={Star} label="Flip" score={flipScore} colorClass={scoreColor(flipScore)} />
          </div>

          <div className="mt-3 space-y-1">
            {rationale.map((r, i) => {
              const isWarning = r.toLowerCase().includes('risk');
              return (
                <div key={i} className="flex items-start gap-1.5 text-xs">
                  {isWarning ? (
                    <ShieldAlert size={12} className="text-red-500 mt-0.5 shrink-0" />
                  ) : (
                    <Award size={12} className="text-[#ffd700] mt-0.5 shrink-0" />
                  )}
                  <span className={isWarning ? 'text-red-500' : 'text-[#8a4d65]'}>{r}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({
  icon: Icon,
  label,
  score,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  score: number;
  colorClass: string;
}) {
  return (
    <div className="flex items-center gap-1 bg-[#fff8f0] rounded-lg px-2.5 py-1 border border-[#ffc0cb]/40">
      <Icon size={12} className="text-[#ff69b4]" />
      <span className="text-[#8a4d65]">{label}</span>
      <span className={`font-mono font-bold ${colorClass}`}>{score}</span>
    </div>
  );
}
