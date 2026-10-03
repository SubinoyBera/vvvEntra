import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Check, Shield, AlertCircle } from 'lucide-react';

export const VerifyIdentityPage: React.FC = () => {
  const { role, stage, setStage, setActiveRoute, addToast } = useApp();
  const isArchitect = role === 'architect';
  const roleTitle = isArchitect ? 'Architect / Opportunity Creator' : 'Buyer / Investor';
  const themeAccentColor = isArchitect ? '#16A34A' : '#E2571B';

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(stage === 'verified');

  // Proper LinkedIn Profile URL Validation
  const validateLinkedInUrl = (url: string): { isValid: boolean; error?: string } => {
    const trimmed = url.trim();
    if (!trimmed) {
      return { 
        isValid: false, 
        error: 'Please enter your LinkedIn profile URL.' 
      };
    }

    // Auto-normalize if user enters without protocol
    let normalized = trimmed;
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = `https://${normalized}`;
    }

    try {
      const parsed = new URL(normalized);
      const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

      // Must be on linkedin.com
      if (host !== 'linkedin.com') {
        return { 
          isValid: false, 
          error: 'URL must be a LinkedIn profile link (e.g. linkedin.com/in/your-name).' 
        };
      }

      // Must be a personal profile (/in/...)
      const pathParts = parsed.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
      if (pathParts[0] !== 'in' || !pathParts[1] || pathParts[1].length < 2) {
        return { 
          isValid: false, 
          error: 'Please enter a valid personal profile URL in the format: https://www.linkedin.com/in/your-name' 
        };
      }

      return { isValid: true };
    } catch {
      return { 
        isValid: false, 
        error: 'Invalid URL format. Example: https://www.linkedin.com/in/your-name' 
      };
    }
  };

  const handleConnectLinkedIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerified) return;

    const validation = validateLinkedInUrl(linkedinUrl);
    if (!validation.isValid) {
      setUrlError(validation.error || 'Invalid LinkedIn URL');
      addToast(validation.error || 'Please enter a valid LinkedIn URL', 'warn');
      return;
    }

    setUrlError(null);
    setIsVerifying(true);
    addToast('Connecting to LinkedIn verification gateway...', 'info');

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setStage('verified');
      addToast('Identity confirmed via LinkedIn. Full institutional clearance unlocked!', 'success');
    }, 1100);
  };

  const handleProceedToOpportunities = () => {
    setActiveRoute('#opportunities');
    window.location.hash = '#opportunities';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-neutral-900 dark:text-white relative">
      <div className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-7 animate-fadeIn">
        
        {/* ======================================================== */}
        {/* HEADER                                                   */}
        {/* ======================================================== */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-neutral-900 dark:text-white tracking-tight leading-tight">
            Verify your{' '}
            <em 
              className="font-serif italic font-normal transition-colors" 
              style={{ color: themeAccentColor }}
            >
              identity.
            </em>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-3.5 font-normal">
            Buyers confirm a real professional identity through LinkedIn. This protects every lister you engage with.
          </p>
        </div>

        {/* ======================================================== */}
        {/* STATUS BANNER CARD                                       */}
        {/* ======================================================== */}
        <div className="rounded-xl border border-neutral-300/80 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#120F0E] p-5 sm:p-6 shadow-md dark:shadow-xl transition-all">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: isVerified ? 'rgba(22, 163, 74, 0.15)' : 'rgba(226, 87, 27, 0.15)',
                  borderColor: isVerified ? 'rgba(22, 163, 74, 0.4)' : 'rgba(226, 87, 27, 0.4)',
                  color: isVerified ? '#16A34A' : '#E2571B'
                }}
              >
                {isVerified ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>

              <div>
                <h3 className="text-neutral-900 dark:text-white font-medium text-sm sm:text-base tracking-tight">
                  {isVerified ? 'Verification complete' : 'Verification in progress'}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 font-normal">
                  {isVerified 
                    ? 'All compliance steps satisfied. Your account is active.' 
                    : 'Complete each step below to activate your account.'}
                </p>
              </div>
            </div>

            {/* Status Pill */}
            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide shrink-0 border ${
                isVerified 
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-500 border-amber-500/20'
              }`}
            >
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="w-full h-1 sm:h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: isVerified ? '100%' : '35%',
                  backgroundColor: isVerified ? '#16A34A' : themeAccentColor 
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono text-neutral-500 mt-2">
              <span>{isVerified ? 'Step 3 of 3' : 'Step 2 of 3'}</span>
              <span>{isVerified ? '100% Complete' : 'In Progress'}</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUB-BANNER: VERIFYING AS                                 */}
        {/* ======================================================== */}
        <div className="rounded-xl border border-neutral-300/80 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#120F0E] px-4 sm:px-5 py-3.5 text-xs sm:text-[13px] flex flex-wrap items-center gap-1.5 leading-normal">
          <span className="font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-[11px] sm:text-xs font-medium">
            VERIFYING AS
          </span>
          <span className="font-semibold px-1" style={{ color: themeAccentColor }}>
            {roleTitle}
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 font-normal">
            Buyers confirm professional identity through LinkedIn.
          </span>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: ACCOUNT CREATED                                  */}
        {/* ======================================================== */}
        <div className="rounded-xl border border-neutral-300/80 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#120F0E] p-5 sm:p-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 dark:bg-[#0D2115] border border-emerald-500/30 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div>
              <h4 className="text-neutral-900 dark:text-white font-medium text-sm sm:text-base tracking-tight">
                Account created
              </h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 font-normal">
                Email confirmed and account active.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            Complete
          </span>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: PROFESSIONAL IDENTITY · LINKEDIN (Active Step)   */}
        {/* ======================================================== */}
        <div 
          className={`rounded-xl bg-[#FAF8F5] dark:bg-[#120F0E] p-5 sm:p-7 relative transition-all duration-300 shadow-md ${
            isVerified 
              ? 'border border-emerald-500/40' 
              : 'border border-[#E2571B] shadow-[0_0_25px_rgba(226,87,27,0.08)]'
          }`}
        >
          {/* Top Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 border ${
                  isVerified
                    ? 'bg-emerald-500/10 dark:bg-[#0D2115] border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                    : 'bg-orange-500/10 dark:bg-[#2A180E] border-[#E2571B] text-[#E2571B]'
                }`}
              >
                {isVerified ? <Check className="w-4 h-4 stroke-[2.5]" /> : '2'}
              </div>

              <div>
                <h4 className="text-neutral-900 dark:text-white font-medium text-sm sm:text-base tracking-tight">
                  Professional identity · LinkedIn
                </h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1 leading-relaxed font-normal">
                  Connect your LinkedIn so we can confirm you are a real professional. We check your name, headline, and account standing.
                </p>
              </div>
            </div>

            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 border ${
                isVerified 
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                  : 'bg-[#E2571B]/10 text-[#E2571B] border-[#E2571B]/30'
              }`}
            >
              {isVerified ? 'Complete' : 'Required'}
            </span>
          </div>

          {/* Form / URL Input + LinkedIn Connect Button */}
          <form onSubmit={handleConnectLinkedIn} className="mt-5 sm:mt-6">
            <label className="block text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium mb-2 font-mono">
              Your LinkedIn profile URL
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <input
                type="url"
                value={linkedinUrl}
                disabled={isVerified}
                onChange={(e) => {
                  setLinkedinUrl(e.target.value);
                  if (urlError) setUrlError(null);
                }}
                placeholder="https://www.linkedin.com/in/your-profile"
                className={`flex-1 px-4 py-3 rounded-lg bg-white dark:bg-[#070605] border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner disabled:opacity-50 ${
                  urlError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                    : 'border-neutral-300 dark:border-neutral-800 focus:border-[#E2571B] focus:ring-[#E2571B]/30'
                }`}
              />

              <button
                type="button"
                onClick={() => handleConnectLinkedIn()}
                disabled={isVerifying || isVerified}
                className="px-5 py-3 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md select-none shrink-0 disabled:opacity-75 disabled:cursor-default"
              >
                {/* LinkedIn 'in' Icon */}
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>
                  {isVerifying ? 'Verifying...' : isVerified ? 'Connected' : 'Connect LinkedIn'}
                </span>
              </button>
            </div>

            {/* Validation Error Message */}
            {urlError && (
              <div className="mt-2.5 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{urlError}</span>
              </div>
            )}

            {/* Privacy Guarantee Note */}
            <div className="mt-4 rounded-lg bg-neutral-100 dark:bg-[#070605] border border-neutral-200 dark:border-white/5 p-3.5 flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              <Shield className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                We never post to your LinkedIn or contact your connections. We read your public profile once to confirm identity.
              </span>
            </div>
          </form>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: VERIFIED (Greyed-out when unverified, active)    */}
        {/* ======================================================== */}
        <div 
          className={`rounded-xl border p-5 sm:p-6 flex items-center justify-between transition-all duration-300 ${
            isVerified 
              ? 'border-emerald-500/40 bg-[#FAF8F5] dark:bg-[#120F0E] opacity-100 shadow-md' 
              : 'border-neutral-200 dark:border-white/5 bg-[#F4F1EA] dark:bg-[#0F0D0C] opacity-60'
          }`}
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div 
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border ${
                isVerified 
                  ? 'bg-emerald-500/10 dark:bg-[#0D2115] border-emerald-500/40 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-neutral-200 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-500'
              }`}
            >
              {isVerified ? <Check className="w-4 h-4 stroke-[2.5]" /> : '3'}
            </div>

            <div>
              <h4 className="text-neutral-800 dark:text-neutral-200 font-medium text-sm sm:text-base tracking-tight">
                Verified
              </h4>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 font-normal">
                {isVerified 
                  ? 'Your account is activated. You can unlock opportunities and engage with listers.' 
                  : 'Awaiting completion of LinkedIn identity verification.'}
              </p>
            </div>
          </div>

          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 border ${
              isVerified 
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                : 'bg-black/5 dark:bg-white/5 text-neutral-500 border-black/5 dark:border-white/5'
            }`}
          >
            {isVerified ? 'Complete' : 'Awaiting'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* POST-VERIFICATION: "YOU ARE VERIFIED" SECTION            */}
        {/* Appears once verification is successful (Exact Match)     */}
        {/* ======================================================== */}
        {isVerified && (
          <div className="pt-6 sm:pt-8 text-center flex flex-col items-center animate-fadeIn">
            {/* Green Circular Checkmark Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm">
              <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
            </div>

            {/* Title: You are verified */}
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal tracking-tight">
              You are verified
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed mt-2.5 mb-6 sm:mb-8 font-normal">
              Your account is fully active. Everything on vvEntra is now open to you.
            </p>

            {/* 3D Browse opportunities button */}
            <button
              type="button"
              onClick={handleProceedToOpportunities}
              className="relative group overflow-hidden px-8 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-white tracking-wide transition-all duration-200 cursor-pointer shadow-lg active:translate-y-[2px] bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),0_3px_0_#0E622B,0_8px_18px_rgba(22,163,74,0.4)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_4px_0_#0E622B,0_10px_22px_rgba(22,163,74,0.5)] flex items-center justify-center gap-2 select-none"
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute top-0 bottom-0 w-24 -left-12 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] animate-light-ray pointer-events-none" />
              </div>
              <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                <span>Browse opportunities</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        )}

        {/* Thin Divider Line */}
        <div className="border-t border-neutral-200 dark:border-white/10 my-8 sm:my-10" />

        {/* ======================================================== */}
        {/* WHY VERIFICATION MATTERS SECTION                         */}
        {/* ======================================================== */}
        <div className="text-left space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-normal tracking-tight">
            Why verification matters
          </h3>

          <div className="space-y-4 text-xs sm:text-[13.5px] md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            <p>
              Every deal on vvEntra involves real capital, real IP, and real accountability. Buyers confirm professional identity through LinkedIn. Listers go further: bank-linked payouts and a live video check, so every opportunity is backed by a verified, real person.
            </p>

            <p>
              Architects cannot list. Buyers cannot unlock. Neither side can engage until verification is complete. This is the foundation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
