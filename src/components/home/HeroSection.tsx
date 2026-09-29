import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, Plus, ChevronDown, Check } from 'lucide-react';

const SECTOR_OPTIONS = [
  { id: 'all', label: 'All sectors' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'saas', label: 'SaaS & B2B' },
  { id: 'fintech', label: 'Fintech & SMB' },
  { id: 'climate', label: 'Climate Tech' },
  { id: 'health', label: 'HealthTech' },
];

export const HeroSection: React.FC = () => {
  const {
    role,
    setRole,
    searchQuery,
    setSearchQuery,
    addToast,
  } = useApp();

  const [activeTimeframe, setActiveTimeframe] = useState<'7-day' | '30-day' | 'Quarterly'>('30-day');
  const [activeSectorPill, setActiveSectorPill] = useState<string>('All sectors');
  const [localInput, setLocalInput] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const sectorDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectorDropdownRef.current && !sectorDropdownRef.current.contains(event.target as Node)) {
        setIsSectorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localInput);
    if (localInput.trim()) {
      addToast(`Showing results for "${localInput}"`, 'info');
      const el = document.getElementById('opportunities');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-3 sm:pt-6 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================== */}
        {/* TOP HERO & PERSPECTIVE SWITCHER */}
        {/* ============================================== */}
        <div className="flex flex-col items-center text-center max-w-[840px] lg:max-w-none mx-auto pt-1 sm:pt-2 pb-6 sm:pb-8">
          
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase mb-3 sm:mb-4 font-semibold transition-colors duration-300 ${
              role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-300 ${
                role === 'architect' ? 'bg-[#16A34A]' : 'bg-[#E2571B]'
              }`}
            />
            <span>INTELLIGENCE TERMINAL · LIVE DATA</span>
          </div>

          {/* Headline - Single line on desktop, clean 2-line break on mobile */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-medium tracking-tight text-[var(--text)] leading-[1.18] sm:leading-[1.15] mb-3 sm:mb-4 lg:whitespace-nowrap px-1">
            View the market{' '}
            <em
              className={`font-serif italic font-normal transition-colors duration-300 ${
                role === 'architect' ? 'text-[#16A34A]' : 'text-[#E2571B]'
              }`}
            >
              through your lens.
            </em>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            Same market data, two perspectives.{' '}
            <em
              className={`font-serif italic font-normal transition-colors duration-300 ${
                role === 'investor' ? 'text-[#E2571B]' : 'text-[#16A34A]'
              }`}
            >
              Choose how you want to see it.
            </em>{' '}
            Switch any time, your preference is saved.
          </p>

          {/* 3D Dual Perspective Switcher - Recessed Milled Chamber & 3D Tactile Pills */}
          <div
            className={`w-full max-w-[480px] sm:max-w-[520px] p-1.5 sm:p-2 rounded-full bg-[#0B0908] border transition-all duration-300 relative mb-6 sm:mb-9 flex items-center justify-between gap-1.5 sm:gap-2 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),inset_0_-1px_1px_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.6)] ${
              role === 'investor'
                ? 'border-[#E2571B]/40 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_35px_rgba(226,87,27,0.18)] ring-1 ring-[#E2571B]/20'
                : 'border-[#16A34A]/40 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_35px_rgba(22,163,74,0.18)] ring-1 ring-[#16A34A]/20'
            }`}
          >
            
            {/* As Investor 3D Button */}
            <button
              onClick={() => {
                if (role !== 'investor') {
                  setRole('investor');
                  addToast('Switched to Investor perspective · Exploring verified dossiers & deal flow.', 'info');
                }
              }}
              className={`relative flex-1 min-w-0 flex items-center justify-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 cursor-pointer select-none active:translate-y-[2px] ${
                role === 'investor'
                  ? 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] text-white border border-[#FDBA74]/60 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3.5px_0_#9A3412,0_8px_20px_rgba(234,88,12,0.45)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.85),0_4.5px_0_#9A3412,0_10px_24px_rgba(234,88,12,0.55)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#9A3412,0_3px_8px_rgba(234,88,12,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 hover:-translate-y-[0.5px]'
              }`}
            >
              {/* Icon Container with Micro-Badge Glow */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  role === 'investor'
                    ? 'bg-black/25 border border-white/35 shadow-inner text-white'
                    : 'bg-white/5 border border-white/10 text-neutral-400'
                }`}
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                </svg>
              </div>

              <div className="flex flex-col items-start text-left min-w-0 relative z-10">
                <span className={`text-xs sm:text-[15px] font-bold tracking-tight leading-tight truncate w-full ${
                  role === 'investor' ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : 'text-neutral-300'
                }`}>
                  As Investor
                </span>
                <span className={`text-[8.5px] sm:text-[10px] font-mono tracking-tight sm:tracking-widest uppercase mt-0.5 leading-none truncate w-full ${
                  role === 'investor' ? 'text-white/95 font-semibold drop-shadow-xs' : 'text-neutral-500'
                }`}>
                  <span className="sm:hidden">OPPORTUNITIES</span>
                  <span className="hidden sm:inline">FIND OPPORTUNITIES</span>
                </span>
              </div>
            </button>

            {/* As Architect 3D Button */}
            <button
              onClick={() => {
                if (role !== 'architect') {
                  setRole('architect');
                  addToast('Perspective switched to Architect · Exploring buyer demand & market signals.', 'info');
                }
              }}
              className={`relative flex-1 min-w-0 flex items-center justify-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 cursor-pointer select-none active:translate-y-[2px] ${
                role === 'architect'
                  ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] text-white border border-[#86EFAC]/60 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3.5px_0_#0E622B,0_8px_20px_rgba(22,163,74,0.45)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.85),0_4.5px_0_#0E622B,0_10px_24px_rgba(22,163,74,0.55)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#0E622B,0_3px_8px_rgba(22,163,74,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 hover:-translate-y-[0.5px]'
              }`}
            >
              {/* Icon Container with Micro-Badge Glow */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  role === 'architect'
                    ? 'bg-black/25 border border-white/35 shadow-inner text-white'
                    : 'bg-white/5 border border-white/10 text-neutral-400'
                }`}
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18M5 3v10a7 7 0 0 0 14 0V3" />
                  <circle cx="12" cy="20" r="1.5" />
                </svg>
              </div>

              <div className="flex flex-col items-start text-left min-w-0 relative z-10">
                <span className={`text-xs sm:text-[15px] font-bold tracking-tight leading-tight truncate w-full ${
                  role === 'architect' ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : 'text-neutral-300'
                }`}>
                  As Architect
                </span>
                <span className={`text-[8.5px] sm:text-[10px] font-mono tracking-tight sm:tracking-widest uppercase mt-0.5 leading-none truncate w-full ${
                  role === 'architect' ? 'text-white/95 font-semibold drop-shadow-xs' : 'text-neutral-500'
                }`}>
                  <span className="sm:hidden">DEMAND</span>
                  <span className="hidden sm:inline">FIND DEMAND</span>
                </span>
              </div>
            </button>
          </div>

          {/* Integrated Search Bar - Optimized for mobile viewports */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl sm:max-w-3xl bg-[var(--bg-paper)] border sm:border-2 border-[var(--line-strong)] rounded-full p-1.5 sm:p-2.5 shadow-xl flex items-center gap-1.5 sm:gap-3 transition-all duration-200 focus-within:border-[var(--role)] focus-within:ring-4 focus-within:ring-[var(--role)]/20"
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 px-2.5 sm:px-4 min-w-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-faint)] shrink-0" />
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Search sectors, models, or dossiers..."
                className="w-full bg-transparent text-xs sm:text-base text-[var(--text)] placeholder-[var(--text-faint)] outline-none py-1 sm:py-1.5 font-sans truncate"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pr-1">
              
              {/* Custom Dark Sector Dropdown - Fixes white box issue */}
              <div className="relative hidden md:block" ref={sectorDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsSectorDropdownOpen(!isSectorDropdownOpen)}
                  aria-label="Filter sector"
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)] hover:text-white outline-none cursor-pointer py-1.5 px-3 font-medium border-l border-[var(--line-strong)] pl-3.5 transition-colors select-none"
                >
                  <span className="truncate max-w-[125px]">
                    {SECTOR_OPTIONS.find((s) => s.id === selectedCategory)?.label || 'All sectors'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                      isSectorDropdownOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Floating Menu with Dark Premium Style */}
                {isSectorDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-3 w-52 py-1.5 bg-[#14110E] border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50 text-left animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold border-b border-white/5 mb-1">
                      Filter Sector
                    </div>
                    {SECTOR_OPTIONS.map((opt) => {
                      const isSelected = selectedCategory === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(opt.id);
                            setIsSectorDropdownOpen(false);
                            if (opt.id !== 'all') {
                              setLocalInput(opt.label);
                              setSearchQuery(opt.label);
                              addToast(`Filtered by ${opt.label}`, 'info');
                            } else {
                              setLocalInput('');
                              setSearchQuery('');
                              addToast('Showing all sectors', 'info');
                            }
                          }}
                          className={`w-[calc(100%-8px)] mx-1 px-3 py-2 text-xs rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                            isSelected
                              ? role === 'architect'
                                ? 'bg-[#16A34A]/20 text-[#4ADE80] font-semibold border border-[#16A34A]/40'
                                : 'bg-[#E2571B]/20 text-[#FB923C] font-semibold border border-[#E2571B]/40'
                              : 'text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 shrink-0 ${role === 'architect' ? 'text-[#4ADE80]' : 'text-[#FB923C]'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-1.5 transition-all shrink-0 cursor-pointer shadow-md tracking-wide ${
                  role === 'architect'
                    ? 'bg-[#16A34A] hover:bg-[#15803d]'
                    : 'bg-[#E2571B] hover:bg-[#c94a15]'
                }`}
              >
                <span>Discover</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </form>

          {/* Relevant Trending & Signal Bubbles (Guaranteed Single Line) */}
          <div className="w-full flex items-center justify-center flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 mt-4 sm:mt-5 max-w-3xl mx-auto py-0.5 px-1">
            {(role === 'investor'
              ? [
                  {
                    icon: '🔥',
                    label: 'Hot',
                    highlight: 'AI Compliance (+28%)',
                    action: () => {
                      setLocalInput('AI Compliance');
                      setSearchQuery('AI Compliance');
                      setSelectedCategory('ai');
                      addToast('Filtering by Hot sector: AI Compliance (+28%)', 'info');
                      const el = document.getElementById('opportunities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    },
                  },
                  {
                    icon: '⚡',
                    label: 'Rising',
                    highlight: 'RegTech (+26%)',
                    action: () => {
                      setLocalInput('RegTech');
                      setSearchQuery('RegTech');
                      setSelectedCategory('saas');
                      addToast('Filtering by Rising trend: RegTech (+26%)', 'info');
                      const el = document.getElementById('opportunities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    },
                  },
                  {
                    icon: '',
                    label: 'New',
                    highlight: '14 today',
                    action: () => {
                      setActiveTimeframe('7-day');
                      addToast('Showing 14 opportunities newly indexed today', 'success');
                      const el = document.getElementById('opportunities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    },
                  },
                  {
                    icon: '',
                    label: 'Architects',
                    highlight: '247',
                    action: () => {
                      addToast('247 KYC-verified architects with active escrow vaults', 'info');
                    },
                  },
                ]
              : [
                  {
                    icon: '🔥',
                    label: 'Hot',
                    highlight: 'RegTech (+26%)',
                    action: () => {
                      setLocalInput('RegTech');
                      setSearchQuery('RegTech');
                      setSelectedCategory('saas');
                      addToast('Top Builder Opportunity: RegTech (+26%)', 'info');
                      const el = document.getElementById('opportunities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    },
                  },
                  {
                    icon: '⚡',
                    label: 'Rising',
                    highlight: 'AI Agents (+34%)',
                    action: () => {
                      setLocalInput('AI Agents');
                      setSearchQuery('AI Agents');
                      setSelectedCategory('ai');
                      addToast('High Demand alert: AI Agents (+34%)', 'info');
                      const el = document.getElementById('opportunities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    },
                  },
                  {
                    icon: '',
                    label: 'Escrow',
                    highlight: '$2.4M',
                    action: () => {
                      addToast('$2,450,000+ active institutional liquidity pre-committed in Delaware escrow', 'success');
                    },
                  },
                  {
                    icon: '',
                    label: 'Buyers',
                    highlight: '189',
                    action: () => {
                      addToast('189 verified corporate & PE buyers actively filtering dossiers', 'info');
                    },
                  },
                ]
            ).map((bubble, idx) => (
              <button
                key={idx}
                type="button"
                onClick={bubble.action}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/10 bg-[#14110E]/85 hover:bg-[#1B1714] hover:border-white/25 backdrop-blur-md text-[11px] sm:text-xs font-mono transition-all duration-200 cursor-pointer select-none active:scale-[0.98] shadow-xs hover:shadow-md hover:-translate-y-0.5 group shrink-0 whitespace-nowrap"
              >
                {bubble.icon && (
                  <span className="text-xs shrink-0">{bubble.icon}</span>
                )}
                <span className="text-neutral-300 font-normal group-hover:text-white transition-colors">
                  {bubble.label}
                </span>
                <span
                  className={`font-semibold transition-colors duration-200 ${
                    role === 'architect'
                      ? 'text-[#16A34A] group-hover:text-emerald-300'
                      : 'text-[#E2571B] group-hover:text-orange-400'
                  }`}
                >
                  {bubble.highlight}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ============================================== */}
        {/* TERMINAL HEADER & FILTERS BAR */}
        {/* ============================================== */}
        <div className="pt-4 sm:pt-6 pb-1 border-t border-[var(--line)] flex flex-col xl:flex-row xl:items-end justify-between gap-3 sm:gap-6">
          
          {/* Left Text Block */}
          <div className="max-w-md xl:max-w-lg shrink">
            {role === 'investor' ? (
              <div>
                <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-[var(--text)] mb-1 sm:mb-1.5">
                  The <em className="font-serif italic text-[#E2571B]">investor terminal.</em>
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Real-time deal flow, sector demand, capital deployment, and matched opportunities.{' '}
                  <em className="font-serif italic text-[var(--text)]">Tuned to your thesis.</em> Updated continuously.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-[var(--text)] mb-1 sm:mb-1.5">
                  The <em className="font-serif italic text-[#16A34A]">architect terminal.</em>
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  Where buyer demand is strongest. What they pay. Which buyer types are looking at your sectors.{' '}
                  <em className="font-serif italic text-[var(--text)]">Tuned to help you decide what to build next.</em>
                </p>
              </div>
            )}
          </div>

          {/* Right Filter Pills */}
          <div className="flex items-center flex-nowrap gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-[13px] shrink-0 overflow-x-auto pb-1 max-w-full">
            {/* Timeframe Pills */}
            <div className="flex items-center gap-1 sm:gap-2 flex-nowrap shrink-0">
              {(['7-day', '30-day', 'Quarterly'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full transition-all cursor-pointer font-semibold whitespace-nowrap ${
                    activeTimeframe === tf
                      ? role === 'architect'
                        ? 'bg-[#16A34A] border border-[#16A34A] text-white shadow-md'
                        : 'bg-[#E2571B] border border-[#E2571B] text-white shadow-md'
                      : 'bg-[#1C1917] border border-white/15 text-neutral-300 hover:text-white hover:border-white/35 shadow-xs'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Vertical Divider */}
            <span className="w-px h-4 sm:h-6 bg-white/25 mx-1 shrink-0 inline-block" />

            {/* Sector Pills */}
            <div className="flex items-center gap-1 sm:gap-2 flex-nowrap shrink-0">
              {(['All sectors', 'AI · Tech', 'Fintech'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSectorPill(sec)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full transition-all cursor-pointer font-semibold whitespace-nowrap ${
                    activeSectorPill === sec
                      ? role === 'architect'
                        ? 'bg-[#16A34A] border border-[#16A34A] text-white shadow-md'
                        : 'bg-[#E2571B] border border-[#E2571B] text-white shadow-md'
                      : 'bg-[#1C1917] border border-white/15 text-neutral-300 hover:text-white hover:border-white/35 shadow-xs'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================== */}
        {/* THESIS / BUILD SIGNAL ALERT BANNER */}
        {/* ============================================== */}
        <div
          className={`mt-5 sm:mt-6 bg-[#130F0C] border border-white/10 p-4 sm:p-5 rounded-r-xl flex items-start sm:items-center gap-3.5 sm:gap-4 shadow-xl transition-all duration-300 ${
            role === 'architect'
              ? 'border-l-[3.5px] border-l-[#16A34A]'
              : 'border-l-[3.5px] border-l-[#E2571B]'
          }`}
        >
          {/* Target / Plus Icon Badge */}
          {role === 'architect' ? (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0 text-white">
              <Plus className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E2571B] flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0 text-white">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4" y2="12" />
              </svg>
            </div>
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm sm:text-base text-white tracking-tight leading-snug">
              {role === 'investor' ? (
                <span>
                  Your <em className="font-serif italic text-[#E2571B] font-normal">thesis match</em> this week
                </span>
              ) : (
                <span>
                  Your <em className="font-serif italic text-[#16A34A] font-normal">build signal</em> this week
                </span>
              )}
            </div>

            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed mt-1 sm:mt-1.5">
              {role === 'investor' ? (
                <>
                  Based on your interest in <strong className="text-white font-semibold">AI vertical workflow</strong> and{' '}
                  <strong className="text-white font-semibold">B2B SaaS mid-market</strong>: 14 new opportunities matched your filters. 3 are unlocked by peer PE buyers.{' '}
                  <strong className="text-white font-semibold">2 are in the surge zone with rising demand and limited supply</strong>, these typically clear within 5 days.
                </>
              ) : (
                <>
                  Highest-value gap detected in <strong className="text-white font-semibold">RegTech compliance for mid-market</strong>: buyer demand index 84, only 18 active listings, average unlock $6,200.{' '}
                  <strong className="text-white font-semibold">If you can structure a 90+ page opportunity here, expected clear time is under 12 days based on similar listings.</strong>
                </>
              )}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
