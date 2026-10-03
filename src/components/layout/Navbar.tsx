import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Menu, X, User, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    role, 
    stage, 
    openApplyModal,
    activeRoute,
    setActiveRoute 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navigation bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          setShowNav(false);
        } else if (lastScrollY - currentScrollY > 6) {
          setShowNav(true);
        }
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Dashboard', hash: '#dashboard' },
    { label: 'Trust', hash: '#trust' },
    { label: 'Playbook', hash: '#playbook' },
    { label: 'FAQ', hash: '#faq' },
    { label: 'Pricing', hash: '#pricing' },
    { label: 'Opportunities', hash: '#opportunities' },
    { label: 'List an opportunity', hash: '#list' },
    { label: 'Terms', hash: '#terms' },
  ];

  const handleNavClick = (hash: string) => {
    setActiveRoute(hash);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isArchitect = role === 'architect';

  return (
    <div 
      className={`fixed top-7 sm:top-8 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        showNav ? 'translate-y-0 shadow-[0_4px_24px_rgba(0,0,0,0.55)]' : '-translate-y-[calc(100%+32px)] pointer-events-none shadow-none'
      } bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] transition-colors duration-200`}
    >
      <div className="max-w-[1420px] mx-auto px-3 sm:px-6 lg:px-10 h-15 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#dashboard"
          onClick={(e) => { e.preventDefault(); handleNavClick('#dashboard'); }}
          className="flex items-center cursor-pointer group shrink-0"
        >
          <img
            src="/logo-dark.png"
            alt="vvEntra · We enter ventures together"
            className="h-7 sm:h-10 md:h-11 w-auto dark:block hidden transition-opacity"
          />
          <img
            src="/logo-light.png"
            alt="vvEntra · We enter ventures together"
            className="h-7 sm:h-10 md:h-11 w-auto dark:hidden block transition-opacity"
          />
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-7 text-[14.5px] font-medium text-[var(--text-muted)]">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.hash || (activeRoute === '#home' && link.hash === '#dashboard');
            return (
              <a
                key={link.hash}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.hash);
                }}
                className={`transition-colors duration-150 py-1.5 hover:text-[var(--text)] whitespace-nowrap ${
                  isActive
                    ? role === 'architect'
                      ? 'text-[#16A34A] font-semibold'
                      : 'text-[#E2571B] font-semibold'
                    : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--role)] transition-all bg-[var(--bg-paper)] cursor-pointer shadow-xs shrink-0"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-neutral-800 transition-transform duration-300 hover:-rotate-12" />
            ) : (
              <Sun className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            )}
          </button>

          {/* When VERIFIED: Replace "Apply for access" with User Profile Icon */}
          {stage === 'verified' ? (
            <button
              onClick={() => handleNavClick('#dashboard')}
              title="Verified Member Profile · Account Active"
              className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-neutral-300 dark:border-white/20 bg-neutral-100 dark:bg-[#181512] hover:border-[var(--role)] text-neutral-800 dark:text-white transition-all shadow-xs cursor-pointer group shrink-0"
              aria-label="User Profile"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-200 group-hover:text-[var(--role)] transition-colors" />
              {/* Green Verified indicator badge */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#14120F] flex items-center justify-center shadow-xs">
                <Check className="w-2 h-2 text-white stroke-[3]" />
              </span>
            </button>
          ) : (
            /* 3D Apply for access button with periodic sweeping light ray */
            <button
              onClick={() => openApplyModal()}
              className={`relative group cursor-pointer select-none rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-semibold text-white tracking-wide transition-all duration-200 shrink-0 whitespace-nowrap active:translate-y-[2px] ${
                isArchitect
                  ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_3px_0_#0E622B,0_6px_14px_rgba(22,163,74,0.38)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_0_#0E622B,0_8px_18px_rgba(22,163,74,0.48)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#0E622B,0_2px_6px_rgba(22,163,74,0.3)]'
                  : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_3px_0_#9A3412,0_6px_14px_rgba(234,88,12,0.38)] hover:brightness-105 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_0_#9A3412,0_8px_18px_rgba(234,88,12,0.48)] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_0_#9A3412,0_2px_6px_rgba(234,88,12,0.3)]'
              }`}
            >
              {/* Smooth wide light ray traveling across periodically */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute top-0 bottom-0 w-24 -left-12 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-[1px] animate-light-ray pointer-events-none" />
              </div>

              <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Apply for access
              </span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 sm:w-10 sm:h-10 rounded border border-[var(--line)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] shrink-0"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[var(--line)] bg-[var(--bg-paper)] px-4 py-4 space-y-2 animate-fadeIn shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.hash);
                }}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  activeRoute === link.hash
                    ? isArchitect
                      ? 'bg-[#16A34A] text-white font-semibold shadow-xs'
                      : 'bg-[#E2571B] text-white font-semibold shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-bone)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[var(--line)] mt-3">
            {stage === 'verified' ? (
              <button
                onClick={() => { handleNavClick('#dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
              >
                <User className="w-4 h-4" />
                <span>Verified Account Profile (Active)</span>
              </button>
            ) : (
              <button
                onClick={() => { openApplyModal(); setMobileMenuOpen(false); }}
                className={`relative overflow-hidden w-full py-2.5 rounded-lg text-white text-xs font-semibold text-center transition-all duration-200 active:translate-y-[1px] ${
                  isArchitect
                    ? 'bg-gradient-to-b from-[#34D399] via-[#16A34A] to-[#15803D] border border-[#86EFAC]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_2px_0_#0E622B,0_4px_10px_rgba(22,163,74,0.3)]'
                    : 'bg-gradient-to-b from-[#FB923C] via-[#EA580C] to-[#C2410C] border border-[#FDBA74]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_2px_0_#9A3412,0_4px_10px_rgba(234,88,12,0.3)]'
                }`}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 bottom-0 w-24 -left-12 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] animate-light-ray pointer-events-none" />
                </div>
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  Apply for access
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
