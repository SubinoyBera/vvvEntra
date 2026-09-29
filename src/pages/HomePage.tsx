import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarketDemandSection } from '../components/home/MarketDemandSection';
import { DemandImbalanceSection } from '../components/home/DemandImbalanceSection';
import { LivePulseSection } from '../components/home/LivePulseSection';
import { AudienceSection } from '../components/home/AudienceSection';
import { MarketSignalsSection } from '../components/home/MarketSignalsSection';
import { BuyerNetworkSignalsSection } from '../components/home/BuyerNetworkSignalsSection';
import { PlatformPreviewSection } from '../components/home/PlatformPreviewSection';
import { OpportunitiesSection } from '../components/home/OpportunitiesSection';
import { CtaSection } from '../components/home/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <MarketDemandSection />
      <LivePulseSection />
      <DemandImbalanceSection />
      <AudienceSection />
      <MarketSignalsSection />
      <BuyerNetworkSignalsSection />
      <PlatformPreviewSection />
      <OpportunitiesSection />
      <CtaSection />
    </main>
  );
};
