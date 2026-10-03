import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, User, Shield } from 'lucide-react';

export const RequestAccessPage: React.FC = () => {
  const { role, setRole, setStage, setActiveRoute } = useApp();
  const isArchitect = role === 'architect';
  const themeAccentColor = isArchitect ? '#16A34A' : '#E2571B';

  const handleVerifyIdentityNow = () => {
    setActiveRoute('#verify');
    window.location.hash = '#verify';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseFirst = () => {
    setStage('applied');
    setActiveRoute('#opportunities');
    window.location.hash = '#opportunities';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-neutral-900 dark:text-white relative">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Heading */}
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
          
          {/* Circular Checkmark Badge */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-6 shadow-md transition-colors"
            style={{ 
              borderColor: themeAccentColor,
              backgroundColor: `${themeAccentColor}15`
            }}
          >
            <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" style={{ color: themeAccentColor }} />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white font-normal tracking-tight mb-4">
            Application received.
          </h2>

          {/* Description */}
          <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto mb-4 font-normal">
            Thank you. Your application is approved for the next step. To activate your account, verify your identity. It takes under 5 minutes.
          </p>

          {/* Subnote */}
          <p className="italic text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-8 font-normal leading-relaxed">
            Until you verify, you can browse opportunities and explore the platform, but you cannot unlock or list.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            
            {/* Primary: Verify identity now */}
            <button
              type="button"
              onClick={handleVerifyIdentityNow}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-lg text-white font-medium text-xs sm:text-sm transition-all shadow-md hover:brightness-110 active:translate-y-[1px] cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: themeAccentColor }}
            >
              <span>Verify identity now →</span>
            </button>

            {/* Secondary: Browse first */}
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
    </div>
  );
};
