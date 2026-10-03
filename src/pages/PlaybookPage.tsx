import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Compass,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Target,
  Clock,
  Briefcase,
  TrendingUp,
  Lock,
  Search,
  Layers,
  Award
} from 'lucide-react';

interface PlaybookChapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badge: string;
  summary: string;
  principles: {
    heading: string;
    description: string;
    doRule: string;
    dontRule: string;
  }[];
  checklists: string[];
  proTip: string;
}

export const PlaybookPage: React.FC = () => {
  const { role, setRole, addToast, theme, setActiveRoute } = useApp();
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'architect'>(
    role === 'architect' ? 'architect' : 'buyer'
  );

  const navigateTo = (hash: string) => {
    setActiveRoute(hash);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [activeChapterId, setActiveChapterId] = useState<string>('01');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
    '03': true,
    '04': true,
    '05': true,
    '06': true,
  });

  // Keep selected role in sync with global role if toggled elsewhere
  useEffect(() => {
    setSelectedRole(role === 'architect' ? 'architect' : 'buyer');
  }, [role]);

  const isArchitect = selectedRole === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  const handleRoleSwitch = (newRole: 'buyer' | 'architect') => {
    setSelectedRole(newRole);
    setRole(newRole === 'buyer' ? 'investor' : 'architect');
    addToast(`Switched to ${newRole === 'buyer' ? 'Buyer / Investor' : 'Architect / Creator'} Playbook`, 'info');
  };

  const toggleSection = (num: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const handleCopyChecklist = (chapterNum: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(chapterNum);
    addToast('Chapter checklist copied to clipboard.', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const scrollToChapter = (chapterNum: string) => {
    setActiveChapterId(chapterNum);
    const el = document.getElementById(`chapter-${chapterNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ----------------------------------------------------
  // DATA: BUYER (INVESTOR) PLAYBOOK
  // ----------------------------------------------------
  const BUYER_PLAYBOOK: PlaybookChapter[] = [
    {
      id: '01',
      num: '01',
      title: 'Mindset',
      subtitle: 'The Operator\'s Mental Model · Think like an operator, not a tourist',
      badge: 'MINDSET · STRATEGIC FOUNDATION',
      summary:
        'Buying verified intellectual property on vvEntra is not shopping for an off-the-shelf SaaS or casually browsing for ideas. You are acquiring validated velocity: 12 to 24 months of market testing, failed iterations, and proprietary regulatory or technical architecture in a single transaction. Serious operators approach acquisitions with allocated capital, dedicated execution capacity, and decisive conviction.',
      principles: [
        {
          heading: 'Tourists browse ideas. Operators acquire unfair velocity.',
          description:
            'Amateurs treat the platform like an idea feed. Serious operators understand that ideas are cheap and validated execution is scarce. You are buying 12 to 24 months of de-risked development, audited supplier relationships, and proprietary architecture.',
          doRule: 'Focus on time arbitrage: evaluate an asset based on how many months of team burn rate it eliminates.',
          dontRule: 'Never treat the platform as passive reading material without dedicated deployment capacity.'
        },
        {
          heading: 'Tourists read pitch decks. Operators verify auditable economics.',
          description:
            'Amateurs buy TAM estimates and optimistic projections. Serious operators demand auditable unit economics, customer cohort data, live supplier agreements, and clean source code with zero technical debt.',
          doRule: 'Demand auditable customer conversations, supplier rate sheets, and validated conversion logs.',
          dontRule: 'Never pay for qualitative "market opportunity" memos without operational substantiation.'
        },
        {
          heading: 'Tourists negotiate endlessly. Operators de-risk and move fast.',
          description:
            'Indecision and prolonged haggling kill momentum and alienate top architects. Operators use vvEntra\'s 7-day inspection window as a disciplined risk containment sprint to verify representations, release escrow promptly, and deploy.',
          doRule: 'Submit structured diligence queries within 48 hours and release escrow once representations verify.',
          dontRule: 'Do not withhold escrow release as leverage to renegotiate pre-agreed terms.'
        }
      ],
      checklists: [
        'Internal investment criteria and acquisition mandate documented before browsing',
        'Available cash allocation earmarked in escrow-compatible account',
        'Dedicated operational or technical lead appointed to take custody of Tier 3 codebase',
        'Defined 90-day post-acquisition execution roadmap locked before unlock'
      ],
      proTip: 'The highest-performing buyers complete initial diligence within 72 hours and schedule their architect onboarding call before day 4 of the inspection window. In contrast, tourists wait until day 6 and scramble.'
    },
    {
      id: '02',
      num: '02',
      title: 'Preparation',
      subtitle: 'Capital Allocation & Due Diligence Checklist',
      badge: 'TRANSACTION READINESS',
      summary:
        'The difference between closing a high-value opportunity and losing it to a rival syndicate is deal readiness. Serious buyers configure escrow channels, execute NDAs, and prepare diligence rubrics before submitting unlock offers.',
      principles: [
        {
          heading: 'Tiered KYC and Treasury Verification',
          description:
            'Institutional sellers prioritize buyers with verified identity and bank confirmation. Completing your profile credentials unlocks instant architect approval for Tier 1 and Tier 2 confidential data rooms.',
          doRule: 'Maintain verified status with corporate registration and KYC pre-clearance.',
          dontRule: 'Never attempt unlocks from unverified or anonymous burner accounts.'
        },
        {
          heading: 'The 7-Day Due Diligence Sprint Plan',
          description:
            'Break the 7-day window into three rigid phases: Days 1–2 for asset audit (code, contracts, financials); Days 3–4 for architect technical review; Days 5–6 for integration planning; Day 7 for settlement authorization.',
          doRule: 'Set milestone reminders for Day 2, Day 4, and Day 6 to avoid last-minute rush.',
          dontRule: 'Do not wait until Day 6 to inspect Tier 3 code repos or financial models.'
        },
        {
          heading: 'Legal Framework Pre-Alignment',
          description:
            'Review vvEntra\'s standard NDA and Escrow Custody Charter with your legal counsel once. Applying standardized transaction terms avoids legal redlining delays on time-sensitive deals.',
          doRule: 'Use platform standard IP assignment clauses for immediate deal execution.',
          dontRule: 'Avoid requesting custom bespoke contracts for listings below $50,000.'
        }
      ],
      checklists: [
        'Corporate identity credentials validated with Persona KYC',
        'Payment gateway / wire transfer limit approved for transaction scale',
        'GitHub / AWS repository access keys ready to accept asset transfer',
        'Standard NDA executed and stored in platform vault'
      ],
      proTip: 'Download our standard 7-Day Diligence Sprint Matrix into Notion or Linear to coordinate your engineering and financial analysts immediately upon unlock.'
    },
    {
      id: '03',
      num: '03',
      title: 'Execution',
      subtitle: 'The Staged Reveal & Escrow Protocol',
      badge: 'PROTOCOL MASTERY',
      summary:
        'vvEntra\'s Staged Reveal is an institutional safety net designed to protect both capital and IP. Navigating the four tiers methodically ensures you never over-commit before risk is mitigated.',
      principles: [
        {
          heading: 'Progressive Commitment: Walk Before You Sprint',
          description:
            'Examine Tier 0 public teaser metrics and Tier 1 blinded economics first. Only commit the full purchase price to escrow once you have verified the market thesis matches your portfolio capabilities.',
          doRule: 'Review the Tier 2 data room thoroughly before executing Tier 3 escrow funding.',
          dontRule: 'Never skip directly to Tier 3 without reviewing preliminary metrics.'
        },
        {
          heading: 'Escrow Custody as Your Sovereign Defense',
          description:
            'Your funds remain in regulated escrow throughout the inspection window. The architect cannot withdraw funds until you confirm satisfaction or the 7-day inspection window passes without dispute.',
          doRule: 'Submit documented evidence immediately if material misrepresentation is detected.',
          dontRule: 'Never agree to send funds directly or via outside wiring methods.'
        },
        {
          heading: 'Securing the Architect Transition Hours',
          description:
            'Most senior architects include 10–20 hours of advisory onboarding. Schedule these hours for architectural walkthroughs and deployment unblocking within the first 14 days of closing.',
          doRule: 'Send your technical lead to the architect onboarding session with pre-written questions.',
          dontRule: 'Do not squander advisory hours on generic inquiries that are covered in the documentation.'
        }
      ],
      checklists: [
        'Tier 0 & Tier 1 review completed and cross-referenced with market data',
        'Escrow deposit confirmed held in regulated custody',
        'Tier 3 deliverables checked against listing specification manifest',
        'Architect onboarding call scheduled within 5 days of unlock'
      ],
      proTip: 'Record the architect walkthrough session with permission. This creates an invaluable training asset for your internal engineers and operators.'
    },
    {
      id: '04',
      num: '04',
      title: 'Red Flags',
      subtitle: 'What Disqualifies an Opportunity',
      badge: 'DEFENSIVE DILIGENCE',
      summary:
        'Protect your capital by recognizing high-risk listings early. While vvEntra filters substandard listings, astute operators verify these specific failure indicators during diligence.',
      principles: [
        {
          heading: 'Generic Boilerplate and AI Slop',
          description:
            'If the documentation reads like generic ChatGPT output without specific supplier names, margin unit economics, technical hurdles, or regulatory nuances, flag it immediately.',
          doRule: 'Look for domain-specific vocabulary, actual invoices, and proprietary datasets.',
          dontRule: 'Do not accept generic high-level summaries as "proprietary insights".'
        },
        {
          heading: 'Unverifiable Financial Assertions',
          description:
            'Financial models that claim 85% net margins without accounting for customer acquisition costs, hosting overhead, or churn rates represent amateur modeling.',
          doRule: 'Audit the formula logic in Excel/Google Sheets financial models line by line.',
          dontRule: 'Never accept static screenshots of financial projections as audited models.'
        },
        {
          heading: 'Refusal to Follow Platform Escrow Flow',
          description:
            'Any creator asking to move discussion to Telegram, WhatsApp, or requesting private wire transfers is in direct violation of platform rules and should be reported.',
          doRule: 'Keep all communications within vvEntra\'s encrypted audit trail.',
          dontRule: 'Never communicate or settle transactions outside the platform.'
        }
      ],
      checklists: [
        'Dossier audited for plagiarized text or generic boilerplate',
        'Financial assumptions stress-tested against realistic churn and CAC benchmarks',
        'GitHub repository commits audited for historical depth and authentic authorship',
        'All communications verified within encrypted platform messaging'
      ],
      proTip: 'If an architect cannot articulate the 3 biggest technical bottlenecks they faced while building the opportunity, they are likely not the primary author.'
    },
    {
      id: '05',
      num: '05',
      title: 'Success Patterns',
      subtitle: 'How the Top 10% of Buyers Scale',
      badge: 'OPERATOR PLAYBOOK',
      summary:
        'Analyzing over $18M in closed opportunities reveals distinct behaviors shared by the most profitable buyers on vvEntra. Replicate these patterns to achieve asymmetric acquisition returns.',
      principles: [
        {
          heading: 'The "Synergy Stacking" Playbook',
          description:
            'The top 10% rarely buy standalone businesses to run from scratch. They buy turnkey opportunities that plug directly into existing distribution channels, customer bases, or supply chains.',
          doRule: 'Acquire assets where you already own the distribution advantage.',
          dontRule: 'Avoid acquiring opportunities in sectors where you have zero operational leverage.'
        },
        {
          heading: 'Rapid 14-Day Sprint Deployments',
          description:
            'Winning operators do not debate strategy for 6 months. Within 14 days of Tier 3 release, they deploy the codebase to staging, run initial traffic, and validate the unit economics in the live wild.',
          doRule: 'Assign a dedicated squad to launch an MVP or test campaign within two weeks.',
          dontRule: 'Do not archive the acquired dossier into a shared drive to "review later".'
        },
        {
          heading: 'Building Repeat Relationships with Senior Architects',
          description:
            'Serial architects frequently produce multiple high-tier opportunities. Treating creators with professional respect often unlocks private first-look rights on their upcoming ventures.',
          doRule: 'Provide constructive feedback and positive transaction reviews to architects.',
          dontRule: 'Never burn creator relationships over minor, non-material oversights.'
        }
      ],
      checklists: [
        'Existing distribution channel mapped to the acquired opportunity',
        'Technical deployment timeline locked into sprint backlog for week 1–2',
        'First test customer or traffic source identified prior to closing',
        'Follow-up message sent to architect expressing partnership interest'
      ],
      proTip: 'Operators who send a brief 30-day update to the architect reporting initial traction often receive free supplemental code updates and referral introductions.'
    },
    {
      id: '06',
      num: '06',
      title: 'Common Mistakes',
      subtitle: 'The 6 Pitfalls That Destroy Returns',
      badge: 'COSTLY ERRORS',
      summary:
        'Learn from the bottom 30% of buyers who experienced friction, delayed launches, or failed acquisitions. Avoiding these six fatal mistakes ensures smooth execution.',
      principles: [
        {
          heading: 'Mistake #1: Subjective Buyer Remorse Disputes',
          description:
            'Filing a dispute because "my market thesis changed" or "I decided not to enter this industry" is rejected by platform moderation under Section 05 rules and damages your buyer trust score.',
          doRule: 'Base disputes exclusively on objective, documented misrepresentation.',
          dontRule: 'Never expect refunds for subjective changes of personal opinion or strategy.'
        },
        {
          heading: 'Mistake #2: Underestimating Implementation Bandwidth',
          description:
            'Acquiring a turn-key opportunity without reserving internal engineering capacity to execute results in shelf-ware. Ensure team availability before bidding.',
          doRule: 'Reserve at least 40 hours of internal engineering bandwidth for onboarding.',
          dontRule: 'Do not purchase Tier 3 code if your engineering team is 100% booked.'
        },
        {
          heading: 'Mistake #3: Circumventing Platform Escrow',
          description:
            'Attempting off-platform transactions forfeits all escrow protection, legal safe harbours, dispute guarantees, and platform moderation support.',
          doRule: 'Always transact via vvEntra Escrow to maintain full financial protection.',
          dontRule: 'Never accept wire transfers or third-party links outside vvEntra.'
        }
      ],
      checklists: [
        'Objective inspection rubric used to assess deliverables against listing claims',
        'Engineering sprint capacity reserved in company roadmap',
        'Transaction kept strictly on-platform for 100% escrow protection',
        'Clear understanding of Section 05 refund criteria prior to escrow unlock'
      ],
      proTip: 'Review Section 05 of vvEntra\'s Trust Architecture before raising any formal concern. Objective discrepancy logs are resolved 4x faster by our moderation desk.'
    }
  ];

  // ----------------------------------------------------
  // DATA: ARCHITECT (CREATOR) PLAYBOOK
  // ----------------------------------------------------
  const ARCHITECT_PLAYBOOK: PlaybookChapter[] = [
    {
      id: '01',
      num: '01',
      title: 'Mindset',
      subtitle: 'Pricing & Monetizing Proprietary IP · Think like an operator, not a tourist',
      badge: 'CREATOR MINDSET',
      summary:
        'Listing on vvEntra is not selling freelance hours or writing a casual blog post. You are structuring an institutional-grade asset package that allows serious operators to bypass years of R&D and pay you a premium for your validated engineering. Think like an operator acquiring your own work.',
      principles: [
        {
          heading: 'Operators pay for verified precision, not generic tourist ideas',
          description:
            'An idea is worth nothing; execution is worth thousands. Serious operators pay top dollar for turnkey blueprints, audited financial models, operational supplier contacts, and clean, documented source code.',
          doRule: 'Package the exact artifacts, contracts, and codebases you built and tested.',
          dontRule: 'Never submit unvalidated conceptual ideas without operational substantiation.'
        },
        {
          heading: 'The Staged Reveal is your sovereign protection',
          description:
            'You never reveal proprietary trade secrets, unredacted client lists, or production source code in public previews. Tier 0 and Tier 1 establish credibility; Tier 3 delivers value only after escrow is locked.',
          doRule: 'Carefully gate your intellectual property across the four platform tiers.',
          dontRule: 'Never post unredacted API credentials or raw database dumps in public previews.'
        },
        {
          heading: 'Reputation is your greatest compounding asset',
          description:
            'Architects with zero disputes and high diligence satisfaction ratings receive platform verified badges, priority placement in institutional deal digests, and commanding 2–3x pricing power.',
          doRule: 'Over-deliver on documentation depth to guarantee zero-dispute settlements.',
          dontRule: 'Do not exaggerate claims in Tier 0 that you cannot verify in Tier 3.'
        }
      ],
      checklists: [
        'Intellectual property ownership verified and clear of employer encumbrance',
        'Willingness to provide 10 hours of remote onboarding assistance',
        'Realistic valuation benchmarked against comparable vvEntra transactions',
        'Commitment to professional, timely response during buyer diligence'
      ],
      proTip: 'Architects who include a 5-minute Loom walkthrough explaining the architecture see 3x higher Tier 1 to Tier 3 conversion rates.'
    },
    {
      id: '02',
      num: '02',
      title: 'Preparation',
      subtitle: 'Structuring the 4-Tier Dossier',
      badge: 'DOSSIER PACKAGING',
      summary:
        'How you structure your listing determines your sale velocity and price. A well-organized 4-Tier Dossier signals institutional competence and builds immediate trust with PE and strategic buyers.',
      principles: [
        {
          heading: 'Tier 0: The Compelling Public Teaser Hook',
          description:
            'Your public summary must describe the business problem, target market, TAM, and verified metrics without revealing identifying trade secrets or brand identities.',
          doRule: 'State verified metrics (e.g., "$1.2M pipeline, 78% gross margin, 24-page dossier").',
          dontRule: 'Do not reveal company name, URL, or proprietary source code in Tier 0.'
        },
        {
          heading: 'Tier 1 & 2: Blinded Financials & Market Architecture',
          description:
            'Unlocks for verified buyers who execute the platform NDA. Include unit economics, anonymous customer cohorts, tech stack diagrams, and supplier cost breakdowns.',
          doRule: 'Provide editable spreadsheets with clear formula assumptions.',
          dontRule: 'Do not omit critical cost components like hosting, API, or customer support.'
        },
        {
          heading: 'Tier 3: The Complete Production Delivery',
          description:
            'The crown jewels unlocked upon escrow commitment. Production Git repos, Docker containers, supplier contract introductions, operational SOPs, and marketing playbooks.',
          doRule: 'Include a clean README, setup script, and architecture diagram in the repo.',
          dontRule: 'Never leave broken dependencies, dead links, or missing asset keys.'
        }
      ],
      checklists: [
        'Tier 0 teaser written with clear value proposition and zero IP leakage',
        'Tier 1 financial model sanitized and formulas validated',
        'Tier 2 architectural diagrams and supplier matrices completed',
        'Tier 3 codebase cleaned, commented, and packaged with installation guide'
      ],
      proTip: 'Create a dedicated "manifest.json" or README listing every single file and folder in the Tier 3 bundle so the buyer can instantly verify complete delivery.'
    },
    {
      id: '03',
      num: '03',
      title: 'Execution',
      subtitle: 'Listing, Pricing & Buyer Diligence Sprints',
      badge: 'MARKET EXECUTION',
      summary:
        'Once listed, proactive communication during the 7-day buyer inspection window ensures prompt escrow release and solidifies your track record.',
      principles: [
        {
          heading: 'Pricing Strategy: Fair Value vs. Liquidity Velocity',
          description:
            'Price your opportunity realistically based on replacement cost and historical multiples. Opportunities priced between $5,000 and $35,000 typically close within 72 hours of listing.',
          doRule: 'Benchmark your price against comparable opportunities in our Pricing Matrix.',
          dontRule: 'Avoid arbitrary $100k+ valuations without auditable trailing cash flows.'
        },
        {
          heading: 'The 4-Hour Response Rule During Diligence',
          description:
            'When a verified buyer commits funds to escrow, respond to their technical questions within 4 hours. Fast, transparent answers eliminate anxiety and prevent frivolous dispute claims.',
          doRule: 'Enable push notifications and respond promptly through the platform inbox.',
          dontRule: 'Never disappear for 48 hours while an active buyer is inspecting your asset.'
        },
        {
          heading: 'The 48-Hour Settlement Protocol',
          description:
            'Once the buyer confirms satisfaction or the 7-day inspection window elapses without dispute, vvEntra releases 90% net payout directly to your bank account via Stripe / Wire.',
          doRule: 'Ensure bank routing and KYC payout details are confirmed in advance.',
          dontRule: 'Do not worry about payment collection; escrow custody guarantees settlement.'
        }
      ],
      checklists: [
        'Stripe Connect or bank payout rails verified in platform settings',
        'Notification alerts configured for incoming buyer unlock requests',
        'Pre-scheduled calendar slots reserved for buyer onboarding sessions',
        'FAQ response document prepared for common buyer diligence inquiries'
      ],
      proTip: 'Offering 10 complimentary hours of integration support in your listing description routinely commands a 15–20% higher purchase price.'
    },
    {
      id: '04',
      num: '04',
      title: 'Red Flags',
      subtitle: 'Buyer Behaviors to Guard Against',
      badge: 'IP INTEGRITY',
      summary:
        'While vvEntra screens buyers through Persona KYC, architects should remain vigilant against tire-kickers, scrapers, and malicious circumvention attempts.',
      principles: [
        {
          heading: 'Unverified Guests Demanding Sensitive Data',
          description:
            'Never share confidential documents, code repositories, or supplier contacts with unverified accounts or buyers who refuse to execute the standard platform NDA.',
          doRule: 'Direct all interested parties through the standard Tier 1 NDA gate.',
          dontRule: 'Do not send PDFs or links via external email to unverified accounts.'
        },
        {
          heading: 'Demands for Off-Platform Private Deals',
          description:
            'If a buyer messages you saying "Let\'s avoid the platform fee and wire directly," decline immediately and report the conversation. Off-platform deals forfeit all payment guarantees.',
          doRule: 'Report circumvention solicitations to our escrow moderation desk.',
          dontRule: 'Never accept wire promises from unknown buyers without escrow custody.'
        },
        {
          heading: 'Unreasonable Post-Unlock Scope Creep',
          description:
            'Buyers sometimes mistake purchasing an intellectual property opportunity for hiring a full-time engineering contractor. Clearly bound your included advisory hours.',
          doRule: 'Specify exactly what is included in the manifest and advisory commitment.',
          dontRule: 'Do not agree to build new custom features outside the original listing scope.'
        }
      ],
      checklists: [
        'All communications maintained inside vvEntra encrypted chat',
        'Scope of post-sale onboarding documented in listing terms (e.g., 10 hours)',
        'Zero code or credentials shared before Tier 3 escrow confirmation',
        'Prompt reporting of any buyer attempting off-platform solicitation'
      ],
      proTip: 'If a buyer is aggressively demanding customizations prior to unlock, suggest they hire your agency separately after the core asset purchase has settled.'
    },
    {
      id: '05',
      num: '05',
      title: 'Success Patterns',
      subtitle: 'How Top Creators Build Compounding Deal Flow',
      badge: 'SERIES CREATORS',
      summary:
        'The top 10% of architects on vvEntra treat opportunity creation as a repeatable product studio. They build, validate, package, monetize, and repeat.',
      principles: [
        {
          heading: 'The "Modular Asset" Architecture',
          description:
            'Package your codebase with standard tech stacks (Next.js, Tailwind, FastAPI, PostgreSQL, Supabase, Docker) that allow any competent buyer team to deploy within hours.',
          doRule: 'Use widely adopted, clean open-source frameworks with minimal dependencies.',
          dontRule: 'Avoid obscure proprietary languages or undocumented custom server setups.'
        },
        {
          heading: 'Exemplary Documentation Sets You Apart',
          description:
            'The single biggest driver of 5-star architect ratings is documentation clarity. Include setup guides, environment variable templates, API specs, and operational playbooks.',
          doRule: 'Provide step-by-step video setup guides and commented code architectures.',
          dontRule: 'Do not assume the buyer knows your unwritten development conventions.'
        },
        {
          heading: 'Cultivating Repeat Buyer Syndicates',
          description:
            'Private equity search funds and venture studios frequently purchase 3 to 5 opportunities per year. Satisfied buyers will subscribe directly to your upcoming listing notifications.',
          doRule: 'Maintain an email contact list of buyers who expressed interest in your work.',
          dontRule: 'Do not neglect buyers who unlocked Tier 1 but did not complete Tier 3.'
        }
      ],
      checklists: [
        'Clean repository with zero hardcoded secret keys or expired API tokens',
        'Comprehensive README.md with one-click Docker or npm run setup commands',
        'Video walkthrough illustrating system architecture and live user flows',
        'Professional profile bio highlighting past successful venture track record'
      ],
      proTip: 'Architects who maintain a clean GitHub commit history showing authentic iterative development achieve higher buyer confidence than single "initial commit" dumps.'
    },
    {
      id: '06',
      num: '06',
      title: 'Common Mistakes',
      subtitle: 'The 6 Traps That Trigger Disputes',
      badge: 'RISK MITIGATION',
      summary:
        'Disputes on vvEntra are rare (<1.8% of transactions), but when they occur, they almost always stem from preventable creator oversights. Study these pitfalls to ensure 100% settlement success.',
      principles: [
        {
          heading: 'Mistake #1: Over-promising in Tier 0 and Under-delivering in Tier 3',
          description:
            'Claiming "120 pages of supplier dossiers" and delivering 30 pages of shallow notes constitutes material misrepresentation under Section 05 and grants the buyer an automatic refund.',
          doRule: 'Accurately describe exact page counts, file formats, and code line totals.',
          dontRule: 'Never inflate asset descriptions or use hyperbole in listing claims.'
        },
        {
          heading: 'Mistake #2: Ignoring Buyer Questions During the 7-Day Window',
          description:
            'Failing to answer buyer diligence questions within 48 hours raises buyer suspicion and often triggers an unnecessary dispute escalation.',
          doRule: 'Check your platform inbox twice daily while a transaction is in inspection.',
          dontRule: 'Never go offline or ignore buyer messages during active inspection.'
        },
        {
          heading: 'Mistake #3: Missing Core Advertised Deliverables',
          description:
            'Promising a financial model or deployment script and forgetting to upload it to the Tier 3 vault triggers an immediate dispute. Triple-check your zip bundle.',
          doRule: 'Download and test your own zip archive on a fresh machine prior to upload.',
          dontRule: 'Never upload unverified archives with missing configuration files.'
        }
      ],
      checklists: [
        'Deliverables manifest audited against every claim made in listing title & description',
        'All zip archives unpacked and tested on an independent clean machine',
        'Environment variable template (.env.example) included with dummy credentials',
        'Clear understanding of Section 05 Dispute Resolution procedures'
      ],
      proTip: 'When in doubt, include a "Quickstart Delivery Guide" PDF at the root of your delivery archive guiding the buyer through their first 30 minutes of asset exploration.'
    }
  ];

  const currentPlaybook = isArchitect ? ARCHITECT_PLAYBOOK : BUYER_PLAYBOOK;

  // Filter chapters based on search query
  const filteredChapters = currentPlaybook.filter((ch) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = ch.title.toLowerCase().includes(q);
    const subtitleMatch = ch.subtitle.toLowerCase().includes(q);
    const summaryMatch = ch.summary.toLowerCase().includes(q);
    const principleMatch = ch.principles.some(
      (p) => p.heading.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
    return titleMatch || subtitleMatch || summaryMatch || principleMatch;
  });

  return (
    <div id="playbook-page" className="w-full text-neutral-900 dark:text-white select-none pb-24 transition-colors duration-300">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matching User Image Exact Reference) */}
      {/* ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-black/10 dark:border-[var(--line)] bg-transparent overflow-hidden transition-colors duration-300">
        
        {/* Subtle radial luxury glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] blur-[160px] pointer-events-none rounded-full opacity-20 transition-all duration-500"
          style={{ backgroundColor: themeColor }}
        />

        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Eyebrow: — THE PLAYBOOK · STRATEGIC GUIDELINES */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <span 
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span>—</span>
              <span>THE PLAYBOOK · STRATEGIC GUIDELINES</span>
            </span>
          </div>

          {/* Headline (Matching Screenshot: How serious users get serious / results.) */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal text-neutral-900 dark:text-white tracking-tight leading-[1.08] max-w-5xl mx-auto">
            How serious users get{' '}
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              serious
            </em>
            <br />
            <em className="font-serif italic font-normal transition-colors duration-300" style={{ color: themeColor }}>
              results.
            </em>
          </h1>

          {/* Subtitle (Matching Screenshot Exact Copy) */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-6 sm:mt-8 leading-relaxed font-normal">
            vvEntra is built for operators, not amateurs. This playbook is what we've learned from watching the top 10% of users succeed and the bottom 30% fail.{' '}
            <em className="font-serif italic font-normal text-neutral-800 dark:text-neutral-200">Read it before you act.</em>
          </p>

          {/* Interactive Role Switcher Pill Container (Exact Match to User Image) */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-white dark:bg-[#12100E] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-2xl">
              
              {/* Left Tab: As Buyer / INVESTOR PLAYBOOK */}
              <button
                onClick={() => handleRoleSwitch('buyer')}
                className={`flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full transition-all duration-300 cursor-pointer select-none ${
                  !isArchitect
                    ? 'bg-[#E2571B] text-white shadow-md'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!isArchitect ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold leading-tight">As Buyer</div>
                  <div className="text-[9.5px] font-mono tracking-widest uppercase opacity-90 font-medium">INVESTOR PLAYBOOK</div>
                </div>
              </button>

              {/* Right Tab: As Architect / CREATOR PLAYBOOK */}
              <button
                onClick={() => handleRoleSwitch('architect')}
                className={`flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full transition-all duration-300 cursor-pointer select-none ${
                  isArchitect
                    ? 'bg-[#16A34A] text-white shadow-md'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isArchitect ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold leading-tight">As Architect</div>
                  <div className="text-[9.5px] font-mono tracking-widest uppercase opacity-90 font-medium">CREATOR PLAYBOOK</div>
                </div>
              </button>

            </div>
          </div>

          {/* Chapter Timeline Rail: 01 Mindset → 02 Preparation → 03 Execution → 04 Red flags → 05 Success patterns → 06 Common mistakes */}
          <div className="mt-8 sm:mt-12 w-full flex items-center justify-center px-2 sm:px-4">
            <nav 
              aria-label="Playbook Chapters"
              className="inline-flex items-center justify-center flex-wrap sm:flex-nowrap gap-1 sm:gap-2 text-[11px] sm:text-xs font-mono px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-black/[0.04] dark:bg-[#110F0E] border border-black/10 dark:border-white/10 shadow-xs max-w-full"
            >
              {[
                { num: '01', label: 'Mindset' },
                { num: '02', label: 'Preparation' },
                { num: '03', label: 'Execution' },
                { num: '04', label: 'Red flags' },
                { num: '05', label: 'Success patterns' },
                { num: '06', label: 'Common mistakes' },
              ].map((item, idx, arr) => {
                const isActive = activeChapterId === item.num;
                return (
                  <React.Fragment key={item.num}>
                    <button
                      type="button"
                      onClick={() => scrollToChapter(item.num)}
                      className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer select-none ${
                        isActive
                          ? 'bg-[#181512] text-white dark:bg-white/20 dark:text-white border border-black/30 dark:border-white/25 shadow-sm'
                          : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span 
                        className={`font-serif italic font-semibold text-xs sm:text-sm ${
                          isActive ? 'text-white !text-white' : ''
                        }`}
                        style={{ color: isActive ? '#FFFFFF' : themeColor }}
                      >
                        {item.num}
                      </span>
                      <span 
                        className={`font-medium whitespace-nowrap ${
                          isActive ? 'text-white !text-white' : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>

                    {idx < arr.length - 1 && (
                      <span className="text-neutral-400 dark:text-neutral-600 select-none text-[10px] sm:text-xs">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. PLAYBOOK SEARCH & CHAPTER OVERVIEW CONTROLS */}
      {/* ======================================================== */}
      <section className="py-8 border-b border-black/10 dark:border-[var(--line)] bg-transparent transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search filter input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search strategies, red flags, checklists..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#12100E] border border-black/15 dark:border-white/10 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs font-medium">
              <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                {filteredChapters.length} CHAPTERS · {isArchitect ? 'ARCHITECT DISCIPLINE' : 'INVESTOR DISCIPLINE'}
              </span>
              <button
                onClick={() => {
                  const allOpen = Object.values(expandedSections).every(Boolean);
                  const nextState: Record<string, boolean> = {};
                  ['01', '02', '03', '04', '05', '06'].forEach(k => {
                    nextState[k] = !allOpen;
                  });
                  setExpandedSections(nextState);
                }}
                className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/10 bg-white dark:bg-[#12100E] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
              >
                {Object.values(expandedSections).every(Boolean) ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PLAYBOOK CHAPTERS (High-Contrast Tactile Cards) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 bg-transparent transition-colors duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {filteredChapters.map((chapter) => {
            const isExpanded = expandedSections[chapter.num] ?? true;
            return (
              <div
                key={chapter.id}
                id={`chapter-${chapter.num}`}
                className="scroll-mt-28"
              >
                {/* Chapter Main Card Container */}
                <div className="trust-card rounded-2xl bg-white dark:bg-[#0D0B0A] border border-black/15 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-300">
                  
                  {/* Chapter Header Bar */}
                  <div className="p-6 sm:p-8 border-b border-black/10 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#FAF8F4]/80 dark:bg-white/[0.01]">
                    
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      {/* Big Chapter Number */}
                      <div 
                        className="font-serif italic text-3xl sm:text-5xl font-bold shrink-0 select-none"
                        style={{ color: themeColor }}
                      >
                        {chapter.num}
                      </div>

                      <div>
                        {/* Eyebrow & Badge */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span 
                            className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold"
                            style={{ color: themeColor }}
                          >
                            CHAPTER {chapter.num} · {chapter.badge}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-neutral-900 dark:text-white font-medium tracking-tight">
                          {chapter.title}
                          <span className="text-neutral-500 font-normal font-sans text-lg sm:text-xl ml-3 hidden sm:inline">
                            — {chapter.subtitle}
                          </span>
                        </h2>
                      </div>
                    </div>

                    {/* Right Controls: Copy Checklist & Collapse */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => handleCopyChecklist(chapter.num, chapter.checklists.join('\n• '))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/10 bg-white dark:bg-[#141210] hover:bg-neutral-50 dark:hover:bg-white/5 text-xs text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer shadow-2xs font-medium"
                      >
                        {copiedId === chapter.num ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Checklist</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => toggleSection(chapter.num)}
                        className="p-2 rounded-xl border border-black/15 dark:border-white/10 bg-white dark:bg-[#141210] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
                        aria-label="Toggle section"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Chapter Body Content */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 animate-in fade-in duration-200">
                      
                      {/* Summary Banner */}
                      <div className="p-5 sm:p-6 rounded-xl bg-[#F5F2EB] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                        <strong className="text-neutral-950 dark:text-white font-semibold">Executive Thesis: </strong>
                        {chapter.summary}
                      </div>

                      {/* Core Principles Grid */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-bold mb-5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                          <span>CORE OPERATING PRINCIPLES</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {chapter.principles.map((principle, pIdx) => (
                            <div 
                              key={pIdx}
                              className="p-5 rounded-xl bg-white dark:bg-[#12100E] border border-black/12 dark:border-white/10 shadow-xs flex flex-col justify-between hover:border-black/25 dark:hover:border-white/20 transition-all"
                            >
                              <div>
                                <h3 className="font-serif text-lg text-neutral-900 dark:text-white font-medium mb-2.5 leading-snug">
                                  {principle.heading}
                                </h3>
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                  {principle.description}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-black/8 dark:border-white/5 space-y-2 text-[11px] font-normal">
                                <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-400">
                                  <span className="font-bold shrink-0">DO:</span>
                                  <span>{principle.doRule}</span>
                                </div>
                                <div className="flex items-start gap-1.5 text-rose-800 dark:text-rose-400">
                                  <span className="font-bold shrink-0">DON'T:</span>
                                  <span>{principle.dontRule}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actionable Diligence Checklist Box */}
                      <div className="p-6 sm:p-7 rounded-xl bg-[#FAF8F4] dark:bg-[#12100E] border border-black/12 dark:border-white/10 shadow-xs">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-900 dark:text-white font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" style={{ color: themeColor }} />
                            <span>VERIFIED EXECUTION CHECKLIST</span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {chapter.checklists.length} ITEMS TO COMPLETE
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {chapter.checklists.map((checkItem, cIdx) => (
                            <div 
                              key={cIdx}
                              className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-[#0D0B0A] border border-black/8 dark:border-white/5 text-xs text-neutral-800 dark:text-neutral-200"
                            >
                              <span 
                                className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                                style={{ borderColor: themeColor }}
                              >
                                <Check className="w-2.5 h-2.5" style={{ color: themeColor }} />
                              </span>
                              <span>{checkItem}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Operator Pro Tip Banner */}
                      <div className="p-4 sm:p-5 rounded-xl border border-black/10 dark:border-white/10 flex items-start gap-3.5 bg-white dark:bg-[#12100E]">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${themeColor}15`,
                            borderColor: `${themeColor}40`,
                            color: themeColor
                          }}
                        >
                          <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                        </div>
                        <div>
                          <div className="text-[10.5px] font-mono uppercase tracking-wider font-bold mb-0.5" style={{ color: themeColor }}>
                            OPERATOR FIELD NOTE
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {chapter.proTip}
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CLOSING CARD: THE PLATFORM REWARDS DISCIPLINE          */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 border-t border-black/10 dark:border-[var(--line)] bg-transparent transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Framing Card Container */}
          <div className="rounded-2xl bg-white dark:bg-[#110F0E] border border-black/12 dark:border-white/10 p-8 sm:p-12 md:p-16 text-center shadow-xl dark:shadow-2xl transition-all duration-300">
            
            {/* Eyebrow: — NOW YOU'RE READY */}
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <span 
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <span>—</span>
                <span>NOW YOU'RE READY</span>
              </span>
            </div>

            {/* Headline: The platform rewards discipline. */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.15] mb-6 sm:mb-8 max-w-3xl mx-auto">
              The platform{' '}
              <em 
                className={`font-serif italic font-normal transition-colors duration-300 ${isArchitect ? 'text-[#16A34A]' : 'text-[#E2571B]'}`}
                style={{ color: themeColor }}
              >
                rewards discipline.
              </em>
            </h2>

            {/* Paragraph */}
            <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal mb-8 sm:mb-10">
              The users who treat vvEntra as a serious environment get serious results. The ones who don't, don't.{' '}
              <em className="font-serif italic font-normal text-neutral-800 dark:text-neutral-200">
                You've now read more than 80% of the people you'll transact with.
              </em>
            </p>

            {/* 3 Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigateTo('#dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-md text-xs sm:text-sm font-medium text-white transition-all shadow-md hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2 select-none"
                style={{ backgroundColor: themeColor, color: '#FFFFFF' }}
              >
                <span>Open the dashboard</span>
                <span className="font-sans">→</span>
              </button>

              <button
                onClick={() => navigateTo('#trust')}
                className="w-full sm:w-auto px-6 py-3 rounded-md text-xs sm:text-sm font-medium text-neutral-900 dark:text-white bg-white dark:bg-[#110F0E] border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-neutral-400 dark:hover:border-white/30 transition-all shadow-xs active:scale-95 cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                <span>Read trust policy</span>
                <span className="font-sans">→</span>
              </button>

              <button
                onClick={() => navigateTo('#faq')}
                className="w-full sm:w-auto px-6 py-3 rounded-md text-xs sm:text-sm font-medium text-neutral-900 dark:text-white bg-white dark:bg-[#110F0E] border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-neutral-400 dark:hover:border-white/30 transition-all shadow-xs active:scale-95 cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                <span>View FAQ</span>
                <span className="font-sans">→</span>
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
