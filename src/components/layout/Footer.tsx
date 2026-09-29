import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Activity, 
  ArrowUp, 
  CheckCircle2, 
  Globe,
  FileText
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveRoute, role, setRole, addToast } = useApp();
  const isArchitect = role === 'architect';
  const themeColor = isArchitect ? '#16A34A' : '#E2571B';

  const handleNavClick = (hash: string) => {
    setActiveRoute(hash);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navColumns = [
    {
      title: 'EXCHANGE',
      links: [
        { label: 'Dashboard', hash: '#dashboard' },
        { label: 'Curated Opportunities', hash: '#opportunities' },
        { label: 'Sector Demand Pulse', hash: '#dashboard' },
        { label: 'Market Signals', hash: '#dashboard' },
        { label: 'List an Opportunity', hash: '#list' },
      ],
    },
    {
      title: 'GOVERNANCE & TRUST',
      links: [
        { label: 'Trust Architecture', hash: '#trust' },
        { label: 'Defense in Depth', hash: '#trust' },
        { label: 'Escrow Custody Mechanics', hash: '#trust' },
        { label: 'Verification SLA', hash: '#trust' },
        { label: 'Frequently Asked Questions', hash: '#faq' },
      ],
    },
    {
      title: 'METHODOLOGY',
      links: [
        { label: 'Playbook', hash: '#playbook' },
        { label: 'Staged Reveal Protocol', hash: '#trust' },
        { label: 'Arbitration Standards', hash: '#trust' },
        { label: 'Pricing & Fee Schedule', hash: '#pricing' },
        { label: 'About vvEntra', hash: '#about' },
      ],
    },
    {
      title: 'LEGAL & SECURITY',
      links: [
        { label: 'Terms of Service', hash: '#terms' },
        { label: 'Mutual Bilateral NDA', hash: '#terms' },
        { label: 'AES-256 Vault Privacy', hash: '#terms' },
        { label: 'Delaware Legal Rails', hash: '#terms' },
        { label: 'AML & Sanctions Compliance', hash: '#terms' },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[#070605] text-[var(--text)] transition-colors duration-300 relative overflow-hidden">
      
      {/* Subtle atmospheric backglow */}
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[300px] blur-[160px] pointer-events-none rounded-full opacity-10"
        style={{ backgroundColor: themeColor }}
      />

      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-12 relative z-10">
        
        {/* ======================================================== */}
        {/* 1. TOP BRAND HEADER & SYSTEM STATUS DOCK */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Official vvEntra Logo & Mission Block */}
          <div className="flex flex-col items-start max-w-xl">
            <a
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#dashboard');
              }}
              className="cursor-pointer group block"
            >
              {/* Official vvEntra Logo from Uploaded Image */}
              <img
                src="/logo-dark.png"
                alt="vvEntra · We enter ventures together"
                className="h-11 sm:h-12 w-auto dark:block hidden object-contain transition-opacity group-hover:opacity-90"
              />
              <img
                src="/logo-light.png"
                alt="vvEntra · We enter ventures together"
                className="h-11 sm:h-12 w-auto dark:hidden block object-contain transition-opacity group-hover:opacity-90"
              />
            </a>

            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
              The confidential institutional exchange where venture blueprints, validated thesis dossiers, and private capital deployment are engineered with cryptographic certainty.
            </p>

            {/* Trust Assurance Security Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>AES-256 VAULT</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>DELAWARE JURISDICTION</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>7-DAY ESCROW SLA</span>
              </span>
            </div>
          </div>

          {/* Right: Modern Operational Status & Telemetry Widget */}
          <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl bg-[#0D0B0A] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shrink-0">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-white tracking-tight">
                  Exchange Systems Operational
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  99.98% UPTIME
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                Settlement Rails: Active · Latency: 12ms · Bilateral NDA Node: Online
              </p>
            </div>

            {/* Quick Perspective Pill Indicator */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#161311] border border-white/10 shrink-0">
              <button
                onClick={() => {
                  setRole('investor');
                  addToast('Switched to Investor perspective', 'info');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  role === 'investor'
                    ? 'bg-[#E2571B] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Investor
              </button>
              <button
                onClick={() => {
                  setRole('architect');
                  addToast('Switched to Architect perspective', 'info');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  role === 'architect'
                    ? 'bg-[#16A34A] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Architect
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 2. INSTITUTIONAL MULTI-COLUMN NAVIGATION DIRECTORY */}
        {/* ======================================================== */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 border-b border-white/10">
          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h4 
                className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold mb-4"
                style={{ color: themeColor }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.hash);
                      }}
                      className="text-xs sm:text-[13px] text-neutral-400 hover:text-white transition-colors duration-150 block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM COPYRIGHT, TAGLINE & SCROLL TO TOP */}
        {/* ======================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© 2026 vvEntra Inc.</span>
            <span className="text-neutral-600">·</span>
            <span>Confidential Opportunity Exchange</span>
          </div>

          <div className="font-serif italic text-sm text-neutral-300">
            We enter ventures together.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-[11px]"
            title="Scroll to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

