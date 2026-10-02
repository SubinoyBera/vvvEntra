import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// 3D Star / Node representation
interface Star3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  isAccent: boolean;
}

// Floating 3D Geometric Polyhedron (Octahedron)
interface Polyhedron3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  isAccent: boolean;
}

export const SpaceBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, role } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 3D Camera / Perspective targets with smooth lerp
    let targetCamX = 0;
    let targetCamY = 0;
    let targetTiltX = 0; // Pitch
    let targetTiltY = 0; // Yaw
    let currentCamX = 0;
    let currentCamY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let scrollOffset = 0;

    // 3D World constants
    const DEPTH = 1200;
    const FOCAL_LENGTH = 440;
    const stars: Star3D[] = [];
    const polyhedra: Polyhedron3D[] = [];

    const STAR_COUNT = Math.min(130, Math.max(70, Math.floor((width * height) / 11000)));

    const handleResize = () => {
      width = window.innerWidth || document.documentElement.clientWidth || 800;
      height = window.innerHeight || document.documentElement.clientHeight || 600;
      if (width <= 0) width = 800;
      if (height <= 0) height = 600;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // 1. Mouse Parallax for Desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (!width || !height || width <= 0 || height <= 0) return;
      const normX = Math.max(-1, Math.min(1, (e.clientX / width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (e.clientY / height - 0.5) * 2));
      if (!Number.isFinite(normX) || !Number.isFinite(normY)) return;

      targetCamX = normX * 65;
      targetCamY = normY * 65;
      targetTiltX = -normY * 0.18; // Pitch tilt
      targetTiltY = normX * 0.22;  // Yaw tilt
    };

    // 2. Gyroscopic Motion for Mobile / Tablet Devices
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (typeof e.gamma !== 'number' || typeof e.beta !== 'number') return;
      if (!Number.isFinite(e.gamma) || !Number.isFinite(e.beta)) return;

      // Gamma: left-to-right tilt in degrees [-90, 90]
      // Beta: front-to-back tilt in degrees [-180, 180] (natural phone hold is ~45 deg)
      const normGamma = Math.max(-1, Math.min(1, e.gamma / 45));
      const normBeta = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
      if (!Number.isFinite(normGamma) || !Number.isFinite(normBeta)) return;

      targetCamX = normGamma * 85;
      targetCamY = normBeta * 85;
      targetTiltY = normGamma * 0.28;
      targetTiltX = -normBeta * 0.24;
    };

    // 3. Scroll Depth Parallax
    const handleScroll = () => {
      const scroll = window.scrollY || window.pageYOffset || 0;
      if (Number.isFinite(scroll)) {
        scrollOffset = scroll;
      }
    };

    // Initialize 3D Stars / Ambient Particles
    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const isAccent = Math.random() < 0.24;
        stars.push({
          x: (Math.random() - 0.5) * width * 1.8,
          y: (Math.random() - 0.5) * height * 1.8,
          z: Math.random() * DEPTH + 40,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          vz: (Math.random() - 0.5) * 0.22,
          baseRadius: isAccent ? Math.random() * 1.4 + 1.1 : Math.random() * 1.1 + 0.55,
          baseAlpha: Math.random() * 0.45 + 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          isAccent,
        });
      }
    };

    // Initialize 3D Floating Polyhedra (Diamonds / Octahedrons)
    const initPolyhedra = () => {
      polyhedra.length = 0;
      const count = Math.min(5, Math.max(3, Math.floor(width / 360)));
      for (let i = 0; i < count; i++) {
        polyhedra.push({
          x: ((i + 0.5) / count - 0.5) * width * 1.2 + (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * height * 0.9,
          z: 220 + Math.random() * 450,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          size: 24 + Math.random() * 20,
          rotX: Math.random() * Math.PI,
          rotY: Math.random() * Math.PI,
          rotZ: Math.random() * Math.PI,
          vRotX: (Math.random() - 0.5) * 0.008 + 0.003,
          vRotY: (Math.random() - 0.5) * 0.008 + 0.003,
          vRotZ: (Math.random() - 0.5) * 0.006,
          isAccent: i % 2 === 0,
        });
      }
    };

    handleResize();
    initStars();
    initPolyhedra();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Attach Gyroscope orientation listener
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    let lastTime = performance.now();

    // 3D Polyhedron vertices (Octahedron in local model space)
    const OCTA_VERTICES = [
      { x: 0, y: -1, z: 0 }, // Top
      { x: 1, y: 0, z: 0 },  // Right
      { x: 0, y: 0, z: 1 },  // Front
      { x: -1, y: 0, z: 0 }, // Left
      { x: 0, y: 0, z: -1 }, // Back
      { x: 0, y: 1, z: 0 },  // Bottom
    ];

    // Octahedron edges connecting vertex indices
    const OCTA_EDGES = [
      [0, 1], [0, 2], [0, 3], [0, 4], // Top to mid
      [5, 1], [5, 2], [5, 3], [5, 4], // Bottom to mid
      [1, 2], [2, 3], [3, 4], [4, 1], // Mid perimeter
    ];

    const render = (time: number) => {
      const dt = Math.min(32, time - lastTime) / 16.66;
      lastTime = time;

      // Ensure target camera numbers are strictly finite
      if (!Number.isFinite(targetCamX)) targetCamX = 0;
      if (!Number.isFinite(targetCamY)) targetCamY = 0;
      if (!Number.isFinite(targetTiltX)) targetTiltX = 0;
      if (!Number.isFinite(targetTiltY)) targetTiltY = 0;

      // Smooth camera interpolation (gyroscope + mouse parallax)
      currentCamX += (targetCamX - currentCamX) * 0.05;
      currentCamY += (targetCamY - currentCamY) * 0.05;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      // Fallback in case of any numerical instability
      if (!Number.isFinite(currentCamX)) currentCamX = 0;
      if (!Number.isFinite(currentCamY)) currentCamY = 0;
      if (!Number.isFinite(currentTiltX)) currentTiltX = 0;
      if (!Number.isFinite(currentTiltY)) currentTiltY = 0;

      const safeWidth = Number.isFinite(width) && width > 0 ? width : (window.innerWidth || 800);
      const safeHeight = Number.isFinite(height) && height > 0 ? height : (window.innerHeight || 600);
      const safeScroll = Number.isFinite(scrollOffset) ? scrollOffset : 0;

      ctx.clearRect(0, 0, safeWidth, safeHeight);

      const isDark = theme !== 'light';
      const isArchitect = role === 'architect';

      const accentRgb = isArchitect
        ? (isDark ? '74, 222, 128' : '18, 140, 60')
        : (isDark ? '226, 87, 27' : '220, 75, 20');
      const neutralRgb = isDark ? '250, 245, 235' : '35, 30, 25';

      // 3D Center of projection with scroll parallax shift
      const scrollDrift = (safeScroll * 0.04) % DEPTH;
      const rawCx = safeWidth / 2 + currentCamX;
      const rawCy = safeHeight / 2 + currentCamY + (safeScroll * 0.06);
      const cx = Number.isFinite(rawCx) ? rawCx : safeWidth / 2;
      const cy = Number.isFinite(rawCy) ? rawCy : safeHeight / 2;
      const outerR = Math.max(80, Math.max(safeWidth, safeHeight) * 0.65);

      // ========================================================
      // 1. VOLUMETRIC AMBIENT GLOW IN DEEP 3D SPACE
      // ========================================================
      try {
        const glowGrad = ctx.createRadialGradient(
          cx,
          cy + 80,
          10,
          cx,
          cy + 80,
          outerR
        );
        if (isDark) {
          glowGrad.addColorStop(0, `rgba(${accentRgb}, 0.06)`);
          glowGrad.addColorStop(0.45, `rgba(${accentRgb}, 0.015)`);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          glowGrad.addColorStop(0, `rgba(${accentRgb}, 0.10)`);
          glowGrad.addColorStop(0.45, `rgba(${accentRgb}, 0.035)`);
          glowGrad.addColorStop(1, 'rgba(248, 249, 250, 0)');
        }
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, safeWidth, safeHeight);
      } catch {
        // Graceful fallback if device reports non-standard canvas dimensions
      }

      // ========================================================
      // 2. 3D HORIZON PERSPECTIVE GRID (CYBERNETIC / INSTITUTIONAL FLOOR)
      // ========================================================
      ctx.save();
      const gridYBase = height * 0.72 + currentCamY * 0.4;
      const gridZMin = 140;
      const gridZMax = 950;
      const gridZStep = 75;
      const gridXSpan = width * 1.4;
      const gridXStep = width / 12;

      // Draw horizontal distance lines in 3D perspective
      for (let gz = gridZMin; gz <= gridZMax; gz += gridZStep) {
        const adjustedZ = (gz - scrollDrift + DEPTH) % DEPTH;
        if (adjustedZ < 80) continue;

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + adjustedZ);
        const py = gridYBase + (adjustedZ * 0.32) * scale;
        const halfW = (gridXSpan * 0.5) * scale;
        const lineAlpha = (1 - adjustedZ / DEPTH) * (isDark ? 0.075 : 0.15);

        if (py > 0 && py < height + 60 && lineAlpha > 0.005) {
          ctx.strokeStyle = `rgba(${neutralRgb}, ${lineAlpha})`;
          ctx.lineWidth = isDark ? 0.65 : 0.95;
          ctx.beginPath();
          ctx.moveTo(cx - halfW, py);
          ctx.lineTo(cx + halfW, py);
          ctx.stroke();
        }
      }

      // Draw longitudinal vanishing lines
      for (let gx = -gridXSpan * 0.5; gx <= gridXSpan * 0.5; gx += gridXStep) {
        const s1 = FOCAL_LENGTH / (FOCAL_LENGTH + gridZMin);
        const s2 = FOCAL_LENGTH / (FOCAL_LENGTH + gridZMax);

        const x1 = cx + (gx + currentTiltY * 200) * s1;
        const y1 = gridYBase + (gridZMin * 0.32) * s1;
        const x2 = cx + (gx + currentTiltY * 200) * s2;
        const y2 = gridYBase + (gridZMax * 0.32) * s2;

        const lineAlpha = isDark ? 0.045 : 0.095;
        ctx.strokeStyle = `rgba(${neutralRgb}, ${lineAlpha})`;
        ctx.lineWidth = isDark ? 0.55 : 0.85;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // ========================================================
      // 3. FLOATING 3D WIREFRAME POLYHEDRA
      // ========================================================
      for (let p = 0; p < polyhedra.length; p++) {
        const poly = polyhedra[p];

        // Update physics & rotation
        poly.x += poly.vx * dt;
        poly.y += poly.vy * dt;
        poly.rotX += poly.vRotX * dt;
        poly.rotY += poly.vRotY * dt;
        poly.rotZ += poly.vRotZ * dt;

        // Boundary wrap
        if (poly.x < -width * 0.7) poly.x = width * 0.7;
        else if (poly.x > width * 0.7) poly.x = -width * 0.7;
        if (poly.y < -height * 0.7) poly.y = height * 0.7;
        else if (poly.y > height * 0.7) poly.y = -height * 0.7;

        // Apply 3D perspective rotation matrix
        const cosX = Math.cos(poly.rotX + currentTiltX);
        const sinX = Math.sin(poly.rotX + currentTiltX);
        const cosY = Math.cos(poly.rotY + currentTiltY);
        const sinY = Math.sin(poly.rotY + currentTiltY);
        const cosZ = Math.cos(poly.rotZ);
        const sinZ = Math.sin(poly.rotZ);

        // Project all vertices
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + poly.z);
        const polyCenterX = cx + poly.x * scale;
        const polyCenterY = cy + poly.y * scale;

        const projVertices: { px: number; py: number }[] = [];
        for (let v = 0; v < OCTA_VERTICES.length; v++) {
          const vert = OCTA_VERTICES[v];

          // Model space scale
          let x = vert.x * poly.size;
          let y = vert.y * poly.size;
          let z = vert.z * poly.size;

          // Rotation around X
          const y1 = y * cosX - z * sinX;
          const z1 = y * sinX + z * cosX;

          // Rotation around Y
          const x2 = x * cosY + z1 * sinY;
          const z2 = -x * sinY + z1 * cosY;

          // Rotation around Z
          const x3 = x2 * cosZ - y1 * sinZ;
          const y3 = x2 * sinZ + y1 * cosZ;

          projVertices.push({
            px: polyCenterX + x3 * scale,
            py: polyCenterY + y3 * scale,
          });
        }

        // Draw wireframe edges
        const depthAlpha = Math.max(0.12, 1 - poly.z / DEPTH);
        const polyAlpha = depthAlpha * (poly.isAccent ? (isDark ? 0.38 : 0.65) : (isDark ? 0.22 : 0.45));
        const strokeColor = poly.isAccent
          ? `rgba(${accentRgb}, ${polyAlpha})`
          : `rgba(${neutralRgb}, ${polyAlpha * (isDark ? 0.75 : 0.9)})`;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = poly.isAccent ? (isDark ? 0.9 : 1.35) : (isDark ? 0.65 : 1.05);
        ctx.beginPath();
        for (let e = 0; e < OCTA_EDGES.length; e++) {
          const [i1, i2] = OCTA_EDGES[e];
          ctx.moveTo(projVertices[i1].px, projVertices[i1].py);
          ctx.lineTo(projVertices[i2].px, projVertices[i2].py);
        }
        ctx.stroke();

        // Subtle glowing vertex points
        ctx.fillStyle = poly.isAccent ? `rgba(${accentRgb}, ${polyAlpha * (isDark ? 1.3 : 1.4)})` : `rgba(${neutralRgb}, ${polyAlpha * (isDark ? 1.0 : 1.2)})`;
        for (let v = 0; v < projVertices.length; v++) {
          ctx.beginPath();
          ctx.arc(projVertices[v].px, projVertices[v].py, isDark ? 1.2 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ========================================================
      // 4. 3D PARTICLE FIELD & CONSTELLATION NODES
      // ========================================================
      interface Projected {
        px: number;
        py: number;
        z: number;
        r: number;
        opacity: number;
      }
      const projected: Projected[] = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx * dt;
        star.y += star.vy * dt;
        star.z += star.vz * dt;
        star.pulsePhase += star.pulseSpeed * dt;

        // Wrap boundaries in 3D
        const boundX = width * 0.95;
        const boundY = height * 0.95;

        if (star.x < -boundX) star.x = boundX;
        else if (star.x > boundX) star.x = -boundX;

        if (star.y < -boundY) star.y = boundY;
        else if (star.y > boundY) star.y = -boundY;

        if (star.z < 10) star.z = DEPTH;
        else if (star.z > DEPTH) star.z = 10;

        // 3D Perspective Projection with Gyroscopic & Mouse Camera Rotation
        const radPitch = currentTiltX;
        const radYaw = currentTiltY;

        const cosYaw = Math.cos(radYaw);
        const sinYaw = Math.sin(radYaw);
        const cosPitch = Math.cos(radPitch);
        const sinPitch = Math.sin(radPitch);

        // Rotate star coordinates around camera
        const xRot = star.x * cosYaw + star.z * sinYaw;
        const zRot = -star.x * sinYaw + star.z * cosYaw;
        const yRot = star.y * cosPitch - zRot * sinPitch;
        const finalZ = star.y * sinPitch + zRot * cosPitch;

        if (finalZ < 15) continue;

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + finalZ);
        const px = cx + xRot * scale;
        const py = cy + yRot * scale;

        if (px < -60 || px > width + 60 || py < -60 || py > height + 60) {
          continue;
        }

        const r = Math.max(0.4, star.baseRadius * scale * (isDark ? 1.7 : 2.1));
        const depthAlpha = Math.max(0.08, 1 - finalZ / DEPTH);
        const pulse = 0.8 + Math.sin(star.pulsePhase) * 0.2;
        const opacity = isDark
          ? Math.min(0.92, star.baseAlpha * depthAlpha * pulse)
          : Math.min(0.95, star.baseAlpha * depthAlpha * pulse * 1.5);

        projected.push({ px, py, z: finalZ, r, opacity });

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);

        if (star.isAccent) {
          ctx.fillStyle = `rgba(${accentRgb}, ${opacity})`;
          if (finalZ < DEPTH * 0.4 && r > 1.2) {
            ctx.shadowColor = `rgba(${accentRgb}, ${isDark ? opacity * 0.8 : opacity * 0.5})`;
            ctx.shadowBlur = r * 3.5;
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.fillStyle = isDark ? `rgba(${neutralRgb}, ${opacity * 0.75})` : `rgba(${neutralRgb}, ${opacity * 0.9})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw faint 3D constellation vector lines
      const MAX_DIST = 110;
      const MAX_Z_DIFF = 210;

      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];

          const dz = Math.abs(a.z - b.z);
          if (dz > MAX_Z_DIFF) continue;

          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(distSq);
            const distFactor = 1 - dist / MAX_DIST;
            const depthFactor = 1 - dz / MAX_Z_DIFF;
            const lineOpacity = distFactor * depthFactor * (isDark ? 0.11 : 0.24) * Math.min(a.opacity, b.opacity);

            if (lineOpacity > 0.005) {
              ctx.strokeStyle = isDark ? `rgba(${neutralRgb}, ${lineOpacity})` : `rgba(${neutralRgb}, ${lineOpacity * 1.3})`;
              ctx.lineWidth = isDark ? 0.55 : 0.85;
              ctx.beginPath();
              ctx.moveTo(a.px, a.py);
              ctx.lineTo(b.px, b.py);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [theme, role]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 opacity-90"
      aria-hidden="true"
    />
  );
};
