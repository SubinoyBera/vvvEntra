import React, { useState, useEffect, useRef, useMemo } from 'react';

interface DataPoint {
  id: number;
  timeStr: string;      // e.g. "21:48:15"
  fullTimeStr: string;  // e.g. "21:48:15 UTC"
  demand: number;       // 0 to 100 scale (with steep zig-zags and high volatility)
  supply: number;       // 0 to 100 scale (with steep zig-zags and convergence points)
}

// Format Date into real-time strings
const formatRealTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

type Regime = 'dominant' | 'sometimes' | 'few_times' | 'very_rare';

// Procedural generator strictly adhering to user distribution:
// - Spread > 40%: Most of the times (~70%)
// - Spread 25-40%: Sometimes (~20%)
// - Spread < 20%: Few times (~8%)
// - Spread < 10%: Very rarely (~2%)
const generateInitialSeries = (count: number = 34): DataPoint[] => {
  const points: DataPoint[] = [];
  const now = new Date();

  // Exactly 1 very rare dip location (<10% spread, lasting ~1 point)
  const rareIndex = Math.floor(18 + Math.random() * 8); // e.g. point 18-25

  // Exactly 1 location for few times (<20% spread, lasting ~2-3 points)
  let fewIndex = Math.floor(6 + Math.random() * 8); // e.g. point 6-13
  if (Math.abs(fewIndex - rareIndex) < 5) fewIndex = (rareIndex + 8) % count;

  // Exactly 1 location for sometimes (25-40% spread, lasting ~5-6 points)
  const sometimesStart = Math.floor(Math.random() * 4); // early or middle

  let dVal = 78 + Math.random() * 10; // 78 to 88
  let sVal = 24 + Math.random() * 8;  // 24 to 32
  let dMom = (Math.random() - 0.48) * 3;
  let sMom = (Math.random() - 0.52) * 3;

  for (let i = 0; i < count; i++) {
    const offsetSeconds = (count - 1 - i) * 3;
    const ptDate = new Date(now.getTime() - offsetSeconds * 1000);
    const timeStr = formatRealTime(ptDate);

    // Determine target spread regime based on requested distribution
    let targetSpread = 48 + (Math.random() - 0.48) * 16; // Default >40% (42% to 62%)
    let targetDemand = 80 + (Math.random() - 0.5) * 10;
    let targetSupply = targetDemand - targetSpread;

    if (i === rareIndex) {
      // Very rarely: Spread < 10% (e.g. 5% to 8%)
      targetSpread = 5 + Math.random() * 4;
      targetDemand = 59 + Math.random() * 5;
      targetSupply = targetDemand - targetSpread;
    } else if (Math.abs(i - fewIndex) <= 1) {
      // Few times: Spread < 20% (e.g. 12% to 18%)
      targetSpread = 13 + Math.random() * 6;
      targetDemand = 67 + Math.random() * 6;
      targetSupply = targetDemand - targetSpread;
    } else if (i >= sometimesStart && i < sometimesStart + 6) {
      // Sometimes: Spread 25-40% (e.g. 28% to 37%)
      targetSpread = 28 + Math.random() * 10;
      targetDemand = 73 + Math.random() * 7;
      targetSupply = targetDemand - targetSpread;
    }

    // Realistic market zig-zag impulses
    const isSteep = Math.random() < 0.32;
    const dShock = (Math.random() - 0.48) * (isSteep ? 11 : 5.5);
    const sShock = (Math.random() - 0.52) * (isSteep ? 8.5 : 4.5);

    dMom = dMom * 0.4 + dShock * 0.6;
    sMom = sMom * 0.4 + sShock * 0.6;

    dVal += dMom;
    sVal += sMom;

    // Relaxation toward current regime targets
    dVal += (targetDemand - dVal) * 0.4;
    sVal += (targetSupply - sVal) * 0.4;

    // Guarantee physical market consistency
    // Ensure demand is always higher than supply by at least target bounds
    if (i === rareIndex) {
      dVal = Math.max(sVal + 3.5, dVal);
      if (dVal - sVal > 9.5) dVal = sVal + 8.5;
    } else if (Math.abs(i - fewIndex) <= 1) {
      dVal = Math.max(sVal + 11, dVal);
      if (dVal - sVal > 19.5) dVal = sVal + 18.5;
    } else if (i >= sometimesStart && i < sometimesStart + 6) {
      dVal = Math.max(sVal + 25, dVal);
      if (dVal - sVal > 39.5) dVal = sVal + 38.5;
    } else {
      // Most of the time: spread > 40%
      if (dVal - sVal < 41) {
        dVal = Math.max(dVal, sVal + 42 + Math.random() * 8);
      }
    }

    // Natural physical bounds [20% to 94%]
    dVal = Math.min(94, Math.max(48, dVal));
    sVal = Math.min(68, Math.max(18, sVal));

    points.push({
      id: i,
      timeStr,
      fullTimeStr: `${timeStr} UTC`,
      demand: Math.round(dVal * 10) / 10,
      supply: Math.round(sVal * 10) / 10,
    });
  }

  return points;
};

export const DemandSupplyGraph: React.FC = () => {
  const [chartView, setChartView] = useState<'demand' | 'supply'>('demand');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(() => generateInitialSeries(34));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef<number>(200);

  // Live dynamic regime state to maintain exact user distribution over time:
  // - Dominant (>40% spread): ~70% of ticks
  // - Sometimes (25-40% spread): ~20% of ticks
  // - Few times (<20% spread): ~8% of ticks
  // - Very rarely (<10% spread): ~2% of ticks
  const liveRegimeRef = useRef<{
    currentRegime: Regime;
    ticksRemainingInRegime: number;
    dMomentum: number;
    sMomentum: number;
  }>({
    currentRegime: 'dominant',
    ticksRemainingInRegime: 22, // Starts in dominant (>40%)
    dMomentum: 0,
    sMomentum: 0,
  });

  // SVG dimensions
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 300;
  const PADDING_TOP = 28;
  const PADDING_BOTTOM = 32;
  const PLOT_HEIGHT = SVG_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  // Convert 0..100 percentage to SVG Y coordinate
  const getY = (val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    return SVG_HEIGHT - PADDING_BOTTOM - (clamped / 100) * PLOT_HEIGHT;
  };

  // Convert index to SVG X coordinate
  const getX = (index: number, total: number) => {
    if (total <= 1) return 0;
    return (index / (total - 1)) * SVG_WIDTH;
  };

  // 3-SECOND TIMER: Live streaming strictly maintaining the requested spread distribution
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const last = prev[prev.length - 1];
        const state = liveRegimeRef.current;
        state.ticksRemainingInRegime--;

        // When regime expires, pick next regime using exact target probabilities
        if (state.ticksRemainingInRegime <= 0) {
          const rand = Math.random();
          if (rand < 0.70) {
            // Most of the times (>40% spread)
            state.currentRegime = 'dominant';
            state.ticksRemainingInRegime = Math.floor(16 + Math.random() * 18); // 16-33 ticks (~1-1.5 mins)
          } else if (rand < 0.90) {
            // Sometimes (25-40% spread)
            state.currentRegime = 'sometimes';
            state.ticksRemainingInRegime = Math.floor(5 + Math.random() * 6); // 5-10 ticks (~15-30 secs)
          } else if (rand < 0.98) {
            // Few times (<20% spread)
            state.currentRegime = 'few_times';
            state.ticksRemainingInRegime = Math.floor(3 + Math.random() * 3); // 3-5 ticks (~9-15 secs)
          } else {
            // Very rarely (<10% spread)
            state.currentRegime = 'very_rare';
            state.ticksRemainingInRegime = 1; // 1 tick only (~3 secs brief flash)
          }
        }

        let targetSpread = 48 + (Math.random() - 0.48) * 14; // Default >40%
        let targetDemand = 82 + (Math.random() - 0.5) * 8;

        if (state.currentRegime === 'very_rare') {
          // Spread < 10%
          targetSpread = 5.5 + Math.random() * 3.5;
          targetDemand = 60 + Math.random() * 4;
        } else if (state.currentRegime === 'few_times') {
          // Spread < 20%
          targetSpread = 13 + Math.random() * 5.5;
          targetDemand = 68 + Math.random() * 5;
        } else if (state.currentRegime === 'sometimes') {
          // Spread 25-40%
          targetSpread = 28 + Math.random() * 10;
          targetDemand = 74 + Math.random() * 6;
        }

        const targetSupply = targetDemand - targetSpread;

        // Dynamic steep zig-zags
        const isSteep = Math.random() < 0.32;
        const dShock = (Math.random() - 0.48) * (isSteep ? 11 : 5);
        const sShock = (Math.random() - 0.52) * (isSteep ? 8.5 : 4);

        state.dMomentum = state.dMomentum * 0.4 + dShock * 0.6;
        state.sMomentum = state.sMomentum * 0.4 + sShock * 0.6;

        let nextDemand = last.demand + state.dMomentum;
        let nextSupply = last.supply + state.sMomentum;

        // Pull toward regime targets
        nextDemand += (targetDemand - nextDemand) * 0.35;
        nextSupply += (targetSupply - nextSupply) * 0.35;

        // Boundary enforcement for current regime
        if (state.currentRegime === 'very_rare') {
          nextDemand = Math.max(nextSupply + 3.5, nextDemand);
          if (nextDemand - nextSupply > 9.5) nextDemand = nextSupply + 8.5;
        } else if (state.currentRegime === 'few_times') {
          nextDemand = Math.max(nextSupply + 11, nextDemand);
          if (nextDemand - nextSupply > 19.5) nextDemand = nextSupply + 18.5;
        } else if (state.currentRegime === 'sometimes') {
          nextDemand = Math.max(nextSupply + 25, nextDemand);
          if (nextDemand - nextSupply > 39.5) nextDemand = nextSupply + 38.5;
        } else {
          // Dominant: spread > 40%
          if (nextDemand - nextSupply < 41) {
            nextDemand = Math.max(nextDemand, nextSupply + 41.5 + Math.random() * 8);
          }
        }

        // Hard scale limits
        nextDemand = Math.round(Math.min(94, Math.max(48, nextDemand)) * 10) / 10;
        nextSupply = Math.round(Math.min(68, Math.max(18, nextSupply)) * 10) / 10;

        const nextId = nextIdRef.current++;
        const now = new Date();
        const timeStr = formatRealTime(now);

        const newPoint: DataPoint = {
          id: nextId,
          timeStr,
          fullTimeStr: `${timeStr} UTC`,
          demand: nextDemand,
          supply: nextSupply,
        };

        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Compute SVG Paths & Live Gap
  const { demandLinePath, demandAreaPath, supplyLinePath, supplyAreaPath, currentGap, latestPoint } = useMemo(() => {
    const total = dataPoints.length;
    if (total === 0) {
      return {
        demandLinePath: '',
        demandAreaPath: '',
        supplyLinePath: '',
        supplyAreaPath: '',
        currentGap: 0,
        latestPoint: null,
      };
    }

    const demandPoints = dataPoints.map((pt, i) => `${getX(i, total).toFixed(1)} ${getY(pt.demand).toFixed(1)}`);
    const supplyPoints = dataPoints.map((pt, i) => `${getX(i, total).toFixed(1)} ${getY(pt.supply).toFixed(1)}`);

    const demandLine = `M ${demandPoints.join(' L ')}`;
    const demandArea = `M 0 ${SVG_HEIGHT} L ${demandPoints.join(' L ')} L ${SVG_WIDTH} ${SVG_HEIGHT} Z`;

    const supplyLine = `M ${supplyPoints.join(' L ')}`;
    const supplyArea = `M 0 ${SVG_HEIGHT} L ${supplyPoints.join(' L ')} L ${SVG_WIDTH} ${SVG_HEIGHT} Z`;

    const latest = dataPoints[dataPoints.length - 1];
    const rawGap = latest.demand - latest.supply;
    const gap = Math.round(rawGap * 10) / 10;

    return {
      demandLinePath: demandLine,
      demandAreaPath: demandArea,
      supplyLinePath: supplyLine,
      supplyAreaPath: supplyArea,
      currentGap: gap,
      latestPoint: latest,
    };
  }, [dataPoints]);

  // Handle Mouse movement for Interactive Tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const progress = Math.max(0, Math.min(1, clientX / rect.width));
    const index = Math.round(progress * (dataPoints.length - 1));

    setHoverIndex(index);
    setMousePos({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setMousePos(null);
  };

  const activePoint = hoverIndex !== null ? dataPoints[hoverIndex] : null;
  const activeSvgX = hoverIndex !== null ? getX(hoverIndex, dataPoints.length) : 0;
  const activeDemandY = activePoint ? getY(activePoint.demand) : 0;
  const activeSupplyY = activePoint ? getY(activePoint.supply) : 0;
  const activeGap = activePoint ? Math.round((activePoint.demand - activePoint.supply) * 10) / 10 : 0;

  return (
    <div className="bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-2xl relative select-none h-[590px] sm:h-[620px] box-border">
      
      {/* ======================================================== */}
      {/* CARD HEADER: Real-Time Horizon & View Toggles */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
            Buyer <em className="font-serif italic font-normal text-[#E2571B]">demand</em>{' '}
            <span className="font-serif font-light text-neutral-300">· Real-Time</span>
          </h3>
          <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
            Streaming continuous ticks · High-volatility liquidity spread
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center p-1 rounded-full bg-[#181512] border border-white/10">
          <button
            onClick={() => setChartView('demand')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
              chartView === 'demand'
                ? 'bg-[#E2571B] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Demand
          </button>
          <button
            onClick={() => setChartView('supply')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
              chartView === 'supply'
                ? 'bg-[#E2571B] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Supply
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LIVE AREA CHART */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[330px] sm:h-[350px] bg-[#0A0908] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden cursor-crosshair group"
      >
        {/* Y-Axis Labels */}
        <div className="absolute left-4 top-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider select-none z-10 pointer-events-none">
          HIGH (100)
        </div>
        <div className="absolute left-4 bottom-7 text-[10px] font-mono text-neutral-500 uppercase tracking-wider select-none z-10 pointer-events-none">
          LOW (0)
        </div>

        {/* SUB-CAPTION: LIVE TICK */}
        <div className="absolute right-4 top-3.5 flex items-center gap-2 text-[10px] font-mono text-neutral-400 z-10 pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
          </span>
          <span className="font-semibold tracking-wider text-emerald-400">LIVE TICK</span>
        </div>

        {/* Time Window Label Bottom Right */}
        <div className="absolute right-4 bottom-2 text-[10px] font-mono text-neutral-500 z-10 pointer-events-none">
          Real-time tick window
        </div>

        {/* SVG Curve Canvas */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible z-0 pointer-events-none"
        >
          <defs>
            {/* Orange Gradient for Buyer Demand */}
            <linearGradient id="liveDemandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2571B" stopOpacity="0.38" />
              <stop offset="60%" stopColor="#E2571B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#E2571B" stopOpacity="0.01" />
            </linearGradient>

            {/* Blue Gradient for Architect Supply */}
            <linearGradient id="liveSupplyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="105" x2="600" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="215" x2="600" y2="215" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* 1. Architect Supply Area & Line (Dashed Blue) */}
          <path
            d={supplyAreaPath}
            fill="url(#liveSupplyGradient)"
            className="transition-opacity duration-300"
            opacity={chartView === 'demand' ? 0.6 : 1}
          />
          <path
            d={supplyLinePath}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.4"
            strokeDasharray="4 3"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-all duration-200"
            opacity={chartView === 'demand' ? 0.8 : 1}
          />

          {/* 2. Buyer Demand Area & Line (Solid Orange) */}
          <path
            d={demandAreaPath}
            fill="url(#liveDemandGradient)"
            className="transition-opacity duration-300"
            opacity={chartView === 'supply' ? 0.35 : 1}
          />
          <path
            d={demandLinePath}
            fill="none"
            stroke="#E2571B"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-all duration-200"
            opacity={chartView === 'supply' ? 0.5 : 1}
          />

          {/* Live pulsing edge dot on latest point (far right) */}
          {latestPoint && (
            <g>
              <circle
                cx={SVG_WIDTH}
                cy={getY(latestPoint.demand)}
                r="7.5"
                fill="#E2571B"
                opacity="0.35"
                className="animate-ping"
              />
              <circle
                cx={SVG_WIDTH}
                cy={getY(latestPoint.demand)}
                r="4"
                fill="#E2571B"
                stroke="#0A0908"
                strokeWidth="1.5"
              />
              <circle
                cx={SVG_WIDTH}
                cy={getY(latestPoint.supply)}
                r="3.5"
                fill="#60A5FA"
                stroke="#0A0908"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Crosshair & Glowing Intersections */}
          {hoverIndex !== null && activePoint && (
            <g>
              <line
                x1={activeSvgX}
                y1={20}
                x2={activeSvgX}
                y2={280}
                stroke="rgba(255, 255, 255, 0.35)"
                strokeDasharray="3 3"
                strokeWidth="1.2"
              />

              {/* Glowing Dot on Demand Curve */}
              <circle
                cx={activeSvgX}
                cy={activeDemandY}
                r="6"
                fill="#E2571B"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="drop-shadow(0 0 6px rgba(226, 87, 27, 1))"
              />

              {/* Glowing Dot on Supply Curve */}
              <circle
                cx={activeSvgX}
                cy={activeSupplyY}
                r="5"
                fill="#60A5FA"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="drop-shadow(0 0 6px rgba(96, 165, 250, 0.9))"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && activePoint && mousePos && containerRef.current && (
          <div
            style={{
              left:
                mousePos.x > containerRef.current.clientWidth - 210
                  ? mousePos.x - 205
                  : mousePos.x + 14,
              top: Math.max(
                12,
                Math.min(containerRef.current.clientHeight - 145, mousePos.y - 50)
              ),
            }}
            className="absolute z-30 pointer-events-none bg-[#14110E] border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-md min-w-[190px] transition-all duration-75 ease-out select-none"
          >
            {/* Real-time timestamp header */}
            <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-white/10 text-[10px] font-mono text-neutral-400">
              <span className="text-white font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                {activePoint.timeStr}
              </span>
              <span className="text-neutral-400">REAL-TIME</span>
            </div>

            {/* Demand */}
            <div className="flex items-center justify-between gap-3 text-xs font-mono py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E2571B] inline-block" />
                <span className="text-neutral-300">Demand:</span>
              </div>
              <span className="text-white font-semibold tabular-nums text-right">
                {activePoint.demand}%
              </span>
            </div>

            {/* Supply */}
            <div className="flex items-center justify-between gap-3 text-xs font-mono py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA] inline-block" />
                <span className="text-neutral-300">Supply:</span>
              </div>
              <span className="text-neutral-300 font-medium tabular-nums text-right">
                {activePoint.supply}%
              </span>
            </div>

            {/* Spread Value with dynamic color formatting based on user thresholds */}
            <div className="flex items-center justify-between gap-2 text-xs font-mono pt-1.5 mt-1 border-t border-white/10">
              <span className="text-neutral-400 text-[11px]">Spread:</span>
              <span
                className={`font-bold tabular-nums ${
                  activeGap < 10
                    ? 'text-rose-400'
                    : activeGap < 20
                    ? 'text-amber-400'
                    : activeGap <= 40
                    ? 'text-emerald-300'
                    : 'text-emerald-400'
                }`}
              >
                +{activeGap}% Gap
              </span>
            </div>

            {/* Zone Badges matching exact user distribution categories */}
            {activeGap < 10 ? (
              <div className="mt-1.5 py-0.5 px-1.5 rounded bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono text-rose-300 text-center font-medium">
                ⚡ Rare Convergence (&lt;10% Spread)
              </div>
            ) : activeGap < 20 ? (
              <div className="mt-1.5 py-0.5 px-1.5 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 text-center font-medium">
                ⚡ Compressed Spread (&lt;20% Gap)
              </div>
            ) : activeGap <= 40 ? (
              <div className="mt-1.5 py-0.5 px-1.5 rounded bg-sky-500/15 border border-sky-500/30 text-[10px] font-mono text-sky-300 text-center font-medium">
                Moderate Arbitrage (25-40%)
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM LEGEND & GAP ROW */}
      {/* ======================================================== */}
      <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 rounded-sm bg-[#E2571B] inline-block" />
            <span className="text-neutral-300">Buyer demand</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 rounded-sm bg-[#60A5FA] inline-block" />
            <span className="text-neutral-300">Architect supply</span>
          </div>
        </div>

        {/* Live Spread from Current Real-Time Tick */}
        <div className="flex items-center gap-1 font-semibold text-[#E2571B] text-xs sm:text-[13px] ml-auto">
          <span className="text-neutral-400 font-normal">Spread:</span>
          <span className="tabular-nums">
            +{currentGap}%
          </span>
          {currentGap < 10 ? (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-normal">
              Rare (&lt;10%)
            </span>
          ) : currentGap < 20 ? (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-normal">
              Tight (&lt;20%)
            </span>
          ) : currentGap <= 40 ? (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-normal">
              25-40%
            </span>
          ) : null}
        </div>
      </div>

    </div>
  );
};
