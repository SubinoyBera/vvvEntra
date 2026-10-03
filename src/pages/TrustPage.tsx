import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Lock, 
  User,
  ArrowRight,
  Plus,
  X,
  HelpCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface DefenseLayer {
  num: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  checklistHeader: string;
  checklists: string[];
}

const FIVE_DEFENSE_LAYERS: DefenseLayer[] = [
  {
    num: '01',
    eyebrow: '— BEFORE ANY MONEY MOVES',
    titlePrefix: 'Identity & ',
    titleHighlight: 'reputation',
    titleSuffix: ' verification',
    description: 'Every architect and every buyer is a verified human with public stake. No anonymous accounts. No multiple identities. Every action is attached to a real, accountable person. Verification is itself a trust signal, visible on every profile.',
    checklistHeader: 'HOW WE VERIFY',
    checklists: [
      'Government ID (Aadhaar / passport)',
      'Bank account ownership (penny drop)',
      'Phone & email confirmed',
      'Buyer capacity verification',
      'One-person-one-account policy',
    ],
  },
  {
    num: '02',
    eyebrow: '— THE FOUNDATION',
    titlePrefix: 'Escrow ',
    titleHighlight: 'custody',
    titleSuffix: ' on every transaction',
    description: 'Money never moves directly from buyer to seller. Every dollar is held in a regulated escrow account before it ever reaches the architect. This neutralises the trust paradox: the architect knows the money is committed, the buyer knows their funds are protected.',
    checklistHeader: 'HOW ESCROW WORKS',
    checklists: [
      'Buyer funds held by vvEntra',
      'Architect notified of commitment',
      'Content unlocks against escrow',
      '7-day inspection window opens',
      'Funds release on satisfaction',
    ],
  },
  {
    num: '03',
    eyebrow: '— THE REAL INNOVATION',
    titlePrefix: 'Staged ',
    titleHighlight: 'reveal',
    titleSuffix: ' · four progressive tiers',
    description: 'Buyers do not pay full price for full access at once. They progress through four tiers, each unlocking more substance for proportionally more commitment. This mirrors how real M&A diligence works: NDA, CIM review, data room, closing.',
    checklistHeader: 'THE FOUR TIERS',
    checklists: [
      'Tier 0: Public preview (free)',
      'Tier 1: Verified access (free)',
      'Tier 2: Interest deposit ($100–500)',
      'Tier 3: NDA + partial unlock (30%)',
      'Tier 4: Full unlock (remaining 70%)',
    ],
  },
  {
    num: '04',
    eyebrow: '— WHEN SOMETHING GOES WRONG',
    titlePrefix: 'Dispute ',
    titleHighlight: 'resolution',
    titleSuffix: ' · clear, fast, fair',
    description: "Disputes are resolved within five business days by vvEntra moderation using documented criteria. Refunds are not subjective. They are granted for specific, verifiable failures: misrepresented depth, plagiarised content, false credentials. Not for buyer's remorse.",
    checklistHeader: 'OUR COMMITMENT',
    checklists: [
      'Documented refund criteria',
      '5-business-day resolution SLA',
      'Public reputation feedback',
      'Frivolous claims penalised',
      'Bad actors lose access',
    ],
  },
  {
    num: '05',
    eyebrow: '— FOR HIGH-VALUE DEALS',
    titlePrefix: 'Platform ',
    titleHighlight: 'guarantee',
    titleSuffix: ' · the premium layer',
    description: 'For transactions above $10,000, the vvEntra Guarantee tier puts the platform itself behind the payment. Architects receive guaranteed settlement even during disputes. Buyers receive a verified premium badge. Risk transfers from the parties to the platform.',
    checklistHeader: "WHAT'S INCLUDED",
    checklists: [
      'Guaranteed architect settlement',
      'Premium buyer verification',
      'Priority dispute review',
      'Up to $50k coverage cap',
      'Available on high-tier deals',
    ],
  },
];

interface StagedTier {
  num: string;
  titlePrefix: string;
  titleHighlight: string;
  costLabel: string;
  costDetail: string;
  whatLabel: string;
  whatContent: React.ReactNode;
  percent: string;
  percentSub: string;
}

const STAGED_TIERS: StagedTier[] = [
  {
    num: '00',
    titlePrefix: 'Public ',
    titleHighlight: 'preview',
    costLabel: 'COST · ',
    costDetail: 'FREE · ANYONE CAN SEE',
    whatLabel: "What's visible:",
    whatContent: (
      <>
        Sector, market, scale, geography. Architect's verified credentials and exit history. Documentation depth metrics (pages, frameworks, models). Demand signals.{' '}
        <em className="italic text-neutral-400">Core IP remains locked.</em>
      </>
    ),
    percent: '0%',
    percentSub: 'PAID',
  },
  {
    num: '01',
    titlePrefix: 'Verified ',
    titleHighlight: 'access',
    costLabel: 'COST · ',
    costDetail: 'FREE · AFTER KYC',
    whatLabel: "What's visible:",
    whatContent: (
      <>
        Full opportunity title and one-paragraph thesis. Sub-category and geographic scope. Estimated execution timeline and capital required. Ability to send structured questions to the architect.
      </>
    ),
    percent: '0%',
    percentSub: 'PAID',
  },
  {
    num: '02',
    titlePrefix: 'Interest ',
    titleHighlight: 'deposit',
    costLabel: 'COST · ',
    costDetail: '$100–500 · REFUNDABLE',
    whatLabel: 'What changes:',
    whatContent: (
      <>
        Buyer signals real interest with a refundable deposit. Architect reviews the buyer's profile and decides whether to grant deeper access. If architect declines, deposit returns automatically. If granted, deposit credits toward full unlock.
      </>
    ),
    percent: '~10%',
    percentSub: 'OF TOTAL',
  },
  {
    num: '03',
    titlePrefix: 'NDA + ',
    titleHighlight: 'partial unlock',
    costLabel: 'COST · ',
    costDetail: '30% OF TOTAL · NDA SIGNED',
    whatLabel: 'What unlocks:',
    whatContent: (
      <>
        Full business model document. Market research summary. Execution roadmap. Direct architect conversation enabled.{' '}
        <em className="italic text-neutral-400">Financial models and proprietary IP remain locked.</em> 5-day window before next tier.
      </>
    ),
    percent: '30%',
    percentSub: 'PAID',
  },
  {
    num: '04',
    titlePrefix: 'Full ',
    titleHighlight: 'unlock',
    costLabel: 'COST · ',
    costDetail: 'REMAINING 70% · FINAL',
    whatLabel: 'What unlocks:',
    whatContent: (
      <>
        Complete documentation, financial models, frameworks, SOPs, sensitive IP. Architect's full contact. The ongoing relationship begins: acquire, partner, collaborate, or build with execution support. 7-day inspection window.
      </>
    ),
    percent: '100%',
    percentSub: 'SETTLED',
  },
];

interface FaqQuestion {
  id: string;
  category: 'all' | 'escrow' | 'tiers' | 'legal';
  categoryLabel: string;
  question: string;
  answer: string;
  trustTag: string;
}

const FAQ_ITEMS: FaqQuestion[] = [
  {
    id: 'faq-1',
    category: 'escrow',
    categoryLabel: 'ESCROW CUSTODY',
    question: 'What happens if the architect disappears after I pay?',
    answer: "If the architect becomes unresponsive after escrow is funded, vvEntra automatically returns the funds to the buyer within 7 days of inactivity. The architect's listing is suspended and their account is flagged. Because every architect is KYC-verified with a verified bank account, fraudulent disappearance is rare and consequences are real.",
    trustTag: '7-Day Inactivity Auto-Refund Guarantee'
  },
  {
    id: 'faq-2',
    category: 'escrow',
    categoryLabel: 'BUYER INTEGRITY',
    question: 'What stops a buyer from accessing the content and then claiming a refund?',
    answer: "Three safeguards. First, refunds are granted only against documented criteria, not buyer's remorse. Second, frivolous disputes trigger account warnings and eventually access loss. Third, every buyer has a public reputation score visible to architects, so a pattern of disputes is visible before architects grant access. Bad actors get filtered out within a few transactions.",
    trustTag: 'Objective Criteria & Public Reputation Stake'
  },
  {
    id: 'faq-3',
    category: 'tiers',
    categoryLabel: 'PLATFORM ECONOMICS',
    question: "What is vvEntra's platform commission?",
    answer: "vvEntra charges a transparent 12% to 18% transaction fee on settled unlocks, depending on the opportunity tier and deal volume. There are zero listing fees, zero monthly subscription costs, and zero fees on rejected deposits or refunded escrows. The platform only makes money when value is verified and settled.",
    trustTag: 'Zero Upfront Fees · Success-Gated Only'
  },
  {
    id: 'faq-4',
    category: 'escrow',
    categoryLabel: 'SETTLEMENT TIMELINE',
    question: 'How long does the architect wait to receive funds after a buyer unlocks?',
    answer: "Funds are released immediately upon buyer satisfaction or automatically at the expiration of the 7-day inspection window if no dispute is raised. Bank disbursement is processed within 24 hours via domestic rails (ACH/NEFT) or 48 hours for international SWIFT wires.",
    trustTag: '24-Hour Settlement SLA Post-Approval'
  },
  {
    id: 'faq-5',
    category: 'tiers',
    categoryLabel: 'STAGED COMMITMENTS',
    question: 'Can I make partial payments instead of unlocking everything at once?',
    answer: "Yes. Our staged reveal mechanism is specifically designed around staged commitments: starting with free public preview (Tier 0) and verified access (Tier 1), moving to an interest deposit of $100–500 (Tier 2), a 30% partial unlock under NDA (Tier 3), and finally the remaining 70% full unlock (Tier 4).",
    trustTag: 'Progressive Risk Allocation Structure'
  },
  {
    id: 'faq-6',
    category: 'legal',
    categoryLabel: 'DATA PRIVACY & NDA',
    question: 'Is my data and identity confidential?',
    answer: "Completely. Your legal name, banking rails, and tax IDs are encrypted using bank-grade AES-256 encryption and stored in isolated vault infrastructure. Only verified institutional credentials or your designated alias are displayed publicly until mutual legal execution.",
    trustTag: 'AES-256 Encryption & Steganographic Watermarking'
  },
  {
    id: 'faq-7',
    category: 'legal',
    categoryLabel: 'GLOBAL COMPLIANCE',
    question: 'What jurisdictions does vvEntra operate in?',
    answer: "vvEntra operates internationally with legal escrow infrastructure anchored under Delaware (US), English (UK), and Indian corporate jurisdictions. Cross-border escrow settlements comply with global AML, sanctions, and FATF compliance guidelines.",
    trustTag: 'Delaware, English & Indian Legal Jurisdiction'
  }
];

export const TrustPage: React.FC = () => {
  const { role, setActiveRoute, addToast, stage, setStage, openApplyModal } = useApp();
  const isArchitect = role === 'architect';

  const themeColor = isArchitect ? '#16A34A' : '#E2571B';
  const themeBgSubtle = isArchitect ? 'bg-[#101812]' : 'bg-[#181410]';
  const themeBorder = isArchitect ? 'border-[#16A34A]/30' : 'border-[#E2571B]/30';

  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [faqFilter, setFaqFilter] = useState<'all' | 'escrow' | 'tiers' | 'legal'>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApplyClick = () => {
    openApplyModal(role);
  };

  const handleReturnToDashboard = () => {
    setActiveRoute('#dashboard');
    window.location.hash = '#dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="trust-page" className="w-full text-neutral-900 dark:text-white select-none pb-24 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matching User Image Exact Reference) */}
      {/* ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F8F6F1] dark:bg-transparent overflow-hidden">
        {/* Subtle radial ambient background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] blur-[140px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow: — TRUST ARCHITECTURE · PAYMENT SECURITY — */}
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-mono uppercase tracking-[0.25em] font-semibold mb-6 sm:mb-8 transition-colors duration-300" style={{ color: themeColor }}>
            <span className="w-4 sm:w-6 h-px opacity-75" style={{ backgroundColor: themeColor }} />
            <span>TRUST ARCHITECTURE · PAYMENT SECURITY</span>
            <span className="w-4 sm:w-6 h-px opacity-75" style={{ backgroundColor: themeColor }} />
          </div>

          {/* Main Huge Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Trust is <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>engineered.</em>
            <br />
            Not promised.
          </h1>

          {/* Description Paragraph */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mt-6 sm:mt-7 leading-relaxed font-normal">
            Every dollar that flows through vvEntra is protected by five layers of structured trust. Identity verification. Escrow custody. Staged reveal. Clear dispute resolution. And for premium deals, a platform-backed guarantee. This page explains exactly how your money and your intellectual property are protected.
          </p>

          {/* 4 Pill Badges below hero paragraph */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-8 sm:mt-10">
            {[
              { label: 'Escrow held', id: 'escrow' },
              { label: 'NDA gated', id: 'nda' },
              { label: 'ID verified', id: 'id' },
              { label: '5-day disputes', id: 'disputes' }
            ].map((badge) => (
              <div
                key={badge.id}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 dark:border-white/10 bg-white dark:bg-[#120E0B] text-neutral-800 dark:text-neutral-300 text-xs sm:text-sm font-mono tracking-wide shadow-sm"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full shrink-0" 
                  style={{ backgroundColor: themeColor }} 
                />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SECTION 01: THE TRUST PARADOX (Matching Reference Image) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F2EEE5] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 01   THE TRUST PARADOX */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              01
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-medium">
              THE TRUST PARADOX
            </span>
          </div>

          {/* Heading - Accurately configured to 2 lines only */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            The problem every <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>idea marketplace</em> has
            <br />
            failed to solve.
          </h2>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-5 sm:mt-6 leading-relaxed font-normal">
            Buying a business opportunity is fundamentally different from buying a physical product.<br className="hidden sm:inline" />
            Once intellectual property is revealed, it cannot be returned. This creates an unsolvable<br className="hidden sm:inline" />
            trust problem, until you engineer around it.
          </p>

          {/* The Fear Standoff (Architect vs Buyer) */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-12 sm:mt-16 text-left">
            
            {/* Left Card: ARCHITECT'S FEAR */}
            <div className="trust-card p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-md dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300 min-h-[250px] sm:min-h-[270px]">
              <div>
                <div 
                  className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-5 sm:mb-6 flex items-center gap-1.5"
                  style={{ color: themeColor }}
                >
                  <span>— ARCHITECT'S FEAR</span>
                </div>

                <blockquote className="font-serif italic text-lg sm:text-[1.28rem] text-neutral-900 dark:text-neutral-200 leading-relaxed font-normal">
                  “If I show the buyer my opportunity, they will steal it without paying. I cannot show the substance until I am paid.”
                </blockquote>
              </div>

              <div className="pt-6 mt-8 border-t border-black/8 dark:border-white/5 text-[10.5px] sm:text-[11px] font-mono tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                THE SELLER CANNOT REVEAL FIRST.
              </div>
            </div>

            {/* Central "vs" Badge */}
            <div 
              className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 bg-white dark:bg-[#0D0B0A] shadow-lg dark:shadow-2xl z-20 mx-auto -my-3 md:my-0 transition-transform duration-300 hover:scale-110"
              style={{ borderColor: themeColor }}
            >
              <span className="font-serif italic text-sm sm:text-base font-medium select-none" style={{ color: themeColor }}>
                vs
              </span>
            </div>

            {/* Right Card: BUYER'S FEAR */}
            <div className="trust-card p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-md dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300 min-h-[250px] sm:min-h-[270px]">
              <div>
                <div 
                  className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-5 sm:mb-6 flex items-center gap-1.5"
                  style={{ color: themeColor }}
                >
                  <span>— BUYER'S FEAR</span>
                </div>

                <blockquote className="font-serif italic text-lg sm:text-[1.28rem] text-neutral-900 dark:text-neutral-200 leading-relaxed font-normal">
                  “If I pay before seeing the opportunity, the architect could deliver junk or something I already know. I cannot pay until I see the substance.”
                </blockquote>
              </div>

              <div className="pt-6 mt-8 border-t border-black/8 dark:border-white/5 text-[10.5px] sm:text-[11px] font-mono tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                THE BUYER CANNOT PAY FIRST.
              </div>
            </div>

          </div>

          {/* Full-Width Resolution Card with Left Colored Accent Bar */}
          <div 
            className="trust-card mt-6 sm:mt-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 border-l-[4px] shadow-md dark:shadow-2xl text-left relative overflow-hidden group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300"
            style={{ borderLeftColor: themeColor }}
          >
            <div 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold mb-3 flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span>VVENTRA'S RESOLUTION</span>
            </div>

            <p className="font-serif text-base sm:text-lg lg:text-[1.2rem] text-neutral-900 dark:text-neutral-200 leading-relaxed font-normal">
              Neither party reveals or pays first. Both commit progressively through a{' '}
              <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                staged reveal
              </em>{' '}
              protected by{' '}
              <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                escrow custody
              </em>
              , where each tier of trust unlocks the next layer of value.
            </p>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 3. SECTION 02: FIVE DEFENSE LAYERS (Exact Redesign) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#FAF8F4] dark:bg-transparent transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header (Exact 2-line title and clean subtitle) */}
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14]">
              Trust is not one thing. It is{' '}
              <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
                five layers
              </em>
              <br />
              engineered together.
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-5 sm:mt-6 leading-relaxed font-normal">
              Each layer protects against a specific failure mode. Together they create an architecture<br className="hidden sm:inline" />
              where bad actors are filtered at every step, and good actors transact with confidence.
            </p>
          </div>

          {/* 5 Stacked Cards */}
          <div className="space-y-4 sm:space-y-5">
            {FIVE_DEFENSE_LAYERS.map((layer) => (
              <div
                key={layer.num}
                className="trust-card p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-md dark:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300"
              >
                {/* Left Circle & Middle Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
                  {/* Number Circle Badge */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border bg-neutral-100/80 dark:bg-white/[0.02] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ borderColor: themeColor }}
                  >
                    <span
                      className="font-serif italic text-lg sm:text-xl font-normal select-none"
                      style={{ color: themeColor }}
                    >
                      {layer.num}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-semibold mb-2 sm:mb-2.5">
                      {layer.eyebrow}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-normal tracking-tight mb-2 sm:mb-2.5">
                      {layer.titlePrefix}
                      <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                        {layer.titleHighlight}
                      </em>
                      {layer.titleSuffix}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed font-normal max-w-xl">
                      {layer.description}
                    </p>
                  </div>
                </div>

                {/* Right Checklist Column */}
                <div className="w-full lg:w-[280px] shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/5 lg:pl-8 flex flex-col justify-center">
                  <div
                    className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-2.5 sm:mb-3"
                    style={{ color: themeColor }}
                  >
                    {layer.checklistHeader}
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {layer.checklists.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-300 font-medium">
                        <span className="font-semibold text-xs leading-none shrink-0" style={{ color: themeColor }}>
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SECTION 03: ESCROW FLOW · VISUALISED (Exact Redesign) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F2EEE5] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 03   ESCROW FLOW · VISUALISED */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              03
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-medium">
              ESCROW FLOW · VISUALISED
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            Follow the <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>money.</em>
            <br />
            From buyer commitment to architect
            <br />
            settlement.
          </h2>

          {/* Subtitle paragraph */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-5 sm:mt-6 leading-relaxed font-normal">
            Every transaction flows through this exact sequence. The money is never under the control<br className="hidden sm:inline" />
            of either party. It is held by vvEntra's escrow infrastructure and released only when the<br className="hidden sm:inline" />
            agreed conditions are met.
          </p>

          {/* Large Escrow Visual Terminal Card */}
          <div className="trust-card mt-12 sm:mt-16 p-6 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-2xl text-left">
            
            {/* Top Bar inside card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-black/8 dark:border-white/5">
              <div className="font-serif text-base sm:text-lg text-neutral-900 dark:text-white font-medium">
                Sample transaction · VVE-2438 · $4,800
              </div>
              <div className="flex items-center gap-2 font-mono text-[10.5px] sm:text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                <span>STANDARD ESCROW FLOW</span>
              </div>
            </div>

            {/* Inner Sub-container: 3 Actor Cards */}
            <div className="p-4 sm:p-6 rounded-xl bg-[#EBE7DD] dark:bg-[#090807] border border-black/10 dark:border-white/5 my-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. BUYER */}
                <div className="trust-card rounded-xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 mb-3.5">
                    <User className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-semibold mb-1">
                    — BUYER
                  </div>
                  <div className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-white font-medium mb-1.5">
                    PE Director
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    VERIFIED · KYC COMPLETE
                  </div>
                </div>

                {/* 2. VVENTRA ESCROW (Highlighted Center Card) */}
                <div 
                  className="trust-card rounded-xl bg-white dark:bg-[#0D0B0A] border-2 p-5 sm:p-6 text-center flex flex-col items-center justify-center relative shadow-md dark:shadow-lg"
                  style={{ 
                    borderColor: `${themeColor}90`,
                    boxShadow: `0 0 25px ${themeColor}15`
                  }}
                >
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-3.5 border"
                    style={{ 
                      backgroundColor: `${themeColor}20`,
                      borderColor: `${themeColor}50`,
                      color: themeColor 
                    }}
                  >
                    <Lock className="w-5 h-5" style={{ color: themeColor }} />
                  </div>
                  <div 
                    className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-1"
                    style={{ color: themeColor }}
                  >
                    — VVENTRA ESCROW
                  </div>
                  <div className="font-serif italic text-lg sm:text-xl font-normal mb-1.5" style={{ color: themeColor }}>
                    Neutral custody
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                    FIDUCIARY · REGULATED
                  </div>
                </div>

                {/* 3. ARCHITECT */}
                <div className="trust-card rounded-xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 mb-3.5">
                    <Shield className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-semibold mb-1">
                    — ARCHITECT
                  </div>
                  <div className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-white font-medium mb-1.5">
                    Senior · 2 Exits
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    VERIFIED · BANK CONFIRMED
                  </div>
                </div>

              </div>
            </div>

            {/* Step Sequence Rows (01, 02, 03, 04a, 04b) */}
            <div className="space-y-3 sm:space-y-4 pt-1">
              
              {/* Row 01 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 py-3 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-semibold shrink-0 w-8 pt-0.5" style={{ color: themeColor }}>
                    01
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    <strong className="text-neutral-900 dark:text-white font-medium">Buyer initiates unlock</strong> on VVE-2438. Payment of $4,800 debited via card / bank transfer.
                  </p>
                </div>
                <div className="shrink-0 pl-12 sm:pl-0">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase inline-block whitespace-nowrap bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400">
                    INITIATED
                  </span>
                </div>
              </div>

              {/* Row 02 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 py-3 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-semibold shrink-0 w-8 pt-0.5" style={{ color: themeColor }}>
                    02
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    Funds held in vvEntra escrow. <strong className="text-neutral-900 dark:text-white font-medium">Architect receives notification</strong> of committed payment. Content unlock begins.
                  </p>
                </div>
                <div className="shrink-0 pl-12 sm:pl-0">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase inline-block whitespace-nowrap border"
                    style={{
                      backgroundColor: `${themeColor}20`,
                      borderColor: `${themeColor}40`,
                      color: themeColor
                    }}
                  >
                    $4,800 HELD
                  </span>
                </div>
              </div>

              {/* Row 03 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 py-3 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-semibold shrink-0 w-8 pt-0.5" style={{ color: themeColor }}>
                    03
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    Buyer reviews opportunity. <strong className="text-neutral-900 dark:text-white font-medium">7-day inspection window</strong> opens. Buyer can raise dispute with documented evidence if material misrepresentation found.
                  </p>
                </div>
                <div className="shrink-0 pl-12 sm:pl-0">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase inline-block whitespace-nowrap border"
                    style={{
                      backgroundColor: `${themeColor}20`,
                      borderColor: `${themeColor}40`,
                      color: themeColor
                    }}
                  >
                    INSPECTION OPEN
                  </span>
                </div>
              </div>

              {/* Row 04a */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 py-3 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-semibold shrink-0 w-8 pt-0.5" style={{ color: themeColor }}>
                    04a
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    <strong className="text-neutral-900 dark:text-white font-medium">Path A · Buyer satisfied.</strong> Funds release to architect minus platform commission (typically 12–18%). Architect receives $4,032 net within 24 hours.
                  </p>
                </div>
                <div className="shrink-0 pl-12 sm:pl-0">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase inline-block whitespace-nowrap border"
                    style={{
                      backgroundColor: `${themeColor}25`,
                      borderColor: `${themeColor}60`,
                      color: themeColor
                    }}
                  >
                    RELEASED
                  </span>
                </div>
              </div>

              {/* Row 04b */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 py-3 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-semibold shrink-0 w-8 pt-0.5" style={{ color: themeColor }}>
                    04b
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    <strong className="text-neutral-900 dark:text-white font-medium">Path B · Buyer disputes.</strong> Funds frozen. Both parties submit evidence. vvEntra moderation team reviews and resolves within 5 business days.
                  </p>
                </div>
                <div className="shrink-0 pl-12 sm:pl-0">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase inline-block whitespace-nowrap bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400">
                    FROZEN · UNDER REVIEW
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. SECTION 04: STAGED REVEAL MECHANISM (Exact Redesign) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F5F2EB] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 04   STAGED REVEAL MECHANISM */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              04
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              STAGED REVEAL MECHANISM
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            Four tiers. Each one unlocks{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              more substance
            </em>
            <br />
            for{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              more commitment.
            </em>
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            This is how real M&A deals work. NDA before the data room. Deposit before due diligence.<br className="hidden sm:inline" />
            Full payment before closing. vvEntra digitises this proven flow for business opportunities of<br className="hidden sm:inline" />
            every scale.
          </p>

          {/* 5 Staged Tier Cards Stack with Left Connector Line */}
          <div className="mt-12 sm:mt-16 space-y-4 sm:space-y-5 text-left relative">
            {STAGED_TIERS.map((tier, idx) => (
              <React.Fragment key={tier.num}>
                {/* Vertical connecting line between adjacent cards under number column */}
                {idx > 0 && (
                  <div className="flex pl-9 sm:pl-11 -my-4 sm:-my-5 z-0 relative pointer-events-none">
                    <div className="w-px h-4 sm:h-5 bg-black/20 dark:bg-white/15" />
                  </div>
                )}
                
                <div className="trust-card trust-tier-card p-6 sm:p-7 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-md dark:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-black/30 dark:hover:border-white/25 transition-all duration-300 relative z-10">
                  
                  {/* Left Column: Number + Title & Cost */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:w-[340px] shrink-0">
                    <div 
                      className="font-serif italic text-3xl sm:text-4xl lg:text-[2.6rem] font-normal shrink-0 w-14 sm:w-16 leading-none select-none transition-transform duration-300 group-hover:scale-105"
                      style={{ color: themeColor }}
                    >
                      {tier.num}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-medium tracking-tight mb-1.5 sm:mb-2">
                        {tier.titlePrefix}
                        <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                          {tier.titleHighlight}
                        </em>
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F0E8] dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase font-semibold">
                        <span className="text-neutral-600 dark:text-neutral-400">{tier.costLabel}</span>
                        <span style={{ color: themeColor }}>{tier.costDetail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Description / What's visible */}
                  <div className="flex-1 min-w-0 text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal lg:px-4">
                    <strong className="text-neutral-900 dark:text-white font-semibold">{tier.whatLabel}</strong> {tier.whatContent}
                  </div>

                  {/* Right Column: Percentage / Status Badge */}
                  <div className="w-full lg:w-[120px] shrink-0 flex lg:flex-col items-baseline lg:items-end justify-between lg:justify-center border-t lg:border-t-0 border-black/10 dark:border-white/5 pt-3 lg:pt-0">
                    <div className="px-3 py-1.5 rounded-lg bg-[#F8F6F0] dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-end">
                      <div 
                        className="font-serif text-2xl sm:text-3xl font-semibold leading-none mb-1 select-none"
                        style={{ color: themeColor }}
                      >
                        {tier.percent}
                      </div>
                      <div className="text-[9px] sm:text-[9.5px] font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-bold">
                        {tier.percentSub}
                      </div>
                    </div>
                  </div>

                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SECTION 05: REFUND POLICY (Exact Match to User Image) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#EBE6DC] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 05   REFUND POLICY */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              05
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              REFUND POLICY
            </span>
          </div>

          {/* Heading - 2 lines */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            Refunds are{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              structured.
            </em>
            <br />
            Not subjective.
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            Most platforms either refund too easily, which lets buyers consume content and claim<br className="hidden sm:inline" />
            dissatisfaction, or refund too rarely, which destroys buyer trust. vvEntra uses documented<br className="hidden sm:inline" />
            eligibility criteria, applied consistently by moderation.
          </p>

          {/* 2 Comparison Cards Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-12 sm:mt-16 text-left">
            
            {/* Left Card: REFUNDS ARE GRANTED WHEN */}
            <div 
              className="trust-card trust-refund-card trust-granted p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300 relative border-t-4"
              style={{ borderTopColor: themeColor }}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/30 text-emerald-800 dark:text-emerald-300 text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold mb-4 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  <span>REFUNDS ARE GRANTED WHEN</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-medium tracking-tight mb-6">
                  The architect{' '}
                  <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                    materially misrepresents
                  </em>{' '}
                  the opportunity
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-sm leading-none shrink-0 pt-0.5" style={{ color: themeColor }}>
                      →
                    </span>
                    <span>Documentation depth is materially less than advertised (e.g., promised 120 pages, delivered 40)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-sm leading-none shrink-0 pt-0.5" style={{ color: themeColor }}>
                      →
                    </span>
                    <span>Content is plagiarised, AI-generated boilerplate, or duplicates a known existing opportunity</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-sm leading-none shrink-0 pt-0.5" style={{ color: themeColor }}>
                      →
                    </span>
                    <span>Architect made factually false claims about credentials, track record, or exit history</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-sm leading-none shrink-0 pt-0.5" style={{ color: themeColor }}>
                      →
                    </span>
                    <span>Critical promised sections are missing (e.g., financial model advertised but not included)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-sm leading-none shrink-0 pt-0.5" style={{ color: themeColor }}>
                      →
                    </span>
                    <span>The opportunity is fundamentally different from what was previewed in Tier 0–2</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: REFUNDS ARE NOT GRANTED WHEN */}
            <div className="trust-card trust-refund-card trust-rejected p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300 relative border-t-4 border-t-rose-500">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-600/30 text-rose-800 dark:text-rose-300 text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold mb-4 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                  <span>REFUNDS ARE NOT GRANTED WHEN</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-medium tracking-tight mb-6">
                  The buyer's{' '}
                  <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                    circumstances or opinions
                  </em>{' '}
                  change after access
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 pt-0.5">
                      ×
                    </span>
                    <span>Buyer simply disagrees with the strategy or market thesis</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 pt-0.5">
                      ×
                    </span>
                    <span>Buyer's market view differs from the architect's</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 pt-0.5">
                      ×
                    </span>
                    <span>Buyer changes their mind after consuming the content</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 pt-0.5">
                      ×
                    </span>
                    <span>Buyer claims they "already knew" the idea (subjective, unverifiable)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold text-sm leading-none shrink-0 pt-0.5">
                      ×
                    </span>
                    <span>Buyer's investment priorities shift after due diligence</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. SECTION 06: DISPUTE RESOLUTION (Matching Image 1) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F5F1E9] dark:bg-[#0A0908] transition-colors duration-300">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 06   DISPUTE RESOLUTION */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              06
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              DISPUTE RESOLUTION
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            When things go wrong, they are resolved in
            <br />
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              five days.
            </em>
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            A documented SLA. Equal voice for both sides. Clear evidence requirements. No black-box<br className="hidden sm:inline" />
            decisions. Resolution within five business days, every time.
          </p>

          {/* 5 Milestone Process Nodes as High-Contrast Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-4 lg:gap-5 mt-14 sm:mt-18 text-center relative">
            {[
              {
                num: '01',
                title: 'Dispute raised',
                day: 'DAY 0',
                desc: 'Buyer submits dispute within inspection window with specific evidence of misrepresentation.'
              },
              {
                num: '02',
                title: 'Architect responds',
                day: 'DAY 1–2',
                desc: 'Architect has 48 hours to submit counter-evidence and contextual response.'
              },
              {
                num: '03',
                title: 'Moderation review',
                day: 'DAY 3–4',
                desc: 'vvEntra team reviews both submissions against documented refund criteria.'
              },
              {
                num: '04',
                title: 'Decision rendered',
                day: 'DAY 5',
                desc: 'Outcome communicated to both parties with reasoning. No black-box decisions.'
              },
              {
                num: '✓',
                title: 'Resolution executed',
                day: 'WITHIN 24H',
                desc: 'Refund processed, payment released, or partial settlement applied based on findings.'
              }
            ].map((node, idx) => (
              <div 
                key={idx} 
                className="trust-card p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-sm dark:shadow-md flex flex-col items-center group hover:shadow-lg hover:border-black/30 dark:hover:border-white/25 transition-all text-center"
              >
                {/* Circle Badge */}
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 bg-[#F8F6F0] dark:bg-white/5 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ borderColor: themeColor }}
                >
                  <span 
                    className="font-serif italic text-lg sm:text-xl font-bold select-none"
                    style={{ color: themeColor }}
                  >
                    {node.num}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="font-serif text-base sm:text-lg text-neutral-900 dark:text-white font-medium mb-1.5 tracking-tight">
                  {node.title}
                </h3>

                {/* Day Badge */}
                <div 
                  className="inline-flex px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase font-bold mb-2.5 bg-[#FAF7F2] dark:bg-white/5 border border-black/10 dark:border-white/10"
                  style={{ color: themeColor }}
                >
                  {node.day}
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. SECTION 07: PREMIUM TIER (Matching Image 2) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#EBE5DB] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 07   PREMIUM TIER */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              07
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              PREMIUM TIER
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            For high-value deals, the platform itself
            <br />
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              guarantees
            </em>{' '}
            the payment.
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            On transactions above $10,000, vvEntra steps in as the guarantor. Architects receive<br className="hidden sm:inline" />
            settlement even during disputes. Buyers receive a premium verification status. Risk<br className="hidden sm:inline" />
            transfers from the parties to the platform.
          </p>

          {/* 2 Side-by-Side Cards (Architects vs Buyers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-12 sm:mt-16 text-left">
            
            {/* Left Card: FOR ARCHITECTS */}
            <div className="trust-card p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300">
              <div>
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/15 dark:border-white/10 bg-[#F4F0E8] dark:bg-[#14110E] text-[10.5px] font-mono tracking-wider uppercase font-bold mb-5 sm:mb-6" style={{ color: themeColor }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                  <span>FOR ARCHITECTS</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[1.7rem] text-neutral-900 dark:text-white font-medium tracking-tight leading-snug mb-4">
                  Guaranteed <em className="font-serif italic font-normal" style={{ color: themeColor }}>settlement.</em>
                  <br />
                  Even during disputes.
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal mb-7">
                  When you list a premium opportunity, vvEntra commits to settling your payment within 48 hours of full unlock, regardless of dispute status. The platform absorbs the risk while disputes are reviewed.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  {[
                    'Payment within 48 hours of unlock',
                    'Platform absorbs dispute risk up to cap',
                    'Priority dispute review by senior moderators',
                    'Premium architect badge on profile',
                    'Coverage cap up to $50,000 per transaction'
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-xs leading-none shrink-0 pt-0.5 font-bold" style={{ color: themeColor }}>
                        ✦
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card: FOR BUYERS */}
            <div className="trust-card p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col justify-between group hover:border-black/30 dark:hover:border-white/20 transition-all duration-300">
              <div>
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/15 dark:border-white/10 bg-[#F4F0E8] dark:bg-[#14110E] text-[10.5px] font-mono tracking-wider uppercase font-bold mb-5 sm:mb-6" style={{ color: themeColor }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                  <span>FOR BUYERS</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[1.7rem] text-neutral-900 dark:text-white font-medium tracking-tight leading-snug mb-4">
                  Premium <em className="font-serif italic font-normal" style={{ color: themeColor }}>verification.</em>
                  <br />
                  Priority access.
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal mb-7">
                  Premium-verified buyers gain access to the highest-tier opportunities and earn faster trust from architects. Your verification badge signals serious intent and reduces friction at every tier of access.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  {[
                    'Premium buyer badge on profile',
                    'Access to senior architect tier opportunities',
                    'Architect approval typically within 4 hours',
                    'Higher unlock limits per quarter',
                    'Priority placement in deal flow recommendations'
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-xs leading-none shrink-0 pt-0.5 font-bold" style={{ color: themeColor }}>
                        ✦
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. SECTION 08: INFRASTRUCTURE PARTNERS (Matching Image 3) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#F5F2EB] dark:bg-[#0A0908] transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 08   INFRASTRUCTURE PARTNERS */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              08
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              INFRASTRUCTURE PARTNERS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            Built on the same rails as{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              Stripe, Razorpay,
            </em>
            <br />
            and major exchanges.
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            vvEntra does not reinvent payment infrastructure. We use the same regulated payment<br className="hidden sm:inline" />
            processors, escrow providers, and KYC systems that power global commerce. Your money<br className="hidden sm:inline" />
            flows through battle-tested rails.
          </p>

          {/* 4 Partner Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-12 sm:mt-16 text-center">
            {[
              {
                highlight: 'Stripe',
                suffix: ' Connect',
                label: '— GLOBAL PAYMENTS + ESCROW'
              },
              {
                highlight: 'Razorpay',
                suffix: ' Route',
                label: '— INDIA TRANSACTIONS'
              },
              {
                highlight: 'Persona',
                suffix: ' KYC',
                label: '— IDENTITY VERIFICATION'
              },
              {
                highlight: 'Tazapay',
                suffix: '',
                label: '— CROSS-BORDER ESCROW'
              }
            ].map((partner, idx) => (
              <div 
                key={idx}
                className="trust-card trust-partner-card p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-md dark:shadow-lg flex flex-col justify-center items-center group hover:border-black/30 dark:hover:border-white/25 transition-all duration-300"
              >
                <div className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-white font-medium mb-2">
                  <em className="font-serif italic font-normal" style={{ color: themeColor }}>
                    {partner.highlight}
                  </em>
                  {partner.suffix}
                </div>
                <div className="text-[10px] sm:text-[10.5px] font-mono tracking-widest text-neutral-600 dark:text-neutral-400 font-bold">
                  {partner.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. SECTION 09: FREQUENTLY ASKED (Refined & Elevated) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-[var(--line)] bg-[#EBE5DB] dark:bg-[#070605] transition-colors duration-300">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow: 09   FREQUENTLY ASKED */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <span 
              className="font-serif italic text-base sm:text-lg font-semibold" 
              style={{ color: themeColor }}
            >
              09
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 font-semibold">
              FREQUENTLY ASKED
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.14] max-w-4xl mx-auto">
            The questions{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              everyone asks
            </em>{' '}
            before their first
            <br />
            transaction.
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 mt-5 sm:mt-6 leading-relaxed font-normal">
            Direct, unequivocal answers regarding escrow release conditions, dispute resolution guarantees,<br className="hidden sm:inline" />
            fee structures, and cross-border legal protections.
          </p>

          {/* Interactive Category Filter Pills + Expand All Control */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-10 sm:mt-12 pb-2 border-b border-black/10 dark:border-white/5">
            {/* Filter Pills */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-sm">
              {[
                { key: 'all', label: 'All Questions', count: 7 },
                { key: 'escrow', label: 'Escrow & Safety', count: 3 },
                { key: 'tiers', label: 'Tiers & Fees', count: 2 },
                { key: 'legal', label: 'Privacy & Legal', count: 2 },
              ].map((tab) => {
                const isActive = faqFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFaqFilter(tab.key as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#F4F0E8] dark:bg-white/10 text-neutral-950 dark:text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
                    }`}
                    style={isActive ? { color: themeColor } : {}}
                  >
                    <span>{tab.label}</span>
                    <span 
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono border font-bold"
                      style={{
                        borderColor: isActive ? `${themeColor}40` : 'rgba(0,0,0,0.12)',
                        backgroundColor: isActive ? `${themeColor}15` : 'transparent',
                        color: isActive ? themeColor : '#525252'
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Toggle All */}
            <button
              onClick={() => {
                if (openFaqIds.length === FAQ_ITEMS.length) {
                  setOpenFaqIds([]);
                } else {
                  setOpenFaqIds(FAQ_ITEMS.map(f => f.id));
                }
              }}
              className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 font-semibold"
            >
              {openFaqIds.length === FAQ_ITEMS.length ? 'Collapse All —' : 'Expand All +'}
            </button>
          </div>

          {/* FAQ Accordion Items Stack */}
          <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4 text-left">
            {FAQ_ITEMS.filter(item => faqFilter === 'all' || item.category === faqFilter).map((item) => {
              const isOpen = openFaqIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`trust-card trust-faq-item rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-[#0D0B0A] border-2 shadow-lg dark:shadow-2xl'
                      : 'bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 hover:border-black/30 dark:hover:border-white/20 shadow-sm'
                  }`}
                  style={{
                    borderColor: isOpen ? themeColor : undefined,
                    boxShadow: isOpen ? `0 0 25px ${themeColor}15` : undefined
                  }}
                >
                  {/* Clickable Header Row */}
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                  >
                    <span className="font-serif text-lg sm:text-xl text-neutral-900 dark:text-white font-medium tracking-tight group-hover:text-neutral-950 dark:group-hover:text-neutral-100 transition-colors">
                      {item.question}
                    </span>

                    {/* Circular Action Toggle */}
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'border-2'
                          : 'border-black/20 text-neutral-600 group-hover:border-black/40 group-hover:text-neutral-950 dark:border-white/15 dark:text-neutral-400 dark:group-hover:border-white/30 dark:group-hover:text-white'
                      }`}
                      style={
                        isOpen
                          ? {
                              borderColor: themeColor,
                              backgroundColor: `${themeColor}15`,
                              color: themeColor
                            }
                          : {}
                      }
                    >
                      {isOpen ? (
                        <X className="w-4 h-4 transition-transform duration-200" />
                      ) : (
                        <Plus className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Body Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal mb-5">
                        {item.answer}
                      </p>

                      {/* Premium Trust / Assurance Footnote Bar */}
                      <div className="pt-3.5 border-t border-black/10 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <div className="flex items-center gap-2">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold border"
                            style={{
                              borderColor: `${themeColor}40`,
                              backgroundColor: `${themeColor}15`,
                              color: themeColor
                            }}
                          >
                            {item.categoryLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: themeColor }} />
                          <span>{item.trustTag}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Elevated Escrow Officer Concierge Assistance Bar */}
          <div className="trust-card mt-12 sm:mt-14 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}40`,
                  color: themeColor
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: themeColor }} />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-neutral-900 dark:text-white font-medium">
                  Have specific transaction terms or custom escrow requirements?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                  Our institutional compliance and escrow moderation desk is available for high-tier diligence.
                </p>
              </div>
            </div>

            <button
              onClick={() => addToast('Connecting to vvEntra Institutional Escrow Desk.', 'info')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold border border-black/20 hover:border-black/40 text-neutral-900 hover:text-black bg-[#F5F2EB] hover:bg-[#EBE5DB] dark:border-white/15 dark:hover:border-white/30 dark:text-white dark:bg-white/5 dark:hover:bg-white/10 transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Contact Escrow Desk
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. CLOSING SECTION: NOW YOU KNOW EXACTLY HOW IT WORKS */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#F8F7F4] dark:bg-[#070605] text-center relative overflow-hidden border-t border-black/8 dark:border-[var(--line)] transition-colors duration-300">
        {/* Ambient atmospheric glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] blur-[150px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          
          {/* Top Stylized Monogram Logo */}
          <div className="mb-6 sm:mb-7 transition-transform duration-300 hover:scale-105">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
              viewBox="0 0 38 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M2.5 3.5L10.5 24.5L19 6.5L27.5 24.5L35.5 3.5" 
                stroke={themeColor} 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          {/* Eyebrow: — TRUST IS THE PLATFORM */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold"
              style={{ color: themeColor }}
            >
              — TRUST IS THE PLATFORM
            </span>
          </div>

          {/* Headline: Now you know exactly how it works. */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.75rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.12] mb-5 sm:mb-6 max-w-2xl mx-auto">
            Now you know{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              exactly
            </em>{' '}
            how it works.
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-9 sm:mb-11">
            Every dollar protected. Every IP gated. Every dispute resolved within five days. Trust is not a tagline at vvEntra. It is the architecture.
          </p>

          {/* Redesigned 3D Luxury Action Buttons (Pill-shaped, Tactile Depth & Motion) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            
            {/* Primary: 3D Role-Themed Apply for Access Pill */}
            <button
              onClick={handleApplyClick}
              className={`relative group cursor-pointer select-none rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white tracking-wide transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2.5 active:translate-y-[2px] ${
                isArchitect
                  ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3.5px_0_#0E622B,0_8px_20px_rgba(22,163,74,0.4)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.85),0_4.5px_0_#0E622B,0_10px_24px_rgba(22,163,74,0.5)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#0E622B,0_3px_8px_rgba(22,163,74,0.3)]'
                  : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_3.5px_0_#9A3412,0_8px_20px_rgba(234,88,12,0.4)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.85),0_4.5px_0_#9A3412,0_10px_24px_rgba(234,88,12,0.5)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#9A3412,0_3px_8px_rgba(234,88,12,0.3)]'
              }`}
            >
              {/* Sweeping Periodic Light Ray */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute top-0 bottom-0 w-28 -left-14 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-[1px] animate-light-ray pointer-events-none" />
              </div>

              <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                <span>{stage === 'verified' ? 'Verified Member' : 'Apply for access'}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </button>

            {/* Secondary: 3D Luxury Surface Back to Homepage Pill */}
            <button
              onClick={handleReturnToDashboard}
              className="relative group cursor-pointer select-none rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white tracking-wide transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white dark:bg-[#12100E] border border-black/15 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_0_rgba(0,0,0,0.08),0_6px_16px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_3px_0_rgba(0,0,0,0.7),0_8px_20px_rgba(0,0,0,0.5)] hover:-translate-y-[1px] active:translate-y-[2px]"
            >
              <span className="flex items-center gap-2">
                <span>Back to homepage</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white">→</span>
              </span>
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};
