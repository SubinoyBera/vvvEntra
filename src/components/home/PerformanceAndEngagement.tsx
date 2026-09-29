import React, { useState, useEffect, useRef } from 'react';

interface FunnelStage {
  name: string;
  tier: string;
  count: string;
  rate: string;
  barWidth: number; // 0 to 100 for relative representation
  isRateGreen: boolean;
}

interface RegionDemandItem {
  name: string;
  sub: string;
  pct: number;
}

interface ExploringBuyer {
  id: string;
  avatar: string;
  avatarType: 'sb' | 'vc' | 'pe' | 'fo' | 'oi';
  role: string;
  subtext: string;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    name: 'Public previews',
    tier: 'TIER 0',
    count: '1,847',
    rate: '100%',
    barWidth: 10,
    isRateGreen: false,
  },
  {
    name: 'Verified access',
    tier: 'TIER 1',
    count: '776',
    rate: '42%',
    barWidth: 6,
    isRateGreen: false,
  },
  {
    name: 'Interest deposit',
    tier: 'TIER 2',
    count: '332',
    rate: '43%',
    barWidth: 5,
    isRateGreen: true,
  },
  {
    name: 'NDA signed',
    tier: 'TIER 3',
    count: '166',
    rate: '50%',
    barWidth: 4,
    isRateGreen: true,
  },
  {
    name: 'Full unlock',
    tier: 'TIER 4',
    count: '92',
    rate: '55%',
    barWidth: 3,
    isRateGreen: true,
  },
];

const REGIONAL_DEMAND: RegionDemandItem[] = [
  { name: 'India', sub: 'TIER 1 & 2 CITIES', pct: 92 },
  { name: 'North America', sub: 'US, CANADA', pct: 78 },
  { name: 'Europe', sub: 'UK, EU', pct: 65 },
  { name: 'Singapore', sub: '+SEA HUBS', pct: 58 },
  { name: 'UAE', sub: '+GCC', pct: 48 },
  { name: 'Australia', sub: 'SYDNEY', pct: 34 },
];

const EXPLORING_CATALOG: Omit<ExploringBuyer, 'id'>[] = [
  {
    avatar: 'SB',
    avatarType: 'sb',
    role: 'Strategic Buyer',
    subtext: 'Tier 3: AI agents',
  },
  {
    avatar: 'VC',
    avatarType: 'vc',
    role: 'VC Partner',
    subtext: 'B2B SaaS healthcare',
  },
  {
    avatar: 'PE',
    avatarType: 'pe',
    role: 'PE Principal',
    subtext: 'AI vertical compliance',
  },
  {
    avatar: 'FO',
    avatarType: 'fo',
    role: 'Family Office',
    subtext: 'Workflow AI vertical',
  },
  {
    avatar: 'SB',
    avatarType: 'sb',
    role: 'Strategic Buyer',
    subtext: 'RegTech mid-market diligence',
  },
  {
    avatar: 'VC',
    avatarType: 'vc',
    role: 'Growth Fund Lead',
    subtext: 'Climate tech automation',
  },
  {
    avatar: 'PE',
    avatarType: 'pe',
    role: 'Managing Director',
    subtext: 'Fintech SMB embedded credit',
  },
  {
    avatar: 'FO',
    avatarType: 'fo',
    role: 'Single Family Office',
    subtext: 'Diagnostics care network model',
  },
  {
    avatar: 'OI',
    avatarType: 'oi',
    role: 'Operator-Investor',
    subtext: 'LegalTech contract execution engine',
  },
];

const INITIAL_EXPLORING: ExploringBuyer[] = [
  { ...EXPLORING_CATALOG[0], id: 'exp-init-0' },
  { ...EXPLORING_CATALOG[1], id: 'exp-init-1' },
  { ...EXPLORING_CATALOG[2], id: 'exp-init-2' },
  { ...EXPLORING_CATALOG[3], id: 'exp-init-3' },
  { ...EXPLORING_CATALOG[4], id: 'exp-init-4' },
];

const getSlotTimestamp = (idx: number): string => {
  if (idx === 0) return 'just now';
  if (idx === 1) return 'just now';
  if (idx === 2) return '1m ago';
  if (idx === 3) return '2m ago';
  return '3m ago';
};

export const PerformanceAndEngagement: React.FC = () => {
  // 1. Regional demand scroll reveal & count-up animation
  const regionalRef = useRef<HTMLDivElement | null>(null);
  const [isBarsVisible, setIsBarsVisible] = useState<boolean>(false);
  const [displayPcts, setDisplayPcts] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // 2. Dynamic 5s cycle for "Live · who's exploring"
  const [displayedBuyers, setDisplayedBuyers] = useState<ExploringBuyer[]>(INITIAL_EXPLORING);
  const [newlyArrivedId, setNewlyArrivedId] = useState<string | null>(null);
  const poolIndexRef = useRef<number>(5);
  const seqCounterRef = useRef<number>(200);

  // Scroll reveal IntersectionObserver with immediate viewport check & failsafe
  useEffect(() => {
    const target = regionalRef.current;
    if (!target) return;

    // Check if element is already in viewport
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsBarsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBarsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px 50px 0px',
      }
    );

    observer.observe(target);

    // Safeguard timeout to ensure bars never get stuck at 0%
    const fallbackTimer = setTimeout(() => {
      setIsBarsVisible(true);
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Smooth numeric counter animation for regional percentages
  useEffect(() => {
    if (!isBarsVisible) return;

    const duration = 1400; // ms
    const startTime = performance.now();

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayPcts(REGIONAL_DEMAND.map((r) => Math.round(r.pct * eased)));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setDisplayPcts(REGIONAL_DEMAND.map((r) => r.pct));
      }
    };

    const animFrame = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animFrame);
  }, [isBarsVisible]);

  // 5-second dynamic rotation for "Live · who's exploring"
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = poolIndexRef.current++;
      const nextTemplate = EXPLORING_CATALOG[nextIdx % EXPLORING_CATALOG.length];
      const uniqueSeq = seqCounterRef.current++;
      const uniqueId = `exp-${nextTemplate.avatarType}-${uniqueSeq}`;

      const incomingItem: ExploringBuyer = {
        ...nextTemplate,
        id: uniqueId,
      };

      setNewlyArrivedId(uniqueId);
      setDisplayedBuyers((prev) => [incomingItem, ...prev.slice(0, 4)]);

      setTimeout(() => {
        setNewlyArrivedId((curr) => (curr === uniqueId ? null : curr));
      }, 1800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAvatarStyles = (type: ExploringBuyer['avatarType']) => {
    switch (type) {
      case 'sb':
        return 'bg-[#2E241B] text-[#D4A373] border border-[#D4A373]/30';
      case 'vc':
        return 'bg-[#142338] text-[#60A5FA] border border-[#3B82F6]/30';
      case 'pe':
        return 'bg-[#2A1D17] text-[#FB923C] border border-[#EA580C]/30';
      case 'fo':
        return 'bg-[#261A34] text-[#C084FC] border border-[#A855F7]/30';
      case 'oi':
        return 'bg-[#122618] text-[#4ADE80] border border-[#16A34A]/30';
      default:
        return 'bg-white/10 text-white border border-white/15';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch select-none">
      
      {/* ======================================================== */}
      {/* CARD 1: Avg listing funnel */}
      {/* ======================================================== */}
      <div className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between h-[590px] sm:h-[620px] box-border">
        <div>
          {/* Header */}
          <div className="flex items-baseline justify-between pb-5 border-b border-white/10 mb-6">
            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
              Avg listing <em className="font-serif italic font-normal text-[#16A34A]">funnel</em>
            </h3>
            <span className="font-mono text-xs text-neutral-400 tracking-wider">
              Senior tier · 30d
            </span>
          </div>

          {/* Funnel Rows */}
          <div className="space-y-6 pt-1">
            {FUNNEL_STAGES.map((stage, idx) => (
              <div
                key={stage.name}
                className="flex items-center justify-between gap-3 text-xs font-sans group hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-lg transition-colors"
              >
                {/* Stage Title & Tier */}
                <div className="w-28 sm:w-32 shrink-0">
                  <div className="text-xs sm:text-[13.5px] font-medium text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {stage.name}
                  </div>
                  <div className="text-[9px] sm:text-[9.5px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">
                    {stage.tier}
                  </div>
                </div>

                {/* Funnel Vertical Pillar Bar */}
                <div className="w-8 flex items-center justify-center shrink-0">
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      idx === 0
                        ? 'w-2 h-7 bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.6)]'
                        : idx === 1
                        ? 'w-1.5 h-6 bg-[#16A34A]/80'
                        : idx === 2
                        ? 'w-1.5 h-5 bg-[#16A34A]/60'
                        : idx === 3
                        ? 'w-1 h-4 bg-[#16A34A]/40'
                        : 'w-1 h-3.5 bg-neutral-700'
                    }`}
                  />
                </div>

                {/* Stage Count (Tabular Mono) */}
                <div className="font-mono text-xs sm:text-sm font-semibold text-white tabular-nums flex-1 text-right pr-2">
                  {stage.count}
                </div>

                {/* Conversion Rate */}
                <div
                  className={`font-mono text-xs sm:text-[13px] w-12 text-right shrink-0 font-medium tabular-nums ${
                    stage.isRateGreen ? 'text-[#16A34A]' : 'text-neutral-400'
                  }`}
                >
                  {stage.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 1 Footer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>End-to-end conversion rate</span>
          <span className="text-[#16A34A] font-semibold">4.98% median</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CARD 2: Regional demand (Smooth Scroll-Triggered Growth) */}
      {/* ======================================================== */}
      <div
        ref={regionalRef}
        className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between h-[590px] sm:h-[620px] box-border"
      >
        <div>
          {/* Header */}
          <div className="flex items-baseline justify-between pb-5 border-b border-white/10 mb-6">
            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
              Regional <em className="font-serif italic font-normal text-[#16A34A]">demand</em>
            </h3>
            <span className="font-mono text-xs text-neutral-400 tracking-wider">
              By geography
            </span>
          </div>

          {/* Progress Rows with Smooth Scroll-Triggered Bar Growth */}
          <div className="space-y-6 pt-1">
            {REGIONAL_DEMAND.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between gap-4">
                {/* Region Title & Sub */}
                <div className="w-28 sm:w-32 shrink-0">
                  <div className="text-xs sm:text-[13.5px] font-medium text-white">
                    {item.name}
                  </div>
                  <div className="text-[9px] sm:text-[9.5px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                    {item.sub}
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="flex-1 bg-neutral-900/90 h-2.5 sm:h-3 rounded-full overflow-hidden p-0 relative border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] shadow-[0_0_10px_rgba(22,163,74,0.45)]"
                    style={{
                      width: isBarsVisible ? `${item.pct}%` : '0%',
                      transitionProperty: 'width',
                      transitionDuration: '1300ms',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${idx * 110}ms`,
                    }}
                  />
                </div>

                {/* Percentage (Smoothly animated counter) */}
                <span className="font-mono text-xs sm:text-sm text-white font-medium w-10 text-right shrink-0 tabular-nums">
                  {isBarsVisible ? displayPcts[idx] : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 Footer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Cross-border clearance velocity</span>
          <span className="text-[#16A34A] font-semibold">Tier-1 priority →</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CARD 3: Live · who's exploring (Dynamic 5s Cycle) */}
      {/* ======================================================== */}
      <div className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between h-[590px] sm:h-[620px] box-border overflow-hidden">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4 shrink-0">
            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
              Live <span className="text-neutral-400 font-light">·</span>{' '}
              <em className="font-serif italic font-normal text-[#16A34A]">who's exploring</em>
            </h3>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.7)]" />
              <span>YOUR SECTORS</span>
            </div>
          </div>

          {/* Dynamic Feed Rows */}
          <div className="space-y-2.5 h-[420px] sm:h-[444px] overflow-hidden flex flex-col justify-between select-none shrink-0">
            {displayedBuyers.map((buyer, idx) => {
              const isNew = buyer.id === newlyArrivedId;
              const timeLabel = getSlotTimestamp(idx);

              return (
                <div
                  key={buyer.id}
                  className={`flex items-center justify-between gap-3 px-3.5 sm:px-4 h-[68px] sm:h-[72px] rounded-xl cursor-default box-border shrink-0 transition-colors duration-300 overflow-hidden ${
                    isNew
                      ? 'bg-[#101F14] border border-[#16A34A] shadow-[0_0_14px_rgba(22,163,74,0.3)]'
                      : 'bg-[#14110E] hover:bg-[#181512] border border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Initials Badge */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-serif italic text-sm shrink-0 font-medium ${getAvatarStyles(
                      buyer.avatarType
                    )}`}
                  >
                    {buyer.avatar}
                  </div>

                  {/* Middle Info */}
                  <div className="flex-1 min-w-0 pr-2 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-[14px] font-medium text-white truncate leading-tight">
                        {buyer.role}
                      </span>
                      {isNew && (
                        <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-[#16A34A]/20 text-[#16A34A] font-bold border border-[#16A34A]/40 shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] sm:text-[11.5px] font-mono text-neutral-400 tracking-wide mt-1 truncate leading-tight">
                      {buyer.subtext}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span
                    className={`text-[10.5px] sm:text-xs font-mono shrink-0 w-16 text-right tabular-nums transition-colors duration-300 leading-none ${
                      timeLabel === 'just now'
                        ? 'text-[#16A34A] font-medium'
                        : 'text-neutral-500 font-normal'
                    }`}
                  >
                    {timeLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3 Footer */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>Continuous 5s buyer exploration stream</span>
          </span>
          <span className="text-neutral-500">Filtered</span>
        </div>
      </div>

    </div>
  );
};
