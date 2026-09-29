import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PerformanceAndEngagement } from './PerformanceAndEngagement';

interface PeerActivityItem {
  id: string;
  avatar: string;
  avatarType: 'fo' | 'vc' | 'pe' | 'sb' | 'hnw' | 'corp';
  role: string;
  interest: string;
  badge: 'Senior' | 'Premium' | 'Verified' | 'Institutional';
}

interface RegionItem {
  name: string;
  sub: string;
  pct: number;
}

// Expanded catalog of diverse, high-value institutional peer activities
const EXPANDED_PEER_ACTIVITIES: Omit<PeerActivityItem, 'id'>[] = [
  {
    avatar: 'FO',
    avatarType: 'fo',
    role: 'Family Office',
    interest: 'Closed healthtech · $6.8k',
    badge: 'Senior',
  },
  {
    avatar: 'VC',
    avatarType: 'vc',
    role: 'VC Partner',
    interest: 'Requested climate tech access',
    badge: 'Premium',
  },
  {
    avatar: 'PE',
    avatarType: 'pe',
    role: 'PE Director',
    interest: 'Unlocked B2B SaaS · VVE-2437',
    badge: 'Senior',
  },
  {
    avatar: 'SB',
    avatarType: 'sb',
    role: 'Strategic Buyer',
    interest: 'MDA signed · AI workflow',
    badge: 'Verified',
  },
  {
    avatar: 'FO',
    avatarType: 'fo',
    role: 'Multi-Family Office',
    interest: 'Vaulted $180k into escrow · VVE-2448',
    badge: 'Institutional',
  },
  {
    avatar: 'VC',
    avatarType: 'vc',
    role: 'Principal at Tier-1 VC',
    interest: 'Deposited dossier unlock · VVE-2450',
    badge: 'Premium',
  },
  {
    avatar: 'PE',
    avatarType: 'pe',
    role: 'Managing Director',
    interest: 'Completed LOI review · Cold chain MENA',
    badge: 'Senior',
  },
  {
    avatar: 'SB',
    avatarType: 'sb',
    role: 'Corp Dev Director',
    interest: 'Executed mutual NDA · Fintech rails',
    badge: 'Verified',
  },
  {
    avatar: 'HNW',
    avatarType: 'hnw',
    role: 'Sovereign Wealth Lead',
    interest: 'Unlocked deeptech photonics dossier',
    badge: 'Institutional',
  },
  {
    avatar: 'VC',
    avatarType: 'vc',
    role: 'Partner at Seed Fund',
    interest: 'Requested autonomous agents diligence',
    badge: 'Premium',
  },
  {
    avatar: 'PE',
    avatarType: 'pe',
    role: 'Buyout Associate',
    interest: 'Submitted platform clearance inquiry',
    badge: 'Senior',
  },
  {
    avatar: 'CORP',
    avatarType: 'corp',
    role: 'Enterprise Acquirer',
    interest: 'Initiated code audit review · VVE-2449',
    badge: 'Institutional',
  },
  {
    avatar: 'FO',
    avatarType: 'fo',
    role: 'Single Family Office',
    interest: 'Approved milestone release · $145k',
    badge: 'Senior',
  },
  {
    avatar: 'SB',
    avatarType: 'sb',
    role: 'Strategic Acquirer',
    interest: 'Bidding on commercial proptech · VVE-2442',
    badge: 'Verified',
  },
];

// Initial 6 visible items matching the user's layout
const INITIAL_VISIBLE_ACTIVITIES: PeerActivityItem[] = [
  { ...EXPANDED_PEER_ACTIVITIES[0], id: 'peer-init-0' },
  { ...EXPANDED_PEER_ACTIVITIES[1], id: 'peer-init-1' },
  { ...EXPANDED_PEER_ACTIVITIES[2], id: 'peer-init-2' },
  { ...EXPANDED_PEER_ACTIVITIES[3], id: 'peer-init-3' },
  { ...EXPANDED_PEER_ACTIVITIES[4], id: 'peer-init-4' },
  { ...EXPANDED_PEER_ACTIVITIES[5], id: 'peer-init-5' },
];

// Realistic timestamp decay based on slot position:
// Slot 0: just now
// Slot 1: 1m ago
// Slot 2: 1m ago
// Slot 3: 2m ago
// Slot 4: 2m ago
// Slot 5: 3m ago
const getTimestampForSlot = (index: number): string => {
  switch (index) {
    case 0:
      return 'just now';
    case 1:
      return '1m ago';
    case 2:
      return '1m ago';
    case 3:
      return '2m ago';
    case 4:
      return '2m ago';
    case 5:
      return '3m ago';
    default:
      return '3m ago';
  }
};

// Regional deal flow metrics
const REGIONAL_DEAL_FLOW: RegionItem[] = [
  { name: 'India', sub: 'TIER 1 & 2 CITIES', pct: 88 },
  { name: 'North America', sub: 'US, CANADA', pct: 76 },
  { name: 'Europe', sub: 'UK, EU', pct: 62 },
  { name: 'Singapore', sub: '+SEA HUBS', pct: 54 },
  { name: 'UAE', sub: '+GCC', pct: 46 },
  { name: 'Australia', sub: 'SYDNEY, MELBOURNE', pct: 32 },
];

const RegionalDealFlowCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isBarsVisible, setIsBarsVisible] = useState<boolean>(false);
  const [displayPcts, setDisplayPcts] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // 1. Observer & immediate viewport check with fallback
  useEffect(() => {
    const target = cardRef.current;
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

  // 2. Smooth numeric counter animation
  useEffect(() => {
    if (!isBarsVisible) return;

    const duration = 1400; // ms
    const startTime = performance.now();

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayPcts(REGIONAL_DEAL_FLOW.map((r) => Math.round(r.pct * eased)));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setDisplayPcts(REGIONAL_DEAL_FLOW.map((r) => r.pct));
      }
    };

    const animFrame = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animFrame);
  }, [isBarsVisible]);

  return (
    <div
      ref={cardRef}
      className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between h-[590px] sm:h-[620px] box-border"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
            Regional <em className="font-serif italic text-[#E2571B] font-normal">deal flow</em>
          </h3>

          <span className="font-mono text-xs text-neutral-400 tracking-wider">
            By geography · 30 days
          </span>
        </div>

        {/* Progress Rows with Smooth Scroll-Triggered Bar Growth */}
        <div className="space-y-6 pt-2">
          {REGIONAL_DEAL_FLOW.map((region, idx) => (
            <div key={region.name} className="flex items-center justify-between gap-4">
              {/* Region Title & Sub */}
              <div className="w-28 sm:w-36 shrink-0">
                <div className="text-xs sm:text-[13.5px] font-medium text-white">
                  {region.name}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                  {region.sub}
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="flex-1 bg-neutral-900/90 h-2.5 sm:h-3 rounded-full overflow-hidden p-0 relative border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E2571B] to-[#F97316] shadow-[0_0_10px_rgba(226,87,27,0.45)]"
                  style={{
                    width: isBarsVisible ? `${region.pct}%` : '0%',
                    transitionProperty: 'width',
                    transitionDuration: '1300ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${idx * 110}ms`,
                  }}
                />
              </div>

              {/* Metric Percentage (Smoothly animated counter) */}
              <span className="font-mono text-xs sm:text-sm text-white font-medium w-10 text-right shrink-0 tabular-nums">
                {displayPcts[idx]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <span>Cross-border capital velocity</span>
        <span className="text-[#E2571B]">Global Syndicate →</span>
      </div>
    </div>
  );
};

export const BuyerNetworkSignalsSection: React.FC = () => {
  const { role } = useApp();
  const [displayedActivities, setDisplayedActivities] = useState<PeerActivityItem[]>(INITIAL_VISIBLE_ACTIVITIES);
  const [newlyArrivedId, setNewlyArrivedId] = useState<string | null>(null);

  const poolIndexRef = useRef<number>(6);
  const seqCounterRef = useRef<number>(100);

  // 2. 5-SECOND REPLACEMENT CYCLE:
  // Dynamically introduces a new topic at the top (Slot 0),
  // pushes previous 1st to 2nd, 2nd to 3rd, and so on,
  // while timestamps naturally age down the positions.
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = poolIndexRef.current++;
      const nextTemplate = EXPANDED_PEER_ACTIVITIES[nextIdx % EXPANDED_PEER_ACTIVITIES.length];
      const uniqueSeq = seqCounterRef.current++;
      const uniqueId = `peer-${nextTemplate.avatarType}-${uniqueSeq}`;

      const incomingItem: PeerActivityItem = {
        ...nextTemplate,
        id: uniqueId,
      };

      setNewlyArrivedId(uniqueId);
      setDisplayedActivities((prev) => [incomingItem, ...prev.slice(0, 5)]);

      // Clear new entry accent after 1.8 seconds
      setTimeout(() => {
        setNewlyArrivedId((curr) => (curr === uniqueId ? null : curr));
      }, 1800);
    }, 5000); // exactly 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getAvatarStyles = (type: PeerActivityItem['avatarType']) => {
    switch (type) {
      case 'fo':
        return 'bg-purple-500/15 text-purple-400 border border-purple-500/25';
      case 'vc':
        return 'bg-blue-500/15 text-blue-400 border border-blue-500/25';
      case 'pe':
        return 'bg-[#E2571B]/15 text-[#E2571B] border border-[#E2571B]/25';
      case 'sb':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/25';
      case 'hnw':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25';
      case 'corp':
        return 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25';
      default:
        return 'bg-white/10 text-white border border-white/15';
    }
  };

  return (
    <section id="buyer-network" className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)] select-none">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================== */}
        {/* SECTION HEAD: Distinct for Investor vs Architect */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#101812] border border-[#16A34A]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#16A34A] font-semibold">
                03
              </span>
              <span className="w-1 h-1 rounded-full bg-[#16A34A]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-neutral-300 tracking-[0.2em] uppercase font-semibold">
                PERFORMANCE & ENGAGEMENT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-white leading-[1.18]">
              Listing performance & <em className="font-serif italic text-[#16A34A] font-normal">network engagement.</em>
            </h2>

            <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Track funnel conversion velocity, regional demand concentration, and real-time buyer exploration across your portfolio.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#181410] border border-[#E2571B]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#E2571B] font-semibold">
                03
              </span>
              <span className="w-1 h-1 rounded-full bg-[#E2571B]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-neutral-300 tracking-[0.2em] uppercase font-semibold">
                BUYER NETWORK TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-white leading-[1.18]">
              Who’s deploying capital, <em className="font-serif italic text-[#E2571B] font-normal">and where it’s flowing.</em>
            </h2>

            <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Zero-knowledge network activity tracking verified family offices, buyout directors, and sovereign syndicates locking dossiers and allocating dry powder across key geographies.
            </p>
          </div>
        )}

        {/* ============================================== */}
        {/* SECTION CONTENT: PerformanceAndEngagement (Architect) vs 2-Column Grid (Investor) */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <PerformanceAndEngagement />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* ======================================================== */}
            {/* LEFT CARD: Anonymized peer activity (Dynamic 5s Cycle) */}
            {/* ======================================================== */}
            <div className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between h-[590px] sm:h-[620px] box-border overflow-hidden">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4 shrink-0">
                  <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
                    Anonymized <em className="font-serif italic text-[#E2571B] font-normal">peer activity</em>
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                    <span>LIVE · PRIVACY PRESERVED</span>
                  </div>
                </div>

                {/* Feed Rows with smooth 5-second downward shift and rock-solid height stability */}
                <div className="space-y-2 sm:space-y-2.5 h-[420px] sm:h-[444px] overflow-hidden flex flex-col justify-between select-none shrink-0">
                  {displayedActivities.map((item, idx) => {
                    const isNew = item.id === newlyArrivedId;
                    const timeLabel = getTimestampForSlot(idx);

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-3 px-3.5 sm:px-4 h-[60px] sm:h-[64px] rounded-xl cursor-default box-border shrink-0 transition-colors duration-300 overflow-hidden ${
                          isNew
                            ? 'bg-[#1F1712] border border-[#E2571B] shadow-[0_0_14px_rgba(226,87,27,0.22)]'
                            : 'bg-[#14110E] hover:bg-[#1A1612] border border-white/5 hover:border-white/15'
                        }`}
                      >
                        {/* Avatar Initials Badge */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-serif italic text-sm shrink-0 ${getAvatarStyles(item.avatarType)}`}
                        >
                          {item.avatar}
                        </div>

                        {/* Middle Info */}
                        <div className="flex-1 min-w-0 pr-2 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-[13.5px] font-medium text-white truncate leading-tight">
                              {item.role}
                            </span>
                            {isNew && (
                              <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-[#E2571B]/20 text-[#E2571B] font-bold border border-[#E2571B]/40 shrink-0">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 tracking-wide mt-0.5 truncate leading-tight">
                            {item.interest}
                          </div>
                        </div>

                        {/* Badge Pill */}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border border-[#E2571B]/30 bg-[#E2571B]/10 text-[#E2571B] shrink-0 leading-tight">
                          {item.badge}
                        </span>

                        {/* Naturally aged timestamp */}
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono shrink-0 w-16 text-right tabular-nums transition-colors duration-300 leading-none ${
                            timeLabel === 'just now'
                              ? 'text-emerald-400 font-medium'
                              : timeLabel === '1m ago'
                              ? 'text-neutral-300 font-normal'
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

              {/* Bottom Footer */}
              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400 shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Zero-knowledge institutional feed</span>
                </span>
                <span className="text-neutral-500">256-bit obfuscation</span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT CARD: Regional deal flow (Smooth Scroll Animation) */}
            {/* ======================================================== */}
            <RegionalDealFlowCard />

          </div>
        )}

      </div>
    </section>
  );
};
