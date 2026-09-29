import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SpaceBackgroundCanvas } from './components/common/SpaceBackgroundCanvas';
import { TickerBar } from './components/layout/TickerBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { TrustPage } from './pages/TrustPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { TermsPage } from './pages/TermsPage';
import { PricingPage } from './pages/PricingPage';
import { NdaGateModal } from './components/modals/NdaGateModal';
import { Toast } from './components/modals/Toast';

const AppContent: React.FC = () => {
  const { activeRoute, setActiveRoute } = useApp();

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 overflow-x-hidden">
      {/* 3D Space Background Canvas - Full Webpage */}
      <SpaceBackgroundCanvas />

      {/* Top Header: Fixed TickerBar + Smart Animated Navbar */}
      <TickerBar />
      <Navbar />

      {/* Main View Area with top padding offset for the fixed header (88px mobile, 104px desktop) */}
      <div className="relative z-10 flex-1 w-full pt-[88px] sm:pt-[104px]">
        {activeRoute === '#trust' ? (
          <TrustPage />
        ) : activeRoute === '#opportunities' ? (
          <OpportunitiesPage />
        ) : activeRoute === '#terms' ? (
          <TermsPage />
        ) : activeRoute === '#pricing' ? (
          <PricingPage />
        ) : (
          <HomePage />
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Gate & Feedback Overlays */}
      <NdaGateModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
