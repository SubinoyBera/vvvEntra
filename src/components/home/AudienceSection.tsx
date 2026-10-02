import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  name: string;
  demand: number;
  supply: number;
  unlock: number;
  clear: number;
  cost: 'lean' | 'mid' | 'heavy';
  domain: 'ops' | 'tech' | 'consumer';
}

const ALL_CATEGORIES: CategoryItem[] = [
  { name: 'AI agents · vertical operations', demand: 92, supply: 32, unlock: 7800, clear: 8, cost: 'mid', domain: 'tech' },
  { name: 'RegTech · mid-market compliance', demand: 84, supply: 18, unlock: 6200, clear: 12, cost: 'mid', domain: 'ops' },
  { name: 'B2B SaaS · onboarding automation', demand: 79, supply: 35, unlock: 4600, clear: 10, cost: 'lean', domain: 'tech' },
  { name: 'D2C · subscription retention engine', demand: 71, supply: 41, unlock: 3900, clear: 9, cost: 'lean', domain: 'consumer' },
  { name: 'Healthtech · diagnostics workflow', demand: 74, supply: 28, unlock: 5400, clear: 15, cost: 'heavy', domain: 'tech' },
  { name: 'Climate · industrial efficiency', demand: 68, supply: 22, unlock: 6900, clear: 18, cost: 'heavy', domain: 'ops' },
  { name: 'Fintech SMB · embedded lending', demand: 62, supply: 36, unlock: 5800, clear: 11, cost: 'mid', domain: 'ops' },
  { name: 'Creator economy · monetization ops', demand: 58, supply: 26, unlock: 3200, clear: 13, cost: 'lean', domain: 'consumer' },
  { name: 'Logistics · last-mile optimization', demand: 66, supply: 24, unlock: 6100, clear: 14, cost: 'mid', domain: 'ops' },
  { name: 'Insurtech · claims automation', demand: 70, supply: 20, unlock: 7200, clear: 12, cost: 'heavy', domain: 'tech' }
];

export const AudienceSection: React.FC = () => {
  const { setActiveRoute, addToast, role } = useApp();

  const [capital, setCapital] = useState<'lean' | 'mid' | 'heavy'>('lean');
  const [speed, setSpeed] = useState<'fast' | 'balanced' | 'value'>('fast');
  const [domain, setDomain] = useState<'any' | 'ops' | 'tech' | 'consumer'>('any');

  // Compute dynamic scoring matching the mathematical model
  const scoreCategory = (c: CategoryItem) => {
    const gap = c.demand - c.supply;
    let s = gap * 1.2 + c.demand * 0.4;

    if (speed === 'fast') s += Math.max(0, 20 - c.clear) * 2.2;
    else if (speed === 'value') s += (c.unlock / 1000) * 3.0;
    else s += Math.max(0, 20 - c.clear) * 1.0 + (c.unlock / 1000) * 1.2;

    const order = { lean: 1, mid: 2, heavy: 3 };
    const fitGap = Math.abs(order[capital] - order[c.cost]);
    s -= fitGap * 10;

    if (domain !== 'any') {
      s += c.domain === domain ? 16 : -6;
    }

    return s;
  };

  const getFitLabel = (c: CategoryItem) => {
    const order = { lean: 1, mid: 2, heavy: 3 };
    const fitGap = Math.abs(order[capital] - order[c.cost]);
    const domainOk = domain === 'any' || c.domain === domain;

    if (role === 'architect') {
      return fitGap === 0 && domainOk
        ? { label: 'Strong fit', colorClass: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30' }
        : { label: 'Good fit', colorClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/30' };
    }

    return fitGap === 0 && domainOk
      ? { label: 'Strong fit', colorClass: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/20' }
      : { label: 'Good fit', colorClass: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/20' };
  };

  const rankedCategories = [...ALL_CATEGORIES]
    .map((c) => ({ item: c, score: scoreCategory(c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const topMatch = rankedCategories[0]?.item;

  const handleListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveRoute('#list');
    window.location.hash = '#list';
    addToast('Opening opportunity listing module.', 'info');
    const el = document.getElementById('list') || document.getElementById('opportunities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="for-listers" className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container with slightly orangish tinge in light mode, dark gradient in dark mode */}
        <div
          className={`border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl overflow-hidden transition-all duration-300 ${
            role === 'architect'
              ? 'bg-[#F6FAF7] dark:bg-gradient-to-b dark:from-[#0F1A13] dark:via-[#0B140F] dark:to-[#070D0A] border-emerald-600/20 dark:border-emerald-500/25 shadow-[0_16px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_50px_rgba(22,163,74,0.08)]'
              : 'bg-[#FFF7F1] dark:bg-gradient-to-b dark:from-[#1C140D] dark:via-[#140E0A] dark:to-[#0D0B09] border-[#E2571B]/25 dark:border-orange-500/20 shadow-[0_16px_50px_rgba(226,87,27,0.08)] dark:shadow-[0_16px_50px_rgba(226,87,27,0.08)]'
          }`}
        >
          
          {/* Header Zone */}
          <div className="pb-6 border-b border-[#E2571B]/15 dark:border-[var(--line)]">
            {/* Marker */}
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className={`w-2 h-2 rotate-45 inline-block transition-colors duration-300 ${
                  role === 'architect' ? 'bg-[#16A34A]' : 'bg-[#E2571B]'
                }`}
              />
              <span className="w-8 h-px bg-[var(--line-strong)] inline-block" />
              <span className="font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-medium">
                {role === 'architect' ? 'PERSONALIZED · FOR ARCHITECTS' : 'PERSONALIZED · FOR LISTERS'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-[var(--text)] mb-2.5">
              What should you{' '}
              <em
                className={`font-serif italic font-normal transition-colors duration-300 ${
                  role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                }`}
              >
                list?
              </em>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
              Shape the lens to your situation. We match it against live buyer demand and return the categories worth building.
            </p>
          </div>

          {/* Three Interactive Filters Zone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-6 border-b border-[#E2571B]/15 dark:border-[var(--line)]">
            
            {/* Filter 1: Capital */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
                CAPITAL YOU CAN DEPLOY TO BUILD
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'lean', label: 'Lean / bootstrap' },
                  { id: 'mid', label: 'Moderate' },
                  { id: 'heavy', label: 'Well funded' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCapital(opt.id as any)}
                    className={`px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-sans transition-all cursor-pointer border ${
                      capital === opt.id
                        ? role === 'architect'
                          ? 'border-[#16A34A] bg-[#16A34A]/20 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs shadow-emerald-500/20'
                          : 'border-[#E2571B] bg-[#E2571B]/20 text-[#E2571B] font-semibold shadow-xs shadow-orange-500/20'
                        : 'border-black/10 dark:border-white/10 bg-white/85 hover:bg-white dark:bg-[#181512] text-neutral-600 dark:text-[var(--text-muted)] hover:text-neutral-900 dark:hover:text-white hover:border-[var(--role)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Speed */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
                HOW FAST YOU WANT IT TO CLEAR
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'fast', label: 'Fastest' },
                  { id: 'balanced', label: 'Balanced' },
                  { id: 'value', label: 'Highest value' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSpeed(opt.id as any)}
                    className={`px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-sans transition-all cursor-pointer border ${
                      speed === opt.id
                        ? role === 'architect'
                          ? 'border-[#16A34A] bg-[#16A34A]/20 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs shadow-emerald-500/20'
                          : 'border-[#E2571B] bg-[#E2571B]/20 text-[#E2571B] font-semibold shadow-xs shadow-orange-500/20'
                        : 'border-black/10 dark:border-white/10 bg-white/85 hover:bg-white dark:bg-[#181512] text-neutral-600 dark:text-[var(--text-muted)] hover:text-neutral-900 dark:hover:text-white hover:border-[var(--role)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Edge Domain */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
                WHERE YOUR EDGE IS
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'any', label: 'No preference' },
                  { id: 'ops', label: 'Operations / B2B' },
                  { id: 'tech', label: 'AI / software' },
                  { id: 'consumer', label: 'Consumer / D2C' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDomain(opt.id as any)}
                    className={`px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-sans transition-all cursor-pointer border ${
                      domain === opt.id
                        ? role === 'architect'
                          ? 'border-[#16A34A] bg-[#16A34A]/20 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs shadow-emerald-500/20'
                          : 'border-[#E2571B] bg-[#E2571B]/20 text-[#E2571B] font-semibold shadow-xs shadow-orange-500/20'
                        : 'border-black/10 dark:border-white/10 bg-white/85 hover:bg-white dark:bg-[#181512] text-neutral-600 dark:text-[var(--text-muted)] hover:text-neutral-900 dark:hover:text-white hover:border-[var(--role)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Zone */}
          <div className="pt-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-[var(--text)]">
                Best matches for you
              </h3>
              <span className="text-xs font-mono text-neutral-500 dark:text-[var(--text-muted)]">
                Ranked by demand, supply gap, and your lens
              </span>
            </div>

            {/* Results Cards List with Orange/Green hover border */}
            <div className="space-y-3 mb-8">
              {rankedCategories.map(({ item: cat }, index) => {
                const gap = cat.demand - cat.supply;
                const fit = getFitLabel(cat);
                const rankNum = String(index + 1).padStart(2, '0');

                return (
                  <div
                    key={cat.name}
                    className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm cursor-pointer group ${
                      role === 'architect'
                        ? 'bg-white hover:bg-neutral-50 dark:bg-[#0B130E] dark:hover:bg-[#101A13] border-emerald-500/15 dark:border-emerald-500/10 hover:border-[#16A34A] hover:shadow-[0_0_20px_rgba(22,163,74,0.18)]'
                        : 'bg-white hover:bg-[#FFFDFB] dark:bg-[#16110D] dark:hover:bg-[#1C1611] border-orange-500/15 dark:border-orange-500/10 hover:border-[#E2571B] hover:shadow-[0_0_20px_rgba(226,87,27,0.18)]'
                    }`}
                  >
                    {/* Left: Rank & Title & Meta */}
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      {/* Serif Rank Number */}
                      <span
                        className={`font-serif italic text-xl sm:text-2xl shrink-0 font-normal transition-colors duration-300 ${
                          role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                        }`}
                      >
                        {rankNum}
                      </span>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-sm sm:text-base font-semibold text-neutral-900 dark:text-[var(--text)] tracking-tight truncate transition-colors duration-200 ${
                            role === 'architect'
                              ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300'
                              : 'group-hover:text-orange-600 dark:group-hover:text-orange-300'
                          }`}
                        >
                          {cat.name}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-neutral-600 dark:text-[var(--text-muted)] mt-1">
                          <span>
                            Demand <strong className="text-neutral-900 dark:text-[var(--text)] font-semibold">{cat.demand}</strong>
                          </span>
                          <span>
                            Supply <strong className="text-neutral-900 dark:text-[var(--text)] font-semibold">{cat.supply}</strong>
                          </span>
                          <span>
                            Avg unlock <strong className="text-neutral-900 dark:text-[var(--text)] font-semibold">${cat.unlock.toLocaleString()}</strong>
                          </span>
                          <span>
                            ~<strong className="text-neutral-900 dark:text-[var(--text)] font-semibold">{cat.clear}d</strong> clear
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Gap & Fit Badge */}
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 border-black/10 dark:border-[var(--line)] pt-2 sm:pt-0">
                      <div className="flex items-baseline sm:flex-col sm:items-end gap-1.5 sm:gap-0">
                        <span className="font-serif text-2xl sm:text-3xl text-neutral-900 dark:text-[var(--text)] font-normal leading-none">
                          +{gap}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-neutral-500 dark:text-[var(--text-muted)] uppercase mt-0.5">
                          DEMAND GAP
                        </span>
                      </div>

                      <div className="mt-1.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${fit.colorClass}`}>
                          {fit.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Recommendation CTA Bar */}
            <div className="pt-6 border-t border-[#E2571B]/15 dark:border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-[13px] font-mono text-neutral-600 dark:text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Top match: <span className="text-neutral-900 dark:text-[var(--text)] font-semibold">{topMatch?.name}</span>. Structure a 90+ page opportunity here and it clears fastest for your profile.
              </p>

              <button
                onClick={handleListClick}
                className={`px-6 py-2.5 rounded-lg text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer tracking-wide ${
                  role === 'architect'
                    ? 'bg-[#16A34A] hover:bg-[#15803d]'
                    : 'bg-[#E2571B] hover:bg-[#CC4712]'
                }`}
              >
                <span>List this opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
