import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  FileText, 
  Layers, 
  Bookmark, 
  Search, 
  ArrowUpDown, 
  Sparkles, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';

interface OpportunityCardItem {
  id: string;
  code: string;
  badge: string;
  badgeType: 'validated' | 'execution' | 'growth' | 'demand';
  sectorTags: string[];
  category: 'E-Commerce' | 'SaaS' | 'Fintech' | 'Professional Services' | 'Marketplace';
  title: string;
  description: string;
  capitalRange: string;
  timeToLaunch: string;
  architectName: string;
  architectRole: string;
  architectTrust: number;
  unlockPrice: number;
  pages: number;
  frameworks: number;
  finModels: number;
  buyerDemandCount: number;
  demandTrend: 'up' | 'hot' | 'new';
  architectNote: string;
}

const OPPORTUNITIES_DATA: OpportunityCardItem[] = [
  {
    id: 'opp-1',
    code: 'VVE-9102',
    badge: 'VALIDATED THESIS',
    badgeType: 'validated',
    sectorTags: ['B2B SAAS', 'FINTECH'],
    category: 'Fintech',
    title: 'Compliance Copilot for Mid-Market Fintechs',
    description: 'An embedded compliance review engine that compresses 14-day vendor reviews into a 36-hour structured workflow, validated with nine design partners and pre-configured for regulatory banking audit standards.',
    capitalRange: '$42K – $68K',
    timeToLaunch: '5–7 months',
    architectName: 'Verified Architect',
    architectRole: 'Ex-Fintech General Counsel & Risk Lead',
    architectTrust: 91,
    unlockPrice: 4200,
    pages: 134,
    frameworks: 9,
    finModels: 4,
    buyerDemandCount: 16,
    demandTrend: 'hot',
    architectNote: 'Authored 3 compliance architectures adopted by top mid-market neobanks. Includes complete audit cross-references.',
  },
  {
    id: 'opp-2',
    code: 'VVE-9104',
    badge: 'EXECUTION-READY',
    badgeType: 'execution',
    sectorTags: ['FINTECH', 'B2B'],
    category: 'Fintech',
    title: 'Embedded Treasury Management for SMB Platforms',
    description: 'A white-label treasury and yield layer that vertical SaaS platforms can embed to monetise idle customer balances, with full compliance scaffolding and pre-negotiated depository bank rails.',
    capitalRange: '$50K – $90K',
    timeToLaunch: '6–8 months',
    architectName: 'Verified Architect',
    architectRole: 'Ex-Payments & Core Banking Infrastructure Lead',
    architectTrust: 88,
    unlockPrice: 5000,
    pages: 152,
    frameworks: 11,
    finModels: 5,
    buyerDemandCount: 22,
    demandTrend: 'up',
    architectNote: 'Direct API schematics and revenue share model templates built for vertical SaaS platforms generating >$50M GMV.',
  },
  {
    id: 'opp-3',
    code: 'VVE-9106',
    badge: 'GROWTH PLAYBOOK',
    badgeType: 'growth',
    sectorTags: ['E-COMMERCE', 'CONSUMER'],
    category: 'E-Commerce',
    title: 'Omnichannel D2C Clean Health & Botanical Brand',
    description: 'Proprietary botanical formulations supply chain and high-velocity quick commerce distribution model targeting Tier 1 & Tier 2 health-conscious demographics with 48% gross contribution margins.',
    capitalRange: '$65K – $110K',
    timeToLaunch: '4–6 months',
    architectName: 'Verified Architect',
    architectRole: '2x D2C Consumer Brand Founder & Exit',
    architectTrust: 94,
    unlockPrice: 4800,
    pages: 128,
    frameworks: 8,
    finModels: 4,
    buyerDemandCount: 19,
    demandTrend: 'hot',
    architectNote: 'Includes full supplier audit dossiers, certified vendor pricing contracts, and multi-channel quick-commerce playbooks.',
  },
  {
    id: 'opp-4',
    code: 'VVE-9108',
    badge: 'HIGH DEMAND',
    badgeType: 'demand',
    sectorTags: ['B2B SAAS', 'AI AGENTS'],
    category: 'SaaS',
    title: 'Autonomous Legal AI Agents for Enterprise Procurement',
    description: 'Multi-agent contract negotiation and redlining engine for enterprise vendor onboarding, cutting legal turnaround from 3 weeks to 48 hours with human-in-the-loop governance guarantees.',
    capitalRange: '$35K – $60K',
    timeToLaunch: '3–5 months',
    architectName: 'Verified Architect',
    architectRole: 'Former Principal AI Architect (Enterprise LegalTech)',
    architectTrust: 96,
    unlockPrice: 5800,
    pages: 118,
    frameworks: 10,
    finModels: 3,
    buyerDemandCount: 28,
    demandTrend: 'hot',
    architectNote: 'Benchmarked across 45,000 procurement agreements. 98.4% clause consistency with leading international law firm standards.',
  },
  {
    id: 'opp-5',
    code: 'VVE-9110',
    badge: 'INSTITUTIONAL GRADE',
    badgeType: 'execution',
    sectorTags: ['MARKETPLACE', 'LOGISTICS'],
    category: 'Marketplace',
    title: 'Cross-Border Freight Settlement & Working Capital Rails',
    description: 'Smart escrow payment and invoice discounting rails connecting Southeast Asian freight forwarders to non-bank trade finance liquidity pools with real-time bill-of-lading verification.',
    capitalRange: '$80K – $140K',
    timeToLaunch: '7–9 months',
    architectName: 'Verified Architect',
    architectRole: 'Ex-Global Logistics Fintech Product Director',
    architectTrust: 89,
    unlockPrice: 6500,
    pages: 164,
    frameworks: 12,
    finModels: 6,
    buyerDemandCount: 14,
    demandTrend: 'up',
    architectNote: 'Validated across Singapore, Mumbai, and Dubai trade lanes with bilateral legal framework and non-recourse risk models.',
  },
  {
    id: 'opp-6',
    code: 'VVE-9112',
    badge: 'UNDERSERVED GAP',
    badgeType: 'validated',
    sectorTags: ['PROFESSIONAL SERVICES', 'HEALTHCARE'],
    category: 'Professional Services',
    title: 'Specialty Diagnostics Hub-and-Spoke Network Infrastructure',
    description: 'Asset-light diagnostic pathology network with standardized quality protocols and remote radiology reporting for underserved non-metro medical clusters with verified corporate anchor demand.',
    capitalRange: '$55K – $95K',
    timeToLaunch: '6–8 months',
    architectName: 'Verified Architect',
    architectRole: 'Senior Healthcare Operations Executive',
    architectTrust: 92,
    unlockPrice: 7400,
    pages: 146,
    frameworks: 9,
    finModels: 5,
    buyerDemandCount: 18,
    demandTrend: 'new',
    architectNote: 'Includes full regulatory licensing roadmap across 3 state jurisdictions and pre-structured lab franchising contracts.',
  },
];

type CategoryFilter = 'All' | 'E-Commerce' | 'SaaS' | 'Fintech' | 'Professional Services' | 'Marketplace';
type SortOption = 'trust' | 'price-asc' | 'price-desc' | 'launch' | 'demand';

export const OpportunitiesPage: React.FC = () => {
  const { 
    role, 
    openNdaModal, 
    savedOpportunities, 
    toggleSaveOpportunity, 
    addToast,
    stage
  } = useApp();

  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('trust');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: 'All', count: OPPORTUNITIES_DATA.length },
    { label: 'E-Commerce', count: OPPORTUNITIES_DATA.filter(o => o.category === 'E-Commerce').length },
    { label: 'SaaS', count: OPPORTUNITIES_DATA.filter(o => o.category === 'SaaS').length },
    { label: 'Fintech', count: OPPORTUNITIES_DATA.filter(o => o.category === 'Fintech').length },
    { label: 'Professional Services', count: OPPORTUNITIES_DATA.filter(o => o.category === 'Professional Services').length },
    { label: 'Marketplace', count: OPPORTUNITIES_DATA.filter(o => o.category === 'Marketplace').length },
  ];

  const filteredOpportunities = useMemo(() => {
    let result = OPPORTUNITIES_DATA.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = 
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sectorTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    switch (sortBy) {
      case 'trust':
        result.sort((a, b) => b.architectTrust - a.architectTrust);
        break;
      case 'price-asc':
        result.sort((a, b) => a.unlockPrice - b.unlockPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.unlockPrice - a.unlockPrice);
        break;
      case 'demand':
        result.sort((a, b) => b.buyerDemandCount - a.buyerDemandCount);
        break;
      case 'launch':
        result.sort((a, b) => parseInt(a.timeToLaunch) - parseInt(b.timeToLaunch));
        break;
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  const handleCardClick = (opp: OpportunityCardItem) => {
    openNdaModal({
      id: opp.code,
      code: opp.code,
      category: opp.category,
      tag: opp.sectorTags[0],
      demandTag: `${opp.architectTrust} Trust Score`,
      demandTrend: opp.demandTrend,
      title: opp.title,
      blurredPart: 'confidential financial models, architecture specs, and execution roadmaps',
      description: opp.description,
      pages: opp.pages,
      frameworks: opp.frameworks,
      finModels: opp.finModels,
      architectRole: opp.architectRole,
      architectNote: opp.architectNote,
      unlockPrice: opp.unlockPrice,
      status: 'locked',
    });
  };

  return (
    <div className="w-full text-white select-none pb-28 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. TOP TICKER STRIP (Matching Image Top Strip) */}
      {/* ======================================================== */}
      <div className="w-full bg-[#0D0B0A] border-b border-white/10 text-[11px] sm:text-xs font-mono py-2.5 px-4 overflow-hidden relative">
        <div className="max-w-[1420px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span 
              className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-white flex items-center gap-1.5"
              style={{ backgroundColor: themeColor }}
            >
              <span>MARKETPLACE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <div className="overflow-hidden whitespace-nowrap flex-1 text-neutral-400 text-[11px] sm:text-[12px] flex items-center gap-4 sm:gap-8">
            <span className="text-neutral-200 font-medium">{OPPORTUNITIES_DATA.length} opportunities live</span>
            <span className="text-neutral-500">•</span>
            <span>Verified and documentation-reviewed</span>
            <span className="text-neutral-500">•</span>
            <span className="flex items-center gap-1 text-neutral-300">
              <span style={{ color: themeColor }}>▲</span> Browse freely · Unlock only what earns your attention
            </span>
            <span className="text-neutral-500">•</span>
            <span>Every listing carries a trust score and verified architect</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300">Delaware escrow custody SLA guarantee</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO HEADLINE (Exact Image Copy & Typography) */}
      {/* ======================================================== */}
      <section className="relative pt-12 sm:pt-18 pb-10 sm:pb-12 text-center max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle radial ambient glow behind title */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[280px] blur-[140px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.75rem] font-normal text-white tracking-tight leading-[1.12] mb-4 sm:mb-5">
            Curated opportunities,{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              structured for serious
              <br className="hidden sm:inline" /> capital.
            </em>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
            Every opportunity below has been verified, documentation-reviewed, and structured to
            vvEntra's standard. Browse freely. Unlock only what earns your attention.
          </p>

          {/* Perspective Indicator Banner */}
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100E] border border-white/10 text-[11px] font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
            <span>Active Perspective:</span>
            <span className="font-semibold text-white uppercase">
              {isArchitect ? 'As Architect (Demand Signals & Gaps)' : 'As Investor (Dossiers & Opportunities)'}
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FILTER PILLS & SORT TOOLBAR (Matching User Image Exact) */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          
          {/* Category Filter Pills (Matching Image) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:translate-y-[1px] ${
                    isActive
                      ? isArchitect
                        ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] text-white font-semibold border border-[#86EFAC]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_0_#0E622B,0_4px_12px_rgba(22,163,74,0.4)]'
                        : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] text-white font-semibold border border-[#FDBA74]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_0_#9A3412,0_4px_12px_rgba(234,88,12,0.4)]'
                      : 'bg-[#12100E] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Count & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {/* Live Count Indicator */}
            <span className="font-mono text-xs text-neutral-400 tracking-wide">
              {filteredOpportunities.length} opportunities
            </span>

            {/* Custom Sort Select Menu */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort opportunities"
                className="appearance-none bg-[#12100E] border border-white/15 hover:border-white/30 text-white text-xs sm:text-sm font-medium rounded-xl px-4 py-2 pr-9 cursor-pointer transition-colors focus:outline-none focus:border-white/40"
              >
                <option value="trust">Sort: Trust score</option>
                <option value="demand">Sort: Buyer demand</option>
                <option value="price-asc">Sort: Unlock fee (Low to High)</option>
                <option value="price-desc">Sort: Unlock fee (High to Low)</option>
                <option value="launch">Sort: Time to launch (Fastest)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OPPORTUNITY CARDS 2-COLUMN GRID (Matching Image Layout) */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {filteredOpportunities.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0D0B0A] border border-white/10">
            <p className="text-neutral-400 text-sm">No opportunities match your filter.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: themeColor }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {filteredOpportunities.map((opp) => {
              const isSaved = savedOpportunities.includes(opp.id);
              
              return (
                <div
                  key={opp.id}
                  onClick={() => handleCardClick(opp)}
                  className={`rounded-2xl p-6 sm:p-8 bg-[#0D0B0A] border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-xl ${
                    isArchitect
                      ? 'border-white/10 hover:border-[#16A34A]/50 hover:shadow-[0_8px_30px_rgba(22,163,74,0.14)]'
                      : 'border-white/10 hover:border-[#E2571B]/50 hover:shadow-[0_8px_30px_rgba(226,87,27,0.14)]'
                  }`}
                >
                  
                  {/* Subtle hover gradient sheen */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${themeColor}12 0%, transparent 60%)`
                    }}
                  />

                  {/* Top Badges & Availability Status Row (Matching Image Exact) */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      
                      {/* Left: Status Badge & Sector Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Main Thesis Badge */}
                        <span 
                          className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border"
                          style={{
                            backgroundColor: opp.badgeType === 'validated' || isArchitect
                              ? 'rgba(22, 163, 74, 0.15)'
                              : 'rgba(226, 87, 27, 0.15)',
                            borderColor: opp.badgeType === 'validated' || isArchitect
                              ? 'rgba(22, 163, 74, 0.35)'
                              : 'rgba(226, 87, 27, 0.35)',
                            color: opp.badgeType === 'validated' || isArchitect
                              ? '#4ADE80'
                              : '#FB923C'
                          }}
                        >
                          {opp.badge}
                        </span>

                        {/* Sector Tags (e.g. B2B SAAS, FINTECH) */}
                        {opp.sectorTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-neutral-300 bg-[#161311] border border-white/10 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Right: Live Available Status Dot */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                          <span>AVAILABLE</span>
                        </span>

                        {/* Bookmark Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveOpportunity(opp.id);
                          }}
                          className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                            isSaved
                              ? 'border-white/30 text-white bg-white/10'
                              : 'border-transparent text-neutral-500 hover:text-white hover:border-white/15'
                          }`}
                          title={isSaved ? 'Saved to watchlist' : 'Save opportunity'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} style={isSaved ? { color: themeColor } : {}} />
                        </button>
                      </div>

                    </div>

                    {/* Card Title (Matching Serif Typography) */}
                    <h2 className="font-serif text-2xl sm:text-[1.75rem] text-white font-normal tracking-tight leading-snug mb-3.5 group-hover:text-neutral-100 transition-colors">
                      {opp.title}
                    </h2>

                    {/* Card Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-7 line-clamp-3">
                      {opp.description}
                    </p>

                    {/* Architect Perspective Intel Badge (Shows when As Architect is active) */}
                    {isArchitect && (
                      <div className="mb-6 p-3 rounded-xl bg-[#121813] border border-[#16A34A]/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-green-300 font-mono text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>{opp.buyerDemandCount} Active Institutional Buyer Searches</span>
                        </div>
                        <span className="font-mono text-[10px] text-green-400 uppercase tracking-wider">
                          Supply Gap: Low
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Area: Metrics & Footer */}
                  <div>
                    {/* Dashed Separator Line */}
                    <div className="border-t border-dashed border-white/15 my-5" />

                    {/* Capital & Time to Launch Metrics Row (Matching Image) */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-1 font-medium">
                          CAPITAL
                        </div>
                        <div className="font-serif text-base sm:text-lg text-white font-normal tracking-tight">
                          {opp.capitalRange}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-1 font-medium">
                          TIME TO LAUNCH
                        </div>
                        <div className="font-serif text-base sm:text-lg text-white font-normal tracking-tight">
                          {opp.timeToLaunch}
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Architect Avatar & Trust Score + Unlock Price (Matching Image) */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      
                      {/* Left: Architect Badge with Avatar Initial 'A' */}
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-9 h-9 rounded-full flex items-center justify-center font-serif italic text-base border"
                          style={{
                            backgroundColor: `${themeColor}15`,
                            borderColor: `${themeColor}40`,
                            color: themeColor
                          }}
                        >
                          A
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs sm:text-[13px] text-white font-medium">
                            {opp.architectName}
                          </span>
                          <span className="text-[10.5px] font-mono text-neutral-400">
                            Trust {opp.architectTrust}
                          </span>
                        </div>
                      </div>

                      {/* Right: Large Italic Serif Unlock Price */}
                      <div className="flex flex-col items-end text-right">
                        <div 
                          className="font-serif italic text-2xl sm:text-3xl font-normal leading-none transition-colors duration-300"
                          style={{ color: themeColor }}
                        >
                          ${opp.unlockPrice.toLocaleString()}
                        </div>
                        <div className="text-[9.5px] font-mono uppercase tracking-widest text-neutral-500 mt-1 font-semibold">
                          TO UNLOCK
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 5. BOTTOM ESCROW ASSURANCE DOCK */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="p-7 sm:p-9 rounded-2xl bg-[#0D0B0A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${themeColor}15`,
                borderColor: `${themeColor}40`,
                color: themeColor
              }}
            >
              <ShieldCheck className="w-6 h-6" style={{ color: themeColor }} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Transacting on vvEntra Private Exchange
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl font-normal leading-relaxed">
                All dossiers are protected by mutual bilateral NDAs, 7-day milestone inspection escrow custody, and Delaware legal jurisdiction guarantees.
              </p>
            </div>
          </div>

          <button
            onClick={() => addToast('Opening Institutional Verification Protocol.', 'info')}
            className={`relative group cursor-pointer select-none rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white tracking-wide transition-all duration-200 shrink-0 whitespace-nowrap active:translate-y-[2px] ${
              isArchitect
                ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3px_0_#0E622B,0_6px_16px_rgba(22,163,74,0.4)]'
                : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3px_0_#9A3412,0_6px_16px_rgba(234,88,12,0.4)]'
            }`}
          >
            Apply for Institutional Clearance
          </button>
        </div>
      </section>

    </div>
  );
};
