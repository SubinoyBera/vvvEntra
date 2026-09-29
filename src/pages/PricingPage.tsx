import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Scale, 
  HelpCircle, 
  Calculator, 
  Sparkles,
  DollarSign,
  Layers,
  ArrowDown,
  Info,
  Check,
  FileText,
  FileCheck,
  X,
  Copy,
  Clock
} from 'lucide-react';

type CurrencyType = 'USD' | 'EUR' | 'GBP';

interface CurrencyConfig {
  symbol: string;
  rate: number;
}

const CURRENCIES: Record<CurrencyType, CurrencyConfig> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

type EngagementPathId = 'full' | 'guidance' | 'documents';

interface EngagementPathInfo {
  id: EngagementPathId;
  title: string;
  subTitle: string;
  ratio: number; // multiplier of listed price
  description: string;
  deliverables: string[];
  timeline: string;
  escrowStructure: string;
}

const ENGAGEMENT_PATHS: Record<EngagementPathId, EngagementPathInfo> = {
  full: {
    id: 'full',
    title: 'FULL PARTNERSHIP',
    subTitle: 'Complete Hands-on Onboarding & Technical Pairing',
    ratio: 1.0, // 100% of listed price
    description: 'The complete enterprise acquisition package. Complete proprietary codebase, verified models, live architectural integration, and 30 days of direct sprint pairing with the creator.',
    deliverables: [
      'Full commercial IP conveyance deed & copyright assignment',
      'Encrypted GitHub repository & production deployment pipelines',
      '30 calendar days of direct pair-programming & architecture sprints',
      'Complete proprietary financial models & unit economics dossiers'
    ],
    timeline: '30-45 Days Milestone Horizon',
    escrowStructure: '10% Unlock Deposit + 3x 30% Milestone Releases'
  },
  guidance: {
    id: 'guidance',
    title: 'GUIDANCE',
    subTitle: 'Technical Blueprints with Strategic Advisory',
    ratio: 0.73, // exactly 73% (matches $4,745 on $6,500)
    description: 'Ideal for technical teams seeking the full operational blueprint and codebase accompanied by structured advisory briefings to guide in-house implementation.',
    deliverables: [
      'Complete production codebase and infrastructure templates',
      '4 structured 1-on-1 strategic technical advisory sessions',
      'Architecture design records and data-flow specifications',
      'Self-serve onboarding documentation and runbooks'
    ],
    timeline: '14-21 Days Milestone Horizon',
    escrowStructure: '10% Unlock Deposit + 2x 45% Milestone Releases'
  },
  documents: {
    id: 'documents',
    title: 'DOCUMENTS ONLY',
    subTitle: 'Self-Directed Implementation Package',
    ratio: 0.55, // exactly 55% (matches $3,575 on $6,500)
    description: 'Designed for experienced engineering and product teams who only need the audited blueprints, architecture specifications, and data rooms to execute independently.',
    deliverables: [
      'Audited architectural dossiers & system design documents',
      'Unit economics models, customer persona datasets, & schemas',
      'Commercial implementation license with full commercial rights',
      '7-day async Q&A messaging window with the architect'
    ],
    timeline: '7-10 Days Delivery Window',
    escrowStructure: '10% Unlock Deposit + 90% Delivery Acceptance'
  }
};

export const PricingPage: React.FC = () => {
  const { role, setRole, addToast } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  // Calculator State (Default 6500 matching the reference image)
  const [listedPriceUSD, setListedPriceUSD] = useState<number>(6500);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [selectedPath, setSelectedPath] = useState<EngagementPathId>('full');
  const [showTermSheetModal, setShowTermSheetModal] = useState<boolean>(false);
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);
  const [customPriceInput, setCustomPriceInput] = useState<string>('6500');

  const curr = CURRENCIES[currency];

  // Converted values
  const currentPrice = Math.round(listedPriceUSD * curr.rate);
  const unlockCost = Math.round(currentPrice * 0.10);
  const fullPrice = currentPrice;
  const guidancePrice = Math.round(currentPrice * 0.73);
  const documentsPrice = Math.round(currentPrice * 0.55);

  const activePathDetails = ENGAGEMENT_PATHS[selectedPath];
  const activePathPrice = Math.round(currentPrice * activePathDetails.ratio);
  const activePathEscrowBalance = activePathPrice - unlockCost;

  const scrollToCalculator = () => {
    const el = document.getElementById('live-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMoneyFlow = () => {
    const el = document.getElementById('money-flow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePresetClick = (amountUSD: number) => {
    setListedPriceUSD(amountUSD);
    setCustomPriceInput(amountUSD.toString());
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customPriceInput.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed) && parsed >= 500 && parsed <= 500000) {
      setListedPriceUSD(Math.round(parsed / curr.rate));
      setIsEditingPrice(false);
      addToast(`Updated listed opportunity price to ${curr.symbol}${parsed.toLocaleString()}`, 'success');
    } else {
      addToast('Please enter an opportunity value between 500 and 500,000.', 'warn');
    }
  };

  return (
    <div className="w-full text-white select-none pb-28 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO PRICING SECTION (Matches Uploaded Image Exactly) */}
      {/* ======================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ambient backglow */}
        <div 
          className="absolute top-1/4 left-1/4 w-[650px] h-[350px] blur-[170px] pointer-events-none rounded-full opacity-15 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ---------------- LEFT HERO COLUMN ---------------- */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Eyebrow with horizontal dash */}
            <div className="flex items-center gap-2 mb-6">
              <span 
                className="w-4 h-[2px] transition-colors"
                style={{ backgroundColor: themeColor }}
              />
              <span 
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
                style={{ color: themeColor }}
              >
                PRICING
              </span>
            </div>

            {/* 3D Buyer / Architect Perspective Toggle Pill (Enlarged as requested) */}
            <div className="mb-8 p-1.5 sm:p-2 rounded-full bg-[#12100E] border border-white/15 shadow-2xl inline-flex items-center gap-2">
              
              {/* "I'm a Buyer" Button (3D enlarged styling with orange accent) */}
              <button
                onClick={() => {
                  setRole('investor');
                  addToast('Switched to Buyer view (Orange theme)', 'info');
                }}
                className={`cursor-pointer select-none rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-[15px] font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 ${
                  !isArchitect
                    ? 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] text-white border border-[#FDBA74]/60 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_4px_0_#9A3412,0_10px_24px_rgba(234,88,12,0.45)] hover:brightness-105 active:translate-y-[2px]'
                    : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                }`}
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span>I'm a Buyer</span>
              </button>

              {/* "I'm an Architect" Button (3D enlarged styling with green accent) */}
              <button
                onClick={() => {
                  setRole('architect');
                  addToast('Switched to Architect view (Green theme)', 'info');
                }}
                className={`cursor-pointer select-none rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-[15px] font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 ${
                  isArchitect
                    ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] text-white border border-[#86EFAC]/60 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_4px_0_#0E622B,0_10px_24px_rgba(22,163,74,0.45)] hover:brightness-105 active:translate-y-[2px]'
                    : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                }`}
              >
                <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span>I'm an Architect</span>
              </button>

            </div>

            {/* Main Headline from User's Image */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.85rem] font-normal text-white tracking-tight leading-[1.12] mb-6">
              {!isArchitect ? (
                <>
                  Pay{' '}
                  <em 
                    className="font-serif italic font-normal transition-colors duration-300"
                    style={{ color: themeColor }}
                  >
                    only
                  </em>{' '}
                  when you find what you need.
                </>
              ) : (
                <>
                  List{' '}
                  <em 
                    className="font-serif italic font-normal transition-colors duration-300"
                    style={{ color: themeColor }}
                  >
                    free
                  </em>
                  . Earn 90% when deals settle.
                </>
              )}
            </h1>

            {/* Subtitle from User's Image */}
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
              {!isArchitect ? (
                <>
                  Start with a small unlock fee to access any opportunity. Meet the architect. Decide how you want to proceed.{' '}
                  <em className="font-serif italic text-neutral-200">
                    You're in control at every stage.
                  </em>
                </>
              ) : (
                <>
                  Zero listing fees, zero upfront charges. Maintain 100% IP custody until final settlement. Architects keep 90% of agreed engagement value.{' '}
                  <em className="font-serif italic text-neutral-200">
                    No hidden deductions.
                  </em>
                </>
              )}
            </p>

            {/* Bottom Actions Row from User's Image */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              
              {/* "Try the calculator →" button */}
              <button
                onClick={scrollToCalculator}
                className="cursor-pointer select-none rounded-lg px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold text-white tracking-wide transition-all duration-150 flex items-center gap-2 hover:opacity-95 active:scale-[0.98] shadow-lg"
                style={{ backgroundColor: themeColor }}
              >
                <span>Try the calculator</span>
                <span>→</span>
              </button>

              {/* "See how money flows" link */}
              <button
                onClick={scrollToMoneyFlow}
                className="text-xs sm:text-sm text-neutral-400 hover:text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5 group"
              >
                <span>See how money flows</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-neutral-500" />
              </button>

            </div>

          </div>

          {/* ---------------- RIGHT PRICING CARD (Matching Image Exactly) ---------------- */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[560px] rounded-3xl bg-[#12100E] border border-white/10 p-7 sm:p-9 md:p-10 shadow-2xl relative overflow-hidden text-left">
              
              {/* Top ambient corner glow */}
              <div 
                className="absolute top-0 right-0 w-[240px] h-[240px] blur-[110px] pointer-events-none rounded-full opacity-20 transition-all duration-300"
                style={{ backgroundColor: themeColor }}
              />

              {/* Top Status Tag with Green Dot */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                  TO EXPLORE VVEMTRA
                </span>
              </div>

              {/* Massive $0 Price Display */}
              <div 
                className="font-serif text-6xl sm:text-7xl lg:text-[5.5rem] font-normal leading-none tracking-tight mb-6 transition-colors duration-300"
                style={{ color: themeColor }}
              >
                $0
              </div>

              {/* Explanatory Copy */}
              <div className="space-y-1.5 mb-8">
                <p className="text-sm sm:text-base font-semibold text-white">
                  {!isArchitect ? 'Free to browse. Free to compare.' : 'Free to list. Free to verify.'}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                  {!isArchitect
                    ? 'You only pay when you choose to unlock an opportunity. The unlock fee depends on the listing.'
                    : 'Zero upfront fees to submit. You only pay a 10% platform facilitation fee when your deal closes.'}
                </p>
              </div>

              {/* Divider Line */}
              <div className="border-t border-white/10 my-7" />

              {/* Bottom Two-Box Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Box 1: UNLOCK FEE */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#161310] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    {!isArchitect ? 'UNLOCK FEE' : 'PLATFORM FEE'}
                  </span>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal mb-1 transition-colors"
                    style={{ color: themeColor }}
                  >
                    {!isArchitect ? 'Varies' : '10% on Close'}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {!isArchitect ? 'Scales with the listed price' : '0% upfront listing cost'}
                  </span>
                </div>

                {/* Box 2: HIDDEN FEES */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#161310] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    HIDDEN FEES
                  </span>
                  <div 
                    className="font-serif text-xl sm:text-2xl font-normal mb-1 transition-colors"
                    style={{ color: themeColor }}
                  >
                    $0
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    What you see is what you pay
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. REPLACED: EXACT LIVE CALCULATOR INTERFACE FROM IMAGE */}
      {/* ======================================================== */}
      <section id="live-calculator" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        {/* Eyebrow & Headline matching user's image */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              LIVE CALCULATOR
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-normal tracking-tight mb-4">
            See what your{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              unlock
            </em>{' '}
            gets you.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Move the slider to any listed price. We'll show you the unlock cost and what each engagement path costs.
          </p>

          {/* Super Cool Feature: Currency Switcher Pills */}
          <div className="inline-flex items-center gap-1 mt-4 p-1 rounded-full bg-[#12100E] border border-white/10 text-xs font-mono">
            {(['USD', 'EUR', 'GBP'] as CurrencyType[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  currency === cur
                    ? 'bg-white/15 text-white font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cur} ({CURRENCIES[cur].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* The Live Calculator Master Container Card (From User Reference Image) */}
        <div className="rounded-3xl bg-[#0D0B0A] border border-white/10 p-6 sm:p-9 md:p-11 shadow-2xl relative overflow-hidden text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ---------------- LEFT PANEL (SLIDER & PRESETS) ---------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-7">
              
              <div>
                {/* Monospace Eyebrow */}
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                  OPPORTUNITY LISTED AT
                </div>

                {/* Big Price Display (With Inline Edit capability for power users) */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span 
                    className="font-serif text-3xl sm:text-4xl transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}
                  </span>

                  {isEditingPrice ? (
                    <form onSubmit={handleCustomPriceSubmit} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customPriceInput}
                        onChange={(e) => setCustomPriceInput(e.target.value)}
                        autoFocus
                        onBlur={handleCustomPriceSubmit}
                        className="font-serif text-4xl sm:text-5xl text-white bg-black/50 border-b border-white/30 outline-none w-48 font-normal"
                      />
                      <button 
                        type="submit"
                        className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
                      >
                        Set
                      </button>
                    </form>
                  ) : (
                    <div 
                      onClick={() => setIsEditingPrice(true)}
                      className="group cursor-pointer flex items-center gap-3"
                      title="Click to type a custom value"
                    >
                      <span className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-white leading-none tracking-tight">
                        {currentPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 rounded px-1.5 py-0.5">
                        EDIT
                      </span>
                    </div>
                  )}
                </div>

                {/* Custom Ultra-Smooth Slider Track */}
                <div className="relative pt-2 pb-5">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="250"
                    value={listedPriceUSD}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setListedPriceUSD(val);
                      setCustomPriceInput(Math.round(val * curr.rate).toString());
                    }}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#E2571B] dark:accent-[#16A34A]"
                    style={{
                      accentColor: themeColor
                    }}
                  />
                  
                  {/* Subtle Min/Max markers */}
                  <div className="flex justify-between text-[10px] font-mono text-neutral-600 mt-2">
                    <span>{curr.symbol}1,000</span>
                    <span>{curr.symbol}25,000</span>
                    <span>{curr.symbol}50,000</span>
                  </div>
                </div>

                {/* Quick-Select Presets from the User Reference Image: $2k, $5k, $10k, $25k, $50k */}
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  {[
                    { label: `${curr.symbol}2k`, usd: 2000 },
                    { label: `${curr.symbol}5k`, usd: 5000 },
                    { label: `${curr.symbol}6.5k`, usd: 6500 },
                    { label: `${curr.symbol}10k`, usd: 10000 },
                    { label: `${curr.symbol}25k`, usd: 25000 },
                    { label: `${curr.symbol}50k`, usd: 50000 },
                  ].map((preset) => {
                    const isSelected = listedPriceUSD === preset.usd;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => handlePresetClick(preset.usd)}
                        className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-xs'
                            : 'bg-[#14110E] hover:bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanatory Footer Box matching user reference image */}
              <div className="p-4 rounded-xl bg-[#14110E] border border-white/5 text-xs text-neutral-400 leading-relaxed font-normal">
                Your unlock fee is shown on the right. After meeting the architect, you choose how much further to go.
              </div>

            </div>

            {/* ---------------- RIGHT PANEL (HIGHLIGHT CARD + 3 PATHS) ---------------- */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              
              {/* Top Solid Vibrant Highlight Card (Matching Reference Image) */}
              <div 
                className="p-6 sm:p-7 rounded-2xl text-white shadow-xl relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: themeColor
                }}
              >
                {/* Monospace Label */}
                <div className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-semibold mb-2">
                  {!isArchitect ? 'YOUR UNLOCK COST' : 'ESTIMATED ARCHITECT UNLOCK SPLIT'}
                </div>

                {/* Big Price Callout */}
                <div className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-normal leading-none tracking-tight mb-3">
                  <span className="text-2xl sm:text-3xl mr-0.5 opacity-90">{curr.symbol}</span>
                  {curr.symbol}{unlockCost.toLocaleString()}
                </div>

                {/* Explanatory Copy */}
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed max-w-lg">
                  {!isArchitect
                    ? 'Your unlock fee. Includes deeper documents, a live meeting with the architect, and the choice to proceed (or not) with three engagement paths below.'
                    : 'Initial 10% diligence reservation deposited to Delaware escrow. Credited towards final milestone payout upon closing.'}
                </p>
              </div>

              {/* Bottom 3-Box Row: Engagement Paths (Matching Reference Image) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Path 1: FULL PARTNERSHIP */}
                <div 
                  onClick={() => setSelectedPath('full')}
                  className={`p-4 rounded-2xl bg-[#14110E] border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    selectedPath === 'full'
                      ? 'border-white/30 bg-[#191512] shadow-md'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    FULL PARTNERSHIP · TOTAL
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{fullPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    100% Comprehensive
                  </div>
                </div>

                {/* Path 2: GUIDANCE */}
                <div 
                  onClick={() => setSelectedPath('guidance')}
                  className={`p-4 rounded-2xl bg-[#14110E] border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    selectedPath === 'guidance'
                      ? 'border-white/30 bg-[#191512] shadow-md'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    GUIDANCE · TOTAL
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{guidancePrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    73% Advisory Path
                  </div>
                </div>

                {/* Path 3: DOCUMENTS ONLY */}
                <div 
                  onClick={() => setSelectedPath('documents')}
                  className={`p-4 rounded-2xl bg-[#14110E] border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    selectedPath === 'documents'
                      ? 'border-white/30 bg-[#191512] shadow-md'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    DOCUMENTS ONLY · TOTAL
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{documentsPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    55% Self-Directed
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* SUPER COOL INTERACTIVE FEATURE: EXPANDED PATH INSPECTOR */}
          {/* ======================================================== */}
          <div className="mt-8 pt-7 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                    PATH INSPECTION · {activePathDetails.title}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-white font-normal mt-0.5">
                  {activePathDetails.subTitle}
                </h3>
              </div>

              {/* Escrow Term Sheet Trigger Button */}
              <button
                onClick={() => setShowTermSheetModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer flex items-center gap-2 shrink-0"
              >
                <FileCheck className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <span>Simulate Delaware Escrow Term Sheet</span>
              </button>
            </div>

            {/* Deliverables Grid & Escrow Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Deliverables List */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#14110E] border border-white/5 text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                  CONTRACTUAL DELIVERABLES INCLUDED
                </div>
                <div className="space-y-2.5">
                  {activePathDetails.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-normal leading-relaxed">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone & Escrow Schedule */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#14110E] border border-white/5 text-left flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    ESCROW MILESTONE CLEARANCE HORIZON
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Credited Unlock</span>
                      <div className="font-serif text-base text-white mt-0.5">
                        {curr.symbol}{unlockCost.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Escrow Balance</span>
                      <div 
                        className="font-serif text-base mt-0.5"
                        style={{ color: themeColor }}
                      >
                        {curr.symbol}{activePathEscrowBalance.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {activePathDetails.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    {activePathDetails.timeline}
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    100% Escrow Protected
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. REPLACED: "THE FLOW / WHERE YOUR MONEY GOES" SECTION */}
      {/* ======================================================== */}
      <section id="money-flow" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Section Header matching uploaded image */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              THE FLOW
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-normal tracking-tight mb-4">
            Where your{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              money
            </em>{' '}
            goes.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Your payment is protected in escrow at every stage. Here is the path your money takes on a $4,000 opportunity.
          </p>
        </div>

        {/* Master Flow Card Container matching uploaded image */}
        <div className="p-6 sm:p-9 md:p-12 rounded-3xl bg-[#0D0B0A] border border-white/10 shadow-2xl relative overflow-hidden text-left">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-center">
            
            {/* Left Flow Sequence: 3 Connected Vertical Cards with Arrows (7 cols on XL) */}
            <div className="xl:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              
              {/* Card 1: Stage 1 · Unlock */}
              <div className="w-full sm:w-48 min-h-[300px] p-5 sm:p-6 rounded-2xl border border-[#9A3412]/50 bg-[#16110E] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                  STAGE 1 · UNLOCK
                </span>

                <div className="my-auto py-4">
                  <div 
                    className="font-serif italic text-base sm:text-lg mb-1"
                    style={{ color: themeColor }}
                  >
                    You pay
                  </div>
                  <div 
                    className="font-serif text-3xl sm:text-4xl font-normal tracking-tight"
                    style={{ color: themeColor }}
                  >
                    $400
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Unlock fee on a $4,000 listing
                </p>
              </div>

              {/* Connecting Arrow 1 */}
              <div className="shrink-0 text-orange-500 py-1 sm:py-0">
                <ArrowRight 
                  className="w-5 h-5 transition-colors hidden sm:block" 
                  style={{ color: themeColor }}
                />
                <ArrowDown 
                  className="w-5 h-5 transition-colors block sm:hidden" 
                  style={{ color: themeColor }}
                />
              </div>

              {/* Card 2: Held in Escrow */}
              <div className="w-full sm:w-48 min-h-[300px] p-5 sm:p-6 rounded-2xl border border-white/15 bg-[#12100E] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium leading-tight">
                  HELD IN ESCROW
                </span>

                <div className="my-auto py-4">
                  <div className="font-serif text-base text-neutral-200 mb-1">
                    vvEntra protects it
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                    $400
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Until you confirm value received
                </p>
              </div>

              {/* Connecting Arrow 2 */}
              <div className="shrink-0 text-orange-500 py-1 sm:py-0">
                <ArrowRight 
                  className="w-5 h-5 transition-colors hidden sm:block" 
                  style={{ color: themeColor }}
                />
                <ArrowDown 
                  className="w-5 h-5 transition-colors block sm:hidden" 
                  style={{ color: themeColor }}
                />
              </div>

              {/* Card 3: Stage 2 · You Decide */}
              <div className="w-full sm:w-48 min-h-[300px] p-5 sm:p-6 rounded-2xl border border-[#16A34A]/50 bg-[#0E1511] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium leading-tight">
                  STAGE 2 · YOU DECIDE
                </span>

                <div className="my-auto py-4">
                  <div className="font-serif italic text-xl text-emerald-400 leading-snug font-normal">
                    You choose <span className="font-serif text-2xl">3</span> paths
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  <div>From $1,800</div>
                  <div className="text-[10px] text-neutral-500 my-0.5">to</div>
                  <div>$3,600 more</div>
                </div>
              </div>

            </div>

            {/* Right Side: 3 Numbered Explanatory Pillars with Dotted Line (5 cols on XL) */}
            <div className="xl:col-span-5 flex flex-col justify-between h-full pt-4 xl:pt-0">
              
              {/* Dotted border at top */}
              <div className="border-t border-dashed border-white/15 pt-6 mb-6 xl:mb-0">
                
                {/* 3 Pillars in a clean grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-5">
                  
                  {/* Item 1 */}
                  <div className="space-y-2.5 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-serif flex items-center justify-center font-normal" style={{ color: themeColor }}>
                        1
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                      Escrow at every stage
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      Funds release only after milestones approve or auto-approve. Both sides are protected.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-2.5 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-serif flex items-center justify-center font-normal" style={{ color: themeColor }}>
                        2
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                      No surprise charges
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      The listed price is the listed price. You pay exactly what you see, nothing added on top.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-2.5 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-serif flex items-center justify-center font-normal" style={{ color: themeColor }}>
                        3
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                      Released after approval
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      Money only moves when you approve milestones or after the 7-day inspection window.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. COMPARISON MATRIX: TRADITIONAL BROKER VS. VVENTRA */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0B0A] border border-white/10 shadow-2xl text-left">
          
          <div className="max-w-2xl mb-8">
            <span 
              className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
              style={{ color: themeColor }}
            >
              VALUE BENCHMARK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
              Why institutional operators choose vvEntra over traditional M&A brokers.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-mono text-[11px] uppercase">
                  <th className="py-4 pr-4">Dimension</th>
                  <th className="py-4 px-4 text-neutral-500">Traditional M&A Broker</th>
                  <th 
                    className="py-4 px-4 font-semibold"
                    style={{ color: themeColor }}
                  >
                    vvEntra Opportunity Exchange
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                <tr>
                  <td className="py-4 pr-4 font-medium text-white">Upfront Listing Fee</td>
                  <td className="py-4 px-4 text-neutral-400">$5,000 – $25,000 retainer</td>
                  <td className="py-4 px-4 font-semibold text-emerald-400">$0 Free Listing</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-white">Success Commission</td>
                  <td className="py-4 px-4 text-neutral-400">12% – 25% of total transaction</td>
                  <td className="py-4 px-4 font-semibold text-white">10% Platform Fee</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-white">Custody & Settlement</td>
                  <td className="py-4 px-4 text-neutral-400">Manual wire escrow, high bank fees</td>
                  <td className="py-4 px-4 font-semibold text-white">Automated Delaware Escrow Rails</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-white">Confidentiality Enforceability</td>
                  <td className="py-4 px-4 text-neutral-400">Manual PDF signing, slow turnarounds</td>
                  <td className="py-4 px-4 font-semibold text-white">Instant SHA-256 Bilateral NDA</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-white">Deal Velocity Window</td>
                  <td className="py-4 px-4 text-neutral-400">6 to 12 months average</td>
                  <td className="py-4 px-4 font-semibold text-white">7-Day Engagement Window</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE DELAWARE ESCROW TERM SHEET SIMULATION MODAL */}
      {/* ======================================================== */}
      {showTermSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-[#0F0D0C] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
            
            {/* Close Button */}
            <button
              onClick={() => setShowTermSheetModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}40`,
                  color: themeColor
                }}
              >
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  DELAWARE CHANCERY · STATUTORY TRUST SCHEDULE
                </span>
                <h3 className="font-serif text-xl text-white font-normal">
                  Sample Escrow Allocation Schedule
                </h3>
              </div>
            </div>

            {/* Simulated Voucher Details */}
            <div className="space-y-4 mb-6 text-xs text-neutral-300 font-mono">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Selected Path:</span>
                  <span className="text-white font-semibold">{activePathDetails.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Engagement Value:</span>
                  <span className="text-white font-semibold">{curr.symbol}{activePathPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Stage 1 Unlock Deposit (10%):</span>
                  <span style={{ color: themeColor }} className="font-semibold">
                    {curr.symbol}{unlockCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Stage 2 Milestone Escrow (90%):</span>
                  <span className="text-white font-semibold">{curr.symbol}{activePathEscrowBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-neutral-500">Net Architect Payout (90%):</span>
                  <span className="text-emerald-400 font-semibold">{curr.symbol}{Math.round(activePathPrice * 0.9).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">vvEntra Platform Facilitation (10%):</span>
                  <span className="text-neutral-400 font-semibold">{curr.symbol}{Math.round(activePathPrice * 0.1).toLocaleString()}</span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                Funds are held in bankruptcy-remote Delaware Statutory Trust accounts. All IP conveyances are binding under Delaware Uniform Commercial Code (UCC Article 9).
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`vvEntra Escrow Schedule: ${activePathDetails.title} - ${curr.symbol}${activePathPrice.toLocaleString()}`);
                  addToast('Copied escrow schedule summary to clipboard.', 'success');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all cursor-pointer flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
              
              <button
                onClick={() => {
                  setShowTermSheetModal(false);
                  addToast('Sample term sheet archived to your session profile.', 'success');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white tracking-wide transition-all cursor-pointer"
                style={{ backgroundColor: themeColor }}
              >
                Close Schedule
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
