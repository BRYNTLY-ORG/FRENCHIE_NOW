'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Dna, Baby, TrendingUp, Star, Home, Menu, X, Crown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dna', label: 'DNA', icon: Dna },
  { href: '/breeding', label: 'Breeding', icon: Baby },
  { href: '/market', label: 'Market', icon: TrendingUp },
  { href: '/recommend', label: 'Scores', icon: Star },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ffc0cb] shadow-[0_4px_24px_rgba(224,33,138,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-[#d81b60] font-bold text-xl tracking-tight">
            <span className="bg-[#e0218a] text-white rounded-xl px-2.5 py-1 text-sm shadow-lg shadow-[#e0218a]/20">
              <Crown size={16} className="inline -mt-0.5 mr-0.5" />
              FN
            </span>
            <span className="hidden sm:inline">Frenchie Now</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#e0218a]/10 text-[#d81b60] shadow-inner shadow-[#e0218a]/5'
                      : 'text-[#8a4d65] hover:bg-[#ffc0cb]/30 hover:text-[#d81b60]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden text-[#d81b60] hover:text-[#d81b60] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#ffc0cb]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium ${
                  active ? 'text-[#d81b60] bg-[#ffc0cb]/20' : 'text-[#8a4d65] hover:bg-[#ffc0cb]/20'
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
