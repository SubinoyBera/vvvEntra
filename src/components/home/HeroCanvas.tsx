import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, role } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      w = rect.width;
      h = rect.height;

      // Re-init nodes if resized significantly or empty
      if (nodes.length === 0) {
        initNodes();
      }
    };

    const initNodes = () => {
      nodes.length = 0;
      const count = Math.min(42, Math.floor((w * h) / 18000));
      for (let i = 0; i < Math.max(24, count); i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.8,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const isDark = theme === 'dark';
      const lineColor = isDark ? '242, 237, 228' : '10, 9, 8';
      // Dot color depends on current role (Orange for investor, Green for architect)
      const dotColor = role === 'architect'
        ? (isDark ? 'rgba(74, 222, 128, 0.65)' : 'rgba(22, 163, 74, 0.55)')
        : (isDark ? 'rgba(244, 169, 130, 0.65)' : 'rgba(226, 87, 27, 0.55)');

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.strokeStyle = `rgba(${lineColor}, ${(1 - dist / 135) * 0.1})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0) a.x = w;
        else if (a.x > w) a.x = 0;
        if (a.y < 0) a.y = h;
        else if (a.y > h) a.y = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [theme, role]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
