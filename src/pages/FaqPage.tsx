import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Shield, 
  Plus, 
  Minus, 
  CheckCircle2, 
  X,
  Scale,
  ArrowRight,
  HelpCircle,
  Lock,
  FileCheck,
  Mail,
  MessageCircle,
  Phone
} from 'lucide-react';

interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
}

interface FaqSection {
  number: string;
  titlePrefix: string;
  titleItalic: string;
  questions: FaqQuestion[];
}

// ========================================================
// BUYER FAQ SECTIONS (Matches uploaded images 01 & 02)
// ========================================================
const BUYER_SECTIONS: FaqSection[] = [
  {
    number: '01',
    titlePrefix: 'Getting',
    titleItalic: 'started',
    questions: [
      {
        id: 'b-01-1',
        question: 'Who is vvEntra built for as a buyer?',
        answer: 'vvEntra is built for institutional operators, search fund buyers, private equity scouts, corporate venture teams, and serial entrepreneurs who have capital and execution capacity but need conviction-ready, de-risked venture blueprints. Rather than spending 6–12 months on exploratory R&D or paying predatory M&A broker retainers, buyers use vvEntra to acquire vetted IP, financial models, and technical architectures with immediate velocity.',
        highlight: 'Built for serious operators seeking execution-ready IP over raw idea decks.'
      },
      {
        id: 'b-01-2',
        question: 'How do I get access? Is this open or invitation-only?',
        answer: 'Exploring public teaser dossiers, market demand signals, and sector indices is open and free to everyone. However, committing an unlock fee and entering the confidential data room requires completing a simple 1-minute Buyer Capacity Verification to confirm you represent an active corporate entity, family office, search fund, or accredited individual operator.',
        highlight: 'Open discovery with gated, verified access for confidential data rooms.'
      },
      {
        id: 'b-01-3',
        question: 'What does "buyer capacity verification" actually require?',
        answer: 'Verification requires confirming your legal identity, corporate or LinkedIn profile, and certifying commercial execution intent. We do not require invasive bank statements or credit checks for initial browsing. Verification ensures architects are never exposing proprietary code to anonymous competitors, web scrapers, or bad-faith actors.',
        highlight: 'Lightweight KYC and commercial identity verification—no invasive financial audits.'
      },
      {
        id: 'b-01-4',
        question: 'Does it cost anything to join as a buyer?',
        answer: 'Absolutely zero. There are no registration fees, no monthly SaaS subscriptions, and no platform membership charges. You only pay when you deliberately choose to unlock a specific opportunity, and every dollar is protected in Delaware escrow until verified.',
        highlight: '$0 to join, $0 subscription fees. Pay only for what you choose to unlock.'
      },
      {
        id: 'b-01-5',
        question: 'How do I find the right opportunities for my thesis?',
        answer: 'You can filter by sector (AI & Automation, SaaS & B2B, Fintech, Climate Tech, HealthTech), operational maturity, and transaction size. Each listing features an unredacted teaser prospectus with TAM analysis, customer validation signals, unit economics summaries, and the architect’s verified operational pedigree.',
        highlight: 'Comprehensive thesis filtering with verified unit economics teasers.'
      }
    ]
  },
  {
    number: '02',
    titlePrefix: 'Payment &',
    titleItalic: 'trust',
    questions: [
      {
        id: 'b-02-1',
        question: 'How is my money protected when I pay?',
        answer: 'Every dollar paid on vvEntra clears directly into segregated, bankruptcy-remote statutory escrow trust accounts governed under the jurisdiction of the Delaware Court of Chancery. Funds are never held in vvEntra’s operating accounts. Capital is released to the architect only after you inspect milestone deliverables and issue formal sign-off.',
        highlight: 'Bankruptcy-remote Delaware Statutory Escrow with milestone release triggers.'
      },
      {
        id: 'b-02-2',
        question: 'What if I pay for an opportunity and it turns out to be junk?',
        answer: 'Every listing undergoes strict pre-admission screening by our technical curation board. However, if unredacted data room materials materially contradict the prospectus or lack the pledged architectural specifications, you can lodge an audit challenge within the 7-day inspection window. If the discrepancy is verified by our independent escrow officers, your unlock deposit is promptly refunded in full.',
        highlight: 'Material discrepancy protection backed by independent escrow arbitration.'
      },
      {
        id: 'b-02-3',
        question: "Why can't I just pay the full amount and see everything immediately?",
        answer: 'We intentionally enforce a 2-stage transaction architecture. Stage 1 (the 10% unlock fee) protects you from committing full capital before meeting the architect and conducting bilateral diligence. It protects the architect by ensuring only committed buyers access proprietary IP. Full capital is only committed once both parties agree on milestone scope in Stage 2.',
        highlight: '2-Stage structure prevents over-commitment before bilateral diligence.'
      },
      {
        id: 'b-02-4',
        question: 'What payment methods do you accept?',
        answer: 'Unlock deposits can be funded instantly via corporate credit card (Visa, MasterCard, American Express) or ACH. Stage 2 escrow balances can be funded via domestic Fedwire, international SWIFT wire, institutional ACH, or corporate invoice with zero foreign exchange spread.',
        highlight: 'Instant corporate cards for unlocks; Fedwire & SWIFT for Stage 2 escrow.'
      },
      {
        id: 'b-02-5',
        question: 'What\'s the Tier 2 "interest deposit" and what happens to it?',
        answer: 'When entering Stage 2 contract negotiations, the buyer funds the remaining balance into Delaware escrow. This is not paid out immediately to the architect—it remains locked in escrow and is disbursed in pre-agreed milestone increments (e.g., 30% on repository transfer, 30% on environment setup, 40% on final handover approval).',
        highlight: 'Staged milestone releases ensure architects only get paid as deliverables arrive.'
      },
      {
        id: 'b-02-6',
        question: 'Can I get a refund if I just change my mind?',
        answer: 'Unlock fees grant immediate access to confidential, proprietary blueprints and trigger an enforceable 24-month bilateral NDA. Because high-value proprietary IP is revealed instantly upon unlock, subjective "change of mind" cancellations do not qualify for an unlock refund. However, you are under zero obligation to proceed to Stage 2 and will never be charged further.',
        highlight: 'Unlocks are non-refundable upon confidential IP disclosure, but Stage 2 is 100% optional.'
      },
      {
        id: 'b-02-7',
        question: 'What is the vvEntra Premium Guarantee for buyers?',
        answer: 'The vvEntra Premium Guarantee guarantees three things: (1) 100% clean title and copyright conveyance under Delaware UCC Article 9 upon transaction close, (2) zero undisclosed debt, third-party liens, or encumbrances on acquired assets, and (3) full escrow refund protection if an architect misses critical milestone delivery deadlines without remediation.',
        highlight: 'Clean title guarantee, zero-encumbrance warranty, and milestone refund protection.'
      }
    ]
  },
  {
    number: '03',
    titlePrefix: 'Using the',
    titleItalic: 'platform',
    questions: [
      {
        id: 'b-03-1',
        question: 'How do I know if an architect is credible?',
        answer: 'Every architect must undergo mandatory multi-tier vetting: identity verification (KYC/AML), technical pedigree review (verifying previous exits, principal engineering or executive roles, and domain track record), and an audit of the opportunity\'s source code and financial models by our curation committee. Anonymous architects or unverified profiles are strictly barred from publishing.',
        highlight: 'Multi-tier KYC, technical pedigree audits, and zero anonymous listings.'
      },
      {
        id: 'b-03-2',
        question: 'Can I talk to the architect before I commit to anything?',
        answer: 'Prior to unlocking, you can review the architect\'s public verified profile, sector track record, and submit asynchronous screening queries through the listing terminal. Direct, unredacted 1-on-1 strategy meetings require the 10% unlock deposit and bilateral NDA to protect the architect\'s proprietary IP from uncompensated extraction.',
        highlight: 'Asynchronous screening is free; direct 1-on-1 meetings open upon the 10% diligence unlock.'
      },
      {
        id: 'b-03-3',
        question: 'What does "execution support" mean for an opportunity?',
        answer: '"Execution support" means the architect actively assists your team in implementing the venture. Depending on the path chosen, this ranges from repository handover and architectural onboarding (Documents Only), to weekly advisory and milestone reviews (Guidance), up to hands-on sprint pairing and operational co-execution for 30–45 days (Full Partnership).',
        highlight: 'Hands-on operational onboarding and technical sprint pairing tailored to your engagement tier.'
      },
      {
        id: 'b-03-4',
        question: "What if I want to acquire the architect's involvement as well?",
        answer: 'If you want the architect to join as an ongoing equity partner, fractional executive (e.g. fractional CTO/COO), or long-term advisor, you can structure a bespoke post-transaction agreement during the 7-day bilateral diligence window. The platform provides pre-drafted Delaware equity and advisory vesting addendums.',
        highlight: 'Standard addendums support transitioning architects into fractional executives or equity partners.'
      },
      {
        id: 'b-03-5',
        question: 'Is there exclusivity? Can the same opportunity be sold twice?',
        answer: 'While an opportunity is unlocked by an active buyer, it is temporarily locked from all other buyers during the 7-day diligence window. When a transaction completes under the "Full Partnership" or "Exclusive Execution" deed, exclusive commercial rights to that specific venture codebase and operational blueprint are permanently transferred under Delaware UCC Article 9.',
        highlight: '7-day exclusive diligence hold, with permanent exclusive IP transfer upon close.'
      },
      {
        id: 'b-03-6',
        question: 'How do I download the materials after I unlock?',
        answer: 'As soon as your unlock deposit clears into escrow, your secure data room vault decrypts. You can immediately access and download unredacted financial model sheets (.xlsx), technical architecture schematics, market intelligence reports (.pdf), and accept invites to private GitHub/GitLab repositories.',
        highlight: 'Instant data room decryption: download financial models, dossiers, and repo access.'
      }
    ]
  },
  {
    number: '04',
    titlePrefix: 'Disputes &',
    titleItalic: 'edge cases',
    questions: [
      {
        id: 'b-04-1',
        question: 'How exactly do I raise a dispute?',
        answer: 'You can initiate a dispute with a single click inside the Escrow Transaction Portal by clicking "Raise Audit Challenge". You select the dispute category (material prospectus discrepancy, missed delivery SLA, technical defect, or non-responsiveness), attach your supporting documentation, and the escrow timer freezes immediately while our dispute resolution board reviews the claim.',
        highlight: '1-click escrow freeze with neutral technical board review within 48 hours.'
      },
      {
        id: 'b-04-2',
        question: 'What happens if the architect disappears after I pay?',
        answer: 'Because all payments are held in segregated Delaware statutory escrow accounts, the architect cannot access your funds without milestone sign-off. If an architect is unresponsive for more than 48 business hours during diligence or misses a delivery SLA by 5 calendar days without notice, escrow auto-cancels and 100% of your funds are returned immediately.',
        highlight: 'Unresponsive architects trigger automated escrow cancellation and a 100% refund.'
      },
      {
        id: 'b-04-3',
        question: 'What if I find out the opportunity has already been executed by someone else?',
        answer: 'All listings come with a verified Warranty of Originality and Non-Infringement. If you establish within the 7-day inspection window that the exact software codebase or proprietary model was plagiarized or publicly released under an open-source license without disclosure, the transaction is declared void and your unlock deposit is refunded in full.',
        highlight: 'Warranty of Originality: plagiarized or undisclosed public IP results in an immediate refund.'
      },
      {
        id: 'b-04-4',
        question: 'Can I dispute the documentation depth vs what was promised?',
        answer: 'Yes. Every listing specifies exact deliverable benchmarks (e.g., number of architectural diagrams, page counts, verified unit economics models, and API integrations). If the decrypted data room materially fails to meet these documented specifications, our technical arbiters will verify the shortfall and issue a complete refund.',
        highlight: 'Objective deliverable benchmarks: shortfalls qualify for full escrow remediation.'
      },
      {
        id: 'b-04-5',
        question: 'What if I disagree with the dispute outcome?',
        answer: 'If either party is dissatisfied with the primary dispute determination, they may request an expedited secondary review by a panel of three independent Delaware-certified commercial arbiters. All platform agreements incorporate Delaware Court of Chancery arbitration rules for binding, fast-track commercial resolution.',
        highlight: 'Expedited secondary appeal governed under Delaware Court of Chancery arbitration rules.'
      },
      {
        id: 'b-04-6',
        question: "What if my issue isn't covered by the standard refund criteria?",
        answer: 'We maintain a dedicated Escrow Concierge Desk for non-standard institutional situations (such as cross-border corporate reorganizations, regulatory compliance shifts, or force majeure events). Our escrow officers evaluate non-standard claims with commercial fairness, with escrowed funds remaining protected until a mutually agreed resolution is reached.',
        highlight: 'Dedicated Escrow Concierge evaluates non-standard situations with commercial fairness.'
      }
    ]
  }
];

// ========================================================
// ARCHITECT FAQ SECTIONS (Matching Green Persona)
// ========================================================
const ARCHITECT_SECTIONS: FaqSection[] = [
  {
    number: '01',
    titlePrefix: 'Listing &',
    titleItalic: 'approval',
    questions: [
      {
        id: 'a-01-1',
        question: 'Who can become an architect on vvEntra?',
        answer: 'Architects on vvEntra are experienced founders, principal engineers, CTOs, product leaders, and senior operators with verifiable domain track records. We look for individuals who have built and scaled systems from zero to one or led major technical initiatives. Raw theoretical thinkers or idea-only consultants are screened out; we curate specifically for operator-grade execution capability.',
        highlight: 'Curated for proven founders, principal engineers, and senior operators.'
      },
      {
        id: 'a-01-2',
        question: "What's required for an opportunity to be approved?",
        answer: 'An approved opportunity must represent a complete, execution-ready venture architecture. This includes: (1) functional or architectural system designs, (2) audited financial models with unit economics and TAM validation, (3) a concrete regulatory/GTM roadmap, and (4) verified deliverables ready for repository transfer. Submissions consisting solely of pitch decks or vague concepts are rejected.',
        highlight: 'Requires technical blueprints, audited financial models, and repo deliverables.'
      },
      {
        id: 'a-01-3',
        question: 'How long does the approval process take?',
        answer: 'Our technical review committee evaluates submissions within 48 to 72 business hours. If clarifying documentation or redaction adjustments are needed, our editorial team will coordinate directly with you. Once approved, your listing is indexed immediately into the live intelligence terminal and buyer notification feeds.',
        highlight: '48 to 72-hour review turnaround with direct curator feedback.'
      },
      {
        id: 'a-01-4',
        question: 'What does "Senior Architect" status mean and how do I earn it?',
        answer: '"Senior Architect" is an institutional trust badge displayed on listing dossiers. It is earned by creators who have: (1) completed at least one verified commercial exit or held a VP/Director+ technical role at a Series B+ company, or (2) successfully settled two or more high-satisfaction milestone transactions on vvEntra with zero audit disputes.',
        highlight: 'Earned via verified exits, executive technical pedigree, or high-satisfaction transaction volume.'
      },
      {
        id: 'a-01-5',
        question: 'Can I list multiple opportunities at once?',
        answer: 'Yes. Verified architects can maintain multiple concurrent listings across different verticals (e.g., an AI workflow engine, a B2B compliance play, and a specialized D2C supply chain model). Each opportunity undergoes independent dossier verification and maintains its own segregated escrow vault.',
        highlight: 'Multiple concurrent listings supported with independent escrow vaults.'
      },
      {
        id: 'a-01-6',
        question: 'What if my opportunity is rejected? Can I appeal?',
        answer: 'Rejections include specific, written rubric feedback from the curation committee (e.g., insufficient financial model depth, unverified TAM assumptions, or incomplete technical diagrams). You can address the noted deficiencies and request an expedited re-review within 14 calendar days.',
        highlight: 'Transparent rubric feedback with a 14-day expedited re-review window.'
      }
    ]
  },
  {
    number: '02',
    titlePrefix: 'Pricing &',
    titleItalic: 'earnings',
    questions: [
      {
        id: 'a-02-1',
        question: 'How much should I price my opportunity at?',
        answer: 'Most opportunities on vvEntra are listed between $2,000 and $15,000, with enterprise and deep-tech architectures reaching $25,000+. We recommend benchmarking your price against the cost and time it would take a search fund or corporate venture team to build the blueprints from scratch (typically 3 to 6 months of senior engineering and advisory time, or $40,000+).',
        highlight: 'Benchmark against 3–6 months of senior engineering and advisory time.'
      },
      {
        id: 'a-02-2',
        question: "What's vvEntra's commission?",
        answer: 'vvEntra takes a flat 10% platform facilitation fee on successfully settled transactions. There are no upfront listing fees, no monthly SaaS subscriptions, and no appraisal charges. You keep 90% of every dollar cleared through Delaware escrow.',
        highlight: 'Flat 10% fee on settlement. You keep 90% of all gross payments.'
      },
      {
        id: 'a-02-3',
        question: 'When do I actually receive my money?',
        answer: 'For Stage 1, your 90% net cut of the unlock fee is credited to your balance upon completion of the 7-day bilateral diligence window. For Stage 2, escrow funds disburse automatically upon buyer milestone approval (or auto-release 7 business days following milestone delivery submission). Bank payouts clear in 1 to 3 business days.',
        highlight: 'Diligence funds clear after 7 days; Stage 2 releases upon milestone approval.'
      },
      {
        id: 'a-02-4',
        question: 'How do I get paid? What payment methods are available?',
        answer: 'Payouts are dispatched via integrated Stripe Connect, Wise, domestic ACH, or international SWIFT wire directly to your business or personal bank account in over 130 countries and major local currencies (USD, EUR, GBP, CAD, AUD, INR, and others).',
        highlight: 'Over 130 countries supported via Stripe, Wise, and SWIFT wires.'
      },
      {
        id: 'a-02-5',
        question: 'Can I offer execution support alongside the opportunity for extra income?',
        answer: 'Yes! The 3-tier Stage 2 structure exists specifically so you can earn more for active advisory. If the buyer selects "Full Partnership", you earn 100% of the listed value for 30–45 days of sprint pairing. If you prefer pure passive income, you can price and restrict your listing to "Documents Only".',
        highlight: 'Earn higher payouts for Full Partnership sprints or choose passive Documents Only.'
      },
      {
        id: 'a-02-6',
        question: 'What about taxes on my earnings?',
        answer: 'vvEntra generates standard year-end tax documentation (such as Form 1099-NEC for US-based creators or Form W-8BEN certifications for non-US international architects). Funds are paid out gross of local income taxes; you are responsible for reporting commercial earnings to your relevant tax authority.',
        highlight: 'Automated Form 1099/W-8BEN documentation provided for tax filings.'
      }
    ]
  },
  {
    number: '03',
    titlePrefix: 'IP',
    titleItalic: 'protection',
    questions: [
      {
        id: 'a-03-1',
        question: 'How is my IP protected before a buyer pays?',
        answer: 'Public listings display only high-level teasers, market validation signals, and blurred document snapshots. Your full system design records, source code repositories, and proprietary financial sheets remain securely encrypted until a buyer executes the bilateral NDA and deposits the unlock fee into escrow.',
        highlight: '100% encrypted data rooms. No unredacted IP is exposed without a signed NDA and deposit.'
      },
      {
        id: 'a-03-2',
        question: 'What if a buyer screenshots or downloads my content and shares it?',
        answer: 'Every unlock executes an enforceable 24-month Bilateral NDA under Delaware Court of Chancery jurisdiction. All accessed files, repository clones, and data room views are cryptographically watermarked with the buyer\'s verified legal entity name and IP address, providing indisputable forensic proof for legal injunctions or statutory damages.',
        highlight: 'Forensic watermarking and cryptographic access logs provide enforceable legal proof.'
      },
      {
        id: 'a-03-3',
        question: 'Can I reject a buyer who wants access to my opportunity?',
        answer: 'Yes. Architects have creator veto power. If an active competitor, unauthorized entity, or party in bad faith unlocks your listing, you have 48 hours to decline the engagement. The buyer’s deposit is refunded, their access keys are instantly revoked, and your IP remains sealed.',
        highlight: '48-hour creator veto right protects against unauthorized competitors.'
      },
      {
        id: 'a-03-4',
        question: 'Who owns the IP after the buyer unlocks?',
        answer: 'You do. Unlocking grants only temporary, confidential inspection rights during the 7-day diligence window. Full intellectual property ownership and commercial title remain 100% with you until the buyer executes Stage 2 and all milestone escrow payments have fully cleared.',
        highlight: 'You retain 100% ownership until all Stage 2 milestone escrow funds clear.'
      },
      {
        id: 'a-03-5',
        question: 'Can I list opportunities anonymously?',
        answer: 'While vvEntra verifies your real identity during KYC, you can elect to display a pseudonymized "Executive Handle" (e.g. "Senior Architect · Ex-Series B CTO") on the public marketplace if you are currently employed or under active corporate non-disclosures. Your true legal entity is disclosed only inside the bilateral NDA upon unlock.',
        highlight: 'Pseudonymized public handles supported for actively employed operators.'
      }
    ]
  }
];

export const FaqPage: React.FC = () => {
  const { role, setRole } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'b-01-1': false,
    'b-02-1': false,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Active sections based on role
  const activeSections = isArchitect ? ARCHITECT_SECTIONS : BUYER_SECTIONS;

  // Filter sections by search query if user types in search box
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return activeSections;

    return activeSections
      .map(sec => ({
        ...sec,
        questions: sec.questions.filter(
          item =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q) ||
            sec.titlePrefix.toLowerCase().includes(q) ||
            sec.titleItalic.toLowerCase().includes(q)
        )
      }))
      .filter(sec => sec.questions.length > 0);
  }, [activeSections, searchQuery]);

  // Total questions count across sections
  const totalQuestionsCount = useMemo(() => {
    return activeSections.reduce((acc, sec) => acc + sec.questions.length, 0);
  }, [activeSections]);

  const displayedQuestionsCount = useMemo(() => {
    return filteredSections.reduce((acc, sec) => acc + sec.questions.length, 0);
  }, [filteredSections]);

  return (
    <div className="w-full text-neutral-900 dark:text-white select-none pb-28 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matches Reference Header Exactly)       */}
      {/* ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Ambient glow in theme color */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[180px] pointer-events-none rounded-full opacity-15 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Eyebrow: — QUESTIONS ANSWERED · HONESTLY */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span 
              className="w-4 h-[2px] transition-colors"
              style={{ backgroundColor: themeColor }}
            />
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
              style={{ color: themeColor }}
            >
              QUESTIONS ANSWERED · HONESTLY
            </span>
          </div>

          {/* Main Headline: Everything you need before your first transaction. */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.85rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.12] mb-5">
            Everything you need{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              before
            </em>{' '}
            your first transaction.
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl px-2">
            vvEntra works differently from any platform you've used before. These are the questions every serious buyer and architect asks. Direct answers, no marketing fluff. Pick your side below.
          </p>

          {/* Search Bar with Counter on Right (e.g. 24 questions) */}
          <div className="w-full max-w-xl relative mb-8">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 rounded-2xl pl-5 pr-28 py-3.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none transition-all shadow-md dark:shadow-xl"
              />
              
              {/* Right side inside input: Dynamic questions counter */}
              <div className="absolute right-4 text-[11px] sm:text-xs font-mono text-neutral-500 pointer-events-none flex items-center gap-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="pointer-events-auto text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
                <span>{searchQuery ? `${displayedQuestionsCount} found` : `${totalQuestionsCount} questions`}</span>
              </div>
            </div>
          </div>

          {/* 3D Perspective Toggle Button (Buyer Orange / Architect Green) */}
          <div className="p-1.5 sm:p-2 rounded-full bg-neutral-100 dark:bg-[#12100E] border border-black/10 dark:border-white/10 shadow-xl inline-flex items-center gap-2 mb-10">
            
            {/* "As a Buyer" Button */}
            <button
              onClick={() => setRole('investor')}
              className={`cursor-pointer select-none rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 ${
                !isArchitect
                  ? 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] text-white border border-[#FDBA74]/60 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_4px_0_#9A3412,0_10px_24px_rgba(234,88,12,0.45)] hover:brightness-105 active:translate-y-[2px]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <User className="w-4 h-4" />
              <span>As a Buyer</span>
            </button>

            {/* "As an Architect" Button */}
            <button
              onClick={() => setRole('architect')}
              className={`cursor-pointer select-none rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 ${
                isArchitect
                  ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] text-white border border-[#86EFAC]/60 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_4px_0_#0E622B,0_10px_24px_rgba(22,163,74,0.45)] hover:brightness-105 active:translate-y-[2px]'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>As an Architect</span>
            </button>

          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. PERSONA BANNER CARD (Matches Reference Screenshot)    */}
      {/* ======================================================== */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 shadow-xl overflow-hidden relative text-left flex items-start sm:items-center p-6 sm:p-8">
          
          {/* Vertical Accent Line on Left (Orange for Buyer, Green for Architect) */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-colors duration-300"
            style={{ backgroundColor: themeColor }}
          />

          {/* Left Avatar Icon Circle */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-neutral-100 dark:bg-[#181411] border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0 mr-4 sm:mr-6">
            {!isArchitect ? (
              <User className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <Shield className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </div>

          {/* Content Text */}
          <div className="flex-1 pr-2">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-normal mb-1.5">
              {!isArchitect ? (
                <>
                  For{' '}
                  <em 
                    className="font-serif italic font-normal transition-colors"
                    style={{ color: themeColor }}
                  >
                    buyers and investors
                  </em>
                </>
              ) : (
                <>
                  For{' '}
                  <em 
                    className="font-serif italic font-normal text-emerald-600 dark:text-emerald-400"
                  >
                    architects and creators
                  </em>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-3xl">
              {!isArchitect
                ? 'You have capital, execution capacity, and a thesis. What you need is conviction-ready opportunities and a process you can trust. These answers walk through how vvEntra protects your money and helps you make better unlock decisions.'
                : 'You have domain expertise, verified playbooks, and proprietary IP. What you need is monetizing without uncompensated exposure or predatory broker retainers. These answers walk through how vvEntra protects your IP custody and guarantees your 90% payout.'}
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. NUMBERED SECTIONS (Matches Uploaded Images 01 & 02)   */}
      {/* ======================================================== */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {filteredSections.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 text-center shadow-md">
            <HelpCircle className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-neutral-900 dark:text-white font-normal mb-1">
              No matching questions found
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
              Try searching with different keywords.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white tracking-wide transition-all cursor-pointer shadow-sm"
              style={{ backgroundColor: themeColor }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredSections.map((sec) => (
            <div key={sec.number} className="text-left">
              
              {/* Section Header: "01 Getting started" with "5 QUESTIONS" on the right */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-baseline gap-3 sm:gap-3.5">
                  <span 
                    className="font-serif italic text-2xl sm:text-3xl transition-colors font-normal select-none"
                    style={{ color: themeColor }}
                  >
                    {sec.number}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 dark:text-white font-normal tracking-tight">
                    {sec.titlePrefix}{' '}
                    <em 
                      className="font-serif italic font-normal transition-colors"
                      style={{ color: themeColor }}
                    >
                      {sec.titleItalic}
                    </em>
                  </h2>
                </div>

                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-semibold select-none">
                  {sec.questions.length} QUESTIONS
                </span>
              </div>

              {/* Thin hairline divider matching screenshot */}
              <div className="border-t border-black/10 dark:border-white/10 mb-6" />

              {/* Questions List for this Section */}
              <div className="space-y-3 sm:space-y-3.5">
                {sec.questions.map((faq) => {
                  const isOpen = !!openIds[faq.id];
                  return (
                    <div
                      key={faq.id}
                      onClick={() => toggleAccordion(faq.id)}
                      className={`faq-accordion-item rounded-2xl transition-all duration-200 overflow-hidden border cursor-pointer ${
                        isOpen
                          ? 'bg-[#FFFDFB] dark:bg-[#0E0C0B] shadow-md dark:shadow-lg'
                          : 'bg-white dark:bg-[#0D0B0A] hover:bg-[#FAF9F5] dark:hover:bg-[#12100E] border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 shadow-xs'
                      }`}
                      style={{
                        borderColor: isOpen 
                          ? (isArchitect ? 'rgba(22, 163, 74, 0.45)' : 'rgba(226, 87, 27, 0.45)') 
                          : undefined
                      }}
                    >
                      {/* Question Row */}
                      <div className="p-5 sm:p-6 flex items-center justify-between gap-4 text-left select-none">
                        <h3 className="font-serif text-base sm:text-[18px] text-neutral-900 dark:text-white font-normal leading-snug pr-3">
                          {faq.question}
                        </h3>

                        {/* Circular +/- Action Icon Button (Exact Match from Screenshot) */}
                        <div 
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isOpen 
                              ? 'bg-neutral-100 dark:bg-white/10 border-black/15 dark:border-white/30 text-neutral-900 dark:text-white' 
                              : 'bg-neutral-50 dark:bg-white/5 border-black/10 dark:border-white/15 text-neutral-500 dark:text-neutral-400 group-hover:border-black/25 dark:group-hover:border-white/30'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5" style={{ color: themeColor }} />
                          ) : (
                            <Plus className="w-3.5 h-3.5" style={{ color: themeColor }} />
                          )}
                        </div>
                      </div>

                      {/* Expandable Answer Content */}
                      {isOpen && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-[13.5px] text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed border-t border-black/5 dark:border-white/5 space-y-3.5 animate-in fade-in duration-200"
                        >
                          <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                            {faq.answer}
                          </p>

                          {faq.highlight && (
                            <div 
                              className="p-3 sm:p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-mono"
                              style={{
                                backgroundColor: isArchitect ? 'rgba(22, 163, 74, 0.08)' : 'rgba(226, 87, 27, 0.08)',
                                borderColor: isArchitect ? 'rgba(22, 163, 74, 0.28)' : 'rgba(226, 87, 27, 0.28)',
                                color: isArchitect ? '#15803D' : '#C2410C'
                              }}
                            >
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span className="leading-tight">{faq.highlight}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. "STILL NEED HELP?" CARD (Exact Reference Match)       */}
      {/* ======================================================== */}
      <section className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div 
          className="rounded-[28px] sm:rounded-[32px] bg-white dark:bg-[#0E0C0A] p-8 sm:p-12 md:p-14 text-center shadow-xl dark:shadow-2xl relative overflow-hidden transition-all duration-300 border"
          style={{
            borderColor: themeColor
          }}
        >
          {/* Subtle radial inner glow */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] blur-[120px] pointer-events-none rounded-full opacity-15"
            style={{ backgroundColor: themeColor }}
          />

          <div className="relative z-10">
            {/* Eyebrow: — STILL NEED HELP? */}
            <div className="flex items-center justify-center gap-2 mb-3.5">
              <span 
                className="w-4 h-[1.5px] transition-colors"
                style={{ backgroundColor: themeColor }}
              />
              <span 
                className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] font-semibold transition-colors"
                style={{ color: themeColor }}
              >
                STILL NEED HELP?
              </span>
            </div>

            {/* Headline: Didn't find your answer? */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-neutral-900 dark:text-white font-normal tracking-tight mb-4">
              Didn't find your{' '}
              <em 
                className="font-serif italic font-normal transition-colors duration-300"
                style={{ color: themeColor }}
              >
                answer?
              </em>
            </h2>

            {/* Paragraph copy */}
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
              We're a small team and we answer founder-style: directly, quickly, no support-bot routing. Pick the channel that works for you.
            </p>

            {/* 3 Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-10 text-center">
              
              {/* Card 1: Email us */}
              <a
                href="mailto:hello@vventra.com"
                className="group rounded-2xl p-5 sm:p-6 bg-[#FAF9F6] dark:bg-[#12100E] border border-black/8 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-[#161311] cursor-pointer shadow-xs"
              >
                <div 
                  className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mx-auto mb-3.5 transition-transform group-hover:scale-105 shadow-xs"
                  style={{ color: themeColor }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-neutral-900 dark:text-white font-normal mb-1.5">
                  Email us
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  hello@vventra.com
                </span>
              </a>

              {/* Card 2: Live chat */}
              <div
                className="group rounded-2xl p-5 sm:p-6 bg-[#FAF9F6] dark:bg-[#12100E] border border-black/8 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-[#161311] cursor-default shadow-xs"
              >
                <div 
                  className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mx-auto mb-3.5 transition-transform group-hover:scale-105 shadow-xs"
                  style={{ color: themeColor }}
                >
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-neutral-900 dark:text-white font-normal mb-1.5">
                  Live chat
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  Mon-Sat · 9am-9pm IST
                </span>
              </div>

              {/* Card 3: Schedule a call */}
              <div
                className="group rounded-2xl p-5 sm:p-6 bg-[#FAF9F6] dark:bg-[#12100E] border border-black/8 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-[#161311] cursor-default shadow-xs"
              >
                <div 
                  className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mx-auto mb-3.5 transition-transform group-hover:scale-105 shadow-xs"
                  style={{ color: themeColor }}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-[17px] text-neutral-900 dark:text-white font-normal mb-1.5">
                  Schedule a call
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  Premium tier · 15 min
                </span>
              </div>

            </div>

            {/* Bottom Two Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#opportunities';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full sm:w-auto px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                  !isArchitect
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:brightness-105'
                    : 'bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:brightness-105'
                }`}
              >
                <span>{!isArchitect ? 'Start as Buyer' : 'Start as Architect'}</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#trust';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 border border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-transparent shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Read trust policy</span>
                <span>→</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
