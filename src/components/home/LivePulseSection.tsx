import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio } from 'lucide-react';

interface SectorPulseItem {
  id: string;
  name: string;
  count: number;
  dir: 'up' | 'down';
  delta: number;
}

interface TapeEvent {
  id: string;
  role: string;
  action: string;
  code: string;
  sector: string;
  minutesAgo: number;
  isNew?: boolean;
}

// Stable, authoritative 7-day velocity metrics
const SECTORS: SectorPulseItem[] = [
  { id: 'sec-1', name: 'AI Agents', count: 29, dir: 'up', delta: 24 },
  { id: 'sec-2', name: 'RegTech', count: 18, dir: 'up', delta: 26 },
  { id: 'sec-3', name: 'B2B SaaS', count: 42, dir: 'up', delta: 22 },
  { id: 'sec-4', name: 'Climate Tech', count: 11, dir: 'up', delta: 18 },
  { id: 'sec-5', name: 'Workflow AI', count: 18, dir: 'up', delta: 16 },
  { id: 'sec-6', name: 'Healthtech', count: 14, dir: 'up', delta: 12 },
  { id: 'sec-7', name: 'Crypto / Web3', count: 6, dir: 'down', delta: -8 },
  { id: 'sec-8', name: 'Web3 Gaming', count: 3, dir: 'down', delta: -18 },
];

const INVESTOR_INITIAL_TAPE: TapeEvent[] = [
  {
    id: 'tape-1',
    role: 'PE Director',
    action: 'unlocked dossier for',
    code: 'VVE-2438',
    sector: 'D2C Ayurveda',
    minutesAgo: 2,
  },
  {
    id: 'tape-2',
    role: 'Family Office',
    action: 'requested access to',
    code: 'VVE-2437',
    sector: 'B2B SaaS Compliance',
    minutesAgo: 7,
  },
  {
    id: 'tape-3',
    role: 'Serial Founder',
    action: 'submitted verified listing',
    code: 'VVE-2442',
    sector: 'AI Workflow Ops',
    minutesAgo: 14,
  },
];

const INVESTOR_EVENTS_QUEUE = [
  { role: 'Tier-1 Growth Fund', action: 'initiated buyer diligence on', code: 'VVE-2436', sector: 'Vertical AI Agents' },
  { role: 'Strategic Corporate Buyer', action: 'signed mutual NDA for', code: 'VVE-2445', sector: 'Legal LLM Workflows' },
  { role: 'Family Office (Zurich)', action: 'unlocked confidential model for', code: 'VVE-2434', sector: 'SMB Lending Infra' },
  { role: 'Institutional L.P.', action: 'cleared proof-of-funds verification for', code: 'VVE-2439', sector: 'Enterprise IAM' },
  { role: 'Serial Founder', action: 'submitted verified category listing', code: 'VVE-2448', sector: 'Decarb Supply Chain' },
  { role: 'Private Equity Associate', action: 'downloaded unit economics audit for', code: 'VVE-2441', sector: 'Cross-border Payments' },
  { role: 'M&A Advisory Partner', action: 'requested architect briefing for', code: 'VVE-2432', sector: 'Industrial Carbon Stack' },
];

const ARCHITECT_INITIAL_TAPE: TapeEvent[] = [
  {
    id: 'arch-tape-1',
    role: 'Lead Venture Architect',
    action: 'published production blueprint for',
    code: 'VVE-2438',
    sector: 'D2C Ayurveda Retention',
    minutesAgo: 2,
  },
  {
    id: 'arch-tape-2',
    role: 'Tier-1 Growth Fund',
    action: 'cleared $6,800 unlock fee on',
    code: 'VVE-2437',
    sector: 'B2B SaaS Compliance Stack',
    minutesAgo: 6,
  },
  {
    id: 'arch-tape-3',
    role: 'Enterprise Architect',
    action: 'structured 110-page dossier for',
    code: 'VVE-2442',
    sector: 'AI Vertical Automation',
    minutesAgo: 12,
  },
];

const ARCHITECT_EVENTS_QUEUE = [
  { role: 'Venture Architect', action: 'secured 2.8x unlock fee multiple on', code: 'VVE-2436', sector: 'Vertical AI Agents' },
  { role: 'PE Director', action: 'deposited $120k buyout escrow on', code: 'VVE-2445', sector: 'LegalTech LLM Rails' },
  { role: 'Principal Architect', action: 'completed institutional review for', code: 'VVE-2434', sector: 'SMB Embedded Credit' },
  { role: 'Strategic Buyer', action: 'executed IP transfer covenant for', code: 'VVE-2439', sector: 'Enterprise Identity Mesh' },
  { role: 'System Architect', action: 'minted validated clearance dossier for', code: 'VVE-2448', sector: 'Industrial Carbon Protocol' },
  { role: 'Family Office Syndicate', action: 'unlocked complete financial model on', code: 'VVE-2441', sector: 'Cross-border Settlement' },
  { role: 'Senior Architect', action: 'delivered turn-key M&A playbook for', code: 'VVE-2432', sector: 'Cold Chain Automation' },
];

export const LivePulseSection: React.FC = () => {
  const { role, openNdaModal } = useApp();
  const isArchitect = role === 'architect';

  const [tapeEvents, setTapeEvents] = useState<TapeEvent[]>(
    isArchitect ? ARCHITECT_INITIAL_TAPE : INVESTOR_INITIAL_TAPE
  );
  const [eventIndex, setEventIndex] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Sync initial tape when role switches
  useEffect(() => {
    setTapeEvents(isArchitect ? ARCHITECT_INITIAL_TAPE : INVESTOR_INITIAL_TAPE);
    setEventIndex(0);
  }, [isArchitect]);

  // Natural time formatter
  const formatTime = (minutes: number) => {
    if (minutes <= 0) return 'just now';
    if (minutes === 1) return '1m ago';
    if (minutes < 60) return `${minutes}m ago`;
    const hrs = Math.floor(minutes / 60);
    return `${hrs}h ago`;
  };

  // 1. Realistic time increment (every 60s, tape events age 1 minute)
  useEffect(() => {
    const ageInterval = setInterval(() => {
      setTapeEvents((prev) =>
        prev.map((ev) => ({
          ...ev,
          minutesAgo: ev.minutesAgo + 1,
        }))
      );
    }, 60000);

    return () => clearInterval(ageInterval);
  }, []);

  // 2. Natural, realistic cadence for new institutional activity: every 24 seconds
  useEffect(() => {
    const queue = isArchitect ? ARCHITECT_EVENTS_QUEUE : INVESTOR_EVENTS_QUEUE;

    const tapeInterval = setInterval(() => {
      const template = queue[eventIndex % queue.length];
      setEventIndex((prev) => prev + 1);

      setIsUpdating(true);

      const newEvent: TapeEvent = {
        id: `tape-${Date.now()}`,
        role: template.role,
        action: template.action,
        code: template.code,
        sector: template.sector,
        minutesAgo: 0,
        isNew: true,
      };

      setTapeEvents((prev) => {
        const next = [newEvent, ...prev.slice(0, 2)].map((item, idx) => ({
          ...item,
          isNew: idx === 0,
        }));
        return next;
      });

      // Clear transition accent after 2.5s
      setTimeout(() => {
        setIsUpdating(false);
      }, 2500);
    }, 24000);

    return () => clearInterval(tapeInterval);
  }, [eventIndex, isArchitect]);

  const handleCodeClick = (code: string, sector: string) => {
    openNdaModal({
      id: code,
      code,
      category: sector,
      tag: 'Live Mandate',
      demandTag: 'Active Clearance',
      demandTrend: 'hot',
      title: `${sector} · Institutional Clearance Blueprint`,
      blurredPart: 'technical architecture, codebase metrics & cap table model',
      description: `Live tape signal for ${code} in ${sector}. High buy-side interest and accelerated peer validation.`,
      pages: 110,
      frameworks: 8,
      finModels: 4,
      architectRole: 'Lead Venture Architect',
      architectNote: 'Audited execution framework with guaranteed non-circumvention protection.',
      unlockPrice: 6200,
      status: 'locked',
    });
  };

  return (
    <section id="live-pulse" className="py-8 sm:py-10 border-b border-[var(--line)] bg-transparent select-none">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* HEADER: Live sector pulse · Continuous feed */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  isArchitect ? 'bg-emerald-400' : 'bg-[#E2571B]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isArchitect
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                    : 'bg-[#E2571B] shadow-[0_0_8px_rgba(226,87,27,0.6)]'
                }`}
              />
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text)] flex items-center gap-1.5">
              <span>Live sector</span>
              <em
                className={`font-serif italic font-normal transition-colors duration-300 ${
                  isArchitect ? 'text-[#16A34A]' : 'text-[#E2571B]'
                }`}
              >
                pulse
              </em>
            </h3>
          </div>

          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
            {isArchitect
              ? 'Continuous feed · 7-day build velocity & clearance activity'
              : 'Continuous feed · 7-day velocity & transaction activity'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* 8 SECTOR CARDS ROW */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-5 sm:mb-6">
          {SECTORS.map((sec) => {
            const isUp = sec.dir === 'up';
            return (
              <div
                key={sec.id}
                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 shadow-xs group ${
                  isArchitect
                    ? 'bg-white dark:bg-[#0B130E] border-black/10 dark:border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(22,163,74,0.15)]'
                    : 'bg-white dark:bg-[#130E0B] border-black/10 dark:border-white/10 hover:border-[#E2571B]/50 hover:shadow-[0_0_15px_rgba(226,87,27,0.18)]'
                }`}
              >
                {/* Sector Title */}
                <div
                  className={`text-xs font-semibold text-[var(--text)] truncate transition-colors duration-200 ${
                    isArchitect ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' : 'group-hover:text-[#E2571B] dark:group-hover:text-[#E2571B]'
                  }`}
                  title={sec.name}
                >
                  {sec.name}
                </div>

                {/* Number & Delta */}
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-sm sm:text-base font-semibold tabular-nums text-[var(--text)]">
                    {sec.count}
                  </span>
                  
                  <span
                    className={`text-[11px] font-medium flex items-center tabular-nums ${
                      isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    <span className="mr-0.5">{isUp ? '↑' : '↓'}</span>
                    {Math.abs(sec.delta)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* LIVE TAPE TERMINAL CONTAINER (Architect vs Investor) */}
        {/* ======================================================== */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
            isArchitect
              ? 'bg-[#F4FBF6] dark:bg-[#0A120D] border-emerald-500/25 dark:border-emerald-500/20 shadow-[0_4px_20px_rgba(22,163,74,0.06)]'
              : 'bg-[#FFF8F2] dark:bg-[#120D0A] border-[#E2571B]/30 dark:border-[#E2571B]/25 shadow-[0_4px_20px_rgba(226,87,27,0.07)]'
          }`}
        >
          
          {/* Left: ((●)) LIVE TAPE */}
          <div
            className={`flex items-center gap-2.5 text-xs font-mono shrink-0 font-medium tracking-wider ${
              isArchitect ? 'text-[#16A34A]' : 'text-[#E2571B]'
            }`}
          >
            <Radio
              className={`w-4 h-4 transition-colors duration-500 ${
                isUpdating
                  ? 'text-emerald-500'
                  : isArchitect
                  ? 'text-[#16A34A]'
                  : 'text-[#E2571B]'
              }`}
            />
            <span className="uppercase font-semibold">
              LIVE TAPE:
            </span>
          </div>

          {/* Center: Live Streaming Tape Rows */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1.5">
              {tapeEvents.map((act) => (
                <div
                  key={act.id}
                  className={`flex flex-wrap items-center gap-x-2 text-xs font-mono transition-opacity duration-700 ${
                    act.isNew ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {/* Role */}
                  <span className="text-[var(--text)] font-semibold">
                    {act.role}
                  </span>

                  {/* Action */}
                  <span className="text-[var(--text-muted)]">
                    {act.action}
                  </span>

                  {/* Code */}
                  <span
                    onClick={() => handleCodeClick(act.code, act.sector)}
                    className={`font-semibold hover:underline cursor-pointer transition-colors duration-200 ${
                      isArchitect
                        ? 'text-[#16A34A] hover:text-emerald-600'
                        : 'text-[#E2571B] hover:text-orange-600'
                    }`}
                  >
                    {act.code}
                  </span>

                  {/* Sector */}
                  <span className="text-[var(--text-muted)]">
                    ({act.sector})
                  </span>

                  {/* Timestamp */}
                  <span className="text-[var(--text-faint)] text-[11px] tabular-nums">
                    · {formatTime(act.minutesAgo)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: View Full Market Terminal link */}
          <a
            href="#dashboard"
            className={`text-xs font-mono text-[var(--text-muted)] shrink-0 flex items-center gap-1.5 transition-colors duration-200 group ${
              isArchitect ? 'hover:text-emerald-600' : 'hover:text-[#E2571B]'
            }`}
          >
            <span>{isArchitect ? 'View Architect Terminal' : 'View Full Market Terminal'}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

        </div>

      </div>
    </section>
  );
};
