import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

interface OpportunityGap {
  id: string;
  code: string;
  title: string;
  demand: number;
  supply: number;
  clearTime: string;
  gap: string;
  sector: string;
}

const CATALOG_GAPS: Omit<OpportunityGap, 'id'>[] = [
  {
    code: 'GAP-841',
    title: 'RegTech · mid-market',
    demand: 84,
    supply: 18,
    clearTime: '12-day clear',
    gap: '+66',
    sector: 'Operations & Compliance',
  },
  {
    code: 'GAP-922',
    title: 'AI Agents · vertical ops',
    demand: 92,
    supply: 32,
    clearTime: '8-day clear',
    gap: '+60',
    sector: 'DeepTech & AI',
  },
  {
    code: 'GAP-743',
    title: 'Healthtech · diagnostics',
    demand: 74,
    supply: 28,
    clearTime: '15-day clear',
    gap: '+46',
    sector: 'Healthcare & Biotech',
  },
  {
    code: 'GAP-684',
    title: 'Climate · industrial',
    demand: 68,
    supply: 22,
    clearTime: '18-day clear',
    gap: '+46',
    sector: 'Climate & Infrastructure',
  },
  {
    code: 'GAP-625',
    title: 'Fintech SMB · lending',
    demand: 62,
    supply: 36,
    clearTime: '11-day clear',
    gap: '+26',
    sector: 'Fintech & SMB',
  },
  {
    code: 'GAP-956',
    title: 'Cybersecurity · post-quantum',
    demand: 95,
    supply: 24,
    clearTime: '7-day clear',
    gap: '+71',
    sector: 'DeepTech & AI',
  },
  {
    code: 'GAP-897',
    title: 'LegalTech · contract runtime',
    demand: 89,
    supply: 27,
    clearTime: '9-day clear',
    gap: '+62',
    sector: 'Operations & Compliance',
  },
  {
    code: 'GAP-788',
    title: 'Logistics · cold chain automation',
    demand: 78,
    supply: 26,
    clearTime: '13-day clear',
    gap: '+52',
    sector: 'Operations & Logistics',
  },
  {
    code: 'GAP-869',
    title: 'Embedded Credit · invoice rails',
    demand: 86,
    supply: 30,
    clearTime: '10-day clear',
    gap: '+56',
    sector: 'Fintech & SMB',
  },
];

export const TopOpportunityGaps: React.FC = () => {
  const { openNdaModal } = useApp();

  const [displayedGaps, setDisplayedGaps] = useState<OpportunityGap[]>(() =>
    CATALOG_GAPS.slice(0, 5).map((gap, i) => ({
      ...gap,
      id: `initial-gap-${i}`,
    }))
  );

  const [newlyArrivedId, setNewlyArrivedId] = useState<string | null>(null);

  // Dynamic 5-second rotation similar to "Live Deal Flow"
  useEffect(() => {
    let poolIndex = 5;

    const interval = setInterval(() => {
      const nextTemplate = CATALOG_GAPS[poolIndex % CATALOG_GAPS.length];
      poolIndex++;

      const uniqueId = `gap-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const incomingGap: OpportunityGap = {
        ...nextTemplate,
        id: uniqueId,
      };

      setNewlyArrivedId(uniqueId);
      setDisplayedGaps((prev) => [incomingGap, ...prev.slice(0, 4)]);

      // Clear accent highlight after 1.8 seconds
      setTimeout(() => {
        setNewlyArrivedId((curr) => (curr === uniqueId ? null : curr));
      }, 1800);
    }, 5000); // 5s cadence

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden h-[590px] sm:h-[620px] box-border select-none">
      
      {/* ============================================== */}
      {/* Header */}
      {/* ============================================== */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4 shrink-0">
        <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
          Top <em className="font-serif italic font-normal text-[#16A34A]">opportunity gaps</em>
        </h3>

        <span className="font-mono text-neutral-400 text-[11px] sm:text-xs tracking-wide">
          Build here for fastest clearing
        </span>
      </div>

      {/* ============================================== */}
      {/* Dynamic 5-Item Gaps List */}
      {/* ============================================== */}
      <div className="space-y-2 sm:space-y-2.5 select-none h-[420px] sm:h-[444px] overflow-hidden flex flex-col justify-between shrink-0">
        {displayedGaps.map((item, idx) => {
          const isNew = item.id === newlyArrivedId;
          const rankStr = `0${idx + 1}`;

          return (
            <div
              key={item.id}
              onClick={() => {
                openNdaModal({
                  id: item.code,
                  code: item.code,
                  category: 'Architect Build Mandate',
                  tag: item.title.split('·')[0].trim(),
                  demandTag: `Gap ${item.gap}`,
                  demandTrend: 'hot',
                  title: `${item.title} · Architect Opportunity`,
                  blurredPart: 'validated buy-side acquisition blueprint',
                  description: `Demand index ${item.demand} vs Supply ${item.supply}. Clearance velocity ${item.clearTime}. High institutional waitlist.`,
                  pages: 92,
                  frameworks: 8,
                  finModels: 4,
                  architectRole: 'Lead Venture Architect',
                  architectNote: `Pre-cleared with private equity buyers. Expected unlock velocity: ${item.clearTime}`,
                  unlockPrice: 6200,
                  status: 'locked',
                });
              }}
              className={`group flex items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-5 h-[68px] sm:h-[72px] rounded-xl cursor-pointer shadow-sm box-border shrink-0 transition-all duration-300 overflow-hidden ${
                isNew
                  ? 'bg-[#101F14] border border-[#16A34A] shadow-[0_0_16px_rgba(22,163,74,0.3)]'
                  : 'bg-[#14110E] hover:bg-[#181512] border border-white/5 hover:border-[#16A34A]/50'
              }`}
            >
              {/* Left: Rank Badge */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181410] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#16A34A]/40 transition-colors">
                <span className="font-serif italic text-base sm:text-lg text-[#16A34A] font-semibold leading-none">
                  {rankStr}
                </span>
              </div>

              {/* Middle: Title & Metrics */}
              <div className="flex-1 min-w-0 pr-2 overflow-hidden">
                <div className="text-xs sm:text-[14px] font-medium text-white truncate leading-tight group-hover:text-green-200 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10.5px] sm:text-xs font-mono text-neutral-400 tracking-wide mt-1 truncate leading-tight">
                  Demand {item.demand} · Supply {item.supply} · {item.clearTime}
                </div>
              </div>

              {/* Right: Gap Indicator */}
              <div className="text-right shrink-0 flex flex-col items-end pl-2">
                <span className="font-mono text-base sm:text-lg font-semibold text-[#16A34A] leading-tight tabular-nums">
                  {item.gap}
                </span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest leading-none mt-0.5 font-medium">
                  GAP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================== */}
      {/* Bottom Feed Footer */}
      {/* ============================================== */}
      <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>Automatic 5s live gap indexing</span>
        </span>
        <span className="text-[#16A34A] hover:underline cursor-pointer">
          Tap gap to review architect spec →
        </span>
      </div>
    </div>
  );
};
