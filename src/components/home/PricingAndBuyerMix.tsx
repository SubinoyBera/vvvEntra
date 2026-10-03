import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react';

interface BenchmarkRow {
  sector: string;
  subSector: string;
  min: string;
  avg: string;
  top: string;
  sparkline: string;
}

interface BuyerSlice {
  id: string;
  name: string;
  pct: number;
  color: string;
  hoverColor: string;
  count: number;
  checkSize: string;
  focus: string;
}

const BENCHMARKS: BenchmarkRow[] = [
  {
    sector: 'Fintech SMB',
    subSector: 'LENDING · PAYMENTS',
    min: '$4.2k',
    avg: '$7.2k',
    top: '$12.4k',
    sparkline: 'M2,18 C15,17 28,12 42,9 C48,7 54,5 62,3',
  },
  {
    sector: 'Healthtech',
    subSector: 'DIAGNOSTICS · CARE',
    min: '$3.8k',
    avg: '$6.8k',
    top: '$11.2k',
    sparkline: 'M2,17 C16,16 28,13 40,10 C48,8 55,6 62,4',
  },
  {
    sector: 'AI Workflow',
    subSector: 'VERTICAL AGENTS',
    min: '$2.9k',
    avg: '$5.4k',
    top: '$9.8k',
    sparkline: 'M2,18 C14,16 26,14 38,11 C48,8 54,6 62,5',
  },
  {
    sector: 'D2C Ayurveda',
    subSector: 'WELLNESS · CONSUMER',
    min: '$2.6k',
    avg: '$4.8k',
    top: '$8.4k',
    sparkline: 'M2,18 C16,17 30,15 42,12 C48,10 55,8 62,7',
  },
  {
    sector: 'Climate Industry',
    subSector: 'CARBON · INDUSTRIAL',
    min: '$2.4k',
    avg: '$4.4k',
    top: '$7.8k',
    sparkline: 'M2,16 C15,15 28,14 40,12 C48,11 55,10 62,9',
  },
];

const BUYER_SLICES: BuyerSlice[] = [
  {
    id: 'pe',
    name: 'PE Directors',
    pct: 30,
    color: '#E2571B',
    hoverColor: '#F97316',
    count: 74,
    checkSize: '$50k – $250k escrow',
    focus: 'EBITDA positive · Vertical RegTech & Automation',
  },
  {
    id: 'vc',
    name: 'VC Partners',
    pct: 20,
    color: '#3B82F6',
    hoverColor: '#60A5FA',
    count: 49,
    checkSize: 'Early equity & IP buyout',
    focus: 'Proprietary AI pipelines & Multi-agent tools',
  },
  {
    id: 'fo',
    name: 'Family Offices',
    pct: 24,
    color: '#A855F7',
    hoverColor: '#C084FC',
    count: 59,
    checkSize: 'Direct balance sheet buyouts',
    focus: 'Cash-generative SMB infra & Cross-border D2C',
  },
  {
    id: 'sb',
    name: 'Strategic Buyers',
    pct: 15,
    color: '#D4A373',
    hoverColor: '#E2B888',
    count: 37,
    checkSize: 'Premium bolt-on acquisitions',
    focus: 'Immediate enterprise customer synergy & M&A',
  },
  {
    id: 'oi',
    name: 'Operator-Investors',
    pct: 11,
    color: '#16A34A',
    hoverColor: '#22C55E',
    count: 28,
    checkSize: 'Hands-on turnaround / build',
    focus: 'Turnkey operational playbooks & Lean SaaS',
  },
];

// Helper to generate SVG donut arcs with precise gaps
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeDonutArc(
  x: number,
  y: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number
) {
  const gap = 1.4;
  const s = startAngle + gap;
  const e = endAngle - gap;
  if (e <= s) return '';

  const outerStart = polarToCartesian(x, y, rOuter, s);
  const outerEnd = polarToCartesian(x, y, rOuter, e);
  const innerStart = polarToCartesian(x, y, rInner, e);
  const innerEnd = polarToCartesian(x, y, rInner, s);

  const largeArcFlag = e - s <= 180 ? '0' : '1';

  return [
    'M', outerStart.x, outerStart.y,
    'A', rOuter, rOuter, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
    'L', innerStart.x, innerStart.y,
    'A', rInner, rInner, 0, largeArcFlag, 0, innerEnd.x, innerEnd.y,
    'Z',
  ].join(' ');
}

export const PricingAndBuyerMix: React.FC = () => {
  const { openNdaModal } = useApp();
  const [activeSlice, setActiveSlice] = useState<BuyerSlice | null>(null);

  // Compute angles for each donut slice
  let currentAngle = 0;
  const arcData = BUYER_SLICES.map((slice) => {
    const sweep = (slice.pct / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle += sweep;
    return {
      slice,
      startAngle,
      endAngle,
      d: describeDonutArc(100, 100, 84, 58, startAngle, endAngle),
      dHover: describeDonutArc(100, 100, 89, 55, startAngle, endAngle),
    };
  });

  return (
    <div className="space-y-6">
      
      {/* 2 Equal Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ======================================================== */}
        {/* LEFT CARD: Sector pricing benchmarks (7 Cols Desktop) */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl flex flex-col justify-between select-none">
          <div>
            {/* Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-black/10 dark:border-[var(--line)] mb-4">
              <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                Sector <em className="font-serif italic font-normal text-[#16A34A]">pricing benchmarks</em>
              </h3>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                AVG · LAST 30 DAYS
              </span>
            </div>

            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-2 text-[10.5px] sm:text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest pb-3 border-b border-black/10 dark:border-[var(--line)] px-2">
              <div className="col-span-5">SECTOR</div>
              <div className="col-span-2 text-right">MIN</div>
              <div className="col-span-2 text-right text-emerald-600 dark:text-emerald-400 font-semibold">AVG</div>
              <div className="col-span-2 text-right">TOP</div>
              <div className="col-span-1 text-right">TREND</div>
            </div>

            {/* Benchmark Rows */}
            <div className="divide-y divide-black/5 dark:divide-[var(--line)]">
              {BENCHMARKS.map((row, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    openNdaModal({
                      id: `BENCH-${idx}`,
                      code: `VVE-BENCH-${idx + 1}`,
                      category: row.sector,
                      tag: row.subSector.split('·')[0].trim(),
                      demandTag: 'High Liquidity',
                      demandTrend: 'hot',
                      title: `${row.sector} · Institutional Benchmark Blueprint`,
                      blurredPart: 'comprehensive financial models & clearance logs',
                      description: `Historical pricing spread: ${row.min} min, ${row.avg} average, ${row.top} top clearing. High buy-side search frequency.`,
                      pages: 110,
                      frameworks: 8,
                      finModels: 4,
                      architectRole: 'Lead Venture Architect',
                      architectNote: `Priced at ${row.avg} with expected turnaround under 12 days.`,
                      unlockPrice: parseInt(row.avg.replace(/[^0-9]/g, '')) * 100 || 6200,
                      status: 'locked',
                    })
                  }
                  className="grid grid-cols-12 gap-2 items-center py-4 px-2 rounded-xl transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-[var(--bg-tint)] cursor-pointer group hover:border hover:border-[#16A34A]/30 border border-transparent"
                >
                  {/* Sector Title & Subsector */}
                  <div className="col-span-5 min-w-0 pr-1">
                    <div className="text-xs sm:text-[14px] font-medium text-[var(--text)] tracking-tight truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {row.sector}
                    </div>
                    <div className="text-[9.5px] sm:text-[10px] font-mono text-[var(--text-muted)] tracking-wider truncate mt-0.5 uppercase">
                      {row.subSector}
                    </div>
                  </div>

                  {/* Min Price */}
                  <div className="col-span-2 text-right font-mono text-xs sm:text-[13.5px] text-[var(--text-muted)] tabular-nums">
                    {row.min}
                  </div>

                  {/* Avg Price (Highlighted in green as in image) */}
                  <div className="col-span-2 text-right font-mono text-xs sm:text-[13.5px] font-semibold text-[#16A34A] tabular-nums">
                    {row.avg}
                  </div>

                  {/* Top Price */}
                  <div className="col-span-2 text-right font-mono text-xs sm:text-[13.5px] text-[var(--text-muted)] tabular-nums">
                    {row.top}
                  </div>

                  {/* Trend Sparkline */}
                  <div className="col-span-1 flex justify-end items-center">
                    <div className="w-14 sm:w-16 h-5">
                      <svg viewBox="0 0 64 20" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        <path
                          d={row.sparkline}
                          fill="none"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:stroke-emerald-400 transition-colors"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Card Bottom Takeaway */}
          <div className="pt-4 mt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Median unlock spread: <strong className="text-[var(--text)] font-semibold">$4.4k – $7.2k</strong></span>
            </span>
            <span className="text-[#16A34A] hover:underline cursor-pointer hidden sm:inline">
              Tap row to view verified comps →
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT CARD: Who's looking · buyer mix (5 Cols Desktop) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl flex flex-col justify-between select-none">
          <div>
            {/* Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-black/10 dark:border-[var(--line)] mb-5">
              <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                Who's <em className="font-serif italic font-normal text-[#16A34A]">looking</em>
                <span className="font-serif font-light text-[var(--text-muted)]"> · buyer mix</span>
              </h3>
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
                By sector engagement
              </span>
            </div>

            {/* Donut Chart & Legend Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 py-2">
              
              {/* Donut SVG with 247 Total Buyers in center */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  {arcData.map(({ slice, d, dHover }) => {
                    const isHovered = activeSlice?.id === slice.id;
                    return (
                      <path
                        key={slice.id}
                        d={isHovered ? dHover : d}
                        fill={isHovered ? slice.hoverColor : slice.color}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setActiveSlice(slice)}
                        onMouseLeave={() => setActiveSlice(null)}
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Counter matching screenshot */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="font-serif italic text-3xl sm:text-[34px] text-[#16A34A] font-normal leading-none tabular-nums">
                    {activeSlice ? `${activeSlice.pct}%` : '247'}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-neutral-500 dark:text-[var(--text-muted)] mt-1 font-medium">
                    {activeSlice ? activeSlice.name : 'TOTAL BUYERS'}
                  </span>
                </div>
              </div>

              {/* Legend matching screenshot */}
              <div className="flex-1 w-full space-y-2.5 font-sans text-xs">
                {BUYER_SLICES.map((slice) => {
                  const isHovered = activeSlice?.id === slice.id;
                  return (
                    <div
                      key={slice.id}
                      onMouseEnter={() => setActiveSlice(slice)}
                      onMouseLeave={() => setActiveSlice(null)}
                      className={`flex items-center justify-between gap-2 px-2 py-1 rounded-md transition-all cursor-pointer ${
                        isHovered ? 'bg-neutral-100 dark:bg-[var(--bg-tint)] translate-x-1' : 'hover:bg-neutral-50 dark:hover:bg-[var(--bg-tint)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                          style={{ backgroundColor: slice.color }}
                        />
                        <span className={`truncate text-xs sm:text-[13px] ${isHovered ? 'text-neutral-900 dark:text-[var(--text)] font-semibold' : 'text-neutral-600 dark:text-[var(--text-muted)]'}`}>
                          {slice.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs sm:text-[13px] text-neutral-900 dark:text-[var(--text)] font-semibold tabular-nums shrink-0">
                        {slice.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* ======================================================== */}
            {/* Meaningful & Relevant Under-Pie Section to Fill Empty Space */}
            {/* ======================================================== */}
            <div className="mt-5 pt-4 border-t border-black/10 dark:border-[var(--line)] space-y-3">
              
              {/* Dynamic Telemetry Box (Updates on slice hover or defaults to PE & Family Office insight) */}
              <div className="bg-neutral-50 dark:bg-[var(--bg-bone)] border border-[#16A34A]/25 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{activeSlice ? `${activeSlice.name} Requirements` : 'Institutional Acquisition Depth'}</span>
                  </span>
                  <span className="text-neutral-500 dark:text-[var(--text-muted)]">
                    {activeSlice ? `${activeSlice.count} verified funds` : '54% Buyout Dominance'}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-[var(--text-muted)] font-sans leading-relaxed">
                  {activeSlice
                    ? `${activeSlice.name} seek: ${activeSlice.focus}. Typical ticket: ${activeSlice.checkSize}.`
                    : 'PE Directors & Family Offices command 54% of current buy-side liquidity. Blueprints with audited compliance and ARR visibility clear 2.8x faster.'}
                </p>
              </div>

              {/* High-frequency buyer indicators */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-white dark:bg-[var(--bg-paper)] border border-black/10 dark:border-[var(--line-strong)] rounded-lg p-2.5 shadow-xs">
                  <span className="text-neutral-500 dark:text-[var(--text-muted)] uppercase tracking-wider block text-[9.5px]">Avg Clear Window</span>
                  <span className="text-neutral-900 dark:text-[var(--text)] font-semibold text-xs mt-0.5 block">11.4 Days</span>
                </div>
                <div className="bg-white dark:bg-[var(--bg-paper)] border border-black/10 dark:border-[var(--line-strong)] rounded-lg p-2.5 shadow-xs">
                  <span className="text-neutral-500 dark:text-[var(--text-muted)] uppercase tracking-wider block text-[9.5px]">Escrow Liquidity</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs mt-0.5 block">$38.2M Available</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Card Bottom Footer */}
          <div className="pt-3 mt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time mandate sync</span>
            </span>
            <span className="text-[var(--text-muted)]">Updated today</span>
          </div>

        </div>

      </div>

    </div>
  );
};
