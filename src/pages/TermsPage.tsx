import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Scale, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Download, 
  ArrowRight, 
  UserCheck, 
  Coins, 
  RefreshCw, 
  BadgePercent,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface InPracticeCase {
  tag: string;
  headline: string;
  scenario: string;
  metrics: { label: string; value: string }[];
  takeaway: string;
}

interface TermSection {
  id: string;
  num: string;
  category: 'role' | 'financial' | 'legal';
  title: string;
  badge: string;
  summary: string;
  content: string[];
  keyRules: { label: string; detail: string }[];
  inPractice?: InPracticeCase;
  highlight?: string;
}

const TERMS_SECTIONS: TermSection[] = [
  {
    id: 'platform-role',
    num: '01',
    category: 'role',
    title: 'Platform role',
    badge: 'NEUTRAL FACILITATOR',
    summary: 'vvEntra operates as a confidential bilateral exchange connecting creators with verified buyers, maintaining neutral non-party status.',
    content: [
      'vvEntra is a facilitator. We connect opportunity creators with execution-focused buyers and operators. We are not a party to any transaction, investment agreement, or business arrangement made through the platform.',
      'We do not guarantee the success or failure of any opportunity listed. We do not provide investment, legal, or financial advice. Every participant is responsible for conducting their own due diligence before committing capital or entering any agreement.'
    ],
    keyRules: [
      { label: 'Non-Party Status', detail: 'vvEntra is neither buyer nor seller; transactions are bilateral between vetted parties.' },
      { label: 'Diligence Autonomy', detail: 'All participants bear independent responsibility for financial and legal validation.' }
    ],
    inPractice: {
      tag: 'FACILITATION IN PRACTICE',
      headline: 'Direct Bilateral Deal Execution',
      scenario: 'A private equity search fund unlocks a $75,000 fintech compliance playbook. vvEntra provisions encrypted communication rails, verifies identity credentials, and holds the 10% deposit in segregated Delaware escrow without taking broker commissions or underwriting liability.',
      metrics: [
        { label: 'Facilitation Model', value: 'Bilateral Direct' },
        { label: 'Advisory Liability', value: '0% Independent' },
        { label: 'Jurisdiction', value: 'Delaware UCC' }
      ],
      takeaway: 'Full transaction autonomy for buyers and architects with zero intermediary broker friction.'
    }
  },
  {
    id: 'architect-responsibility',
    num: '02',
    category: 'role',
    title: 'Architect responsibility',
    badge: 'ORIGINAL IP & INTEGRITY',
    summary: 'Architects must submit authentic, validated, and original systems with zero metric inflation and 7-day responsive diligence commitments.',
    content: [
      'Architects must submit original content. You may not list a business system, model, or blueprint that you do not own or have the right to sell. Duplicate listings of the same core opportunity are prohibited.',
      'All documentation you submit must be accurate to the best of your knowledge. Deliberately misleading buyers, inflating metrics, or misrepresenting the nature of an opportunity is grounds for immediate account removal and forfeiture of any pending payments.',
      'Once a buyer has unlocked your listing, you are expected to engage in good faith: respond to messages within a reasonable timeframe, conduct the agreed meeting within the 7-day window, and provide the documentation package exactly as listed.'
    ],
    keyRules: [
      { label: '100% Originality Warranty', detail: 'Direct intellectual property ownership or explicit commercial resale mandate required.' },
      { label: 'Zero Tolerance for Fraud', detail: 'Metric inflation or deliberate misrepresentation causes immediate delisting and payment forfeiture.' },
      { label: 'SLA Response Window', detail: 'Obligation to host technical meeting and supply documentation within 7 calendar days.' }
    ],
    inPractice: {
      tag: 'ORIGINALITY AUDIT IN PRACTICE',
      headline: 'IP Verification & Anti-Plagiarism Hashing',
      scenario: 'Prior to marketplace listing clearance, every blueprint package undergoes automated cryptographic hash cross-referencing against public repositories and past vvEntra transactions to enforce 100% original authorship.',
      metrics: [
        { label: 'Plagiarism Audit', value: 'Automated 100%' },
        { label: 'Delisting SLA', value: '< 2 Hours on Report' },
        { label: 'Meeting Window', value: '7 Calendar Days' }
      ],
      takeaway: 'Verified architects put their institutional reputation on the line with legally binding authorship warranties.'
    }
  },
  {
    id: 'buyer-responsibility',
    num: '03',
    category: 'role',
    title: 'Buyer responsibility',
    badge: 'MUTUAL NDA COVERAGE',
    summary: 'Unlock fee grants review and negotiation rights, not ownership. All materials protected by an enforceable 24-month bilateral NDA.',
    content: [
      'Buyers may not copy, redistribute, resell, or repurpose any documentation or IP accessed through vvEntra without a completed full-payment transaction and explicit agreement with the architect. The unlock fee grants access to review materials, not ownership of the IP.',
      'All materials accessed through an unlock are covered by mutual NDA. Buyers agree to maintain confidentiality for a period of no less than 24 months from the date of access.',
      'Buyers who repeatedly unlock and reject without engaging in meetings or providing substantive feedback may have their access reviewed. Patterns of bad-faith engagement will result in account suspension.'
    ],
    keyRules: [
      { label: 'Evaluation Right Only', detail: 'Unlock fee provides confidential audit rights; title transfer occurs strictly post-closing.' },
      { label: '24-Month Binding NDA', detail: 'Automated bilateral non-disclosure agreement legally enforced across all reviewed blueprints.' },
      { label: 'Fair Engagement Protocol', detail: 'Unlocking without intent or repeated bad-faith rejections prompts institutional review.' }
    ],
    inPractice: {
      tag: 'CONFIDENTIALITY IN PRACTICE',
      headline: 'Forensic PDF Watermarking & Bilateral NDA',
      scenario: 'When an unlock occurs, every document page dynamically embeds an invisible forensic cryptographic buyer watermark. Any unauthorized leak or redistribution is immediately traceable to the purchasing account under Delaware Chancery law.',
      metrics: [
        { label: 'NDA Enforceability', value: '24 Months Binding' },
        { label: 'Page Forensic Watermark', value: 'Active SHA-256' },
        { label: 'Breach Remedy', value: 'Injunctive Relief' }
      ],
      takeaway: 'Buyers review confidential IP under ironclad protections that shield the creator from reverse-engineering.'
    }
  },
  {
    id: 'payment-terms',
    num: '04',
    category: 'financial',
    title: 'Payment terms',
    badge: 'TWO-STAGE ESCROW RAILS',
    summary: 'Milestone escrow architecture: 10% unlock fee to open diligence portal, remainder funded upon mutual execution. 90% payout to architects.',
    content: [
      'All transactions on vvEntra follow a two-stage structure. The unlock fee (10% of the listed price) is required to access documents and open the buyer-seller portal. The remaining amount is committed only after a meeting has been conducted and both parties agree to proceed.',
      'All payments are held in escrow and are not released to the architect until the buyer approves delivery at each milestone. vvEntra takes a platform fee of 10% from each transaction. Architects receive 90% of the agreed engagement value.',
      'Payments are processed in USD. Tax obligations arising from any transaction are the sole responsibility of each party in their respective jurisdictions.'
    ],
    keyRules: [
      { label: 'Two-Stage Structure', detail: 'Stage 1: 10% initial unlock deposit. Stage 2: 90% balance funded to escrow.' },
      { label: 'Milestone Custody', detail: 'Funds held in Delaware escrow custody; released only upon buyer verification sign-off.' },
      { label: '90/10 Allocation', detail: 'Architect receives 90% net transaction value; vvEntra retains 10% platform facilitation fee.' }
    ],
    inPractice: {
      tag: 'ESCROW SIMULATION IN PRACTICE',
      headline: 'Simulated $50,000 Milestone Transaction',
      scenario: 'Stage 1: Buyer deposits $5,000 (10%) to unlock the deal room. Stage 2: Both parties agree on milestones, and buyer commits $45,000 to escrow. Upon milestone delivery approval, the Architect receives $45,000 (90%) and vvEntra retains $5,000 (10%).',
      metrics: [
        { label: 'Unlock Deposit (10%)', value: '$5,000' },
        { label: 'Escrow Balance (90%)', value: '$45,000' },
        { label: 'Architect Payout (90%)', value: '$45,000 Net' }
      ],
      takeaway: 'Mathematical certainty: zero counterparty credit risk and milestone verification before capital release.'
    }
  },
  {
    id: 'refund-policy',
    num: '05',
    category: 'financial',
    title: 'Refund policy',
    badge: 'STRICT EXCEPTIONS & CREDIT',
    summary: 'Unlock fee is non-refundable upon portal access. Full refunds granted for TOC discrepancy or fraud. 5% goodwill credit on secondary unlock.',
    content: [
      'The unlock fee is non-refundable once you have accessed the document package. You are paying for access to confidential strategic material and the architect\'s time. The act of opening the portal constitutes access.',
      'A refund of the unlock fee may be granted in the following circumstances only: the document package delivered does not match the table of contents shown pre-unlock, the listing contained materially false or fabricated information, or fraud is confirmed by vvEntra\'s review team.',
      'The following are not grounds for a refund: the buyer changes their mind after reviewing the documents, the opportunity is not a fit for the buyer\'s current priorities, or the buyer and architect fail to reach agreement on engagement terms.',
      'If a buyer rejects post-unlock and the listing is subsequently unlocked by a second buyer, the first buyer will receive a partial goodwill credit of 5% of their unlock fee. This credit applies to a future unlock on the platform and is not paid out in cash.'
    ],
    keyRules: [
      { label: 'Access Defined', detail: 'Opening the decrypted portal constitutes consumption of strategic material and time.' },
      { label: 'Guaranteed Refund Grounds', detail: 'Full refund if delivered dossier deviates from pre-unlock table of contents or contains fraud.' },
      { label: '5% Goodwill Credit', detail: 'If rejected listing is unlocked by a subsequent peer buyer, 5% credit automatically issued.' }
    ],
    inPractice: {
      tag: 'DISPUTE & CREDIT IN PRACTICE',
      headline: 'Table of Contents Discrepancy & Goodwill Credit',
      scenario: 'If a buyer unlocks a listing and discovers a missing financial model promised in the pre-unlock preview, vvEntra issues a 100% escrow refund within 48h. If a buyer rejects in good faith and a peer buyer later unlocks it, the first buyer receives an automatic 5% platform credit.',
      metrics: [
        { label: 'TOC Mismatch Refund', value: '100% Granted' },
        { label: 'Investigation SLA', value: '< 48 Hours' },
        { label: 'Secondary Unlock Credit', value: '5% Goodwill' }
      ],
      takeaway: 'Strategic consumption is protected, while material discrepancies are fully refunded with zero friction.'
    }
  },
  {
    id: 'engagement-window',
    num: '06',
    category: 'financial',
    title: '7-day engagement window',
    badge: 'CALENDAR TIMELINE',
    summary: 'A strict 7-calendar-day countdown begins upon payment clearance to conduct the technical meeting and proceed to closing terms.',
    content: [
      'Once a buyer unlocks an opportunity, both parties have 7 calendar days to conduct a meeting and proceed to terms. If no meeting takes place and no terms are accepted within this window, the offer is automatically cancelled.',
      'The unlock fee is not returned in the event of an automatic cancellation. The listing may re-enter the marketplace at the architect\'s discretion. The buyer may submit a new unlock request if the listing becomes available again.',
      'The 7-day clock begins from the moment the unlock payment clears, not from the time the buyer opens the portal.'
    ],
    keyRules: [
      { label: 'Clock Initiation', detail: 'Starts the exact millisecond payment clears in escrow rails, independent of portal login.' },
      { label: 'Expiration Outcome', detail: 'Unresolved offers auto-cancel at 168 hours; listing returns to active marketplace status.' },
      { label: 'Fee Preservation', detail: 'Unlock fee compensates architect\'s reservation and diligence readiness.' }
    ],
    inPractice: {
      tag: 'COUNTDOWN IN PRACTICE',
      headline: 'The 168-Hour Diligence Velocity Lifecycle',
      scenario: 'Hour 0: Payment clears in escrow. Hours 1–48: Parties exchange technical questionnaires. Hours 49–120: Technical review meeting held on encrypted video bridge. Hours 121–168: Final terms signed or listing returns to market.',
      metrics: [
        { label: 'Countdown Duration', value: '168 Hours (7 Days)' },
        { label: 'Clock Trigger', value: 'Payment Clearance' },
        { label: 'Auto-Cancel Action', value: 'Market Release' }
      ],
      takeaway: 'Eliminates diligence limbo and maintains high-velocity liquidity for serious market operators.'
    }
  },
  {
    id: 'intellectual-property',
    num: '07',
    category: 'legal',
    title: 'Intellectual property',
    badge: 'REVIEW LICENCE & TITLE',
    summary: 'Ownership of blueprint remains with architect until full transaction is completed. vvEntra is not party to private bilateral IP agreements.',
    content: [
      'Ownership of the opportunity, blueprint, and all associated documentation remains with the architect until a full-payment transaction is completed. Unlocking grants a confidential review licence only.',
      'Upon completion of the full engagement payment, IP transfer terms are governed by the signed agreement between the buyer and architect. vvEntra is not a party to that agreement and does not assume liability for any IP dispute arising from it.',
      'Architects retain the right to list new, original opportunities at any time. Listing the same core opportunity more than once, or listing an opportunity that was previously sold to another buyer, is prohibited.'
    ],
    keyRules: [
      { label: 'Confidential Review Licence', detail: 'Unlocking confers inspection rights only; full title transfers strictly upon closing.' },
      { label: 'Direct Bilateral Agreement', detail: 'IP transfer governed by signed instruments directly between buyer and architect.' },
      { label: 'Exclusivity Enforcement', detail: 'Relisting previously sold opportunities or duplicate core blueprints is strictly prohibited.' }
    ],
    inPractice: {
      tag: 'TITLE CONVEYANCE IN PRACTICE',
      headline: 'Two-Stage Licensing to Full Assignment Deed',
      scenario: 'During the 7-day diligence window, the buyer holds a limited non-exclusive evaluation licence. Upon milestone closing and Delaware escrow clearance, full commercial ownership, patents, and codebase repositories transfer permanently.',
      metrics: [
        { label: 'Review Phase Rights', value: 'Evaluation Only' },
        { label: 'Post-Closing Rights', value: '100% Title Transfer' },
        { label: 'Relisting Prohibition', value: 'Strictly Enforced' }
      ],
      takeaway: 'Complete intellectual security for the architect before closing, and complete asset title for the buyer post-settlement.'
    }
  },
  {
    id: 'dispute-handling',
    num: '08',
    category: 'financial',
    title: 'Dispute handling',
    badge: '7-DAY ARBITRATION',
    summary: 'Formal disputes must be submitted on-platform within 7 days of milestone delivery. Disputed funds remain frozen in escrow pending final determination.',
    content: [
      'Either party may raise a formal dispute within 7 calendar days of a milestone delivery or payment release event. Disputes must be submitted through the platform. Off-platform disputes are not considered by vvEntra.',
      'vvEntra reviews all evidence submitted through the platform: messages, call records, documents, and milestone records. Both parties will be given the opportunity to submit their account before a decision is made.',
      'In the early stage of the platform, vvEntra\'s decision is final. Disputed funds remain in escrow until resolution. Resolutions may result in full release to either party or a split based on evidence.'
    ],
    keyRules: [
      { label: '7-Day Dispute Window', detail: 'Formal disputes must be filed within 7 calendar days of milestone delivery or release event.' },
      { label: 'On-Platform Evidentiary Record', detail: 'Only platform communications, call logs, documents, and milestone records are admitted.' },
      { label: 'Escrow Lock & Resolution', detail: 'Disputed funds stay locked in Delaware escrow until final release or evidence-based split.' }
    ],
    inPractice: {
      tag: 'ARBITRATION IN PRACTICE',
      headline: 'On-Platform Evidentiary Determination',
      scenario: 'A buyer raises a dispute claiming milestone deliverables lacked promised unit test coverage. vvEntra\'s legal moderation desk examines platform messages, timestamped Git commits, and milestone contracts within 5 business days.',
      metrics: [
        { label: 'Dispute Window', value: '7 Days Post-Milestone' },
        { label: 'Evidence Standard', value: 'On-Platform Logs' },
        { label: 'Arbitration Timeline', value: '< 5 Business Days' }
      ],
      takeaway: 'Swift, binding on-platform dispute resolution prevents expensive court battles while keeping escrow funds safe.'
    }
  },
  {
    id: 'account-policy',
    num: '09',
    category: 'role',
    title: 'Account policy',
    badge: '1-PERSON-1-ACCOUNT',
    summary: 'Strict one-person-one-account policy. Accounts are non-transferable; credential sharing or fraud leads to permanent expulsion.',
    content: [
      'Each individual may hold only one vvEntra account. Creating duplicate accounts, sharing credentials, or circumventing the one-person-one-account policy will result in permanent removal of all accounts associated with the individual.',
      'Accounts are non-transferable. You may not sell, assign, or otherwise transfer your vvEntra account or any rights associated with it to any other person or entity.',
      'vvEntra reserves the right to suspend or terminate any account that violates these terms, engages in fraudulent activity, or causes harm to other members of the platform. In cases of termination for cause, pending payments may be forfeited.'
    ],
    keyRules: [
      { label: 'One-Person-One-Account', detail: 'Duplicate accounts or credential pooling trigger immediate permanent expulsion.' },
      { label: 'Non-Transferable Rights', detail: 'Accounts and institutional clearance badges cannot be sold, assigned, or sublicensed.' },
      { label: 'Forfeiture for Cause', detail: 'Termination for fraudulent activity or term violations results in forfeiture of pending sums.' }
    ],
    inPractice: {
      tag: 'IDENTITY AUDIT IN PRACTICE',
      headline: 'Single Institutional Clearance Credential',
      scenario: 'Every member must clear corporate entity verification. Credential sharing or creating sub-accounts to bypass reputation tiers is prevented by automated behavioral telemetry and hardware-bound session keys.',
      metrics: [
        { label: 'Account Multiplicity', value: '1 Account per Entity' },
        { label: 'Transferability', value: 'Non-Transferable' },
        { label: 'Violation Consequence', value: 'Immediate Expulsion' }
      ],
      takeaway: 'Maintains an exclusive, verified community of accredited investors and vetted venture architects.'
    }
  },
  {
    id: 'privacy-and-data',
    num: '10',
    category: 'legal',
    title: 'Privacy and data',
    badge: 'AES-256 VAULT ENCRYPTION',
    summary: 'Data collected strictly to operate the exchange and resolve disputes. Verification documents encrypted in transit and at rest with zero third-party sale.',
    content: [
      'vvEntra collects only the information necessary to operate the platform: account details, verification documents, transaction records, and platform activity. We do not sell your data to third parties.',
      'Verification documents are encrypted in transit and at rest. They are accessed only by the verification team and are not visible to any other user, architect, or buyer on the platform.',
      'Messages, call records, and documents exchanged through the platform are retained for the purpose of dispute resolution. Participants should conduct all material communications through the platform for this reason.'
    ],
    keyRules: [
      { label: 'Zero Third-Party Sale', detail: 'Strict zero-monetization policy; user and transaction data are never sold or syndicated.' },
      { label: 'End-to-End Encryption', detail: 'Diligence and identity verification documents encrypted in transit (TLS 1.3) and at rest (AES-256).' },
      { label: 'Evidentiary Retention', detail: 'On-platform messages and call records retained securely to safeguard dispute resolution.' }
    ],
    inPractice: {
      tag: 'DATA VAULT IN PRACTICE',
      headline: 'AES-256 Vault & Zero-Telemetry Architecture',
      scenario: 'Proprietary financial models, capitalization tables, and confidential architect dossiers are stored in isolated encrypted vaults with hardware security modules (HSM). Zero third-party ad trackers or LLM crawlers have access.',
      metrics: [
        { label: 'Encryption Standard', value: 'AES-256 / TLS 1.3' },
        { label: 'Third-Party Selling', value: '0% Guaranteed' },
        { label: 'Data Isolation', value: 'Isolated Vaults' }
      ],
      takeaway: 'Bank-grade institutional privacy engineered into every data layer of the vvEntra exchange.'
    }
  }
];

export const TermsPage: React.FC = () => {
  const { role, addToast, stage, setStage, openApplyModal } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  const [activeTab, setActiveTab] = useState<'all' | 'role' | 'financial' | 'legal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string>('platform-role');

  const filteredTerms = useMemo(() => {
    return TERMS_SECTIONS.filter((term) => {
      const matchCategory = activeTab === 'all' || term.category === activeTab;
      const matchSearch =
        searchQuery.trim() === '' ||
        term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        term.keyRules.some((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()) || r.detail.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeTab, searchQuery]);

  const activeTerm = useMemo(() => {
    return TERMS_SECTIONS.find((t) => t.id === selectedTermId) || TERMS_SECTIONS[0];
  }, [selectedTermId]);

  return (
    <div className="w-full text-white select-none pb-28 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matching User Image Exact Copy & Style) */}
      {/* ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 text-center max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle ambient backglow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] blur-[150px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold"
              style={{ color: themeColor }}
            >
              — LEGAL GOVERNANCE ARCHITECTURE
            </span>
          </div>

          {/* Headline: Terms and policy. */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal text-white tracking-tight leading-[1.1] mb-5">
            Terms and{' '}
            <em 
              className="font-serif italic font-normal transition-colors duration-300"
              style={{ color: themeColor }}
            >
              policy.
            </em>
          </h1>

          {/* Subtitle from user's image */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed font-normal mb-6">
            These are the rules that govern every interaction on vvEntra. Read them before you participate. By applying for access, you agree to these terms.
          </p>

          {/* Metadata pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-[#12100E] border border-white/10 text-[11px] font-mono text-neutral-400">
            <span>Last updated: June 2026</span>
            <span className="text-neutral-600">·</span>
            <span>Version 1.0</span>
            <span className="text-neutral-600">·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> State of Delaware, USA
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. EXECUTIVE SUMMARY MATRIX (Key Takeaways at a Glance) */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Neutral Facilitator */}
          <div className="p-6 rounded-2xl bg-[#0D0B0A] border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}35`,
                  color: themeColor
                }}
              >
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">01 · PROTOCOL</span>
                <h3 className="font-serif text-lg text-white font-normal">Neutral Facilitation</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              vvEntra provides encrypted matching and escrow rails. We are not a broker-dealer, advisor, or party to bilateral transactions.
            </p>
          </div>

          {/* Card 2: Two-Stage Escrow */}
          <div className="p-6 rounded-2xl bg-[#0D0B0A] border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}35`,
                  color: themeColor
                }}
              >
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">02 · FINANCIAL</span>
                <h3 className="font-serif text-lg text-white font-normal">Two-Stage Escrow</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              10% unlock fee opens the deal room. 90% balance funded to escrow. Payout released only upon buyer verification sign-off.
            </p>
          </div>

          {/* Card 3: 24-Month Mutual NDA */}
          <div className="p-6 rounded-2xl bg-[#0D0B0A] border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}35`,
                  color: themeColor
                }}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">03 · LEGAL</span>
                <h3 className="font-serif text-lg text-white font-normal">24-Month Mutual NDA</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every unlocked blueprint and model is legally bound by automated bilateral non-disclosure backed by Delaware Chancery jurisdiction.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FILTER, SEARCH & SECTION SELECTOR BAR */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D0B0A] border border-white/10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {[
              { id: 'all', label: 'All Terms (10)' },
              { id: 'role', label: 'Roles & Account (4)' },
              { id: 'financial', label: 'Escrow & Disputes (4)' },
              { id: 'legal', label: 'IP & Privacy (2)' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer select-none ${
                    isActive
                      ? isArchitect
                        ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] text-white font-semibold border border-[#86EFAC]/40 shadow-sm'
                        : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] text-white font-semibold border border-[#FDBA74]/40 shadow-sm'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terms, clauses, NDA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#14110E] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. INTUITIVE SPLIT DUAL-CHAMBER TERMS EXPLORER */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Clause Index (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 font-semibold px-2 mb-2">
              SELECT CLAUSE TO INSPECT ({filteredTerms.length})
            </div>

            {filteredTerms.map((term) => {
              const isSelected = selectedTermId === term.id;
              return (
                <div
                  key={term.id}
                  onClick={() => setSelectedTermId(term.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex items-start gap-4 relative overflow-hidden group select-none ${
                    isSelected
                      ? isArchitect
                        ? 'bg-[#121813] border-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.2)]'
                        : 'bg-[#181410] border-[#E2571B] shadow-[0_4px_20px_rgba(226,87,27,0.2)]'
                      : 'bg-[#0D0B0A] border-white/10 hover:border-white/20 hover:bg-[#12100E]'
                  }`}
                >
                  {/* Left Number Accent */}
                  <span 
                    className="font-serif italic text-2xl sm:text-3xl shrink-0 font-normal leading-none pt-0.5 transition-colors"
                    style={{ color: isSelected ? themeColor : '#737373' }}
                  >
                    {term.num}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif text-lg text-white font-normal truncate group-hover:text-white transition-colors">
                        {term.title}
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 shrink-0">
                        {term.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {term.summary}
                    </p>
                  </div>

                  <div className="shrink-0 self-center">
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected ? 'translate-x-1 text-white' : 'text-neutral-600'
                      }`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Multi-Card Deep Inspection Chamber (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card 1: Primary Clause Definition & Operational Checklist */}
            <div className="p-6 sm:p-9 rounded-2xl bg-[#0D0B0A] border border-white/15 shadow-2xl relative overflow-hidden text-left">
              
              {/* Subtle radial header glow */}
              <div 
                className="absolute top-0 right-0 w-[400px] h-[200px] blur-[120px] pointer-events-none rounded-full opacity-15"
                style={{ backgroundColor: themeColor }}
              />

              {/* Header Details */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-7">
                <div className="flex items-center gap-3">
                  <span 
                    className="font-serif italic text-3xl sm:text-4xl font-normal leading-none"
                    style={{ color: themeColor }}
                  >
                    {activeTerm.num}
                  </span>
                  <div>
                    <span 
                      className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                      style={{ color: themeColor }}
                    >
                      CLAUSE DEFINITION
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                      {activeTerm.title}
                    </h2>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                  {activeTerm.badge}
                </span>
              </div>

              {/* Exact Terms Content from Reference Images */}
              <div className="space-y-4 mb-8 text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                {activeTerm.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Rules Breakdown Grid */}
              <div className="pt-6 border-t border-dashed border-white/15">
                <h4 className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 font-semibold mb-4">
                  OPERATIONAL ENFORCEMENT & AUDIT CHECKLIST
                </h4>
                
                <div className="space-y-3">
                  {activeTerm.keyRules.map((rule, rIdx) => (
                    <div 
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-[#14110E] border border-white/10 flex items-start gap-3"
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {rule.label}
                        </div>
                        <div className="text-[11.5px] text-neutral-400 mt-0.5">
                          {rule.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Action Bar inside the clause chamber */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[11px] text-neutral-500">
                  Enforceable under Delaware Uniform Commercial Code (UCC)
                </span>

                <button
                  onClick={() => addToast(`Copied permanent reference citation for Clause ${activeTerm.num}.`, 'info')}
                  className="px-3.5 py-1.5 rounded-lg border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white bg-white/5 transition-all cursor-pointer font-mono text-[11px]"
                >
                  Copy Citation
                </button>
              </div>

            </div>

            {/* Institutional Escrow Desk & Legal Hotline */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0D0B0A] border border-white/15 shadow-xl text-left relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
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
                    <h4 className="font-serif text-base text-white font-normal">
                      vvEntra Institutional Escrow Desk
                    </h4>
                    <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                      Delaware Statutory Trust · Moderation & Compliance Desk
                    </p>
                  </div>
                </div>

                {/* Live Officer Status */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-mono shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Officer On Duty (SLA &lt;15m)</span>
                </div>
              </div>

              {/* Legal Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-neutral-300 font-normal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Delaware UCC Article 9 Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Segregated Trust Account Custody</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated Mutual NDA Hashing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Binding 5-Day Arbitration SLA</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToast('Opening connection to vvEntra Escrow & Legal Officer.', 'info')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold text-white tracking-wide transition-all cursor-pointer shadow-sm active:translate-y-[1px] ${
                    isArchitect
                      ? 'bg-[#16A34A] hover:bg-[#15803D]'
                      : 'bg-[#E2571B] hover:bg-[#C2410C]'
                  }`}
                >
                  Contact Escrow Desk
                </button>
                <button
                  onClick={() => addToast('Delaware Statutory Trust Certificate verified: Active registration #719284.', 'success')}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
                >
                  Verify Trust Certificate
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE 7-DAY ESCROW WORKFLOW SIMULATOR */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0D0B0A] border border-white/10 shadow-2xl relative overflow-hidden text-left">
          
          <div className="max-w-2xl mb-8">
            <span 
              className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
              style={{ color: themeColor }}
            >
              TRANSACTION LIFECYCLE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
              How funds and contracts flow through escrow.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-normal">
              Every dollar is held in segregated institutional escrow under Delaware statutory trust regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-[#14110E] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-serif italic text-xl text-neutral-400">Step 01</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10">10% DEPOSIT</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">10% Unlock Escrow Deposit</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Buyer pays 10% fee to unlock confidential blueprint, decrypt data room, and initiate the 168-hour countdown.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-500">
                Clock: 00:00:00 starts immediately
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-[#14110E] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-serif italic text-xl text-neutral-400">Step 02</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10">7-DAY DIALOGUE</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Technical Briefing & Diligence</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Both parties meet within 7 calendar days to conduct architectural review, align on scope, and accept engagement terms.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-500">
                Auto-cancel if meeting unfulfilled
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-[#14110E] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-serif italic text-xl text-neutral-400">Step 03</span>
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                    style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                  >
                    90% SETTLEMENT
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Milestone Release & Closing</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  90% balance funded to escrow; released to architect only as milestones are verified. 90% net to architect, 10% platform fee.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-neutral-500">
                Title transfers upon 100% settlement
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BOTTOM DOWNLOAD & COMPLIANCE CALLOUT */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-14">
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
              <FileCheck className="w-6 h-6" style={{ color: themeColor }} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                Official Institutional Legal Documentation Pack
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl font-normal leading-relaxed">
                Download the complete legal agreement, standard mutual bilateral NDA schedule, and escrow dispute protocol in PDF format.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => addToast('Preparing official legal PDF documentation pack for download.', 'success')}
              className={`cursor-pointer select-none rounded-full px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white tracking-wide transition-all duration-150 shrink-0 whitespace-nowrap flex items-center gap-2 hover:opacity-90 active:scale-[0.98] ${
                isArchitect
                  ? 'bg-[#16A34A] hover:bg-[#15803D]'
                  : 'bg-[#E2571B] hover:bg-[#C2410C]'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download Terms & NDA (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ACCEPTANCE NOTICE & APPLY FOR ACCESS CTA (From Reference Image 2) */}
      {/* ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 text-left">
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-xs font-mono text-neutral-400 max-w-xl leading-relaxed">
            © 2026 vvEntra. All rights reserved. These terms are subject to change. Continued use of the platform constitutes acceptance of the current version.
          </p>

          <button
            onClick={() => openApplyModal(role)}
            className={`cursor-pointer select-none rounded-full px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white tracking-wide transition-all duration-150 shrink-0 whitespace-nowrap flex items-center gap-2 hover:opacity-90 active:scale-[0.98] ${
              isArchitect
                ? 'bg-[#16A34A] hover:bg-[#15803D]'
                : 'bg-[#E2571B] hover:bg-[#C2410C]'
            }`}
          >
            <span>Apply for access</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

    </div>
  );
};
