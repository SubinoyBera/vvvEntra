import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Users,
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
  Plus,
  XCircle,
  MessageSquare,
  Copy,
  Clock,
  CheckSquare,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target
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
  const { role, setRole, addToast, setActiveRoute } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  // Calculator State (Default 4000 matching the reference image)
  const [listedPriceUSD, setListedPriceUSD] = useState<number>(4000);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [selectedPath, setSelectedPath] = useState<EngagementPathId>('full');
  const [hoveredPath, setHoveredPath] = useState<EngagementPathId | null>(null);
  const [hoveredProtectionIndex, setHoveredProtectionIndex] = useState<number | null>(null);
  const [hoveredDisputeIndex, setHoveredDisputeIndex] = useState<number | null>(null);
  const [expandedFinePrint, setExpandedFinePrint] = useState<number | null>(null);
  const [showTermSheetModal, setShowTermSheetModal] = useState<boolean>(false);
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);
  const [customPriceInput, setCustomPriceInput] = useState<string>('4000');

  const curr = CURRENCIES[currency];

  // Converted values
  const currentPrice = Math.round(listedPriceUSD * curr.rate);
  const unlockCost = Math.round(currentPrice * 0.10);
  const remainingCost = currentPrice - unlockCost;
  const fullPrice = currentPrice;
  const guidancePrice = unlockCost + Math.round(remainingCost * 0.70);
  const documentsPrice = unlockCost + Math.round(remainingCost * 0.50);

  // Architect specific payouts (Takes home 90% of each tier):
  // Listing at $2000 -> full: $1800, guidance: $1314, documents: $990
  // Listing at $4000 -> full: $3600, guidance: $2628, documents: $1980
  const architectFullPayout = Math.round(fullPrice * 0.90);
  const architectGuidancePayout = Math.round(guidancePrice * 0.90);
  const architectDocumentsPayout = Math.round(documentsPrice * 0.90);
  const architectUnlockPayout = Math.round(unlockCost * 0.90);

  const activePathDetails = ENGAGEMENT_PATHS[selectedPath];
  const activeBuyerPrice = selectedPath === 'full' 
    ? fullPrice 
    : selectedPath === 'guidance' 
      ? guidancePrice 
      : documentsPrice;
  const activeArchitectPrice = selectedPath === 'full' 
    ? architectFullPayout 
    : selectedPath === 'guidance' 
      ? architectGuidancePayout 
      : architectDocumentsPayout;
  const activePathPrice = !isArchitect ? activeBuyerPrice : activeArchitectPrice;
  const activePathEscrowBalance = activePathPrice - (!isArchitect ? unlockCost : architectUnlockPayout);

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
                  Keep{' '}
                  <em 
                    className="font-serif italic font-normal text-emerald-400"
                  >
                    90%
                  </em>{' '}
                  of everything<br className="hidden sm:inline" /> you earn.
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
                  List for free. Set your own price. vvEntra takes a flat 10% from each transaction. No subscriptions, no listing fees.{' '}
                  <em className="italic text-neutral-300">
                    The simplest pricing in venture intelligence.
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
                  {!isArchitect ? 'TO EXPLORE VVENTRA' : 'YOUR PLATFORM FEE'}
                </span>
              </div>

              {/* Massive Price / Payout Display */}
              {!isArchitect ? (
                <div 
                  className="font-serif text-6xl sm:text-7xl lg:text-[5.5rem] font-normal leading-none tracking-tight mb-6 transition-colors duration-300"
                  style={{ color: themeColor }}
                >
                  $0
                </div>
              ) : (
                <div className="font-serif leading-none tracking-tight mb-6 flex items-baseline">
                  <span className="text-6xl sm:text-7xl lg:text-[5.5rem] font-serif italic text-emerald-400 font-normal">
                    90
                  </span>
                  <span className="text-5xl sm:text-6xl lg:text-[4.5rem] font-serif font-normal text-white">
                    %
                  </span>
                </div>
              )}

              {/* Explanatory Copy */}
              <div className="space-y-1.5 mb-8">
                {!isArchitect ? (
                  <>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      Free to browse. Free to compare.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
                      You only pay when you choose to unlock an opportunity. The unlock fee depends on the listing.
                    </p>
                  </>
                ) : (
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                    <span>You keep <strong className="text-white font-semibold">90% of every payment</strong>.</span>
                    <br />
                    <span>Our flat 10% is the only fee you'll ever see.</span>
                  </p>
                )}
              </div>

              {/* Divider Line */}
              <div className="border-t border-white/10 my-7" />

              {/* Bottom Two-Box Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Box 1: UNLOCK FEE / LISTING FEE */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#161310] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    {!isArchitect ? 'UNLOCK FEE' : 'LISTING FEE'}
                  </span>
                  {!isArchitect ? (
                    <div 
                      className="font-serif italic text-xl sm:text-2xl font-normal mb-1 transition-colors"
                      style={{ color: themeColor }}
                    >
                      Varies
                    </div>
                  ) : (
                    <div className="font-serif italic text-2xl sm:text-3xl font-normal mb-1 text-emerald-400">
                      $0
                    </div>
                  )}
                  <span className="text-[11px] font-mono text-neutral-400">
                    {!isArchitect ? 'Scales with the listed price' : 'Free to publish'}
                  </span>
                </div>

                {/* Box 2: HIDDEN FEES / SUBSCRIPTION */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#161310] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    {!isArchitect ? 'HIDDEN FEES' : 'SUBSCRIPTION'}
                  </span>
                  <div 
                    className={`font-serif text-xl sm:text-2xl font-normal mb-1 transition-colors ${
                      isArchitect ? 'italic text-2xl sm:text-3xl text-emerald-400' : ''
                    }`}
                    style={!isArchitect ? { color: themeColor } : undefined}
                  >
                    $0
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {!isArchitect ? 'What you see is what you pay' : 'Pay per deal, not monthly'}
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
                    { label: `${curr.symbol}4k`, usd: 4000 },
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
                  {!isArchitect ? 'YOUR UNLOCK COST' : 'ESTIMATED ARCHITECT UNLOCK (90%)'}
                </div>

                {/* Big Price Callout */}
                <div className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-normal leading-none tracking-tight mb-3 flex items-baseline">
                  <span className="text-2xl sm:text-3xl mr-1 opacity-90">{curr.symbol}</span>
                  <span>{(!isArchitect ? unlockCost : architectFullPayout).toLocaleString()}</span>
                </div>

                {/* Explanatory Copy */}
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed max-w-lg">
                  {!isArchitect
                    ? 'Your unlock fee. Includes deeper documents, a live meeting with the architect, and the choice to proceed (or not) with three engagement paths below.'
                    : 'Initial net earnings credited directly to you upon buyer diligence completion (90% net take).'}
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
                    {!isArchitect ? 'FULL PARTNERSHIP · TOTAL' : 'FULL PARTNERSHIP · NET (90%)'}
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? fullPrice : architectFullPayout).toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    {!isArchitect ? '100% Comprehensive' : '90% of listed price'}
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
                    {!isArchitect ? 'GUIDANCE · TOTAL' : 'GUIDANCE · NET (90%)'}
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? guidancePrice : architectGuidancePayout).toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    {!isArchitect ? '73% Advisory Path' : '90% of guidance price'}
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
                    {!isArchitect ? 'DOCUMENTS ONLY · TOTAL' : 'DOCUMENTS ONLY · NET (90%)'}
                  </div>
                  <div 
                    className="font-serif italic text-xl sm:text-2xl font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? documentsPrice : architectDocumentsPayout).toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">
                    {!isArchitect ? '55% Self-Directed' : '90% of documents price'}
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
      <section id="money-flow" className="py-16 sm:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
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
            {!isArchitect ? (
              <>
                Where your{' '}
                <em 
                  className="font-serif italic font-normal transition-colors duration-300"
                  style={{ color: themeColor }}
                >
                  money
                </em>{' '}
                goes.
              </>
            ) : (
              <>
                Every{' '}
                <em 
                  className="font-serif italic font-normal text-emerald-400"
                >
                  dollar,
                </em>{' '}
                accounted for.
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            {!isArchitect
              ? `Your payment is protected in escrow at every stage. Here is the path your money takes on a ${curr.symbol}${currentPrice.toLocaleString()} opportunity.`
              : `Here is what happens to a ${curr.symbol}${currentPrice.toLocaleString()} listing through every stage. No hidden steps, no surprise fees.`}
          </p>
        </div>

        {/* Master Flow Card Container matching uploaded image */}
        <div className="p-6 sm:p-9 md:p-12 rounded-3xl bg-[#0D0B0A] border border-white/10 shadow-2xl relative overflow-hidden text-left">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-center">
            
            {/* Left Flow Sequence: 3 Connected Vertical Cards with Arrows (7 cols on XL) */}
            <div className="xl:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              
              {!isArchitect ? (
                <>
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
                        {curr.symbol}{unlockCost.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                      Unlock fee on a {curr.symbol}{currentPrice.toLocaleString()} listing
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
                        {curr.symbol}{unlockCost.toLocaleString()}
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
                      <div>From {curr.symbol}{(documentsPrice - unlockCost).toLocaleString()}</div>
                      <div className="text-[10px] text-neutral-500 my-0.5">to</div>
                      <div>{curr.symbol}{(fullPrice - unlockCost).toLocaleString()} more</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Card 1 (Architect): BUYER Pays */}
                  <div className="w-full sm:w-48 min-h-[290px] p-5 sm:p-6 rounded-2xl border border-amber-900/40 bg-[#140E0A] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                        BUYER
                      </span>
                      <span className="font-serif italic text-sm text-[#E2571B]">
                        Pays
                      </span>
                    </div>

                    <div className="my-auto py-4">
                      <div className="font-serif italic text-3xl sm:text-4xl font-normal tracking-tight text-[#E2571B]">
                        {curr.symbol}{currentPrice.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                      Total over deal lifecycle
                    </p>
                  </div>

                  {/* Connecting Arrow 1 */}
                  <div className="shrink-0 text-emerald-500 py-1 sm:py-0">
                    <ArrowRight className="w-5 h-5 text-emerald-400 hidden sm:block" />
                    <ArrowDown className="w-5 h-5 text-emerald-400 block sm:hidden" />
                  </div>

                  {/* Card 2 (Architect): VVENTRA ESCROW */}
                  <div className="w-full sm:w-48 min-h-[290px] p-5 sm:p-6 rounded-2xl border border-white/15 bg-[#0F0E0D] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                        VVENTRA
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-medium">
                        ESCROW
                      </div>
                    </div>

                    <div className="my-auto py-3">
                      <div className="font-serif text-sm sm:text-base text-white mb-1">
                        Holds & releases
                      </div>
                      <div className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                        {curr.symbol}{currentPrice.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                      10% commission deducted
                    </p>
                  </div>

                  {/* Connecting Arrow 2 */}
                  <div className="shrink-0 text-emerald-500 py-1 sm:py-0">
                    <ArrowRight className="w-5 h-5 text-emerald-400 hidden sm:block" />
                    <ArrowDown className="w-5 h-5 text-emerald-400 block sm:hidden" />
                  </div>

                  {/* Card 3 (Architect): ARCHITECT Receives */}
                  <div className="w-full sm:w-48 min-h-[290px] p-5 sm:p-6 rounded-2xl border border-emerald-500/40 bg-[#0A140E] flex flex-col justify-between items-center text-center shadow-lg transition-all">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                        ARCHITECT
                      </div>
                      <div className="font-serif italic text-sm text-emerald-400">
                        Receives
                      </div>
                    </div>

                    <div className="my-auto py-4">
                      <div className="font-serif italic text-3xl sm:text-4xl font-normal tracking-tight text-emerald-400">
                        {curr.symbol}{architectFullPayout.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                      90% of every payment
                    </p>
                  </div>
                </>
              )}

            </div>

            {/* Right Side: 3 Numbered Explanatory Pillars with Dotted Line (5 cols on XL) */}
            <div className="xl:col-span-5 flex flex-col justify-between h-full pt-4 xl:pt-0">
              
              {/* Dotted border at top */}
              <div className="border-t border-dashed border-white/15 pt-6 mb-6 xl:mb-0">
                
                {/* 3 Pillars in a clean grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-5">
                  
                  {!isArchitect ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {/* Item 1 (Architect) */}
                      <div className="space-y-2.5 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-serif italic flex items-center justify-center font-normal">
                            1
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                          Escrow at{' '}
                          <em className="font-serif italic font-normal text-white">
                            every stage
                          </em>
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                          Funds release only after milestones approve or auto-approve. Both sides are protected.
                        </p>
                      </div>

                      {/* Item 2 (Architect) */}
                      <div className="space-y-2.5 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-serif italic flex items-center justify-center font-normal">
                            2
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                          Architect gets 90%
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                          vvEntra's 10% is taken from architect's side. The buyer pays the listed price as advertised.
                        </p>
                      </div>

                      {/* Item 3 (Architect) */}
                      <div className="space-y-2.5 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-serif italic flex items-center justify-center font-normal">
                            3
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base text-white font-normal leading-snug">
                          Released in 7 days
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                          From unlock or milestone approval. Bank transfer, Stripe, Wise, or Razorpay.
                        </p>
                      </div>
                    </>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. STAGE 2 COMPONENT SECTION: THREE WAYS TO PROCEED */}
      {/* ======================================================== */}
      <section id="stage-2-paths" className="py-16 sm:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow & Headline */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              STAGE 2 · AFTER THE UNLOCK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.15rem] text-white font-normal tracking-tight leading-tight mb-3">
            Three ways to{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              proceed
            </em>
            . You pick.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            {!isArchitect 
              ? 'After your unlock meeting, choose how much architect involvement you want. Price scales with engagement.'
              : 'Your net earnings for each engagement path. Architects keep 90% of every dollar cleared through Delaware escrow.'}
          </p>
        </div>

        {/* Showing Prices Pill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-[#12100E] border border-white/10 shadow-lg text-xs font-mono">
            <span className="text-neutral-400 tracking-wider uppercase text-[10px] sm:text-[11px]">
              {!isArchitect ? 'SHOWING PRICES FOR A LISTING AT' : 'SHOWING ARCHITECT EARNINGS FOR A LISTING AT'}
            </span>
            <span 
              className="font-serif italic text-base sm:text-lg font-normal transition-colors"
              style={{ color: themeColor }}
            >
              {curr.symbol}{currentPrice.toLocaleString()}
            </span>
            <button
              onClick={scrollToCalculator}
              className="ml-1 sm:ml-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-300 hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1 group"
            >
              <span>CHANGE IN CALCULATOR</span>
              <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>

        {/* 3 Stage 2 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch text-left">
          
          {/* ---------------- CARD 1: FULL PARTNERSHIP ---------------- */}
          {(() => {
            const isHighlighted = selectedPath === 'full' || hoveredPath === 'full';
            return (
              <div 
                onClick={() => setSelectedPath('full')}
                onMouseEnter={() => setHoveredPath('full')}
                onMouseLeave={() => setHoveredPath(null)}
                className="group rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-pointer"
                style={{
                  border: isHighlighted ? `1.5px solid ${themeColor}` : '1.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isHighlighted 
                    ? `0 0 0 1px ${themeColor}25, 0 12px 35px -5px ${themeColor}30, 0 25px 50px -12px rgba(0,0,0,0.85)` 
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  transform: isHighlighted ? 'translateY(-4px)' : 'translateY(0)',
                  background: isHighlighted 
                    ? `radial-gradient(120% 70% at 50% 0%, ${themeColor}15 0%, #0D0B0A 100%)` 
                    : '#0B0A09'
                }}
              >
                {/* Luminous Top Glow Edge */}
                <div 
                  className="absolute top-0 inset-x-0 h-[2.5px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                    opacity: isHighlighted ? 1 : 0
                  }}
                />

                <div>
                  {/* Top Row: Icon + "MOST INVOLVED" Pill Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div 
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md transition-all duration-300"
                      style={{ 
                        backgroundColor: themeColor,
                        transform: isHighlighted ? 'scale(1.04)' : 'scale(1)',
                        boxShadow: isHighlighted ? `0 0 24px ${themeColor}50` : 'none'
                      }}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>

                    <span 
                      className="px-3.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-white uppercase shadow-sm transition-colors"
                      style={{ backgroundColor: themeColor }}
                    >
                      MOST INVOLVED
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-[28px] text-white font-normal mb-3">
                    Full{' '}
                    <em 
                      className="font-serif italic font-normal transition-colors"
                      style={{ color: themeColor }}
                    >
                      partnership
                    </em>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed mb-6 min-h-[44px]">
                    Architect joins as your execution partner. Active involvement, weekly check-ins, full operational support.
                  </p>

                  {/* Callout box: 100% of remaining */}
                  <div 
                    className="p-4 sm:p-5 rounded-2xl flex items-baseline gap-2.5 mb-6 transition-colors duration-300"
                    style={{
                      backgroundColor: '#070605',
                      border: isHighlighted ? `1px solid ${themeColor}40` : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <span 
                      className="font-serif italic text-3xl sm:text-4xl font-normal transition-colors leading-none"
                      style={{ color: themeColor }}
                    >
                      100%
                    </span>
                    <span className="text-xs font-mono text-neutral-400 tracking-wide">
                      of remaining
                    </span>
                  </div>

                  {/* Dotted Divider */}
                  <div className="border-t border-dashed border-white/10 my-6" />

                  {/* YOU RECEIVE section */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                      YOU RECEIVE
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span className="font-medium text-white">Full opportunity package</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Active execution involvement</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Weekly milestone tracking</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Full execution support</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Strip: YOU PAY TOTAL */}
                <div className="mt-8 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5.5 bg-[#070605] border-t border-white/10 flex items-baseline justify-between rounded-b-[26px]">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                    {!isArchitect ? 'YOU PAY TOTAL' : 'ARCHITECT NET PAYOUT (90%)'}
                  </span>
                  <div 
                    className="font-serif italic text-3xl sm:text-[38px] font-normal leading-none transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? fullPrice : Math.round(fullPrice * 0.9)).toLocaleString()}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* ---------------- CARD 2: GUIDANCE + ADVISORY ---------------- */}
          {(() => {
            const isHighlighted = selectedPath === 'guidance' || hoveredPath === 'guidance';
            return (
              <div 
                onClick={() => setSelectedPath('guidance')}
                onMouseEnter={() => setHoveredPath('guidance')}
                onMouseLeave={() => setHoveredPath(null)}
                className="group rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-pointer"
                style={{
                  border: isHighlighted ? `1.5px solid ${themeColor}` : '1.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isHighlighted 
                    ? `0 0 0 1px ${themeColor}25, 0 12px 35px -5px ${themeColor}30, 0 25px 50px -12px rgba(0,0,0,0.85)` 
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  transform: isHighlighted ? 'translateY(-4px)' : 'translateY(0)',
                  background: isHighlighted 
                    ? `radial-gradient(120% 70% at 50% 0%, ${themeColor}15 0%, #0D0B0A 100%)` 
                    : '#0B0A09'
                }}
              >
                {/* Luminous Top Glow Edge */}
                <div 
                  className="absolute top-0 inset-x-0 h-[2.5px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                    opacity: isHighlighted ? 1 : 0
                  }}
                />

                <div>
                  {/* Top Row: Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div 
                      className="w-13 h-13 rounded-2xl flex items-center justify-center border transition-all duration-300"
                      style={{ 
                        backgroundColor: isHighlighted ? `${themeColor}20` : '#161310',
                        borderColor: isHighlighted ? themeColor : 'rgba(255,255,255,0.1)',
                        color: themeColor,
                        transform: isHighlighted ? 'scale(1.04)' : 'scale(1)'
                      }}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="h-6" /> {/* Balanced Spacer */}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-[28px] text-white font-normal mb-3">
                    Guidance{' '}
                    <em 
                      className="font-serif italic font-normal transition-colors"
                      style={{ color: themeColor }}
                    >
                      + advisory
                    </em>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed mb-6 min-h-[44px]">
                    Architect advises but doesn't operate. Scheduled meetings, strategic input, full document access.
                  </p>

                  {/* Callout box: 70% of remaining */}
                  <div 
                    className="p-4 sm:p-5 rounded-2xl flex items-baseline gap-2.5 mb-6 transition-colors duration-300"
                    style={{
                      backgroundColor: '#070605',
                      border: isHighlighted ? `1px solid ${themeColor}40` : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <span 
                      className="font-serif italic text-3xl sm:text-4xl font-normal transition-colors leading-none"
                      style={{ color: themeColor }}
                    >
                      70%
                    </span>
                    <span className="text-xs font-mono text-neutral-400 tracking-wide">
                      of remaining
                    </span>
                  </div>

                  {/* Dotted Divider */}
                  <div className="border-t border-dashed border-white/10 my-6" />

                  {/* YOU RECEIVE section */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                      YOU RECEIVE
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span className="font-medium text-white">Full opportunity package</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Scheduled guidance meetings</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Weekly milestone tracking</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-400">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500/70" />
                      <span>No hands-on operations</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Strip: YOU PAY TOTAL */}
                <div className="mt-8 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5.5 bg-[#070605] border-t border-white/10 flex items-baseline justify-between rounded-b-[26px]">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                    {!isArchitect ? 'YOU PAY TOTAL' : 'ARCHITECT NET PAYOUT (90%)'}
                  </span>
                  <div 
                    className="font-serif italic text-3xl sm:text-[38px] font-normal leading-none transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? guidancePrice : Math.round(guidancePrice * 0.9)).toLocaleString()}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* ---------------- CARD 3: DOCUMENTS ONLY ---------------- */}
          {(() => {
            const isHighlighted = selectedPath === 'documents' || hoveredPath === 'documents';
            return (
              <div 
                onClick={() => setSelectedPath('documents')}
                onMouseEnter={() => setHoveredPath('documents')}
                onMouseLeave={() => setHoveredPath(null)}
                className="group rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-pointer"
                style={{
                  border: isHighlighted ? `1.5px solid ${themeColor}` : '1.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isHighlighted 
                    ? `0 0 0 1px ${themeColor}25, 0 12px 35px -5px ${themeColor}30, 0 25px 50px -12px rgba(0,0,0,0.85)` 
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  transform: isHighlighted ? 'translateY(-4px)' : 'translateY(0)',
                  background: isHighlighted 
                    ? `radial-gradient(120% 70% at 50% 0%, ${themeColor}15 0%, #0D0B0A 100%)` 
                    : '#0B0A09'
                }}
              >
                {/* Luminous Top Glow Edge */}
                <div 
                  className="absolute top-0 inset-x-0 h-[2.5px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                    opacity: isHighlighted ? 1 : 0
                  }}
                />

                <div>
                  {/* Top Row: Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div 
                      className="w-13 h-13 rounded-2xl flex items-center justify-center border transition-all duration-300"
                      style={{ 
                        backgroundColor: isHighlighted ? `${themeColor}20` : '#161310',
                        borderColor: isHighlighted ? themeColor : 'rgba(255,255,255,0.1)',
                        color: themeColor,
                        transform: isHighlighted ? 'scale(1.04)' : 'scale(1)'
                      }}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="h-6" /> {/* Balanced Spacer */}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-[28px] text-white font-normal mb-3">
                    Documents{' '}
                    <em 
                      className="font-serif italic font-normal transition-colors"
                      style={{ color: themeColor }}
                    >
                      only
                    </em>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed mb-6 min-h-[44px]">
                    IP transfer only. Full opportunity package and exclusive execution rights. You execute independently.
                  </p>

                  {/* Callout box: 50% of remaining */}
                  <div 
                    className="p-4 sm:p-5 rounded-2xl flex items-baseline gap-2.5 mb-6 transition-colors duration-300"
                    style={{
                      backgroundColor: '#070605',
                      border: isHighlighted ? `1px solid ${themeColor}40` : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <span 
                      className="font-serif italic text-3xl sm:text-4xl font-normal transition-colors leading-none"
                      style={{ color: themeColor }}
                    >
                      50%
                    </span>
                    <span className="text-xs font-mono text-neutral-400 tracking-wide">
                      of remaining
                    </span>
                  </div>

                  {/* Dotted Divider */}
                  <div className="border-t border-dashed border-white/10 my-6" />

                  {/* YOU RECEIVE section */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                      YOU RECEIVE
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span className="font-medium text-white">Full opportunity package</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span className="font-medium text-white">Exclusive execution rights</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-400">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500/70" />
                      <span>No further architect time</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-400">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500/70" />
                      <span>No advisory meetings</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Strip: YOU PAY TOTAL */}
                <div className="mt-8 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5.5 bg-[#070605] border-t border-white/10 flex items-baseline justify-between rounded-b-[26px]">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                    {!isArchitect ? 'YOU PAY TOTAL' : 'ARCHITECT NET PAYOUT (90%)'}
                  </span>
                  <div 
                    className="font-serif italic text-3xl sm:text-[38px] font-normal leading-none transition-colors"
                    style={{ color: themeColor }}
                  >
                    {curr.symbol}{(!isArchitect ? documentsPrice : Math.round(documentsPrice * 0.9)).toLocaleString()}
                  </div>
                </div>

              </div>
            );
          })()}

        </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. BUILT AROUND YOUR PROTECTION (WHY BUYERS LOVE IT)    */}
      {/* ======================================================== */}
      <section id="buyer-protection" className="py-16 sm:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              {!isArchitect ? 'WHY BUYERS LOVE IT' : 'WHY ARCHITECTS CHOOSE US'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.15rem] text-white font-normal tracking-tight leading-tight mb-4">
            {!isArchitect ? (
              <>
                Built around{' '}
                <em 
                  className="font-serif italic font-normal transition-colors duration-300"
                  style={{ color: themeColor }}
                >
                  your protection.
                </em>
              </>
            ) : (
              <>
                Built to{' '}
                <em 
                  className="font-serif italic font-normal text-emerald-400"
                >
                  reward your work.
                </em>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {!isArchitect
              ? "vvEntra's pricing structure exists to make buying low-risk. Every dollar is protected, every commitment is staged, every architect is verified."
              : "vvEntra's economic model exists so that real operators get paid fairly for the hard intellectual work of structuring opportunities."}
          </p>
        </div>

        {/* 6 Protection / Reward Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch text-left">
          {(!isArchitect
            ? [
                {
                  num: '01',
                  icon: Shield,
                  title: (
                    <>
                      Pay only for what you{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        actually use
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      Start with a <strong className="text-white font-medium">{curr.symbol}{unlockCost.toLocaleString()} unlock</strong> on a {curr.symbol}{currentPrice.toLocaleString()} listing. If you don't want to proceed, you stop there. No pressure, no obligation. Most serious buyers unlock 5-8 opportunities before choosing one.
                    </>
                  )
                },
                {
                  num: '02',
                  icon: Lock,
                  title: (
                    <>
                      Every dollar in{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        escrow
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      vvEntra holds every payment. <strong className="text-white font-medium">Funds release only after you approve milestones</strong> or after the 7-day inspection window. The architect can't disappear with your money.
                    </>
                  )
                },
                {
                  num: '03',
                  icon: CheckSquare,
                  title: (
                    <>
                      Three ways to{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        engage
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      After unlock, you pick from three clear paths: <strong className="text-white font-medium">Full Partnership</strong>, <strong className="text-white font-medium">Guidance</strong>, or <strong className="text-white font-medium">Documents Only</strong>. <em className="italic" style={{ color: themeColor }}>The price changes with the path.</em> The architect cannot decline your choice. You're in control.
                    </>
                  )
                },
                {
                  num: '04',
                  icon: Clock,
                  title: (
                    <>
                      Dispute window at{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        every stage
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      7-day inspection window after unlock. Weekly milestone approval during execution. <strong className="text-white font-medium">If something is wrong, you have time and tools to raise it</strong> before any money releases.
                    </>
                  )
                },
                {
                  num: '05',
                  icon: UserCheck,
                  title: (
                    <>
                      Architects are{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        verified
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      Every architect's identity, credentials, and bank are verified before they can list. <em className="italic" style={{ color: themeColor }}>Anonymous architects don't exist on vvEntra.</em> You always know exactly who you're working with.
                    </>
                  )
                },
                {
                  num: '06',
                  icon: AlertCircle,
                  title: (
                    <>
                      No{' '}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        hidden fees
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      What you see is what you pay. No subscription, no charge to browse, no listing access fees. <strong className="text-white font-medium">You pay exactly the price advertised on the listing</strong> — nothing more, nothing added at checkout.
                    </>
                  )
                }
              ]
            : [
                {
                  num: '01',
                  icon: DollarSign,
                  title: (
                    <>
                      Keep{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        90%
                      </em>{' '}
                      of every payment
                    </>
                  ),
                  body: (
                    <>
                      Flat 10% commission. No tiered fees. No hidden charges.{' '}
                      <strong className="text-white font-medium">
                        The simplest pricing in venture intelligence.
                      </strong>{' '}
                      On a $25,000 deal you take home $22,500.
                    </>
                  )
                },
                {
                  num: '02',
                  icon: TrendingUp,
                  title: (
                    <>
                      Earn at{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        every stage
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      You earn $2,250 on the unlock alone. Even if the buyer doesn't proceed further, the unlock is yours.{' '}
                      <em className="italic text-emerald-400">
                        Every meeting you take, every preview you share, you're being paid.
                      </em>
                    </>
                  )
                },
                {
                  num: '03',
                  icon: Calendar,
                  title: (
                    <>
                      Free to{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        list
                      </em>
                      , free to{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        maintain
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      No upfront cost to publish. No monthly subscription. No per-listing fees.{' '}
                      <strong className="text-white font-medium">
                        Zero financial risk to test the platform.
                      </strong>{' '}
                      You only pay when you earn.
                    </>
                  )
                },
                {
                  num: '04',
                  icon: Lock,
                  title: (
                    <>
                      Escrow{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        protects
                      </em>{' '}
                      you
                    </>
                  ),
                  body: (
                    <>
                      Buyers cannot disappear. Their full payment sits in vvEntra escrow before you start.{' '}
                      <strong className="text-white font-medium">
                        Milestone approval triggers release.
                      </strong>{' '}
                      If a buyer ghosts, milestones auto-approve after 5 days.
                    </>
                  )
                },
                {
                  num: '05',
                  icon: Target,
                  title: (
                    <>
                      Set{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        your own
                      </em>{' '}
                      price
                    </>
                  ),
                  body: (
                    <>
                      No platform-imposed pricing. You decide what your opportunity is worth.{' '}
                      <em className="italic text-emerald-400">
                        Higher prices reflect higher depth.
                      </em>{' '}
                      Top architects on the platform list at $7,000–$25,000.
                    </>
                  )
                },
                {
                  num: '06',
                  icon: CheckSquare,
                  title: (
                    <>
                      Payouts in{' '}
                      <em className="font-serif italic font-normal text-emerald-400">
                        7 days
                      </em>
                    </>
                  ),
                  body: (
                    <>
                      Funds release within 7 days of unlock or milestone approval. Bank transfer, Wise, Stripe, or Razorpay.{' '}
                      <strong className="text-white font-medium">
                        No payment delays beyond what the processor charges.
                      </strong>
                    </>
                  )
                }
              ]
          ).map((item, idx) => {
            const isHovered = hoveredProtectionIndex === idx;
            return (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredProtectionIndex(idx)}
                onMouseLeave={() => setHoveredProtectionIndex(null)}
                className="group rounded-[26px] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-default"
                style={{
                  border: isHovered 
                    ? `1.5px solid ${isArchitect ? '#16A34A' : themeColor}` 
                    : '1.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered 
                    ? `0 0 0 1px ${themeColor}25, 0 12px 35px -5px ${themeColor}30, 0 25px 50px -12px rgba(0,0,0,0.85)` 
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  background: isHovered 
                    ? `radial-gradient(120% 70% at 50% 0%, ${themeColor}12 0%, #0D0B0A 100%)` 
                    : '#0B0A09'
                }}
              >
                {/* Luminous Top Glow Edge */}
                <div 
                  className="absolute top-0 inset-x-0 h-[2.5px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                    opacity: isHovered ? 1 : 0
                  }}
                />

                <div>
                  {/* Top Row: Icon Badge + Serif Italic Numeral Watermark */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isArchitect 
                          ? 'bg-emerald-950/40 border-emerald-500/25 text-emerald-400' 
                          : 'bg-[#161310] border-white/10 text-orange-400'
                      }`}
                      style={
                        !isArchitect && isHovered
                          ? { backgroundColor: `${themeColor}20`, borderColor: themeColor, color: themeColor }
                          : undefined
                      }
                    >
                      <item.icon className="w-5 h-5" />
                    </div>

                    <span 
                      className="font-serif italic text-4xl sm:text-[46px] select-none font-normal transition-all duration-300"
                      style={{ 
                        color: isArchitect 
                          ? (isHovered ? '#10B981' : 'rgba(16, 185, 129, 0.32)') 
                          : (isHovered ? themeColor : 'rgba(255,255,255,0.18)'),
                        opacity: isHovered ? 1 : (isArchitect ? 0.8 : 0.5)
                      }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-[23px] text-white font-normal mb-3">
                    {item.title}
                  </h3>

                  {/* Body Content */}
                  <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHEN SOMETHING GOES WRONG (DISPUTES RESOLVE IN 5 DAYS) */}
      {/* ======================================================== */}
      <section id="disputes" className="py-16 sm:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Eyebrow & Headline */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span 
                className="w-4 h-[2px] transition-colors"
                style={{ backgroundColor: themeColor }}
              />
              <span 
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
                style={{ color: themeColor }}
              >
                WHEN SOMETHING GOES WRONG
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.15rem] text-white font-normal tracking-tight leading-tight mb-4">
              Disputes resolve in{' '}
              <em 
                className="font-serif italic font-normal transition-colors duration-300"
                style={{ color: themeColor }}
              >
                5 days.
              </em>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
              vvEntra moderation reviews disputes with platform-recorded evidence. Here's exactly how outcomes work, using a $9,450 Full Partnership deal as the example.
            </p>
          </div>

          {/* 2x2 Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch text-left">
            {[
              {
                id: 0,
                badge: 'BEST OUTCOME',
                badgeType: 'emerald',
                title: 'Deal completes ',
                accent: 'cleanly',
                description: 'Buyer approves all milestones (or auto-approval triggers after 5 days). Architect delivers. Money flows as expected.',
                borderColor: 'rgba(16, 185, 129, 0.35)',
                hoverBorderColor: 'rgba(16, 185, 129, 0.7)',
                hoverGlow: '0 0 30px rgba(16, 185, 129, 0.2)',
                topLineColor: '#10B981',
                row1Label: 'Architect earnings',
                row1Value: '$8,505',
                row1Color: 'text-emerald-400',
                row2Label: 'Buyer total spend',
                row2Value: '$10,500',
                row2Color: 'text-white'
              },
              {
                id: 1,
                badge: 'ARCHITECT GHOSTS',
                badgeType: 'rose',
                title: 'Architect ',
                accent: 'disengages',
                description: "Buyer files a dispute. Architect doesn't respond within moderation window. Buyer gets refund.",
                borderColor: 'rgba(244, 63, 94, 0.35)',
                hoverBorderColor: 'rgba(244, 63, 94, 0.7)',
                hoverGlow: '0 0 30px rgba(244, 63, 94, 0.2)',
                topLineColor: '#F43F5E',
                row1Label: 'Buyer refund',
                row1Value: '$8,505',
                row1Color: 'text-emerald-400',
                row2Label: 'Architect receives',
                row2Value: '$0',
                row2Color: 'text-rose-400'
              },
              {
                id: 2,
                badge: 'BUYER WINS DISPUTE',
                badgeType: 'emerald',
                title: 'Moderator favors the ',
                accent: 'buyer',
                description: "Both parties submit evidence. Moderator finds the buyer's complaint is valid. 60/40 split favoring the buyer.",
                borderColor: 'rgba(16, 185, 129, 0.35)',
                hoverBorderColor: 'rgba(16, 185, 129, 0.7)',
                hoverGlow: '0 0 30px rgba(16, 185, 129, 0.2)',
                topLineColor: '#10B981',
                row1Label: 'Buyer refund (60%)',
                row1Value: '$5,103',
                row1Color: 'text-emerald-400',
                row2Label: 'Architect receives (40%)',
                row2Value: '$3,402',
                row2Color: 'text-neutral-200'
              },
              {
                id: 3,
                badge: 'ARCHITECT WINS DISPUTE',
                badgeType: 'emerald',
                title: 'Moderator favors the ',
                accent: 'architect',
                description: "Both parties submit evidence. Moderator finds the architect delivered as promised. 60/40 split favoring the architect.",
                borderColor: 'rgba(16, 185, 129, 0.35)',
                hoverBorderColor: 'rgba(16, 185, 129, 0.7)',
                hoverGlow: '0 0 30px rgba(16, 185, 129, 0.2)',
                topLineColor: '#10B981',
                row1Label: 'Architect receives (60%)',
                row1Value: '$5,103',
                row1Color: 'text-emerald-400',
                row2Label: 'Buyer refund (40%)',
                row2Value: '$3,402',
                row2Color: 'text-neutral-200'
              }
            ].map((outcome) => {
              const isHovered = hoveredDisputeIndex === outcome.id;
              const isRose = outcome.badgeType === 'rose';
              return (
                <div
                  key={outcome.id}
                  onMouseEnter={() => setHoveredDisputeIndex(outcome.id)}
                  onMouseLeave={() => setHoveredDisputeIndex(null)}
                  className="rounded-[26px] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-default"
                  style={{
                    border: isHovered 
                      ? `1.5px solid ${outcome.hoverBorderColor}` 
                      : `1.5px solid ${outcome.borderColor}`,
                    boxShadow: isHovered 
                      ? `${outcome.hoverGlow}, 0 20px 45px -10px rgba(0,0,0,0.85)` 
                      : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    background: isHovered
                      ? `radial-gradient(120% 70% at 50% 0%, ${outcome.topLineColor}12 0%, #0D0B0A 100%)`
                      : '#0B0A09'
                  }}
                >
                  {/* Luminous Top Glow Edge */}
                  <div 
                    className="absolute top-0 inset-x-0 h-[2.5px] transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${outcome.topLineColor}, transparent)`,
                      opacity: isHovered ? 1 : 0.4
                    }}
                  />

                  <div>
                    {/* Badge Pill */}
                    <div className="mb-6">
                      <span 
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border ${
                          isRose 
                            ? 'bg-rose-950/40 border-rose-500/30 text-rose-400' 
                            : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isRose ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                        <span>{outcome.badge}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-[26px] text-white font-normal mb-3">
                      {outcome.title}
                      <em 
                        className="font-serif italic font-normal transition-colors"
                        style={{ color: themeColor }}
                      >
                        {outcome.accent}
                      </em>
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed min-h-[40px]">
                      {outcome.description}
                    </p>
                  </div>

                  {/* Financial Breakdown Box */}
                  <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#070605] border border-white/[0.08] space-y-3 font-mono text-xs sm:text-[13px]">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>{outcome.row1Label}</span>
                      <span className={`${outcome.row1Color} font-semibold font-mono`}>
                        {outcome.row1Value}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-white/10" />

                    <div className="flex items-center justify-between text-neutral-400">
                      <span>{outcome.row2Label}</span>
                      <span className={`${outcome.row2Color} font-semibold font-mono`}>
                        {outcome.row2Value}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Footnote note */}
          <div className="text-center mt-12 sm:mt-14">
            <p className="text-xs sm:text-[13px] font-mono text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              All disputes are handled by vvEntra moderation. Either party can request senior moderator review within 7 days of an initial decision.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. THE FINE PRINT, IN PLAIN ENGLISH (EXPANDABLE RULES)    */}
      {/* ======================================================== */}
      <section id="fine-print" className="py-16 sm:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Eyebrow & Headline */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span 
                className="w-4 h-[2px] transition-colors"
                style={{ backgroundColor: themeColor }}
              />
              <span 
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
                style={{ color: themeColor }}
              >
                IMPORTANT RULES · CLICK TO EXPAND
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3.15rem] text-white font-normal tracking-tight leading-tight mb-4 text-center">
              The fine print,{' '}
              <em 
                className="font-serif italic font-normal transition-colors duration-300"
                style={{ color: themeColor }}
              >
                in plain English.
              </em>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto text-center">
              The rules that turn a marketplace into a serious platform. Tap any rule to read the detail.
            </p>
          </div>

          {/* Expandable Accordion List */}
          <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4 text-left">
            {[
              {
                id: 0,
                prefix: 'Architects ',
                highlight: 'cannot decline',
                suffix: " a buyer's chosen path",
                answer: (
                  <>
                    By listing on vvEntra, the architect agrees to honor all three paths — Full Partnership, Guidance, and Documents Only. The buyer picks; the architect delivers.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      This prevents bait-and-switch.
                    </em>{' '}
                    If you don't want to offer Documents Only deals, don't list on vvEntra.
                  </>
                )
              },
              {
                id: 1,
                prefix: 'No ',
                highlight: 'custom negotiation',
                suffix: ' outside the three paths',
                answer: (
                  <>
                    Pricing formulas and scope tiers are strictly standardized. Neither party may negotiate private off-market carve-outs, side commissions, or bespoke milestones outside the three designated paths.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      This guarantees deterministic legal enforceability
                    </em>{' '}
                    under Delaware escrow law and eliminates ambiguity during milestone disputes.
                  </>
                )
              },
              {
                id: 2,
                prefix: 'The ',
                highlight: 'unlock fee',
                suffix: ' is non-refundable if you proceed',
                answer: (
                  <>
                    The initial 10% unlock fee compensates the architect for their time, diligence materials, and private strategy disclosure.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      If you proceed to Stage 2, 100% of this fee applies toward your total engagement spend.
                    </em>{' '}
                    If you choose not to proceed after diligence, the fee is retained by the architect for IP disclosure.
                  </>
                )
              },
              {
                id: 3,
                prefix: 'Buyers can ',
                highlight: 'dispute the unlock',
                suffix: ' if misled',
                answer: (
                  <>
                    If the public teaser materially misrepresented the opportunity — such as falsified codebase ownership, fabricated revenue figures, or undisclosed litigation —{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      buyers have 7 days post-unlock to lodge an evidentiary claim.
                    </em>{' '}
                    Validated misrepresentation triggers an immediate 100% refund of the unlock fee.
                  </>
                )
              },
              {
                id: 4,
                prefix: 'All deal communications happen ',
                highlight: 'on vvEntra',
                suffix: '',
                answer: (
                  <>
                    All messaging, code sharing, diligence checklists, and milestone approvals must be executed exclusively inside the vvEntra deal room.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      Communications conducted via external channels (Slack, WhatsApp, personal email) are inadmissible
                    </em>{' '}
                    during formal arbitration or milestone dispute hearings.
                  </>
                )
              },
              {
                id: 5,
                prefix: 'Milestones ',
                highlight: 'auto-approve',
                suffix: ' after 5 days',
                answer: (
                  <>
                    When an architect submits milestone deliverables for review, the buyer receives immediate notification.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      If the buyer neither approves nor raises a formal dispute within 5 business days
                    </em>
                    , the platform triggers automatic milestone approval and releases that tranche of escrow funds.
                  </>
                )
              },
              {
                id: 6,
                prefix: 'Senior moderator ',
                highlight: 'appeals',
                suffix: ' are available',
                answer: (
                  <>
                    If either party believes a primary dispute decision overlooked material evidence, an appeal may be escalated to a senior legal moderator within 7 business days.{' '}
                    <em className="italic transition-colors" style={{ color: themeColor }}>
                      Senior reviews involve senior partner-level arbitration
                    </em>{' '}
                    with complete platform audit trails and binding finality.
                  </>
                )
              }
            ].map((rule) => {
              const isOpen = expandedFinePrint === rule.id;
              return (
                <div
                  key={rule.id}
                  onClick={() => setExpandedFinePrint(isOpen ? null : rule.id)}
                  className="rounded-[20px] sm:rounded-[22px] p-5 sm:p-6 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
                  style={{
                    backgroundColor: '#0B0A09',
                    border: isOpen 
                      ? `1.5px solid ${themeColor}` 
                      : '1.5px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isOpen 
                      ? `0 0 25px ${themeColor}22, 0 12px 30px rgba(0,0,0,0.6)` 
                      : '0 4px 15px rgba(0,0,0,0.3)',
                    transform: isOpen ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {/* Subtle top edge glow on active */}
                  {isOpen && (
                    <div 
                      className="absolute top-0 inset-x-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`
                      }}
                    />
                  )}

                  {/* Header Row: Question Title & Expand Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-lg sm:text-[21px] text-white font-normal leading-snug">
                      {rule.prefix}
                      <em 
                        className="font-serif italic font-normal transition-colors"
                        style={{ color: themeColor }}
                      >
                        {rule.highlight}
                      </em>
                      {rule.suffix}
                    </h3>

                    {/* Circular Plus / X Toggle Button */}
                    <button
                      type="button"
                      aria-label={isOpen ? "Collapse rule" : "Expand rule"}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: isOpen ? `${themeColor}15` : 'transparent',
                        borderColor: isOpen ? themeColor : 'rgba(255, 255, 255, 0.18)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: isOpen ? themeColor : 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {isOpen ? (
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Content Area */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-white/[0.08] text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed animate-fade-in">
                      <p>{rule.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. CLOSING CTA: START WITH A SINGLE UNLOCK (ABOVE FOOTER) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#070605] text-center relative overflow-hidden border-t border-[var(--line)]">
        {/* Ambient atmospheric glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] blur-[150px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Eyebrow: — READY TO MOVE */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              READY TO MOVE
            </span>
          </div>

          {/* Headline: Start with a single unlock. */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-white tracking-tight leading-[1.15] mb-5 sm:mb-6 max-w-2xl mx-auto">
            Start with a{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              single unlock.
            </em>
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed font-normal mb-8 sm:mb-10 text-center">
            {!isArchitect ? (
              <>
                Browse the marketplace, find an opportunity that matches your thesis, unlock for a small fee, meet the architect.{' '}
                <em className="italic text-neutral-300">You're never locked in.</em>
              </>
            ) : (
              <>
                List your proven business architecture, set your terms, unlock with serious buyers, and retain 90% net payout.{' '}
                <em className="italic text-neutral-300">You're always in control.</em>
              </>
            )}
          </p>

          {/* 3 Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Filled CTA */}
            <button
              onClick={() => {
                setActiveRoute('#opportunities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 4px 20px ${themeColor}40`
              }}
            >
              <span>{!isArchitect ? 'Start as Buyer →' : 'Start as Architect →'}</span>
            </button>

            {/* Secondary Outline CTA: Read trust policy */}
            <button
              onClick={() => {
                setActiveRoute('#trust');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-neutral-300 hover:text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer text-center"
            >
              Read trust policy
            </button>

            {/* Tertiary Outline CTA: View FAQ */}
            <button
              onClick={() => {
                setActiveRoute('#terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-neutral-300 hover:text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer text-center"
            >
              View FAQ
            </button>
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
