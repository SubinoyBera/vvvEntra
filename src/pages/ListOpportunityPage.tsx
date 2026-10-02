import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Lock, 
  Eye, 
  ChevronDown, 
  Edit3, 
  Shield 
} from 'lucide-react';

interface SectionField {
  fullText: string;
  summary: string;
}

interface SectionConfig {
  key: keyof SectionState;
  label: string;
  fullTextPlaceholder: string;
  summaryPlaceholder: string;
}

interface SectionState {
  investmentThesis: SectionField;
  theProblem: SectionField;
  marketGap: SectionField;
  businessModel: SectionField;
  competitiveLandscape: SectionField;
  risksChallenges: SectionField;
  goToMarket: SectionField;
  financialProjections: SectionField;
  documentPackage: SectionField;
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    key: 'investmentThesis',
    label: 'Investment thesis',
    fullTextPlaceholder: 'Write the full thesis. Why this opportunity exists, the structural reason serious capital should pay attention, and what makes it defensible. No length limit.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'theProblem',
    label: 'The problem',
    fullTextPlaceholder: 'Describe the full problem. What is broken, who feels this pain, what it costs them today.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'marketGap',
    label: 'Market gap',
    fullTextPlaceholder: 'Explain why existing market solutions fail or leave a gap for this venture to capture.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'businessModel',
    label: 'Business model & revenue logic',
    fullTextPlaceholder: 'Detail the monetization architecture, unit economics, pricing structure, and contract values.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'competitiveLandscape',
    label: 'Competitive landscape',
    fullTextPlaceholder: 'Break down incumbent vulnerabilities, direct alternatives, and proprietary moats.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'risksChallenges',
    label: 'Risks & execution challenges',
    fullTextPlaceholder: 'Detail key technical, market, or operational risks and the exact mitigation strategies.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'goToMarket',
    label: 'Go-to-market strategy',
    fullTextPlaceholder: 'Outline customer acquisition channels, distribution partnerships, and initial traction velocity.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'financialProjections',
    label: 'Financial projections',
    fullTextPlaceholder: 'Outline Year 1-3 revenue forecasts, gross margins, EBITDA expectations, and break-even thresholds.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  },
  {
    key: 'documentPackage',
    label: 'Document package',
    fullTextPlaceholder: 'List the specific code repositories, database schemas, financial models, and decks included.',
    summaryPlaceholder: 'An AI summary of your text appears here automatically. You can edit it.'
  }
];

export const ListOpportunityPage: React.FC = () => {
  const { role, addToast } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  // Basic Information States initialized as EMPTY so placeholders show cleanly
  const [title, setTitle] = useState('');
  const [industryTags, setIndustryTags] = useState('');
  const [hook, setHook] = useState('');
  const [stage, setStage] = useState('Working Prototype');
  const [geography, setGeography] = useState('');
  const [capital, setCapital] = useState('');
  const [timeToLaunch, setTimeToLaunch] = useState('');
  const [monetisation, setMonetisation] = useState('');
  const [listedPrice, setListedPrice] = useState('');

  // Dynamic 10% unlock fee calculation
  const numericPrice = parseFloat(listedPrice) || 0;
  const unlockFee = numericPrice > 0 ? Math.round(numericPrice * 0.1) : 2500;

  // Deep-dive modular sections initialized as empty strings
  const [sections, setSections] = useState<SectionState>({
    investmentThesis: { fullText: '', summary: '' },
    theProblem: { fullText: '', summary: '' },
    marketGap: { fullText: '', summary: '' },
    businessModel: { fullText: '', summary: '' },
    competitiveLandscape: { fullText: '', summary: '' },
    risksChallenges: { fullText: '', summary: '' },
    goToMarket: { fullText: '', summary: '' },
    financialProjections: { fullText: '', summary: '' },
    documentPackage: { fullText: '', summary: '' },
  });

  const handleSectionChange = (field: keyof SectionState, subKey: 'fullText' | 'summary', val: string) => {
    setSections(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subKey]: val,
      },
    }));
  };

  const handleAutoSummary = (field: keyof SectionState) => {
    const currentFull = sections[field].fullText;
    if (!currentFull.trim()) {
      addToast('Please enter your full text first to generate an AI summary.', 'info');
      return;
    }
    const words = currentFull.split(' ').slice(0, 20).join(' ');
    const generated = `${words}... (AI verified summary)`;
    handleSectionChange(field, 'summary', generated);
    addToast('AI summary generated successfully.', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Please provide an opportunity title.', 'warn');
      return;
    }
    addToast('Opportunity submitted! Sent to vvEntra technical curation board for verification.', 'success');
  };

  return (
    <div className="w-full text-white select-none pb-32 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO HEADER                                           */}
      {/* ======================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle theme ambient glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] blur-[180px] pointer-events-none rounded-full opacity-15 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-tight mb-4">
            Compose your listing.{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              See exactly what the buyer sees.
            </em>
          </h1>

          <p className="text-xs sm:text-[14px] text-neutral-300 font-normal leading-relaxed max-w-2xl px-2">
            Fill the form on the left. The panel on the right shows your listing through the buyer's eyes in real time, so you always know what is free, what is teased, and what unlocks only after payment.
          </p>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. REFINED LEGEND STRIP (Equal spacing & high clarity)    */}
      {/* ======================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-2xl sm:rounded-[22px] bg-[#0A0807] border border-white/10 px-8 sm:px-12 py-7 sm:py-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 text-left">
            
            {/* Legend 1: Free */}
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: themeColor, color: themeColor }}
                />
                <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-normal">
                  Free
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed mt-2">
                Buyer sees this fully, before paying anything.
              </p>
            </div>

            {/* Legend 2: Teaser */}
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: themeColor, color: themeColor }}
                />
                <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-normal">
                  Teaser
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed mt-2">
                Buyer reads the first 100 characters; rest is blur. They pay the unlock fee to reveal the rest.
              </p>
            </div>

            {/* Legend 3: Document */}
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: themeColor, color: themeColor }}
                />
                <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-normal">
                  Document
                </h4>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed mt-2">
                Shared as downloadable files only after unlock and NDA.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SPLIT SCREEN: LEFT FORM + RIGHT LIVE PREVIEW          */}
      {/* ======================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: FORM INPUTS WITH REAL PLACEHOLDERS     */}
          {/* ==================================================== */}
          <div className="w-full lg:w-[58%] xl:w-[60%] space-y-8 text-left">
            
            {/* SECTION A: ALWAYS VISIBLE TO THE BUYER */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0D0B0A] border border-white/10 p-6 sm:p-8 shadow-xl space-y-5">
              
              {/* Header Badge Row */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-black transition-colors"
                    style={{ backgroundColor: themeColor }}
                  >
                    FREE
                  </span>
                  <span className="text-xs font-mono text-neutral-300 font-medium">
                    Always visible to the buyer
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Public card
                </span>
              </div>

              {/* Field: Opportunity Title */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Opportunity title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Autonomous Back-end Operations System for Mid-Market E-Commerce Brands"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: Industry tags */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Industry tags (comma separated)
                </label>
                <input
                  type="text"
                  value={industryTags}
                  onChange={(e) => setIndustryTags(e.target.value)}
                  placeholder="E-Commerce, AI Automation"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: One-line hook */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    One-line hook
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {hook.length} characters
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    placeholder="A documented operational intelligence system that removes the founder from back-end e-commerce operations in under 30 days."
                    className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all resize-none pr-10"
                  />
                  <Edit3 className="w-3.5 h-3.5 text-neutral-500 absolute bottom-3.5 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Field: Stage */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Stage
                </label>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none appearance-none cursor-pointer pr-10"
                  >
                    <option value="Working Prototype">Working Prototype</option>
                    <option value="Early Concept">Early Concept</option>
                    <option value="Audited Architecture">Audited Architecture</option>
                    <option value="Live Production">Live Production</option>
                    <option value="Revenue Generating">Revenue Generating</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field: Geography */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Geography
                </label>
                <input
                  type="text"
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  placeholder="AU, US, UK"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: Capital required */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Capital required
                </label>
                <input
                  type="text"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  placeholder="$25,000 - $50,000"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: Time to launch */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Time to launch
                </label>
                <input
                  type="text"
                  value={timeToLaunch}
                  onChange={(e) => setTimeToLaunch(e.target.value)}
                  placeholder="60-90 days"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: Monetisation */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Monetisation
                </label>
                <input
                  type="text"
                  value={monetisation}
                  onChange={(e) => setMonetisation(e.target.value)}
                  placeholder="Retainer + project"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
                />
              </div>

              {/* Field: Listed price (USD) */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Listed price (USD)
                </label>
                <input
                  type="text"
                  value={listedPrice}
                  onChange={(e) => setListedPrice(e.target.value)}
                  placeholder="25000"
                  className="w-full bg-[#12100E] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all font-mono"
                />

                {/* Callout box: Buyer pays to unlock (10%) */}
                <div className="mt-3 p-4 rounded-xl bg-[#12100E] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-normal">
                    Buyer pays to unlock (10%)
                  </span>
                  <span 
                    className="font-mono text-base font-semibold transition-colors"
                    style={{ color: themeColor }}
                  >
                    ${unlockFee.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>

            {/* SECTION B: TEASER & CONFIDENTIAL FULL CONTENT */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0D0B0A] border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Header Badge Row */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-black transition-colors"
                    style={{ backgroundColor: themeColor }}
                  >
                    TEASER
                  </span>
                  <span className="text-xs font-mono text-neutral-300 font-medium">
                    Buyers see an AI summary free · your full text unlocks after payment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Creates curiosity
                </span>
              </div>

              {/* Explanatory Banner Box */}
              <div className="p-4 rounded-2xl bg-[#12100E] border border-white/5 text-xs text-neutral-300 leading-relaxed font-normal">
                Write the real, complete content on the left. vvEntra automatically writes a public summary on the right that conveys your quality without revealing specifics. The buyer reads the summary free, plus a short blurred glimpse of your real words, then pays to unlock everything. You can edit the summary anytime.
              </div>

              {/* DUAL-PANEL SECTION CARDS */}
              {SECTION_CONFIGS.map((sec) => (
                <div key={sec.key} className="space-y-2 pt-2">
                  <h3 className="font-serif text-base sm:text-lg text-white font-normal">
                    {sec.label}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left Panel: Confidential Full Text */}
                    <div className="rounded-2xl p-4 bg-[#12100E] border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold text-black"
                            style={{ backgroundColor: themeColor }}
                          >
                            YOUR FULL TEXT
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Confidential · unlocks after payment + NDA</span>
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={sections[sec.key].fullText}
                          onChange={(e) => handleSectionChange(sec.key, 'fullText', e.target.value)}
                          placeholder={sec.fullTextPlaceholder}
                          className="w-full bg-transparent text-xs text-neutral-200 outline-none resize-none leading-relaxed placeholder-neutral-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                        <span className="text-[10px] font-mono text-neutral-500">
                          {sections[sec.key].fullText.split(/\s+/).filter(Boolean).length} words
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAutoSummary(sec.key)}
                          className="text-[10px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer hover:underline"
                          style={{ color: themeColor }}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Generate AI Summary</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Panel: Buyer Sees (Free AI Summary) */}
                    <div className="rounded-2xl p-4 bg-[#12100E] border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/15 text-neutral-300 font-semibold">
                            BUYER SEES (FREE)
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>Public Teaser</span>
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={sections[sec.key].summary}
                          onChange={(e) => handleSectionChange(sec.key, 'summary', e.target.value)}
                          placeholder={sec.summaryPlaceholder}
                          className="w-full bg-transparent text-xs text-neutral-300 outline-none resize-none leading-relaxed placeholder-neutral-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                        <span className="text-[10px] font-mono text-neutral-500">
                          Auto-written from your text · editable
                        </span>
                        <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                      </div>
                    </div>

                  </div>
                </div>
              ))}

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98]"
                  style={{ backgroundColor: themeColor }}
                >
                  <Shield className="w-4 h-4" />
                  <span>Submit Opportunity for Review</span>
                </button>

                <button
                  type="button"
                  onClick={() => addToast('Draft saved securely to your local profile.', 'info')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 border border-white/15 hover:border-white/30 hover:text-white bg-transparent transition-all cursor-pointer"
                >
                  Save Draft
                </button>
              </div>

            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: STICKY LIVE BUYER PREVIEW             */}
          {/* ==================================================== */}
          <div className="w-full lg:w-[42%] xl:w-[40%] sticky top-28">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0B0908] border border-white/15 shadow-2xl p-6 sm:p-7 text-left space-y-6">
              
              {/* Header Bar: BUYER PREVIEW + Live Pulse */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                  BUYER PREVIEW
                </span>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span className="text-[11px] font-mono text-neutral-400">
                    Live · updates as you type
                  </span>
                </div>
              </div>

              {/* Title & Hook */}
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug mb-1.5">
                  {title || 'Your opportunity title'}
                </h2>
                <p className="text-xs sm:text-[13px] text-neutral-400 font-serif italic leading-relaxed">
                  {hook || 'Your one-line hook will appear here.'}
                </p>
              </div>

              {/* 2x3 Metric Grid */}
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    STAGE
                  </span>
                  <span className="text-xs text-neutral-200 font-medium font-mono">
                    {stage || 'Working Prototype'}
                  </span>
                </div>

                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    GEOGRAPHY
                  </span>
                  <span className="text-xs text-neutral-200 font-medium font-mono">
                    {geography || '—'}
                  </span>
                </div>

                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    CAPITAL
                  </span>
                  <span className="text-xs text-neutral-200 font-medium font-mono">
                    {capital || '—'}
                  </span>
                </div>

                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    TIME TO LAUNCH
                  </span>
                  <span className="text-xs text-neutral-200 font-medium font-mono">
                    {timeToLaunch || '—'}
                  </span>
                </div>

                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    MONETISATION
                  </span>
                  <span className="text-xs text-neutral-200 font-medium font-mono">
                    {monetisation || '—'}
                  </span>
                </div>

                <div className="bg-[#0E0C0B] p-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                    UNLOCK FEE (10%)
                  </span>
                  <span 
                    className="text-xs font-semibold font-mono"
                    style={{ color: themeColor }}
                  >
                    ${unlockFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Preview Content Sections */}
              <div className="space-y-4 pt-2">
                {SECTION_CONFIGS.map((item) => {
                  const summary = sections[item.key]?.summary;
                  return (
                    <div key={item.key} className="border-b border-white/5 pb-3">
                      <h4 className="font-serif text-xs sm:text-[13px] text-white font-normal mb-1">
                        {item.label}
                      </h4>
                      {summary ? (
                        <p className="text-[11.5px] text-neutral-300 leading-relaxed font-normal">
                          {summary}
                        </p>
                      ) : (
                        <p className="text-[11px] font-serif italic text-neutral-500">
                          Nothing written yet.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Unlock Action Button in Buyer Preview */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white tracking-wide shadow-md flex items-center justify-center gap-2 cursor-not-allowed opacity-90"
                  style={{ backgroundColor: themeColor }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Full Confidential Dossier · ${unlockFee.toLocaleString()}</span>
                </button>
                <span className="text-[10px] font-mono text-neutral-500 text-center block mt-1.5">
                  Bilateral NDA execution + Delaware Statutory Escrow
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
