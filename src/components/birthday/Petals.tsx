import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number; r: number; rs: number; vx: number; vy: number; sw: number };

/** Depth-layered sakura petals on a canvas. `glow` turns them into luminous particles. */
export function Petals({ count = 45, glow = false, className = "" }: { count?: number; glow?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const n = reduce ? 8 : mobile ? Math.round(count * 0.5) : count;
    let w = 0, h = 0, raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const mk = (top = false): P => {
      const z = Math.random() * 0.8 + 0.2;
      return { x: Math.random() * w, y: top ? -20 : Math.random() * h, z, r: Math.random() * 6, rs: (Math.random() - 0.5) * 2, vx: 15 + Math.random() * 25, vy: 25 + Math.random() * 30, sw: Math.random() * 6 };
    };
    const ps = Array.from({ length: n }, () => mk());
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05); last = t;
      g.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.sw += dt; p.r += p.rs * dt;
        p.x += (p.vx + Math.sin(p.sw * 1.5) * 20) * p.z * dt;
        p.y += p.vy * p.z * dt;
        if (p.y > h + 20 || p.x > w + 20) Object.assign(p, mk(true), { x: Math.random() * w * 1.2 - w * 0.2 });
        const s = 4 + p.z * 9;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.scale(1, Math.abs(Math.cos(p.sw * 2)) * 0.6 + 0.4);
        g.globalAlpha = 0.35 + p.z * 0.6;
        if (glow) { g.shadowBlur = 12; g.shadowColor = "rgba(255,200,230,0.9)"; g.fillStyle = "rgba(255,225,240,1)"; g.beginPath(); g.arc(0, 0, s * 0.3, 0, Math.PI * 2); g.fill(); }
        else {
          g.fillStyle = "rgba(255,183,207,1)";
          g.beginPath(); g.moveTo(0, -s / 2);
          g.bezierCurveTo(s / 2, -s / 2, s / 2, s / 3, 0, s / 2);
          g.bezierCurveTo(-s / 2, s / 3, -s / 2, -s / 2, 0, -s / 2); g.fill();
        }
        g.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count, glow]);
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
