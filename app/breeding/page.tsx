'use client';

import { useState } from 'react';
import { FRENCHIE_TYPES, calculateOffspring } from '@/lib/genetics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AlertTriangle, Baby, Heart, PawPrint } from 'lucide-react';

export default function BreedingPage() {
  const [damId, setDamId] = useState(FRENCHIE_TYPES[0].id);
  const [sireId, setSireId] = useState(FRENCHIE_TYPES[1].id);

  const dam = FRENCHIE_TYPES.find((t) => t.id === damId)!;
  const sire = FRENCHIE_TYPES.find((t) => t.id === sireId)!;

  const probs = calculateOffspring(dam, sire);
  const chartData = Array.from(probs.entries()).map(([name, probability]) => ({
    name,
    probability,
    fill:
      probability > 45
        ? '#e0218a'
        : probability > 20
        ? '#ff69b4'
        : probability > 10
        ? '#f06292'
        : '#ffc0cb',
  }));

  const isMerleUnsafe =
    (dam.genotype.M === 'M/m') &&
    (sire.genotype.M === 'M/m');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#d81b60]">Breeding Calculator</h1>
        <p className="text-sm text-[#8a4d65] mt-1">Select two parents to see offspring probabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ParentCard
          title="Dam (Female)"
          value={damId}
          onChange={setDamId}
          gender="female"
        />
        <ParentCard
          title="Sire (Male)"
          value={sireId}
          onChange={setSireId}
          gender="male"
        />

        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#f06292]/10">
              <Heart className="text-[#f06292]" size={16} />
            </div>
            <h3 className="text-sm font-bold text-[#1a0510]">Pairing Summary</h3>
          </div>
          <div className="space-y-2">
            <SummaryRow label="Dam" value={dam.name} image={dam.imageUrl} />
            <SummaryRow label="Sire" value={sire.name} image={sire.imageUrl} />
            <SummaryRow label="Combined Rarity" value={`${dam.rarity.replace('-', ' ')} × ${sire.rarity.replace('-', ' ')}`} />
            <SummaryRow label="Outcomes" value={`${Array.from(probs.keys()).length} phenotypes`} />
          </div>
        </div>
      </div>

      {isMerleUnsafe && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-start gap-4 shadow-[0_4px_16px_rgba(220,38,38,0.08)]">
          <div className="p-2 rounded-2xl bg-red-100 shrink-0">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-red-700 font-bold text-lg">Unsafe Merle Pairing Detected</h3>
            <p className="text-sm text-red-600/80 mt-1 leading-relaxed">
              Both parents carry merle. This risks 25% MM double-merle offspring with high probability of
              deafness and blindness. Ethical breeders never pair merle to merle.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#e0218a]/10">
              <Baby className="text-[#e0218a]" size={16} />
            </div>
            <h3 className="text-sm font-bold text-[#1a0510]">Offspring Probability Distribution</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="name" tick={{ fill: '#8a4d65', fontSize: 11 }} angle={-25} textAnchor="end" height={80} />
                <YAxis tick={{ fill: '#8a4d65', fontSize: 11 }} label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#8a4d65' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#ffc0cb', borderRadius: 16, color: '#1a0510' }}
                  formatter={(value: any) => [`${value}%`, 'Probability']}
                />
                <Bar dataKey="probability" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-[#ff69b4]/10">
              <PawPrint className="text-[#ff69b4]" size={16} />
            </div>
            <h3 className="text-sm font-bold text-[#1a0510]">Probability Table</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ffc0cb]/40 text-left">
                  <th className="py-2 text-[#8a4d65] font-medium">Offspring Type</th>
                  <th className="py-2 text-[#8a4d65] font-medium">Probability</th>
                  <th className="py-2 text-[#8a4d65] font-medium">Visual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffc0cb]/20">
                {Array.from(probs.entries()).map(([name, p]) => {
                  const type = FRENCHIE_TYPES.find((t) => t.name === name);
                  return (
                    <tr key={name}>
                      <td className="py-2.5 text-[#1a0510] font-medium">{name}</td>
                      <td className="py-2.5">
                        <span className={`font-mono font-bold ${p >= 40 ? 'text-[#e0218a]' : p >= 15 ? 'text-[#ff69b4]' : 'text-[#f06292]'}`}>
                          {p.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-2.5">
                        {type ? (
                          <img
                            src={type.imageUrl}
                            alt={type.name}
                            className="w-8 h-8 rounded-full border border-[#ffc0cb] object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs text-[#8a4d65]">Unknown</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentCard({
  title,
  value,
  onChange,
  gender,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  gender: 'male' | 'female';
}) {
  const selected = FRENCHIE_TYPES.find((t) => t.id === value)!;
  return (
    <div className="bg-white rounded-3xl border border-[#ffc0cb]/40 p-5 shadow-[0_4px_20px_rgba(224,33,138,0.06)]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-xl ${gender === 'female' ? 'bg-[#e0218a]/10' : 'bg-blue-50'}`}>
          <Heart className={gender === 'female' ? 'text-[#e0218a]' : 'text-blue-500'} size={16} />
        </div>
        <h3 className="text-sm font-bold text-[#1a0510]">{title}</h3>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={selected.imageUrl}
          alt={selected.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#ffc0cb]/40"
        />
        <div>
          <p className="font-bold text-[#1a0510]">{selected.name}</p>
          <p className="text-xs text-[#8a4d65]">{selected.shortName} · {selected.rarity.replace('-', ' ')}</p>
        </div>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#fff8f0] border border-[#ffc0cb] text-[#1a0510] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0218a]/20"
      >
        {FRENCHIE_TYPES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name} ({t.rarity.replace('-', ' ')})
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryRow({ label, value, image }: { label: string; value: string; image?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#8a4d65]">{label}</span>
      <span className="text-[#1a0510] font-medium flex items-center gap-1.5 text-sm">
        {image && (
          <img src={image} alt="" className="w-5 h-5 rounded-full object-cover border border-[#ffc0cb]" />
        )}
        {value}
      </span>
    </div>
  );
}
