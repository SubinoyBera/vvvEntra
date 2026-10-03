import React from 'react';
import { useApp } from '../../context/AppContext';
import { PricingAndBuyerMix } from './PricingAndBuyerMix';

export const MarketSignalsSection: React.FC = () => {
  const { role } = useApp();

  // Weekly Capital Deployment Data matching screenshot
  const weeklyDeploy = [
    { week: 'W1', val: '$2.4M', heightPct: 45 },
    { week: 'W2', val: '$3.1M', heightPct: 52 },
    { week: 'W3', val: '$1.9M', heightPct: 38 },
    { week: 'W4', val: '$4.2M', heightPct: 68 },
    { week: 'W5', val: '$4.8M', heightPct: 74 },
    { week: 'W6', val: '$3.7M', heightPct: 62 },
    { week: 'W7', val: '$5.4M', heightPct: 85 },
    { week: 'W8', val: '$6.1M', heightPct: 92 },
  ];

  // Sector Velocity items matching screenshot
  const sectorVelocities = [
    { rank: '01', name: 'AI Compliance', change: '+28%', dir: 'up', path: 'M0,18 L10,16 L20,12 L30,8 L40,5 L50,3 L60,2' },
    { rank: '02', name: 'RegTech', change: '+26%', dir: 'up', path: 'M0,17 L10,15 L20,13 L30,9 L40,7 L50,5 L60,3' },
    { rank: '03', name: 'AI Agents', change: '+24%', dir: 'up', path: 'M0,17 L10,14 L20,15 L30,9 L40,7 L50,6 L60,3' },
    { rank: '04', name: 'B2B SaaS', change: '+22%', dir: 'up', path: 'M0,15 L10,13 L20,12 L30,11 L40,8 L50,7 L60,5' },
    { rank: '05', name: 'Climate Tech', change: '+18%', dir: 'up', path: 'M0,16 L10,14 L20,14 L30,12 L40,10 L50,8 L60,7' },
    { rank: '06', name: 'Workflow AI', change: '+16%', dir: 'up', path: 'M0,16 L10,15 L20,13 L30,12 L40,10 L50,9 L60,8' },
    { rank: '12', name: 'Crypto / Web3', change: '-8%', dir: 'down', path: 'M0,8 L10,9 L20,11 L30,13 L40,14 L50,16 L60,18' },
  ];

  // Peer Signals items matching screenshot
  const peerSignals = [
    { icon: '★', name: 'Fintech SMB', views: '2.4k views', unlocks: '42 unlocks', highlight: true },
    { icon: '★', name: 'Healthtech', views: '1.8k views', unlocks: '28 unlocks', highlight: true },
    { icon: '★', name: 'AI Workflow', views: '3.1k views', unlocks: '38 unlocks', highlight: true },
    { icon: '·', name: 'D2C Ayurveda', views: '1.2k views', unlocks: '19 unlocks', highlight: true },
    { icon: '·', name: 'Climate Ind.', views: '980 views', unlocks: '14 unlocks', highlight: true },
    { icon: '·', name: 'Edtech', views: '650 views', unlocks: '8 unlocks', highlight: false },
  ];

  return (
    <section id="signals" className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================== */}
        {/* SECTION HEAD: Distinct for Investor vs Architect */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[var(--bg-bone)] border border-[#16A34A]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#16A34A] font-semibold">
                02
              </span>
              <span className="w-1 h-1 rounded-full bg-[#16A34A]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase font-semibold">
                PRICING & BUYER MIX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-[var(--text)] leading-[1.18]">
              Sector unlock pricing & <em className="font-serif italic text-[#16A34A] font-normal">verified buyer mix.</em>
            </h2>

            <p className="text-xs sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Historical unlock ranges, median clearing rates, and active institutional buyer profiles across targeted build sectors.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[var(--bg-bone)] border border-[#E2571B]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#E2571B] font-semibold">
                02
              </span>
              <span className="w-1 h-1 rounded-full bg-[#E2571B]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase font-semibold">
                CAPITAL DISPATCH & VELOCITY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-[var(--text)] leading-[1.18]">
              Macro capital velocity & <em className="font-serif italic text-[#E2571B] font-normal">sector acceleration.</em>
            </h2>

            <p className="text-xs sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Weekly allocation benchmarks, sector momentum rankings, and high-frequency peer review volume across verified venture stages.
            </p>
          </div>
        )}

        {/* ============================================== */}
        {/* SECTION CONTENT: Architect (Pricing & Buyer Mix) vs Investor (3 Cards) */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <PricingAndBuyerMix />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* ======================================================== */}
            {/* CARD 1: Capital deployed · weekly */}
            {/* ======================================================== */}
            <div className="bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-baseline justify-between pb-4 border-b border-black/10 dark:border-[var(--line)] mb-6">
                  <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                    Capital <em className="font-serif italic text-[#E2571B] font-normal">deployed</em>{' '}
                    <span className="font-serif font-light text-[var(--text-muted)]">· weekly</span>
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">Total · $42M</span>
                </div>

                {/* Bar Chart */}
                <div className="h-60 pt-6 flex items-end justify-between gap-2 px-1 relative">
                  {weeklyDeploy.map((item) => (
                    <div key={item.week} className="flex-1 flex flex-col items-center h-full justify-end group">
                      {/* Dollar value label above bar */}
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#E2571B] font-medium mb-1.5 whitespace-nowrap">
                        {item.val}
                      </span>

                      {/* Bar */}
                      <div className="w-full max-w-[28px] bg-neutral-100 dark:bg-neutral-900 rounded-t-[3px] overflow-hidden flex items-end h-full border border-black/5 dark:border-white/5">
                        <div
                          className="w-full bg-[#E2571B] rounded-t-[3px] transition-all duration-500 group-hover:brightness-110 shadow-[0_0_8px_rgba(226,87,27,0.3)]"
                          style={{ height: `${item.heightPct}%` }}
                        />
                      </div>

                      {/* Week label */}
                      <span className="font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] mt-2 font-medium">
                        {item.week}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Summary */}
              <div className="pt-3 mt-4 border-t border-black/10 dark:border-[var(--line)] text-xs font-mono text-[var(--text-muted)] leading-relaxed">
                Capital flow accelerating. Week-over-week growth averaging{' '}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">+18%</strong>.
              </div>
            </div>

            {/* ======================================================== */}
            {/* CARD 2: Sector velocity */}
            {/* ======================================================== */}
            <div className="bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-baseline justify-between pb-4 border-b border-black/10 dark:border-[var(--line)] mb-2">
                  <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                    Sector <em className="font-serif italic text-[#E2571B] font-normal">velocity</em>
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">Buyer interest · 7d</span>
                </div>

                {/* Rows List */}
                <div className="divide-y divide-black/5 dark:divide-[var(--line)]">
                  {sectorVelocities.map((sec) => (
                    <div
                      key={sec.name}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs font-sans group hover:bg-neutral-50 dark:hover:bg-[var(--bg-tint)] px-1.5 rounded transition-colors"
                    >
                      {/* Rank */}
                      <span className="font-mono text-[11px] text-[var(--text-muted)] w-5 shrink-0">
                        {sec.rank}
                      </span>

                      {/* Name */}
                      <span className="text-[var(--text)] text-xs sm:text-[13px] font-medium flex-1 truncate">
                        {sec.name}
                      </span>

                      {/* Sparkline Curve */}
                      <div className="w-16 h-5 shrink-0 flex items-center">
                        <svg viewBox="0 0 60 22" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                          <path
                            d={sec.path}
                            fill="none"
                            stroke={sec.dir === 'up' ? '#16A34A' : '#EF4444'}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Percentage */}
                      <span
                        className={`font-mono text-xs sm:text-[12.5px] font-semibold w-12 text-right shrink-0 ${
                          sec.dir === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {sec.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CARD 3: Where peers are looking */}
            {/* ======================================================== */}
            <div className="bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="pb-4 border-b border-black/10 dark:border-[var(--line)] mb-2">
                  <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                    Where <em className="font-serif italic text-[#E2571B] font-normal">peers</em> are looking
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)] mt-1 block">
                    Aggregated buyer signals
                  </span>
                </div>

                {/* Rows List */}
                <div className="divide-y divide-black/5 dark:divide-[var(--line)]">
                  {peerSignals.map((item, idx) => (
                    <div
                      key={`${item.name}-${idx}`}
                      className="py-3 flex items-center justify-between gap-3 text-xs font-sans group hover:bg-neutral-50 dark:hover:bg-[var(--bg-tint)] px-1.5 rounded transition-colors"
                    >
                      {/* Star or Bullet Icon */}
                      <span
                        className={`w-4 text-center shrink-0 ${
                          item.icon === '★' ? 'text-amber-500 dark:text-amber-400 text-xs' : 'text-neutral-400 text-sm'
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Sector Name */}
                      <span className="text-[var(--text)] text-xs sm:text-[13.5px] font-medium flex-1 truncate">
                        {item.name}
                      </span>

                      {/* View count */}
                      <span className="font-mono text-[11px] sm:text-xs text-[var(--text-muted)] text-right shrink-0">
                        {item.views}
                      </span>

                      {/* Unlock count */}
                      <span
                        className={`font-mono text-xs sm:text-[12.5px] text-right shrink-0 font-medium w-20 ${
                          item.highlight ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {item.unlocks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
