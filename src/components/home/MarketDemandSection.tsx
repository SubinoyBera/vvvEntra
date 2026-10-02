import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DemandSupplyGraph } from './DemandSupplyGraph';
import { SectorDemandRadar } from './SectorDemandRadar';
import { TopOpportunityGaps } from './TopOpportunityGaps';

interface DealItem {
  id: string;
  code: string;
  title: string;
  meta: string;
  price: string;
  status: 'active' | 'surge';
}

// Expanded catalog of verified, high-value institutional topics
const EXPANDED_DEALS_CATALOG: Omit<DealItem, 'id'>[] = [
  {
    code: 'VVE-2447',
    title: 'Niche B2B media · vertical newsletters',
    meta: '94p · 6 frameworks · ex-editor',
    price: '$3,400',
    status: 'active',
  },
  {
    code: 'VVE-2451',
    title: 'Creator economy · niche B2B vertical',
    meta: '88p · 5 frameworks · operator',
    price: '$2,900',
    status: 'active',
  },
  {
    code: 'VVE-2450',
    title: 'Climate · grid storage software',
    meta: '126p · 9 frameworks · ex-energy',
    price: '$5,400',
    status: 'surge',
  },
  {
    code: 'VVE-2449',
    title: 'AI ops · vertical legal automation',
    meta: '102p · 7 frameworks · ex-counsel',
    price: '$4,200',
    status: 'active',
  },
  {
    code: 'VVE-2448',
    title: 'Specialty logistics · cold chain MENA',
    meta: '118p · 8 frameworks · ex-ops director',
    price: '$5,800',
    status: 'surge',
  },
  {
    code: 'VVE-2452',
    title: 'Embedded lending · SMB invoice rails',
    meta: '114p · 8 frameworks · ex-Square lead',
    price: '$6,200',
    status: 'surge',
  },
  {
    code: 'VVE-2453',
    title: 'Autonomous agents · enterprise ERP ops',
    meta: '132p · 11 frameworks · ex-SAP architect',
    price: '$6,800',
    status: 'surge',
  },
  {
    code: 'VVE-2446',
    title: 'RegTech · cross-border AML screening',
    meta: '108p · 7 frameworks · ex-SWIFT compliance',
    price: '$4,900',
    status: 'active',
  },
  {
    code: 'VVE-2445',
    title: 'DeepTech · optical interconnect silicon IP',
    meta: '145p · 12 frameworks · MIT photonic PhD',
    price: '$7,800',
    status: 'surge',
  },
  {
    code: 'VVE-2444',
    title: 'HealthTech · decentralized clinical trials',
    meta: '99p · 6 frameworks · ex-Novartis PI',
    price: '$4,500',
    status: 'active',
  },
  {
    code: 'VVE-2443',
    title: 'Cybersecurity · automated post-quantum crypto',
    meta: '124p · 9 frameworks · NSA alum',
    price: '$6,900',
    status: 'surge',
  },
  {
    code: 'VVE-2442',
    title: 'PropTech · commercial lease underwriting',
    meta: '92p · 5 frameworks · CBRE principal',
    price: '$3,600',
    status: 'active',
  },
  {
    code: 'VVE-2441',
    title: 'D2C roll-up · longevity nutraceutical stack',
    meta: '106p · 7 frameworks · former DTC founder',
    price: '$4,400',
    status: 'active',
  },
  {
    code: 'VVE-2440',
    title: 'Industrial IoT · refinery predictive maintenance',
    meta: '136p · 10 frameworks · Honeywell fellow',
    price: '$6,500',
    status: 'surge',
  },
];

// Initial 6 visible topics matching user screenshot
const INITIAL_VISIBLE_DEALS: DealItem[] = [
  { ...EXPANDED_DEALS_CATALOG[0], id: 'deal-init-0' },
  { ...EXPANDED_DEALS_CATALOG[1], id: 'deal-init-1' },
  { ...EXPANDED_DEALS_CATALOG[2], id: 'deal-init-2' },
  { ...EXPANDED_DEALS_CATALOG[3], id: 'deal-init-3' },
  { ...EXPANDED_DEALS_CATALOG[4], id: 'deal-init-4' },
  { ...EXPANDED_DEALS_CATALOG[5], id: 'deal-init-5' },
];

export const MarketDemandSection: React.FC = () => {
  const { openNdaModal, role } = useApp();
  const [displayedDeals, setDisplayedDeals] = useState<DealItem[]>(INITIAL_VISIBLE_DEALS);
  const [newlyArrivedId, setNewlyArrivedId] = useState<string | null>(null);
  
  const poolIndexRef = useRef<number>(6);
  const seqCounterRef = useRef<number>(100);

  // 5-SECOND REPLACEMENT CYCLE:
  // Replaces the topic at the top with the next incoming topic from the expanded pool (circulating the last topic back around),
  // moving the former top topic down to 2nd, 2nd down to 3rd, and dropping the 6th (last) topic.
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = poolIndexRef.current++;
      const nextTemplate = EXPANDED_DEALS_CATALOG[nextIdx % EXPANDED_DEALS_CATALOG.length];
      const uniqueSeq = seqCounterRef.current++;
      const uniqueId = `deal-${nextTemplate.code}-${uniqueSeq}`;

      const incomingDeal: DealItem = {
        ...nextTemplate,
        id: uniqueId,
      };

      setNewlyArrivedId(uniqueId);
      setDisplayedDeals((prev) => [incomingDeal, ...prev.slice(0, 5)]);

      // Clear entry accent after 1.8 seconds
      setTimeout(() => {
        setNewlyArrivedId((curr) => (curr === uniqueId ? null : curr));
      }, 1800);
    }, 5000); // 5-second interval as requested

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="market" className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)] select-none">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================== */}
        {/* SECTION HEAD: Distinct for Investor vs Architect */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#101812] border border-[#16A34A]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#16A34A] font-semibold">
                01
              </span>
              <span className="w-1 h-1 rounded-full bg-[#16A34A]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-neutral-300 tracking-[0.2em] uppercase font-semibold">
                DEMAND VS SUPPLY · WHERE TO BUILD
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-white leading-[1.18]">
              Where capital queues, <em className="font-serif italic text-[#16A34A] font-normal">and what architects must build.</em>
            </h2>

            <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Pinpoint acute buyer shortages across vertical AI, enterprise compliance, and embedded fintech. Build verified execution blueprints where buyers are paying peak unlock fees.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[var(--bg-bone)] border border-[#E2571B]/30 mb-3.5 sm:mb-4">
              <span className="font-serif italic text-sm text-[#E2571B] font-semibold">
                01
              </span>
              <span className="w-1 h-1 rounded-full bg-[#E2571B]" />
              <span className="text-[10.5px] sm:text-xs font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase font-semibold">
                ORDER DEPTH & EXECUTION VELOCITY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-[var(--text)] leading-[1.18]">
              Private market liquidity, <em className="font-serif italic text-[#E2571B] font-normal">streamed before clearance.</em>
            </h2>

            <p className="text-xs sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mt-3 px-2">
              Watch confidential deal dossiers surface alongside real-time buy-side volatility curves. Gauge spread depth, demand surges, and verified escrow valuations as they unfold.
            </p>
          </div>
        )}

        {/* ============================================== */}
        {/* DUAL TERMINAL CARDS - 2 Columns Desktop, 1 Column Mobile */}
        {/* ============================================== */}
        {role === 'architect' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* LEFT CARD: Sector demand radar */}
            <SectorDemandRadar />

            {/* RIGHT CARD: Top opportunity gaps (Dynamic 5s Shift) */}
            <TopOpportunityGaps />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* -------------------------------------------- */}
            {/* LEFT CARD: Live Deal Flow (Continuous 5s Dynamic Shift) */}
            {/* -------------------------------------------- */}
            <div className="bg-[var(--bg-paper)] border border-[var(--line)] rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden h-[590px] sm:h-[620px] box-border">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[var(--line)] mb-4 shrink-0">
                <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                  Live <em className="font-serif italic font-normal text-[#E2571B]">deal flow</em>
                </h3>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)] tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                  <span>LIVE · STREAMING</span>
                </div>
              </div>

              {/* Dynamic Deals List: Fixed-height rows with zero layout shifts */}
              <div className="space-y-2 sm:space-y-2.5 select-none h-[420px] sm:h-[444px] overflow-hidden flex flex-col justify-between shrink-0">
                {displayedDeals.map((deal) => {
                  const isNew = deal.id === newlyArrivedId;

                  return (
                    <div
                      key={deal.id}
                      onClick={() => {
                        openNdaModal({
                          id: deal.code,
                          code: deal.code,
                          category: 'Venture Playbook',
                          tag: deal.title.split('·')[0].trim(),
                          demandTag: deal.status === 'surge' ? 'Surging' : '+24% demand',
                          demandTrend: deal.status === 'surge' ? 'hot' : 'up',
                          title: deal.title,
                          blurredPart: 'confidential execution thesis',
                          description: `${deal.meta}. Verified institutional due-diligence blueprint.`,
                          pages: parseInt(deal.meta.split('p')[0]) || 94,
                          frameworks: 7,
                          finModels: 4,
                          architectRole: 'Verified Architect',
                          architectNote: deal.meta,
                          unlockPrice: parseInt(deal.price.replace(/[^0-9]/g, '')) || 3400,
                          status: 'locked',
                        });
                      }}
                      className={`group flex items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-4 h-[60px] sm:h-[64px] rounded-xl cursor-pointer shadow-sm box-border shrink-0 transition-colors duration-300 overflow-hidden ${
                        isNew
                          ? 'bg-[var(--bg-tint)] border border-[#E2571B] shadow-[0_0_14px_rgba(226,87,27,0.22)]'
                          : 'bg-[var(--bg-bone)] hover:bg-[var(--bg-tint)] border border-[var(--line)] hover:border-[#E2571B]/50'
                      }`}
                    >
                      {/* Left: Code badge */}
                      <div className="flex items-center gap-1.5 w-24 sm:w-28 shrink-0 min-w-0">
                        <span className="font-mono text-xs sm:text-[13px] text-[#E2571B] font-semibold tracking-tight truncate">
                          {deal.code}
                        </span>
                        {isNew && (
                          <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-[#E2571B]/20 text-[#E2571B] font-bold border border-[#E2571B]/40 shrink-0">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Middle: Title & Meta info */}
                      <div className="flex-1 min-w-0 pr-2 overflow-hidden">
                        <div className="text-xs sm:text-[13.5px] font-medium text-[var(--text)] truncate leading-tight group-hover:text-[#E2571B] transition-colors">
                          {deal.title}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] tracking-wide mt-0.5 truncate leading-tight">
                          {deal.meta}
                        </div>
                      </div>

                      {/* Right: Price */}
                      <span className="font-serif italic text-sm sm:text-base text-[var(--text)] font-normal tabular-nums shrink-0 ml-auto mr-2 leading-none">
                        {deal.price}
                      </span>

                      {/* Status Indicator Dot */}
                      <div className="w-3 h-3 shrink-0 flex items-center justify-center">
                        {deal.status === 'active' ? (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                            title="Active verified deal"
                          />
                        ) : (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-[#E2571B] shadow-[0_0_8px_rgba(226,87,27,0.8)]"
                            title="Surging buyer interest"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Feed Footer */}
              <div className="pt-4 mt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Automatic 5s real-time ingestion</span>
                </span>
                <span className="text-[#E2571B] hover:underline cursor-pointer">
                  Tap deal to unlock dossier →
                </span>
              </div>
            </div>

            {/* -------------------------------------------- */}
            {/* RIGHT CARD: Buyer Demand · Real-Time */}
            {/* -------------------------------------------- */}
            <DemandSupplyGraph />

          </div>
        )}

      </div>
    </section>
  );
};
