'use client';

import { PRICE_DATA, MARKET_TRENDS, RARITY_DISTRIBUTION, BREEDING_TIPS } from '@/lib/market-data';
import { FRENCHIE_TYPES } from '@/lib/genetics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { DollarSign, TrendingUp, Gem, Activity, BarChart3 } from 'lucide-react';

const priceChartData = FRENCHIE_TYPES.map((t) => {
  const p = PRICE_DATA[t.id];
  return {
    name: t.shortName,
    min: p?.min ?? 0,
    avg: p?.avg ?? 0,
    max: p?.max ?? 0,
    median: p?.median ?? 0,
  };
}).sort((a, b) => a.avg - b.avg);

const demandSupplyData = FRENCHIE_TYPES.map((t) => {
  const p = PRICE_DATA[t.id];
  return {
    name: t.shortName,
    demand: p?.demandScore ?? 5,
    supply: p?.supplyScore ?? 5,
  };
}).sort((a, b) => b.demand - a.demand);

const rarityPieData = [
  { name: 'Common', value: 45, color: '#ffc0cb' },
  { name: 'Uncommon', value: 25, color: '#ff69b4' },
  { name: 'Rare', value: 15, color: '#e0218a' },
  { name: 'Very Rare', value: 10, color: '#f06292' },
  { name: 'Ultra Rare', value: 5, color: '#d81b60' },
];

export default function MarketPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#d81b60]">Market Intelligence</h1>
        <p className="text-sm text-[#8a4d65] mt-1">Price ranges, rarity distribution, demand/supply metrics, and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#e0218a]/10">
              <DollarSign className="text-[#e0218a]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Price by Type (USD)</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12, color: '#1a0510' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="min" name="Min" fill="#ffc0cb" radius={[0, 4, 4, 0]} />
                <Bar dataKey="median" name="Median" fill="#ff69b4" radius={[0, 4, 4, 0]} />
                <Bar dataKey="avg" name="Avg" fill="#e0218a" radius={[0, 4, 4, 0]} />
                <Bar dataKey="max" name="Max" fill="#d81b60" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#ff69b4]/10">
              <TrendingUp className="text-[#ff69b4]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Market Trend (Avg Price & Volume)</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MARKET_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="year" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12, color: '#1a0510' }}
                  formatter={(value: any, name: any) => [name === 'avgPrice' ? `$${Number(value).toLocaleString()}` : `${value}`, name === 'avgPrice' ? 'Avg Price' : 'Volume Index']}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgPrice" name="Avg Price" stroke="#e0218a" strokeWidth={2} dot={{ r: 4, fill: '#e0218a' }} />
                <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume" stroke="#ff69b4" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#ff69b4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#f06292]/10">
              <Activity className="text-[#f06292]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Demand vs. Supply Score</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandSupplyData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" domain={[0, 10]} tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#8a4d65', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12 }}
                />
                <Legend />
                <Bar dataKey="demand" name="Demand" fill="#e0218a" radius={[0, 4, 4, 0]} />
                <Bar dataKey="supply" name="Supply" fill="#ffc0cb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#d81b60]/10">
              <BarChart3 className="text-[#d81b60]" size={16} />
            </div>
            <h2 className="text-sm font-bold text-[#1a0510]">Rarity Distribution</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rarityPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={{ fill: '#1a0510', fontSize: 12 }}
                  labelLine={{ stroke: '#ffc0cb' }}
                >
                  {rarityPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 12, color: '#1a0510' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-6 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-amber-50">
            <Gem className="text-amber-500" size={16} />
          </div>
          <h2 className="text-sm font-bold text-[#1a0510]">Breeding Tips</h2>
        </div>
        <ul className="space-y-2">
          {BREEDING_TIPS.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8a4d65]">
              <span className="text-[#d81b60] font-black mt-0.5">{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
