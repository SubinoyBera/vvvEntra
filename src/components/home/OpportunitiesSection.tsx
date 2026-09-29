import React from 'react';
import { useApp } from '../../context/AppContext';

interface PickItem {
  code: string;
  categoryTag: string;
  matchRate: string;
  title: string;
  thesisLead: string;
  thesisHighlight: string;
  thesisTrail: string;
  pages: number;
  frameworks: number;
  price: string;
  priceNum: number;
  fullDescription: string;
  architectNote: string;
}

export const OpportunitiesSection: React.FC = () => {
  const { openNdaModal, role, setActiveRoute } = useApp();

  const buildPrompts = [
    {
      id: 'BP-REGTECH',
      pills: ['REGTECH', 'MID-MARKET'],
      badge: '🔥 Surge',
      title: 'RegTech compliance for mid-market manufacturing',
      highlight: '14 buyers',
      text: ' searched this in 7 days. Demand index 84, only 18 active listings. Estimated clear time: 12 days.',
      meta: '120-140p · 8-10 frameworks',
      price: '~$6,200',
      priceNum: 6200,
      fullDescription: 'High-urgency institutional prompt for mid-market environmental, worker safety, and supply chain regulatory compliance pipelines. 14 verified corporate & PE buyers on active waitlist.',
    },
    {
      id: 'BP-AI-AGENTS',
      pills: ['AI AGENTS', 'VERTICAL OPS'],
      badge: 'High Match',
      title: 'Industry-specific AI agent for legal operations',
      highlight: '23 buyers',
      text: ' filtered "AI legal" in 14 days. Family Offices and Strategic Buyers actively looking. Premium pricing tier.',
      meta: '100-120p · 7-9 frameworks',
      price: '~$5,800',
      priceNum: 5800,
      fullDescription: 'Autonomous legal workflow orchestration blueprint designed for enterprise compliance and contract review. High match score based on active institutional search mandates.',
    },
    {
      id: 'BP-HEALTHTECH',
      pills: ['HEALTHTECH', 'DIAGNOSTICS'],
      badge: 'Underserved',
      title: 'Tier-2 India diagnostics network playbook',
      highlight: '9 buyers',
      text: ' requested intro to senior healthtech architects this month. Family Offices with India thesis are top buyers.',
      meta: '130-150p · 9-11 frameworks',
      price: '~$7,400',
      priceNum: 7400,
      fullDescription: 'Diagnostic lab hub-and-spoke distribution model tailored for Tier-2 and Tier-3 healthcare delivery networks. Acute supply gap with immediate buy-side liquidity.',
    },
  ];

  const personalizedPicks: PickItem[] = [
    {
      code: 'VVE-2438',
      categoryTag: 'D2C · AYURVEDA',
      matchRate: '92% match',
      title: 'Indian D2C ayurveda category build-out',
      thesisLead: 'Matches your ',
      thesisHighlight: 'D2C consumer thesis.',
      thesisTrail: ' 3 peer buyers viewed this in 48h. Architect has 2-exit history in similar plays.',
      pages: 127,
      frameworks: 9,
      price: '$4,800',
      priceNum: 4800,
      fullDescription: 'Comprehensive playbook detailing formulation supply chains, direct distribution unit economics, and omnichannel retail scaling in Tier 1 & Tier 2 Indian consumer markets.',
      architectNote: 'Architect has 2-exit history in D2C consumer brands; previously led category expansion for top FMCG conglomerate.',
    },
    {
      code: 'VVE-2436',
      categoryTag: 'AI · WORKFLOW',
      matchRate: '88% match',
      title: 'AI workflow agent for vertical operations',
      thesisLead: 'High ',
      thesisHighlight: 'demand signal.',
      thesisTrail: ' Sector +24% this week. Architect is ex-AI engineering lead.',
      pages: 112,
      frameworks: 8,
      price: '$5,400',
      priceNum: 5400,
      fullDescription: 'End-to-end multi-agent orchestration architecture for mid-market legal and compliance workflows, including contract analysis pipelines and audit trail automation.',
      architectNote: 'Ex-AI engineering lead at global legal tech provider. Authored 4 production agent frameworks in enterprise settings.',
    },
    {
      code: 'VVE-2434',
      categoryTag: 'FINTECH · SMB',
      matchRate: '85% match',
      title: 'SMB lending for tier-2 Indian cities',
      thesisLead: 'Premium ',
      thesisHighlight: 'capital signal.',
      thesisTrail: ' Highest-paying sector ($7.2k avg). Architect is ex-NBFC with regulatory experience.',
      pages: 142,
      frameworks: 11,
      price: '$7,200',
      priceNum: 7200,
      fullDescription: 'Underwriting models, NBFC co-lending compliance stack, and tier-2 distribution network blueprint for unsecured micro-enterprise credit facilities.',
      architectNote: 'Former VP of Credit at leading Indian NBFC. 12+ years experience in regulatory capital and credit risk management.',
    },
  ];

  const handleCardClick = (pick: PickItem) => {
    openNdaModal({
      id: pick.code,
      code: pick.code,
      category: pick.categoryTag,
      tag: pick.categoryTag.split('·')[0].trim(),
      demandTag: `${pick.matchRate} fit`,
      demandTrend: 'hot',
      title: pick.title,
      blurredPart: 'confidential execution thesis and financial models',
      description: pick.fullDescription,
      pages: pick.pages,
      frameworks: pick.frameworks,
      finModels: 4,
      architectRole: 'Verified Category Architect',
      architectNote: pick.architectNote,
      unlockPrice: pick.priceNum,
      status: 'locked',
    });
  };

  return (
    <section id="opportunities" className="py-9 sm:py-12 border-b border-[var(--line)] bg-transparent text-[var(--text)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* SECTION HEADER - Dynamic for Investor vs Architect */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          {role === 'architect' ? (
            <>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-tight">
                Build <em className="font-serif italic font-normal text-[#16A34A]">prompts</em>{' '}
                <span className="text-neutral-200">· matched to your expertise.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2.5 max-w-2xl mx-auto font-sans">
                Curated opportunity prompts based on demand gaps, your sector experience, and what
                serious buyers are actively searching for. Each prompt shows expected pricing and
                clearing time.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-tight">
                Personalized <em className="font-serif italic font-normal text-[#E2571B]">picks</em>{' '}
                <span className="text-neutral-200">· based on your unlock history.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2.5 max-w-2xl mx-auto font-sans">
                The matching engine surfaces opportunities likely to fit your investment thesis based on
                past unlocks, search filters, and stated sector interest.
              </p>
            </>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3 CARDS: BUILD PROMPTS (ARCHITECT) OR PERSONALIZED PICKS (INVESTOR) */}
        {/* ======================================================== */}
        {role === 'architect' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {buildPrompts.map((prompt) => (
              <div
                key={prompt.id}
                onClick={() =>
                  openNdaModal({
                    id: prompt.id,
                    code: prompt.id,
                    category: prompt.pills.join(' · '),
                    tag: prompt.pills[0],
                    demandTag: prompt.badge,
                    demandTrend: 'hot',
                    title: prompt.title,
                    blurredPart: 'confidential architect execution blueprint and models',
                    description: prompt.fullDescription,
                    pages: parseInt(prompt.meta.split('-')[0]) || 120,
                    frameworks: 9,
                    finModels: 4,
                    architectRole: 'Lead Venture Architect',
                    architectNote: `${prompt.highlight}${prompt.text}`,
                    unlockPrice: prompt.priceNum,
                    status: 'locked',
                  })
                }
                className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between hover:border-[#16A34A]/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Category Pills & Match Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {prompt.pills.map((pill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-neutral-900 border border-white/10 text-neutral-300"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>

                    {/* Status Badge */}
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#16A34A] text-white shadow-xs shrink-0 flex items-center gap-1">
                      {prompt.badge}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-[22px] text-white font-normal leading-snug mb-5 group-hover:text-green-100 transition-colors">
                    {prompt.title}
                  </h3>

                  {/* Inset Box with Left Green Accent Border */}
                  <div className="border-l-2 border-[#16A34A] bg-[#14110E] p-3.5 sm:p-4 rounded-r-lg mb-6">
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      <em className="font-serif italic text-[#16A34A] not-italic-font font-normal">
                        {prompt.highlight}
                      </em>
                      {prompt.text}
                    </p>
                  </div>
                </div>

                {/* Bottom Divider & Meta / Price */}
                <div className="border-t border-dashed border-white/10 pt-4 flex items-center justify-between mt-auto">
                  <span className="font-mono text-xs text-neutral-400 tracking-wide">
                    {prompt.meta}
                  </span>
                  <span className="font-serif italic text-lg sm:text-xl text-[#16A34A] font-normal tabular-nums">
                    {prompt.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {personalizedPicks.map((pick) => (
              <div
                key={pick.code}
                onClick={() => handleCardClick(pick)}
                className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between hover:border-[#E2571B]/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Code, Category Pill & Match Pill */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-[#E2571B] font-semibold tracking-wider">
                        {pick.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-neutral-900 border border-white/10 text-neutral-300">
                        {pick.categoryTag}
                      </span>
                    </div>

                    {/* Match Rate Pill */}
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#E2571B] text-white shadow-xs shrink-0">
                      {pick.matchRate}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl sm:text-[22px] text-white font-normal leading-snug mb-5 group-hover:text-orange-100 transition-colors">
                    {pick.title}
                  </h3>

                  {/* Inset Thesis Box with Left Orange Accent Border */}
                  <div className="border-l-2 border-[#E2571B] bg-[#14110E] p-3.5 sm:p-4 rounded-r-lg mb-6">
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {pick.thesisLead}
                      <em className="font-serif italic text-[#E2571B] not-italic-font font-normal">
                        {pick.thesisHighlight}
                      </em>
                      {pick.thesisTrail}
                    </p>
                  </div>
                </div>

                {/* Bottom Divider & Meta / Price */}
                <div className="border-t border-dashed border-white/10 pt-4 flex items-center justify-between mt-auto">
                  <span className="font-mono text-xs text-neutral-400 tracking-wide">
                    {pick.pages} pages · {pick.frameworks} frameworks
                  </span>
                  <span className="font-serif italic text-lg sm:text-xl text-[#E2571B] font-normal tabular-nums">
                    {pick.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link to Full Opportunities Directory */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => {
              setActiveRoute('#opportunities');
              window.location.hash = '#opportunities';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all cursor-pointer shadow-lg active:translate-y-[1px] ${
              role === 'architect'
                ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/40 shadow-[0_4px_14px_rgba(22,163,74,0.35)] hover:brightness-105'
                : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/40 shadow-[0_4px_14px_rgba(234,88,12,0.35)] hover:brightness-105'
            }`}
          >
            <span>Explore All Curated Opportunities</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};
