import React, { useState, useEffect } from 'react';

interface SectorPoint {
  id: string;
  name: string;
  secondaryName?: string;
  demandPct: number;
  supplyPct: number;
  demandChange: string;
  supplyChange?: string;
  angleDeg: number;
  labelXOffset: number;
  labelYOffset: number;
  textAnchor: 'start' | 'middle' | 'end';
}

const SECTORS: SectorPoint[] = [
  {
    id: 'ai-compliance',
    name: 'AI Compliance',
    secondaryName: 'Workflow AI',
    demandPct: 0.92,
    supplyPct: 0.60,
    demandChange: '+28%',
    supplyChange: '+16%',
    angleDeg: -90,
    labelXOffset: 0,
    labelYOffset: -22,
    textAnchor: 'middle',
  },
  {
    id: 'regtech',
    name: 'RegTech',
    demandPct: 0.88,
    supplyPct: 0.26,
    demandChange: '+26%',
    angleDeg: -38.57,
    labelXOffset: 24,
    labelYOffset: -6,
    textAnchor: 'start',
  },
  {
    id: 'fintech-smb',
    name: 'Fintech SMB',
    demandPct: 0.66,
    supplyPct: 0.38,
    demandChange: '+9%',
    angleDeg: 12.86,
    labelXOffset: 24,
    labelYOffset: 12,
    textAnchor: 'start',
  },
  {
    id: 'healthtech',
    name: 'Healthtech',
    demandPct: 0.74,
    supplyPct: 0.44,
    demandChange: '+12%',
    angleDeg: 64.29,
    labelXOffset: 0,
    labelYOffset: 24,
    textAnchor: 'middle',
  },
  {
    id: 'climate-tech',
    name: 'Climate Tech',
    demandPct: 0.82,
    supplyPct: 0.36,
    demandChange: '+18%',
    angleDeg: 115.71,
    labelXOffset: -20,
    labelYOffset: 18,
    textAnchor: 'end',
  },
  {
    id: 'b2b-saas',
    name: 'B2B SaaS',
    demandPct: 0.85,
    supplyPct: 0.50,
    demandChange: '+22%',
    angleDeg: 167.14,
    labelXOffset: -24,
    labelYOffset: -2,
    textAnchor: 'end',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    demandPct: 0.94,
    supplyPct: 0.32,
    demandChange: '+24%',
    angleDeg: 218.57,
    labelXOffset: -18,
    labelYOffset: -18,
    textAnchor: 'end',
  },
];

export const SectorDemandRadar: React.FC = () => {
  const [hoveredSector, setHoveredSector] = useState<SectorPoint | null>(null);
  const [pulsePhase, setPulsePhase] = useState<number>(0);

  // Gentle live breathing animation so the radar feels organically active
  useEffect(() => {
    let frameId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setPulsePhase(elapsed);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const cx = 250;
  const cy = 210;
  const maxR = 135;

  // Calculate polygon coordinates
  const getCoordinates = (pct: number, angleDeg: number, breathingOffset = 0) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (pct + breathingOffset) * maxR;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    return { x, y };
  };

  // Coordinates for the 7 spokes & grid circles
  const gridRings = [0.25, 0.5, 0.75, 1.0];

  // Buyer demand polygon points (with gentle rhythmic micro-breathing)
  const demandPoints = SECTORS.map((s, idx) => {
    const microBreath = Math.sin(pulsePhase * 2 + idx) * 0.015;
    const { x, y } = getCoordinates(s.demandPct, s.angleDeg, microBreath);
    return `${x},${y}`;
  }).join(' ');

  // Architect supply polygon points
  const supplyPoints = SECTORS.map((s, idx) => {
    const microBreath = Math.cos(pulsePhase * 1.8 + idx) * 0.012;
    const { x, y } = getCoordinates(s.supplyPct, s.angleDeg, microBreath);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white dark:bg-[#0D0B0A] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden h-[590px] sm:h-[620px] box-border select-none">
      
      {/* ============================================== */}
      {/* Header */}
      {/* ============================================== */}
      <div className="flex items-center justify-between pb-4 border-b border-black/8 dark:border-white/10 shrink-0">
        <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 dark:text-white tracking-tight">
          Sector <em className="font-serif italic font-normal text-[#16A34A]">demand radar</em>
        </h3>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 tracking-wider font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.7)]" />
          <span>LIVE · WEEKLY SNAPSHOT</span>
        </div>
      </div>

      {/* ============================================== */}
      {/* Radar SVG Visualization */}
      {/* ============================================== */}
      <div className="relative flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[400px]">
        <svg
          viewBox="0 0 500 420"
          className="w-full h-full max-h-[420px] overflow-visible"
        >
          <defs>
            {/* Subtle radar gradient fill */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.12" />
              <stop offset="65%" stopColor="#16A34A" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
            </radialGradient>

            {/* Sonar sweep gradient - high visibility in both light & dark */}
            <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#16A34A" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
            </linearGradient>

            <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 0. Subtle Radar Backing Circle Disc */}
          <circle
            cx={cx}
            cy={cy}
            r={maxR}
            className="fill-emerald-500/[0.04] dark:fill-emerald-500/[0.05]"
          />

          {/* 1. Radar Grid Circles - clearly visible in light & dark */}
          {gridRings.map((ring, idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={maxR * ring}
              fill="none"
              className={idx === 3 ? "stroke-neutral-300 dark:stroke-white/20" : "stroke-neutral-200 dark:stroke-white/10"}
              strokeWidth={idx === 3 ? "1.5" : "1"}
              strokeDasharray={idx === 3 ? 'none' : '3 3'}
            />
          ))}

          {/* 2. Radar Spoke Lines */}
          {SECTORS.map((s, idx) => {
            const { x, y } = getCoordinates(1.0, s.angleDeg);
            return (
              <line
                key={idx}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                className="stroke-neutral-200 dark:stroke-white/10"
                strokeWidth="1"
              />
            );
          })}

          {/* 3. Dynamic Sonar Sweep Line - vivid and smooth */}
          <g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: 'radarSweep 9s linear infinite',
            }}
          >
            <path
              d={`M ${cx} ${cy} L ${cx + maxR * Math.cos(-Math.PI / 6)} ${cy + maxR * Math.sin(-Math.PI / 6)} A ${maxR} ${maxR} 0 0 0 ${cx + maxR} ${cy} Z`}
              fill="url(#sweepGrad)"
              opacity="0.85"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx + maxR}
              y2={cy}
              stroke="#16A34A"
              strokeWidth="2"
              opacity="1"
            />
            <circle
              cx={cx + maxR}
              cy={cy}
              r="3.5"
              fill="#16A34A"
              stroke="#ffffff"
              strokeWidth="1"
              className="animate-pulse"
            />
          </g>

          {/* 4. Architect Supply Polygon (Dashed Blue) */}
          <polygon
            points={supplyPoints}
            fill="rgba(59, 130, 246, 0.08)"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            className="transition-all duration-300 dark:stroke-[#60A5FA]"
          />

          {/* 5. Buyer Demand Polygon (Vibrant Green) */}
          <polygon
            points={demandPoints}
            fill="rgba(22, 163, 74, 0.16)"
            stroke="#16A34A"
            strokeWidth="2.2"
            className="transition-all duration-300"
          />

          {/* 6. Nodes & Labels for each Sector */}
          {SECTORS.map((s, idx) => {
            const microBreath = Math.sin(pulsePhase * 2 + idx) * 0.015;
            const demandCoord = getCoordinates(s.demandPct, s.angleDeg, microBreath);
            const supplyCoord = getCoordinates(s.supplyPct, s.angleDeg);
            const outerCoord = getCoordinates(1.0, s.angleDeg);

            const isHovered = hoveredSector?.id === s.id;

            return (
              <g
                key={s.id}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredSector(s)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {/* Supply Node (Small Blue) */}
                <circle
                  cx={supplyCoord.x}
                  cy={supplyCoord.y}
                  r="3.5"
                  fill="#2563EB"
                  className="dark:fill-[#60A5FA]"
                  opacity="0.9"
                />

                {/* Demand Node (Green Glowing Vertex) */}
                <circle
                  cx={demandCoord.x}
                  cy={demandCoord.y}
                  r={isHovered ? '7' : '4.5'}
                  fill="#16A34A"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? '2' : '1.5'}
                  className="transition-all duration-200"
                />

                {/* Outer Ring Pulse for hovered node */}
                {isHovered && (
                  <circle
                    cx={demandCoord.x}
                    cy={demandCoord.y}
                    r="12"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="animate-ping"
                  />
                )}

                {/* Sector Label Text - deep obsidian in light mode, clean and crisp */}
                <text
                  x={outerCoord.x + s.labelXOffset}
                  y={outerCoord.y + s.labelYOffset}
                  textAnchor={s.textAnchor}
                  className={`text-[11px] sm:text-[12px] font-sans transition-colors duration-200 select-none ${
                    isHovered 
                      ? 'fill-neutral-950 dark:fill-white font-bold' 
                      : 'fill-neutral-800 dark:fill-neutral-200 font-semibold'
                  }`}
                >
                  {s.name}
                </text>

                {/* Secondary or Change Subtext */}
                <text
                  x={outerCoord.x + s.labelXOffset}
                  y={outerCoord.y + s.labelYOffset + 14}
                  textAnchor={s.textAnchor}
                  className="text-[10px] sm:text-[10.5px] font-mono tracking-tight font-semibold select-none"
                >
                  <tspan className="fill-emerald-700 dark:fill-[#4ADE80] font-bold">
                    {s.demandChange}
                  </tspan>
                  {s.supplyChange && (
                    <tspan className="fill-blue-700 dark:fill-[#60A5FA] ml-1 font-semibold"> {s.supplyChange}</tspan>
                  )}
                  {s.secondaryName && (
                    <tspan className="fill-neutral-600 dark:fill-neutral-400 font-normal"> · {s.secondaryName}</tspan>
                  )}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip when hovering any sector node */}
        {hoveredSector && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#16120E]/95 border border-[#16A34A]/50 px-3.5 py-2 rounded-xl shadow-xl dark:shadow-2xl backdrop-blur-md pointer-events-none z-30 font-mono text-[11px] animate-fadeIn">
            <div className="text-neutral-900 dark:text-white font-semibold font-sans text-xs">
              {hoveredSector.name}
            </div>
            <div className="flex items-center gap-3 mt-1 text-neutral-600 dark:text-neutral-300">
              <span className="text-emerald-700 dark:text-[#16A34A] font-semibold">
                Demand: {Math.round(hoveredSector.demandPct * 100)}%
              </span>
              <span className="text-blue-700 dark:text-[#60A5FA] font-semibold">
                Supply: {Math.round(hoveredSector.supplyPct * 100)}%
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Gap: +{Math.round((hoveredSector.demandPct - hoveredSector.supplyPct) * 100)}pts
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ============================================== */}
      {/* Bottom Footer & Legend */}
      {/* ============================================== */}
      <div className="pt-4 border-t border-black/8 dark:border-white/10 flex items-center justify-between text-xs font-mono shrink-0">
        {/* Left: Legend */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-0.5 bg-[#16A34A] inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
            <span className="text-neutral-700 dark:text-neutral-300 text-[11px] sm:text-xs font-medium">Buyer demand</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 border-t border-dashed border-[#2563EB] dark:border-[#60A5FA] inline-block" />
            <span className="text-neutral-600 dark:text-neutral-400 text-[11px] sm:text-xs font-medium">Architect supply</span>
          </div>
        </div>

        {/* Right: Surge Indicator */}
        <div className="text-emerald-700 dark:text-[#16A34A] font-semibold text-[11px] sm:text-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>3 sectors in surge</span>
        </div>
      </div>

      {/* CSS Animation for Radar Sweep */}
      <style>{`
        @keyframes radarSweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
