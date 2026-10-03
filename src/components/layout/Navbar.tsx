import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  Check, 
  DollarSign, 
  Settings, 
  LogOut, 
  Sparkles 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    role, 
    stage, 
    setStage,
    userName,
    userInitials,
    openApplyModal,
    activeRoute,
    setActiveRoute,
    addToast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isProfileOpen]);

  // Auto-hide navigation bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          setShowNav(false);
          setIsProfileOpen(false);
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
    setIsProfileOpen(false);
  };

  const handleProfileNavigation = (hash: string) => {
    handleNavClick(hash);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    setStage('guest');
    addToast('Logged out of verified session', 'info');
    setIsProfileOpen(false);
    handleNavClick('#home');
  };

  const isArchitect = role === 'architect';
  const themeAccentColor = isArchitect ? '#16A34A' : '#E2571B';

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
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
          
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

          {/* When VERIFIED: User Profile Button with First Letters of User Name (e.g. SB, JD) */}
          {stage === 'verified' ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-serif font-bold text-xs sm:text-[13px] text-white tracking-wide transition-all duration-200 cursor-pointer shadow-md select-none border active:scale-95 ${
                  isProfileOpen
                    ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-[var(--nav-bg)] scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: themeAccentColor,
                  borderColor: isArchitect ? 'rgba(134, 239, 172, 0.45)' : 'rgba(253, 186, 116, 0.45)',
                  boxShadow: isArchitect
                    ? 'inset 0 1px 1px rgba(255,255,255,0.4), 0 2px 6px rgba(22,163,74,0.35)'
                    : 'inset 0 1px 1px rgba(255,255,255,0.4), 0 2px 6px rgba(226,87,27,0.35)'
                }}
                title={`${userName} · Verified Profile (${userInitials})`}
                aria-label={`${userName} Profile (${userInitials})`}
              >
                {/* First Letters of User Name (e.g. 'SB' for Subinoy Bera, 'JD' for John Doe) */}
                <span>{userInitials}</span>

                {/* Green verified indicator dot on bottom-right corner */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0E0C0A] flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 text-white stroke-[3.5]" />
                </span>
              </button>

              {/* Pop-up Dropdown Menu (Exact Match to Screenshot) */}
              {isProfileOpen && (
                <div 
                  className="absolute right-0 top-full mt-2.5 w-60 sm:w-64 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0B0A] shadow-2xl p-3 z-50 animate-fadeIn transition-all select-none"
                  style={{
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 1px 1px rgba(255,255,255,0.05)'
                  }}
                >
                  {/* User Profile Header in Dropdown */}
                  <div className="px-2 py-1.5 flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-xs text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: themeAccentColor }}
                    >
                      {userInitials}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight truncate">
                        {userName}
                      </h4>
                      
                      {/* Established Tier Badge */}
                      <div className="mt-0.5">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-medium bg-[#2A1B4E] dark:bg-[#201538] border border-[#A855F7]/30 text-[#D8B4FE]">
                          <span className="text-purple-400 text-[10px]">✦</span>
                          <span>Established tier</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-neutral-200 dark:border-white/10 my-2" />

                  {/* Menu Options */}
                  <div className="space-y-0.5">
                    {/* 1. My Profile */}
                    <button
                      type="button"
                      onClick={() => handleProfileNavigation('#profile')}
                      className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                      <span className="font-medium">My profile</span>
                    </button>

                    {/* 2. Earnings & History */}
                    <button
                      type="button"
                      onClick={() => {
                        addToast('Earnings & Escrow Ledger opened', 'info');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left cursor-pointer"
                    >
                      <span className="w-4 text-center font-mono font-bold text-xs text-neutral-500 dark:text-neutral-400">$</span>
                      <span className="font-medium">Earnings &amp; history</span>
                    </button>

                    {/* 3. Account Settings */}
                    <button
                      type="button"
                      onClick={() => {
                        addToast('Account Security & Preferences opened', 'info');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                      <span className="font-medium">Account settings</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-neutral-200 dark:border-white/10 my-2" />

                  {/* 4. Log out */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-[13px] text-[#E2571B] hover:bg-orange-500/10 transition-all text-left cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4 shrink-0 text-[#E2571B]" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
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
              <div className="space-y-1.5">
                <button
                  onClick={() => { handleNavClick('#profile'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center font-serif font-bold text-[10px] text-white shrink-0"
                      style={{ backgroundColor: themeAccentColor }}
                    >
                      {userInitials}
                    </div>
                    <span>{userName} (My profile)</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-400">✦ Established</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-xs font-medium text-[#E2571B] hover:underline"
                >
                  Log out
                </button>
              </div>
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
