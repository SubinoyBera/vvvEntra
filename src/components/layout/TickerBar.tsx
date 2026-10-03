import React from 'react';
import { useApp } from '../../context/AppContext';

export const TickerBar: React.FC = () => {
  const { role, activeRoute } = useApp();
  const isTrustPage = activeRoute === '#trust';

  const defaultTickerItems = [
    { code: 'BUYER', text: 'PE Director · AI workflow search', status: 'Active', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'GAP', text: 'AI Agents vertical · 60-pt gap', status: 'Hot', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'VVE-2440', text: 'B2B media · subscription play', status: '+12%', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'GAP', text: 'RegTech mid-market · 18 listings', status: 'Surge', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'BUYER', text: 'Family Office · Fintech check placed', status: '$50k', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'VVE-2438', text: 'Indian D2C · Ayurveda category', status: 'UNLOCKED', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'GAP', text: 'Climate Tech · Industrial efficiency', status: 'High', statusColor: 'text-emerald-700 dark:text-emerald-400' },
    { code: 'VVE-2437', text: 'B2B compliance SaaS · vertical model', status: '+28%', statusColor: 'text-emerald-700 dark:text-emerald-400' },
  ];

  const trustTickerPhrases = [
    'KYC verified · architects + buyers',
    'Every transaction · escrow protected',
    '7-day inspection · 5-day dispute SLA',
    'Staged reveal · IP theft defense',
    '24-month non-circumvention · legal escrow',
    'Proof of funds · accredited balance check',
  ];

  return (
    <div 
      id="ticker-bar"
      className="ticker-track fixed top-0 left-0 right-0 z-50 w-full bg-[#FAF7F2] dark:bg-[#0A0908] text-neutral-900 dark:text-[#FAFAF7] border-b border-black/10 dark:border-[rgba(250,250,247,0.12)] h-7 sm:h-8 flex items-center overflow-hidden text-[10px] sm:text-xs font-mono select-none shadow-xs transition-colors duration-200"
    >
      {/* Left LIVE / TRUST Badge */}
      <div
        className={`text-white px-2.5 sm:px-3.5 h-full flex items-center gap-1.5 shrink-0 z-20 font-semibold tracking-wider text-[10px] sm:text-[11px] uppercase shadow-sm transition-colors duration-300 ${
          role === 'architect' ? 'bg-[#16A34A]' : 'bg-[#E2571B]'
        }`}
      >
        <span>{isTrustPage ? 'TRUST' : 'LIVE'}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div className="animate-ticker flex items-center whitespace-nowrap">
          {/* Double list for seamless marquee loop */}
          {isTrustPage
            ? [...trustTickerPhrases, ...trustTickerPhrases, ...trustTickerPhrases].map((phrase, index) => (
                <div key={index} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 text-[10px] sm:text-[11px] text-neutral-800 dark:text-[rgba(250,250,247,0.85)]">
                  <span
                    className={`font-semibold text-[9px] sm:text-[10px] transition-colors duration-300 ${
                      role === 'architect' ? 'text-[#15803D] dark:text-[#16A34A]' : 'text-[#C2410C] dark:text-[#E2571B]'
                    }`}
                  >
                    ▲
                  </span>
                  <span className="font-medium tracking-wide text-neutral-800 dark:text-[#FAFAF7]">{phrase}</span>
                  <span className="text-neutral-400 dark:text-neutral-500 font-bold ml-2">•</span>
                </div>
              ))
            : [...defaultTickerItems, ...defaultTickerItems].map((item, index) => (
                <div key={index} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 text-[10px] sm:text-[11px] text-neutral-900 dark:text-[rgba(250,250,247,0.85)]">
                  <span
                    className={`font-semibold tracking-tight transition-colors duration-300 ${
                      role === 'architect' ? 'text-[#15803D] dark:text-[#16A34A]' : 'text-[#C2410C] dark:text-[#E2571B]'
                    }`}
                  >
                    {item.code}
                  </span>
                  <span className="text-neutral-800 dark:text-[#FAFAF7] font-medium tracking-wide">{item.text}</span>
                  <span className={`font-semibold ${item.statusColor}`}>{item.status}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-[rgba(250,250,247,0.4)] ml-1 sm:ml-2 inline-block" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
