import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FEATURED_OPPORTUNITIES } from '../../data/mockData';
import { Opportunity } from '../../types';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export const PlatformPreviewSection: React.FC = () => {
  const { openNdaModal } = useApp();
  const [activeTab, setActiveTab] = useState<'live' | 'audit' | 'escrow'>('live');

  const handleInspect = (code: string) => {
    const found = FEATURED_OPPORTUNITIES.find((o) => o.code === code);
    if (found) {
      openNdaModal(found);
    } else {
      const fallbackOpp: Opportunity = {
        id: code,
        code,
        category: 'Fintech & Rails',
        tag: 'Fintech · Rails',
        demandTag: 'Verified',
        demandTrend: 'up',
        title: 'Fintech Merchant Rails',
        blurredPart: 'clearinghouse routing protocol',
        description: 'Banking partner SLA and founder KYC attestation. Ready for verified buyer clearance.',
        pages: 104,
        frameworks: 7,
        finModels: 3,
        architectRole: 'Senior architect',
        architectNote: 'Ex-Stripe Infrastructure Lead',
        unlockPrice: 6200,
        status: 'locked',
      };
      openNdaModal(fallbackOpp);
    }
  };

  return (
    <section id="dashboard" className="py-10 sm:py-14 border-b border-[var(--line)] bg-transparent select-none">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[var(--text)]">
            A live look at the <em className="font-serif italic text-[var(--role)]">platform.</em>
          </h2>
          <p className="text-xs sm:text-base text-[var(--text-muted)] mt-2.5 leading-relaxed">
            This is the exchange terminal. Opportunities flow in, get validated, get matched. Every state visible. Nothing exposed.
          </p>
        </div>

        {/* Terminal Chrome Window */}
        <div className="rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-paper)] shadow-2xl overflow-hidden max-w-5xl mx-auto transition-all">
          
          {/* Top Browser Bar */}
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bg)] border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Dynamic URL Path synced with active tab */}
            <div className="px-2 sm:px-4 py-1 rounded bg-[var(--bg-paper)] border border-[var(--line)] text-[10.5px] sm:text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 max-w-[190px] sm:max-w-md w-full justify-center transition-all truncate mx-1 sm:mx-2">
              <Lock className="w-3 h-3 text-[var(--role)] shrink-0" />
              <span className="truncate">
                vventra.com / <span className="text-[var(--text)] font-medium">
                  {activeTab === 'live' && 'exchange / live-terminal'}
                  {activeTab === 'audit' && 'exchange / moderation-queue'}
                  {activeTab === 'escrow' && 'exchange / escrow-vault'}
                </span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Synced</span>
            </div>
          </div>

          {/* Terminal Interior Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[470px]">
            
            {/* Left Terminal Navigation Sidebar */}
            <div className="md:col-span-3 p-3.5 sm:p-4 border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="px-2 py-0.5 sm:py-1 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-faint)] tracking-wider">
                  Terminal Navigation
                </div>
                
                <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {/* Tab 1: Live Exchange */}
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === 'live'
                        ? 'bg-[var(--role)] text-white shadow-md font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-paper)]'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                    <span>Live Exchange</span>
                    <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded hidden sm:inline-block ${
                      activeTab === 'live' ? 'bg-white/20 text-white' : 'opacity-80'
                    }`}>
                      184
                    </span>
                  </button>

                  {/* Tab 2: Under Moderation */}
                  <button
                    onClick={() => setActiveTab('audit')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === 'audit'
                        ? 'bg-[var(--role)] text-white shadow-md font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-paper)]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Moderation</span>
                    <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded hidden sm:inline-block ${
                      activeTab === 'audit' ? 'bg-white/20 text-white' : 'opacity-80'
                    }`}>
                      14
                    </span>
                  </button>

                  {/* Tab 3: Escrow Vault */}
                  <button
                    onClick={() => setActiveTab('escrow')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 sm:gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === 'escrow'
                        ? 'bg-[var(--role)] text-white shadow-md font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-paper)]'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Escrow</span>
                    <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded hidden sm:inline-block ${
                      activeTab === 'escrow' ? 'bg-white/20 text-white' : 'opacity-80'
                    }`}>
                      $420k
                    </span>
                  </button>
                </nav>
              </div>

              {/* Bottom Security Capsule */}
              <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg-paper)] border border-[var(--line)] text-xs font-mono space-y-1 hidden md:block">
                <span className="text-[10px] text-[var(--text-faint)] uppercase">Network Security</span>
                <div className="text-[var(--text)] flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>256-bit NDA Vault</span>
                </div>
              </div>
            </div>

            {/* Main Terminal Viewport (Changes based on activeTab) */}
            <div className="md:col-span-9 p-4 sm:p-6 bg-[var(--bg-paper)] flex flex-col justify-between">
              
              {/* ======================================================== */}
              {/* VIEW 1: LIVE EXCHANGE */}
              {/* ======================================================== */}
              {activeTab === 'live' && (
                <div className="animate-fadeIn">
                  {/* Metric Summary Header */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Listings</span>
                      <div className="text-sm sm:text-lg font-bold text-[var(--text)] mt-0.5">184 Verified</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Intent Ratio</span>
                      <div className="text-sm sm:text-lg font-bold text-emerald-500 mt-0.5">4.8x Ratio</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Clearance</span>
                      <div className="text-sm sm:text-lg font-bold text-[var(--text)] mt-0.5">11.4 Days</div>
                    </div>
                  </div>

                  {/* Records Feed (Horizontal Scroll on narrow screens) */}
                  <div className="overflow-x-auto pb-1">
                    <div className="space-y-2.5 sm:space-y-3 font-mono text-xs min-w-[500px] sm:min-w-0">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-[var(--text-faint)] text-[10.5px] sm:text-[11px] uppercase">
                        <span className="w-2/5">Listing Dossier</span>
                        <span className="w-1/4 text-center">Confidentiality Barrier</span>
                        <span className="w-1/5 text-right pr-4">Unlock Valuation</span>
                        <span className="w-16 text-right">Action</span>
                      </div>

                      {/* Row 1 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-[var(--role)]/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2438 · Indian D2C Ayurveda</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">127 pages · 9 frameworks · 4 fin models</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                            Tier 1 Locked
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-[var(--text)] tabular-nums text-right pr-4">$4,800</span>
                        <div className="w-16 text-right">
                          <button
                            onClick={() => handleInspect('VVE-2438')}
                            className="px-2.5 py-1 rounded bg-[var(--role)] text-white text-[11px] hover:bg-[var(--role-deep)] transition-all cursor-pointer font-sans"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-[var(--role)]/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2437 · B2B Compliance SaaS</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">96 pages · 6 frameworks · Mid-market US</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                            Tier 1 Locked
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-[var(--text)] tabular-nums text-right pr-4">$3,200</span>
                        <div className="w-16 text-right">
                          <button
                            onClick={() => handleInspect('VVE-2437')}
                            className="px-2.5 py-1 rounded bg-[var(--role)] text-white text-[11px] hover:bg-[var(--role-deep)] transition-all cursor-pointer font-sans"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-[var(--role)]/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2436 · AI Workflow Ops Agent</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">112 pages · 8 frameworks · DeepMind alum</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[10px] border border-orange-500/20 font-medium">
                            Surging Demand
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-[var(--text)] tabular-nums text-right pr-4">$5,400</span>
                        <div className="w-16 text-right">
                          <button
                            onClick={() => handleInspect('VVE-2436')}
                            className="px-2.5 py-1 rounded bg-[var(--role)] text-white text-[11px] hover:bg-[var(--role-deep)] transition-all cursor-pointer font-sans"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW 2: UNDER MODERATION */}
              {/* ======================================================== */}
              {activeTab === 'audit' && (
                <div className="animate-fadeIn">
                  {/* Metric Summary Header */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">In Diligence</span>
                      <div className="text-sm sm:text-lg font-bold text-amber-400 mt-0.5">14 Pending</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Clearance</span>
                      <div className="text-sm sm:text-lg font-bold text-emerald-400 mt-0.5">88.2% Pass</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Review SLA</span>
                      <div className="text-sm sm:text-lg font-bold text-[var(--text)] mt-0.5">48 Hours</div>
                    </div>
                  </div>

                  {/* Moderation Records Feed */}
                  <div className="overflow-x-auto pb-1">
                    <div className="space-y-2.5 sm:space-y-3 font-mono text-xs min-w-[500px] sm:min-w-0">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-[var(--text-faint)] text-[10.5px] sm:text-[11px] uppercase">
                        <span className="w-2/5">Dossier Code & Category</span>
                        <span className="w-1/4 text-center">Audit Stage</span>
                        <span className="w-1/5 text-right pr-4">Review SLA</span>
                        <span className="w-16 text-right">Action</span>
                      </div>

                      {/* Mod Item 1 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-amber-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2449 · Healthcare Billing Engine</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">Financial model & HIPAA compliance scan</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] border border-amber-500/20 font-medium">
                            Step 2/3 · Code Audit
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-amber-400 tabular-nums text-right pr-4 flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3 text-amber-400 inline" />
                          <span>18h left</span>
                        </span>
                        <div className="w-16 text-right">
                          <a
                            href="#opportunities"
                            className="px-2.5 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700 text-[11px] transition-all cursor-pointer font-sans inline-block"
                          >
                            Review
                          </a>
                        </div>
                      </div>

                      {/* Mod Item 2 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-sky-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2450 · Decarb Logistics Grid</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">LOI verification & pilot client interviews</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] border border-sky-500/20 font-medium">
                            Step 1/3 · Revenue Proof
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-neutral-300 tabular-nums text-right pr-4 flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3 text-neutral-400 inline" />
                          <span>32h left</span>
                        </span>
                        <div className="w-16 text-right">
                          <a
                            href="#opportunities"
                            className="px-2.5 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700 text-[11px] transition-all cursor-pointer font-sans inline-block"
                          >
                            Verify
                          </a>
                        </div>
                      </div>

                      {/* Mod Item 3 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-emerald-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">VVE-2451 · Fintech Merchant Rails</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">Banking SLA & founder KYC attestation</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                            Step 3/3 · Final Signoff
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-emerald-400 tabular-nums text-right pr-4 flex items-center justify-end gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
                          <span>Ready</span>
                        </span>
                        <div className="w-16 text-right">
                          <button
                            onClick={() => handleInspect('VVE-2451')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] transition-all cursor-pointer font-sans"
                          >
                            Release
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW 3: ESCROW VAULT */}
              {/* ======================================================== */}
              {activeTab === 'escrow' && (
                <div className="animate-fadeIn">
                  {/* Metric Summary Header */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Liquidity</span>
                      <div className="text-sm sm:text-lg font-bold text-white mt-0.5">$420,000</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Milestones</span>
                      <div className="text-sm sm:text-lg font-bold text-emerald-400 mt-0.5">18 Active</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)]">
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-faint)] uppercase">Dispute Rate</span>
                      <div className="text-sm sm:text-lg font-bold text-emerald-400 mt-0.5">0.00%</div>
                    </div>
                  </div>

                  {/* Escrow Records Feed */}
                  <div className="overflow-x-auto pb-1">
                    <div className="space-y-2.5 sm:space-y-3 font-mono text-xs min-w-[500px] sm:min-w-0">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-[var(--text-faint)] text-[10.5px] sm:text-[11px] uppercase">
                        <span className="w-2/5">Escrow Transaction & Asset</span>
                        <span className="w-1/4 text-center">Settlement Stage</span>
                        <span className="w-1/5 text-right pr-4">Vaulted Capital</span>
                        <span className="w-16 text-right">Action</span>
                      </div>

                      {/* Escrow Row 1 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-emerald-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">ESC-8842 · Decarb Supply Chain IP</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">Milestone 2/3 · Code repository transfer</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                            In Escrow (72h)
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-emerald-400 tabular-nums text-right pr-4">$145,000</span>
                        <div className="w-16 text-right">
                          <a
                            href="#opportunities"
                            className="px-2.5 py-1 rounded bg-[var(--role)] text-white hover:bg-[var(--role-deep)] text-[11px] transition-all cursor-pointer font-sans inline-block"
                          >
                            Audit
                          </a>
                        </div>
                      </div>

                      {/* Escrow Row 2 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-amber-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">ESC-8841 · Legal LLM Workflows</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">Buyer inspection period · NDA bound</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] border border-amber-500/20 font-medium">
                            Deposit Locked
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-amber-400 tabular-nums text-right pr-4">$120,000</span>
                        <div className="w-16 text-right">
                          <a
                            href="#opportunities"
                            className="px-2.5 py-1 rounded bg-[var(--role)] text-white hover:bg-[var(--role-deep)] text-[11px] transition-all cursor-pointer font-sans inline-block"
                          >
                            Audit
                          </a>
                        </div>
                      </div>

                      {/* Escrow Row 3 */}
                      <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between gap-2 hover:border-sky-500/40 transition-colors">
                        <div className="w-2/5 min-w-0">
                          <div className="font-semibold text-[var(--text)] truncate">ESC-8839 · B2B Compliance SaaS</div>
                          <div className="text-[10px] text-[var(--text-faint)] truncate">Milestone 3/3 · Final settlement released</div>
                        </div>
                        <div className="w-1/4 flex justify-center">
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] border border-sky-500/20 font-medium">
                            Disbursing
                          </span>
                        </div>
                        <span className="w-1/5 font-semibold text-sky-400 tabular-nums text-right pr-4">$155,000</span>
                        <div className="w-16 text-right">
                          <a
                            href="#opportunities"
                            className="px-2.5 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700 text-[11px] transition-all cursor-pointer font-sans inline-block"
                          >
                            Receipt
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom status bar */}
              <div className="pt-3 sm:pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-[var(--text-muted)] font-mono mt-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">
                    {activeTab === 'live' && 'Escrow clearinghouse verified by Tier-1 partner'}
                    {activeTab === 'audit' && 'vvEntra compliance engine enforces strict anti-speculation checks'}
                    {activeTab === 'escrow' && 'Multi-sig cryptographic vault backed by insured custody'}
                  </span>
                </span>
                <a href="#dashboard" className="text-[var(--role)] hover:underline flex items-center gap-1 font-sans shrink-0">
                  <span>
                    {activeTab === 'live' && 'Enter Full Terminal'}
                    {activeTab === 'audit' && 'View Moderation Policy'}
                    {activeTab === 'escrow' && 'Audit Vault Ledger'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
