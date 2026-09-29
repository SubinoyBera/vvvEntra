import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, X, ShieldCheck, CheckSquare, Square, AlertCircle, ArrowRight } from 'lucide-react';

export const NdaGateModal: React.FC = () => {
  const { selectedOpportunityForNda, closeNdaModal, addToast } = useApp();
  const [agreedNda, setAgreedNda] = useState(false);
  const [agreedEscrow, setAgreedEscrow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedOpportunityForNda) return null;

  const opp = selectedOpportunityForNda;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedNda || !agreedEscrow) {
      addToast('Please agree to the Mutual NDA and Escrow terms to proceed.', 'warn');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      closeNdaModal();
      addToast(
        `NDA executed for ${opp.code}. Escrow lock of $${opp.unlockPrice.toLocaleString()} initiated. Dossier credentials dispatched to your verified email.`,
        'success'
      );
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-[var(--bg-paper)] border border-[var(--line-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--line)] bg-[var(--bg)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--role)]" />
            <span className="font-semibold text-[var(--text)]">{opp.code}</span>
            <span className="text-[var(--text-faint)]">·</span>
            <span className="text-[var(--text-muted)]">{opp.tag}</span>
          </div>

          <button
            onClick={closeNdaModal}
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-paper)] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-[var(--text-muted)]">
          <div>
            <h3 id="modal-title" className="text-xl font-semibold text-[var(--text)] tracking-tight mb-1.5">
              Unlock Opportunity Dossier
            </h3>
            <p className="text-xs leading-relaxed">
              You are requesting the complete confidential playbook for{' '}
              <strong className="text-[var(--text)] font-medium">{opp.title} {opp.blurredPart}</strong>.
            </p>
          </div>

          {/* Dossier Specs Card */}
          <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] space-y-3 font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
              <span className="text-[var(--text-faint)]">Architect Background:</span>
              <span className="text-[var(--text)] font-medium text-right">{opp.architectRole}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
              <span className="text-[var(--text-faint)]">Verified Operational Scope:</span>
              <span className="text-[var(--text)] font-semibold">{opp.pages}p · {opp.frameworks} frameworks · {opp.finModels} models</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-faint)]">Escrow Unlock Fee:</span>
              <span className="text-sm font-bold text-[var(--text)] tabular-nums">
                ${opp.unlockPrice.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Legal Compliance Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedNda}
                onChange={(e) => setAgreedNda(e.target.checked)}
                className="mt-0.5 rounded border-[var(--line-strong)] text-[var(--role)] focus:ring-[var(--role)]"
              />
              <span className="text-xs leading-normal group-hover:text-[var(--text)] transition-colors">
                I agree to the <strong className="text-[var(--text)]">vvEntra Mutual Non-Disclosure & Non-Circumvention Agreement</strong> (v3.2). I will not copy, distribute, or reverse-engineer this proprietary thesis without authorization.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedEscrow}
                onChange={(e) => setAgreedEscrow(e.target.checked)}
                className="mt-0.5 rounded border-[var(--line-strong)] text-[var(--role)] focus:ring-[var(--role)]"
              />
              <span className="text-xs leading-normal group-hover:text-[var(--text)] transition-colors">
                I authorize placement of <strong className="text-[var(--text)]">${opp.unlockPrice.toLocaleString()}</strong> into third-party escrow. Funds are released only upon successful transmission and inspection of the complete verified dossier.
              </span>
            </label>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-normal font-mono">
              Identity Verified Clearing: Watermarked PDF with encrypted audit logs will be delivered to your authenticated member portal immediately upon signing.
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeNdaModal}
              className="px-4 py-2 rounded border border-[var(--line)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded bg-[var(--role)] text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[var(--role-deep)] transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Signing & Placing in Escrow...' : 'Execute NDA & Unlock'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
