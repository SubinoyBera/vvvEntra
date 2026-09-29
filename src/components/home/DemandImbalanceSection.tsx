import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMAND_SUPPLY_CATS } from '../../data/mockData';
import { Zap, Shield, ArrowRight, ChevronDown } from 'lucide-react';

interface SignalItem {
  tag: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  sectionSubheading: string;
  title: string;
  description: string;
  medianPrice: string;
  waitlistRatio: string;
  fastestClearance: string;
  highlightCategory: string;
}

const ARCHITECT_SIGNALS: SignalItem[] = [
  {
    tag: 'HIGH-YIELD BUILD SIGNAL · 01',
    headlinePrefix: 'Buyer demand ',
    headlineAccent: 'outpacing listing supply.',
    headlineSuffix: '',
    sectionSubheading: 'Live architect clearance gaps. Sectors with immediate buyer queues and thin supply. Structure blueprints here for top fees.',
    title: 'Build Scarcity: AI Operations & RegTech',
    description: 'Corporate buyers and PE sponsors report an acute shortage of production-tested workflows. Architect dossiers with audited compliance pipelines are commanding 2.4x standard unlock fees and clearing in under 10 days.',
    medianPrice: '$6,200 avg fee',
    waitlistRatio: '4.8 : 1 buyers',
    fastestClearance: 'AI Agents (8 days)',
    highlightCategory: 'AI agents · vertical operations',
  },
  {
    tag: 'CAPITAL QUEUE SIGNAL · 02',
    headlinePrefix: 'Unmet buyer demand in ',
    headlineAccent: 'credit & SMB rails.',
    headlineSuffix: '',
    sectionSubheading: 'Immediate liquidity targets. Mid-market lending and SMB financial operations blueprints command 5.6x buyer oversubscription.',
    title: 'High-Demand: Credit & SMB Infra',
    description: 'Family offices and private credit syndicates are actively searching for turnkey debt workflow blueprints. Verified blueprints in this category average $7,200 in architect clearance payouts within 11 days.',
    medianPrice: '$7,200 avg fee',
    waitlistRatio: '5.6 : 1 buyers',
    fastestClearance: 'Fintech SMB (11 days)',
    highlightCategory: 'Fintech SMB · embedded lending',
  },
  {
    tag: 'ACCELERATED CLEARANCE SIGNAL · 03',
    headlinePrefix: 'Acute buyer scarcity in ',
    headlineAccent: 'enterprise RegTech.',
    headlineSuffix: '',
    sectionSubheading: 'High-urgency buyer mandates. Regulatory automation and compliance blueprints clear at premium unlock multiples.',
    title: 'Urgent Mandate: Industrial RegTech',
    description: 'Enterprise compliance automation and decarbonization diagnostics show an acute architect supply deficit. Blueprints clear in 12 days on average with verified corporate buyers on priority hold.',
    medianPrice: '$6,900 avg fee',
    waitlistRatio: '4.2 : 1 buyers',
    fastestClearance: 'RegTech (12 days)',
    highlightCategory: 'RegTech · mid-market compliance',
  },
];

const INVESTOR_SIGNALS: SignalItem[] = [
  {
    tag: 'MARKET ARBITRAGE SIGNAL · 01',
    headlinePrefix: 'Where buyer demand is ',
    headlineAccent: 'outpacing supply.',
    headlineSuffix: '',
    sectionSubheading: 'Real market arbitrage. Sectors with strong buyer interest and low supply of validated deals. Early unlocks capture premium yield.',
    title: 'High Demand, Low Depth',
    description: 'Vertical AI operations and Mid-Market RegTech are clearing dossiers in under 10 days. Institutional buyers report willingness to pay 2.4x the standard platform unlock fee for audited execution models with clean unit economics.',
    medianPrice: '$6,200',
    waitlistRatio: '4.8 : 1',
    fastestClearance: 'AI Agents (8 days)',
    highlightCategory: 'AI agents · vertical operations',
  },
  {
    tag: 'CAPITAL ARBITRAGE SIGNAL · 02',
    headlinePrefix: 'High-yield liquidity in ',
    headlineAccent: 'credit & SMB rails.',
    headlineSuffix: '',
    sectionSubheading: 'Capital arbitrage signals. Mid-market lending and SMB cashflow protocols seeing 5.6x oversubscription from active syndicates.',
    title: 'Credit & SMB Liquidity Gap',
    description: 'SMB embedded lending infrastructure commanding top-tier unlock checks averaging $7,200. High conversion velocity from regional NBFCs, family offices, and strategic credit syndicates.',
    medianPrice: '$7,200',
    waitlistRatio: '5.6 : 1',
    fastestClearance: 'Fintech SMB (11 days)',
    highlightCategory: 'Fintech SMB · embedded lending',
  },
  {
    tag: 'VELOCITY ACCELERATION SIGNAL · 03',
    headlinePrefix: 'Acute dealflow scarcity in ',
    headlineAccent: 'enterprise RegTech.',
    headlineSuffix: '',
    sectionSubheading: 'Velocity acceleration signals. Regulatory automation and compliance dossiers clearing at premium unlock fees with priority queues.',
    title: 'Industrial Efficiency & RegTech',
    description: 'Enterprise compliance automation and decarbonization diagnostics showing acute buyer scarcity. 12-day clearance with verified corporate buyers requesting priority access.',
    medianPrice: '$6,900',
    waitlistRatio: '4.2 : 1',
    fastestClearance: 'RegTech (12 days)',
    highlightCategory: 'RegTech · mid-market compliance',
  },
];

export const DemandImbalanceSection: React.FC = () => {
  const { role, setActiveRoute, addToast, openNdaModal } = useApp();
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'ops' | 'tech' | 'consumer'>('all');
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);
  const [fadeAnim, setFadeAnim] = useState<boolean>(true);

  const activeSignals = role === 'architect' ? ARCHITECT_SIGNALS : INVESTOR_SIGNALS;

  // Dynamic rotation every 10 seconds with smooth cross-fade
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setActiveSignalIndex((prev) => (prev + 1) % activeSignals.length);
        setFadeAnim(true);
      }, 300);
    }, 10000);

    return () => clearInterval(timer);
  }, [activeSignals.length]);

  const currentSignal = activeSignals[activeSignalIndex] || activeSignals[0];

  const handleSelectSignal = (idx: number) => {
    if (idx === activeSignalIndex) return;
    setFadeAnim(false);
    setTimeout(() => {
      setActiveSignalIndex(idx);
      setFadeAnim(true);
    }, 200);
  };

  const filteredCategories = DEMAND_SUPPLY_CATS.filter((cat) => {
    if (selectedDomain === 'all') return true;
    return cat.domain === selectedDomain;
  });

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveRoute('#list');
    window.location.hash = '#list';
    addToast(
      role === 'architect'
        ? 'Opening blueprint builder module for ' + currentSignal.title
        : 'Opening opportunity listing module.',
      'info'
    );
    const el = document.getElementById('list') || document.getElementById('opportunities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)] transition-colors select-none">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION HEAD: Dynamic Rotation (Every 10s) */}
        {/* ======================================================== */}
        <div className="max-w-4xl mb-6 sm:mb-8">
          <div className="min-h-[58px] sm:min-h-[42px] flex items-center">
            <h2
              className={`text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-tight leading-snug sm:leading-tight text-white transition-opacity duration-300 ${
                fadeAnim ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {currentSignal.headlinePrefix}
              <em
                className={`font-serif italic font-normal transition-colors duration-300 ${
                  role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                }`}
              >
                {currentSignal.headlineAccent}
              </em>
              {currentSignal.headlineSuffix}
            </h2>
          </div>

          <div className="min-h-[40px] sm:min-h-[28px] flex items-center mt-2">
            <p
              className={`text-xs sm:text-sm text-neutral-400 leading-relaxed transition-opacity duration-300 ${
                fadeAnim ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {currentSignal.sectionSubheading}
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 pb-3.5 mb-5 border-b border-white/10 overflow-x-auto select-none">
          <span className="text-xs font-mono text-neutral-500 mr-2 shrink-0">Filter Domain:</span>
          {(['all', 'tech', 'ops', 'consumer'] as const).map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all shrink-0 border ${
                selectedDomain === dom
                  ? role === 'architect'
                    ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-xs shadow-emerald-500/25'
                    : 'bg-[#E2571B] border-[#E2571B] text-white shadow-xs'
                  : role === 'architect'
                  ? 'bg-[#0D150F] border-white/10 text-neutral-300 hover:text-white hover:border-[#16A34A]/30'
                  : 'bg-[#14110E] border-white/10 text-neutral-300 hover:text-white hover:border-white/25'
              }`}
            >
              {dom === 'all'
                ? 'All Domains'
                : dom === 'tech'
                ? 'DeepTech & AI'
                : dom === 'ops'
                ? 'Operations & Compliance'
                : 'Consumer & D2C'}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-neutral-500 hidden sm:inline-block">
            {filteredCategories.length} Categories Tracked
          </span>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* SCROLLABLE MAIN TABLE */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col">
            
            {/* Table Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
              <span className="w-1/3">
                {role === 'architect' ? 'BUILD DOMAIN' : 'SECTOR PLAY'}
              </span>
              <span className="w-1/3 text-center">
                {role === 'architect' ? 'BUYER DEMAND VS SUPPLY' : 'DEMAND VS SUPPLY'}
              </span>
              <span className="w-1/3 text-right">
                {role === 'architect' ? 'CLEARANCE SPREAD' : 'ARBITRAGE GAP'}
              </span>
            </div>

            {/* Scrollable Container with Custom Sleek Scrollbar */}
            <div className="max-h-[440px] overflow-y-auto pr-2 space-y-3 custom-deal-scroll">
              {filteredCategories.map((item) => {
                const gap = item.demand - item.supply;
                const isFeatured = item.name === currentSignal.highlightCategory;

                return (
                  <div
                    key={item.name}
                    className={`p-3.5 rounded-xl transition-all duration-300 flex flex-col gap-2 border ${
                      isFeatured
                        ? role === 'architect'
                          ? 'bg-[#0F1C13] border-[#16A34A]/50 shadow-[0_0_12px_rgba(22,163,74,0.15)]'
                          : 'bg-[#181310] border-[#E2571B]/50 shadow-[0_0_12px_rgba(226,87,27,0.1)]'
                        : 'bg-[#14110E] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {isFeatured && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              role === 'architect' ? 'bg-[#16A34A]' : 'bg-[#E2571B]'
                            }`}
                          />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium text-white tracking-tight truncate ${
                            isFeatured
                              ? role === 'architect'
                                ? 'text-emerald-300'
                                : 'text-orange-200'
                              : ''
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                        <span className="text-emerald-400 font-semibold tabular-nums">
                          +{gap}% {role === 'architect' ? 'Spread' : 'Gap'}
                        </span>
                        <span className="text-neutral-600">·</span>
                        <span className="text-neutral-300 font-medium">
                          ${item.unlock}{' '}
                          {role === 'architect' ? 'est. clear fee' : 'avg unlock'}
                        </span>
                      </div>
                    </div>

                    {/* Comparative Dual Bar */}
                    <div className="space-y-1.5 pt-0.5">
                      {/* Buyer Demand Bar */}
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="w-16 text-neutral-400">
                          {role === 'architect' ? 'Demand:' : 'Demand:'}
                        </span>
                        <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              role === 'architect'
                                ? 'bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.4)]'
                                : 'bg-[#E2571B]'
                            }`}
                            style={{ width: `${item.demand}%` }}
                          />
                        </div>
                        <span className="w-9 text-right text-white font-medium tabular-nums">
                          {item.demand}%
                        </span>
                      </div>

                      {/* Listing Supply Bar */}
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="w-16 text-neutral-400">Supply:</span>
                        <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-500 rounded-full transition-all duration-500"
                            style={{ width: `${item.supply}%` }}
                          />
                        </div>
                        <span className="w-9 text-right text-neutral-400 tabular-nums">
                          {item.supply}%
                        </span>
                      </div>
                    </div>

                    {/* Card Meta Footer */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1 border-t border-white/5">
                      <span>
                        Avg clearance:{' '}
                        <strong className="text-neutral-200 font-normal">
                          {item.clear} days
                        </strong>
                      </span>
                      <span className="capitalize">
                        {role === 'architect' ? 'Build tier' : 'Build cost'}:{' '}
                        <strong className="text-neutral-200 font-normal">
                          {item.cost}
                        </strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <ChevronDown
                  className={`w-3.5 h-3.5 ${
                    role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                  }`}
                />
                <span>Scroll to browse all {filteredCategories.length} categories</span>
              </span>
              <span className="text-[10px] text-neutral-500">
                Sorted by demand-supply divergence
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SIGNAL SPOTLIGHT SIDEBAR */}
          {/* ======================================================== */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 shadow-2xl flex flex-col justify-between">
              
              <div>
                {/* Header with Signal Tabs */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`flex items-center gap-2 font-mono text-xs font-medium transition-colors duration-300 ${
                      role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                    }`}
                  >
                    <Zap
                      className={`w-4 h-4 ${
                        role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                      }`}
                    />
                    <span>{currentSignal.tag}</span>
                  </div>

                  {/* Signal selector pills */}
                  <div className="flex items-center gap-1">
                    {activeSignals.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSignal(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeSignalIndex === idx
                            ? role === 'architect'
                              ? 'w-6 bg-[#16A34A]'
                              : 'w-6 bg-[#E2571B]'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        title={`View signal ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Signal Title */}
                <h4
                  className={`text-lg sm:text-xl font-medium text-white mb-2 tracking-tight transition-opacity duration-300 ${
                    fadeAnim ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {currentSignal.title}
                </h4>

                {/* Signal Description */}
                <p
                  className={`text-xs text-neutral-400 leading-relaxed mb-5 transition-opacity duration-300 min-h-[48px] ${
                    fadeAnim ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {currentSignal.description}
                </p>
                
                {/* Metrics Table */}
                <div className="p-3.5 rounded-xl bg-[#14110E] border border-white/5 space-y-2.5 text-xs font-mono mb-5">
                  <div className="flex justify-between text-neutral-400">
                    <span>
                      {role === 'architect' ? 'Est. Unlock Fee:' : 'Median Unlock Price:'}
                    </span>
                    <span className="text-white font-semibold tabular-nums">
                      {currentSignal.medianPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>
                      {role === 'architect' ? 'Buyer Waitlist Ratio:' : 'Buyer Waitlist Ratio:'}
                    </span>
                    <span className="text-emerald-400 font-semibold tabular-nums">
                      {currentSignal.waitlistRatio}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>
                      {role === 'architect' ? 'Target Clearance:' : 'Fastest Clearance:'}
                    </span>
                    <span className="text-white font-semibold truncate max-w-[140px] text-right">
                      {currentSignal.fastestClearance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCtaClick}
                className={`w-full py-3 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md tracking-wide ${
                  role === 'architect'
                    ? 'bg-[#16A34A] hover:bg-[#15803d] shadow-[0_0_20px_rgba(22,163,74,0.25)]'
                    : 'bg-[#E2571B] hover:bg-[#CC4712]'
                }`}
              >
                <span>
                  {role === 'architect'
                    ? 'Build a blueprint in this gap'
                    : 'List an opportunity in this gap'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Verification Security Note */}
            <div className="p-4 rounded-xl bg-[#14110E] border border-white/5 text-xs text-neutral-400 flex items-start gap-3">
              <Shield
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
                }`}
              />
              <p className="leading-relaxed text-[11px] sm:text-xs">
                {role === 'architect'
                  ? 'vvEntra enforces cryptographic NDA escrow and verified buyer accreditation before revealing your technical execution blueprints. Full IP ownership and architect attribution are guaranteed.'
                  : 'vvEntra validates buyer liquidity before granting access to confidential dossier attachments. No unsolicited cold outreach or speculative broker intermediaries.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
