export type UserRole = 'investor' | 'architect';
export type UserStage = 'guest' | 'applied' | 'verified';
export type ThemeMode = 'dark' | 'light';

export interface Opportunity {
  id: string;
  code: string;
  category: string;
  tag: string;
  demandTag: string;
  demandTrend: 'up' | 'hot' | 'new';
  title: string;
  blurredPart: string;
  description: string;
  pages: number;
  frameworks: number;
  finModels: number;
  architectRole: string;
  architectNote: string;
  unlockPrice: number;
  status: 'locked' | 'unlocked';
}

export interface SectorItem {
  name: string;
  cat: string;
  g: number; // growth %
  act: number; // activity score
  dem: number; // demand score
  zone: 'star' | 'cash' | 'dog';
  listed: number;
}

export interface DemandSupplyCat {
  name: string;
  demand: number;
  supply: number;
  unlock: number;
  clear: number;
  cost: 'lean' | 'mid' | 'heavy';
  domain: 'ops' | 'tech' | 'consumer';
}

export interface PulseSector {
  name: string;
  count: number;
  dir: 'up' | 'down';
  delta: number;
}

export interface LiveActivity {
  role: string;
  action: string;
  code: string;
  sector: string;
  timeAgo: string;
}

export interface MarketMetrics {
  vveIndex: number;
  vveIndexChange: number;
  vveIndexChangePct: number;
  liveListings: number;
  newListingsToday: number;
  capitalInMarket: string;
  capitalGrowthMoM: number;
  avgUnlock: string;
  avgUnlockGrowthMoM: number;
  architectsCount: number;
  architectsGrowthWeek: number;
  dealsClosed: number;
  dealsGrowthMoM: number;
}
