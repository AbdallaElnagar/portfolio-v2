import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Star {
  x: number; y: number;       // current 2-D screen position
  ox: number; oy: number;     // home position (spring target)
  vx: number; vy: number;     // velocity
  r: number;                  // base radius
  opacity: number;            // current opacity
  maxOpacity: number;         // personal max (creates magnitude variation)
  phase: number;              // twinkle sine phase
  phaseSpeed: number;         // twinkle speed
  isCyan: boolean;
}

const N          = 420;
const REPEL_R    = 110;       // px – repulsion bubble radius
const REPEL_STR  = 34;        // max displacement force
const SPRING     = 0.048;     // spring-return stiffness
const DAMP       = 0.80;      // velocity damping per frame

export const BackgroundSpace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location  = useLocation();
  const [warping, setWarping] = useState(false);

  const mouse  = useRef({ x: -9999, y: -9999 });
  const scroll = useRef({ lastY: typeof window !== 'undefined' ? window.scrollY : 0, vel: 0 });

  /* ── listeners ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onMove  = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    const onScroll = () => {
      const cy = window.scrollY;
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 0.03 : 0.3;
      const maxVel = isMobile ? 5 : 60;
      scroll.current.vel   = Math.min(Math.abs(cy - scroll.current.lastY) * multiplier, maxVel);
      scroll.current.lastY = cy;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setWarping(true);
    const t = setTimeout(() => setWarping(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  /* ── canvas engine ──────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let raf: number;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const handleResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    let stars: Star[] = [];

    function init() {
      const targetW = W || 800;
      const targetH = H || 600;
      const isMobile = targetW < 768;
      const count = isMobile ? 30 : N;
      stars = Array.from({ length: count }, () => {
        const x = Math.random() * targetW;
        const y = Math.random() * targetH;
        return {
          x, y, ox: x, oy: y, vx: 0, vy: 0,
          r:          Math.random() * 1.8 + 0.3,
          maxOpacity: Math.random() * 0.55 + 0.45,  // 0.45–1.0
          opacity:    Math.random(),
          phase:      Math.random() * Math.PI * 2,
          phaseSpeed: isMobile
            ? Math.random() * 0.008 + 0.002
            : Math.random() * 0.018 + 0.005,
          isCyan:     Math.random() > 0.86,
        };
      });
    }
    init();

    /* ── draw loop ──────────────────────────────────────────────────── */
    let frame = 0;
    const draw = () => {
      frame++;
      
      // Self-correcting size check with DPI scaling
      const rect = canvas.getBoundingClientRect();
      const currentW = Math.floor(rect.width) || window.innerWidth || 800;
      const currentH = Math.floor(rect.height) || window.innerHeight || 600;
      const dpr = window.devicePixelRatio || 1;
      
      if (canvas.width !== currentW * dpr || canvas.height !== currentH * dpr) {
        canvas.width = currentW * dpr;
        canvas.height = currentH * dpr;
        W = currentW;
        H = currentH;
        init();
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (frame < 30) {
        ctx.clearRect(0, 0, W, H);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.fillRect(0, 0, W, H);
      }

      const isMobile = W < 768;

      scroll.current.vel *= 0.90;
      const warpDelta = scroll.current.vel * (isMobile ? 0.01 : 0.4); // extra downward drift when scrolling

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Active only in the Hero section of the main landing page (scrollY < 650)
      const isHero = location.pathname === '/' && scroll.current.lastY < 650;

      stars.forEach((s, idx) => {
        // Continuous slow background travel drift (larger stars drift faster)
        const baseDrift = isMobile
          ? (0.02 + (s.r * 0.015)) * 0.35
          : 0.08 + (s.r * 0.04);
        s.oy += baseDrift + warpDelta;

        // Wrap home coordinates if they go off screen
        if (s.oy > H + 10) {
          s.oy = -10;
          s.y = -10;
        }

        /* spring return to home coordinates */
        s.vx = (s.vx + (s.ox - s.x) * SPRING) * DAMP;
        s.vy = (s.vy + (s.oy - s.y) * SPRING) * DAMP;
        s.x += s.vx;
        s.y += s.vy;

        /* mouse repulsion (ONLY in Hero section) */
        if (isHero) {
          const dx   = s.x - mx;
          const dy   = s.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_R && dist > 0.5) {
            const f = Math.pow((REPEL_R - dist) / REPEL_R, 1.5) * REPEL_STR;
            s.vx += (dx / dist) * f;
            s.vy += (dy / dist) * f;
          }
        }

        /* twinkling & conditional count reduction */
        s.phase  += s.phaseSpeed;
        const targetTwinkle = s.maxOpacity * (0.45 + Math.sin(s.phase) * 0.55);

        // Smoothly fade out 2/3 of the stars in text sections to improve legibility
        const shouldShow = isHero || (idx % 3 === 0);
        if (shouldShow) {
          s.opacity = s.opacity + (targetTwinkle - s.opacity) * 0.08;
        } else {
          s.opacity = s.opacity + (0 - s.opacity) * 0.08;
        }

        // Skip rendering if the star is completely faded out
        if (s.opacity < 0.015) return;

        /* skip off-screen rendering */
        if (s.x < -6 || s.x > W + 6 || s.y < -6 || s.y > H + 6) return;

        const R = s.isCyan ? 6 : 255;
        const G = s.isCyan ? 182 : 255;
        const B = s.isCyan ? 212 : 255;

        /* glow halo for brighter stars */
        if (s.r > 1.1) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4.5);
          g.addColorStop(0, `rgba(${R},${G},${B},${(s.opacity * 0.4).toFixed(3)})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        /* solid core */
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.r, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${s.opacity.toFixed(3)})`;
        ctx.fill();
      });

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none select-none"
         style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* subtle nebula tints */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(6,182,212,0.04)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(99,102,241,0.05)_0%,transparent_100%)]" />

      {warping && (
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.07),transparent_65%)]" />
      )}
    </div>
  );
};

export default BackgroundSpace;
