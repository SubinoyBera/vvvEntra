import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { setRole, openApplyModal } = useApp();

  const handleApply = (roleTarget: 'investor' | 'architect') => {
    openApplyModal(roleTarget);
  };

  return (
    <section id="cta" className="py-12 sm:py-16 border-b border-[var(--line)] bg-transparent text-center relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 sm:gap-5 relative z-10">
        
        {/* Signature Large vv Brand Stamp */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--bg)] border border-[var(--line-strong)] flex items-center justify-center p-3 shadow-md mb-0">
          <svg className="w-10 h-10 text-[var(--role)]" viewBox="0 0 64 64" fill="currentColor">
            <path d="M14 16 L22 48 L32 28 L42 48 L50 16 L42 16 L37 36 L32 22 L27 36 L22 16 Z" />
          </svg>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[var(--text-muted)] bg-[var(--bg)] border border-[var(--line)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--role)]" />
          <span>Private launch · By application or invitation</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text)]">
          Enter the <em className="font-serif italic text-[var(--role)]">network.</em>
        </h2>

        {/* Lead */}
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
          vvEntra is in private launch. Access is by application or referral from existing members. We are intentionally selective. We do not scale by volume. We scale by quality.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
          <button
            onClick={() => handleApply('architect')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--role)] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[var(--role-deep)] transition-all cursor-pointer shadow-md"
          >
            <span>Apply as an Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleApply('investor')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--bg)] border border-[var(--line-strong)] text-[var(--text)] text-sm font-medium flex items-center justify-center gap-2 hover:border-[var(--role)] transition-all cursor-pointer shadow-xs"
          >
            <span>Apply as an Investor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-faint)] mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Typical application evaluation time: 24 to 48 hours</span>
        </div>

      </div>
    </section>
  );
};
