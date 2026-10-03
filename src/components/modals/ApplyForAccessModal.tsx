import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronDown, Check, User, Shield } from 'lucide-react';

export const ApplyForAccessModal: React.FC = () => {
  const { 
    isApplyModalOpen, 
    closeApplyModal, 
    role, 
    setRole, 
    setStage, 
    setActiveRoute 
  } = useApp();

  // Exactly the 7 fields from the reference image
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [country, setCountry] = useState('');
  const [sectorFocus, setSectorFocus] = useState('');
  const [capitalRange, setCapitalRange] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [referralSource, setReferralSource] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync / Reset on open
  useEffect(() => {
    if (isApplyModalOpen) {
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  }, [isApplyModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isApplyModalOpen) {
        closeApplyModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isApplyModalOpen, closeApplyModal]);

  if (!isApplyModalOpen) return null;

  const isArchitect = role === 'architect';
  const themeAccentColor = isArchitect ? '#16A34A' : '#E2571B';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStage('applied');
    }, 500);
  };

  const handleVerifyIdentityNow = () => {
    closeApplyModal();
    setActiveRoute('#verify');
    window.location.hash = '#verify';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseFirst = () => {
    setStage('applied');
    closeApplyModal();
    setActiveRoute('#opportunities');
    window.location.hash = '#opportunities';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={closeApplyModal}
    >
      {isSubmitted ? (
        /* ======================================================== */
        /* APPLICATION RECEIVED CONFIRMATION VIEW (Light & Dark)    */
        /* ======================================================== */
        <div 
          className="w-full max-w-3xl bg-[#FAF8F5]/98 dark:bg-[#0A0807]/95 backdrop-blur-2xl text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col p-6 sm:p-10 md:p-14 my-auto transition-all relative animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Radial Glow */}
          <div 
            className="absolute -top-24 -right-16 w-96 h-96 blur-3xl rounded-full opacity-15 dark:opacity-25 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: themeAccentColor }}
          />

          {/* Close Button */}
          <button
            onClick={closeApplyModal}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/10 transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Heading */}
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-neutral-900 dark:text-white tracking-tight leading-tight">
              Request{' '}
              <em 
                className="font-serif italic font-normal transition-colors" 
                style={{ color: themeAccentColor }}
              >
                access.
              </em>
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4 font-normal">
              vvEntra is in private launch. Access is by application only. We review every submission and reach out within 3 working days.
            </p>
          </div>

          {/* "I AM JOINING AS" Section */}
          <div className="text-left w-full max-w-xl mx-auto mt-9 sm:mt-12">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-3 font-semibold">
              I AM JOINING AS
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Buyer / Investor Button */}
              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`px-5 py-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer select-none ${
                  role === 'investor'
                    ? 'border-[#E2571B] text-[#E2571B] bg-orange-500/10 dark:bg-[#18120F] ring-1 ring-[#E2571B]/30'
                    : 'border-neutral-300 dark:border-[#2A2420] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white/80 dark:bg-[#14110E]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Buyer / Investor</span>
              </button>

              {/* Architect / Opportunity Creator Button */}
              <button
                type="button"
                onClick={() => setRole('architect')}
                className={`px-5 py-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer select-none ${
                  role === 'architect'
                    ? 'border-[#16A34A] text-[#16A34A] bg-emerald-500/10 dark:bg-[#0E1610] ring-1 ring-[#16A34A]/30'
                    : 'border-neutral-300 dark:border-[#2A2420] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white/80 dark:bg-[#14110E]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Architect / Opportunity Creator</span>
              </button>
            </div>
          </div>

          {/* Center Card: Application received. */}
          <div className="mt-12 sm:mt-16 text-center max-w-xl mx-auto flex flex-col items-center">
            
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-6 shadow-md transition-colors"
              style={{ 
                borderColor: themeAccentColor,
                backgroundColor: `${themeAccentColor}15`
              }}
            >
              <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" style={{ color: themeAccentColor }} />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal tracking-tight mb-4">
              Application received.
            </h2>

            <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto mb-4 font-normal">
              Thank you. Your application is approved for the next step. To activate your account, verify your identity. It takes under 5 minutes.
            </p>

            <p className="italic text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-8 font-normal leading-relaxed">
              Until you verify, you can browse opportunities and explore the platform, but you cannot unlock or list.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleVerifyIdentityNow}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-lg text-white font-medium text-xs sm:text-sm transition-all shadow-md hover:brightness-110 active:translate-y-[1px] cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: themeAccentColor }}
              >
                <span>Verify identity now →</span>
              </button>

              <button
                type="button"
                onClick={handleBrowseFirst}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-lg bg-transparent border border-neutral-300 dark:border-white/20 hover:border-neutral-500 dark:hover:border-white/40 text-neutral-800 dark:text-white font-medium text-xs sm:text-sm transition-all hover:bg-black/5 dark:hover:bg-white/5 active:translate-y-[1px] cursor-pointer flex items-center justify-center"
              >
                <span>Browse first</span>
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* ======================================================== */
        /* GLASS THEMED MODAL CARD (Full Light & Dark Mode)         */
        /* ======================================================== */
        <div 
          className="w-full max-w-2xl bg-[#FAF8F5]/98 dark:bg-[#0D0B0A]/95 backdrop-blur-2xl text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] my-auto transition-all relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glass Top Specular Highlight Edge */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/30 dark:via-white/25 to-transparent pointer-events-none z-10" />

          {/* Ambient Glass Radial Glow in the Background */}
          <div 
            className="absolute -top-16 -right-10 w-96 h-64 blur-3xl rounded-full opacity-15 dark:opacity-35 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: themeAccentColor }}
          />
          <div 
            className="absolute bottom-10 -left-10 w-80 h-80 blur-3xl rounded-full opacity-10 dark:opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: themeAccentColor }}
          />

          {/* ======================================================== */}
          {/* HEADER                                                   */}
          {/* ======================================================== */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-neutral-200/80 dark:border-white/10 relative overflow-hidden bg-[#F2ECE4]/90 dark:bg-[#120F0E]/80 backdrop-blur-xl shrink-0">
            
            {/* Close Button */}
            <button
              onClick={closeApplyModal}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-neutral-300/70 dark:border-white/10 transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Eyebrow & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-2.5">
              <span 
                className="text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5 transition-colors"
                style={{ color: themeAccentColor }}
              >
                <span>—</span>
                <span>PRIVATE ADMISSION · APPLICATION DESK</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>COHORT 2026 OPEN</span>
              </span>
            </div>

            {/* Heading: "Request for Access." */}
            <h2 id="apply-modal-title" className="font-serif text-2xl sm:text-3xl lg:text-[2rem] font-normal tracking-tight text-neutral-900 dark:text-white leading-tight">
              Request for{' '}
              <em className="font-serif italic font-normal transition-colors" style={{ color: themeAccentColor }}>
                Access.
              </em>
            </h2>

            {/* Subheading */}
            <p className="mt-2 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl font-normal">
              vvEntra is in private launch. Access is by application only. We review every submission and reach out within 3 working days.
            </p>
          </div>

          {/* ======================================================== */}
          {/* FORM BODY                                                */}
          {/* ======================================================== */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 relative">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-left relative z-10">
              
              {/* ======================================================== */}
              {/* "I AM JOINING AS" BUTTONS (Prominently at top of form)  */}
              {/* ======================================================== */}
              <div className="pb-3 border-b border-neutral-200 dark:border-white/10">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-3 font-semibold">
                  I AM JOINING AS
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Buyer / Investor Button */}
                  <button
                    type="button"
                    onClick={() => setRole('investor')}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer select-none ${
                      role === 'investor'
                        ? 'border-[#E2571B] text-[#E2571B] bg-orange-500/10 dark:bg-[#18120F] ring-1 ring-[#E2571B]/50 shadow-[0_0_15px_rgba(226,87,27,0.15)]'
                        : 'border-neutral-300 dark:border-[#2A2420] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white/80 dark:bg-[#14110E]'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Buyer / Investor</span>
                  </button>

                  {/* Architect / Opportunity Creator Button */}
                  <button
                    type="button"
                    onClick={() => setRole('architect')}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer select-none ${
                      role === 'architect'
                        ? 'border-[#16A34A] text-[#16A34A] bg-emerald-500/10 dark:bg-[#0E1610] ring-1 ring-[#16A34A]/50 shadow-[0_0_15px_rgba(22,163,74,0.15)]'
                        : 'border-neutral-300 dark:border-[#2A2420] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white/80 dark:bg-[#14110E]'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Architect / Opportunity Creator</span>
                  </button>
                </div>
              </div>

              {/* 1. Full name */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 mb-2 font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 2. Email address */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 mb-2 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 3. Country */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 mb-2 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Where are you based?"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 4. Sector focus */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 font-medium">
                  Sector focus
                </label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-2 font-normal leading-normal">
                  What industries are you looking to invest or operate in?
                </p>
                <input
                  type="text"
                  value={sectorFocus}
                  onChange={(e) => setSectorFocus(e.target.value)}
                  placeholder="e.g. Fintech, D2C, SaaS, Healthcare"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 5. Typical capital range (With active theme border) */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 font-medium">
                  Typical capital range
                </label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-2 font-normal leading-normal">
                  Approximate range you deploy per opportunity.
                </p>
                <div className="relative">
                  <select
                    value={capitalRange}
                    onChange={(e) => setCapitalRange(e.target.value)}
                    style={{ borderColor: themeAccentColor }}
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-white dark:bg-[#070605]/90 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 appearance-none cursor-pointer shadow-xs dark:shadow-inner transition-colors border"
                  >
                    <option value="" className="bg-white dark:bg-[#0D0B0A] text-neutral-400">
                      Select a range
                    </option>
                    <option value="under-10k" className="bg-white dark:bg-[#0D0B0A] text-neutral-900 dark:text-white">
                      &lt; $10,000
                    </option>
                    <option value="10k-50k" className="bg-white dark:bg-[#0D0B0A] text-neutral-900 dark:text-white">
                      $10,000 – $50,000
                    </option>
                    <option value="50k-250k" className="bg-white dark:bg-[#0D0B0A] text-neutral-900 dark:text-white">
                      $50,000 – $250,000
                    </option>
                    <option value="250k-1m" className="bg-white dark:bg-[#0D0B0A] text-neutral-900 dark:text-white">
                      $250,000 – $1,000,000
                    </option>
                    <option value="1m-plus" className="bg-white dark:bg-[#0D0B0A] text-neutral-900 dark:text-white">
                      $1,000,000+
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 6. What are you looking for? */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 font-medium">
                  What are you looking for?
                </label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-2 font-normal leading-normal">
                  In a few sentences. Helps us match you with the right opportunities.
                </p>
                <textarea
                  rows={4}
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  placeholder="e.g. I am looking for execution-ready D2C or fintech models I can launch in India within 6 months. I have operational capacity and prior experience in consumer brands."
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 resize-y transition-all leading-relaxed shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 7. How did you hear about vvEntra? */}
              <div>
                <label className="block text-xs sm:text-[13px] font-mono tracking-wide text-neutral-800 dark:text-neutral-200 font-medium">
                  How did you hear about vvEntra?
                </label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-2 font-normal leading-normal">
                  Optional. Referral code or source.
                </p>
                <input
                  type="text"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                  placeholder="Referral name, LinkedIn, publication, or other"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#070605]/90 border border-neutral-300 dark:border-[#24201D] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 transition-all shadow-xs dark:shadow-inner"
                  style={{ ['--tw-ring-color' as any]: `${themeAccentColor}4D` }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = themeAccentColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                />
              </div>

              {/* 8. 3D Luxury Action Row */}
              <div className="pt-3 sm:pt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative group overflow-hidden px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg active:translate-y-[2px] disabled:opacity-50 select-none shrink-0 ${
                    isArchitect
                      ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),0_3px_0_#0E622B,0_8px_18px_rgba(22,163,74,0.4)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_4px_0_#0E622B,0_10px_22px_rgba(22,163,74,0.5)]'
                      : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/50 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),0_3px_0_#9A3412,0_8px_18px_rgba(234,88,12,0.4)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_4px_0_#9A3412,0_10px_22px_rgba(234,88,12,0.5)]'
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div className="absolute top-0 bottom-0 w-24 -left-12 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] animate-light-ray pointer-events-none" />
                  </div>

                  <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    <span>{isSubmitting ? 'Submitting...' : 'Submit application'}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </button>

                <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-normal font-normal">
                  We review every application. Response within 3 working days.
                </p>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};
