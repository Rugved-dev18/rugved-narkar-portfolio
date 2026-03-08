import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

const FoggyCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const prevPos = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const visible = useRef(false);
  const particles = useRef<Particle[]>([]);
  const trail = useRef<TrailPoint[]>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const interactiveSelector = 'a, button, [role="button"], input[type="submit"], [data-cursor-hover]';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      prevPos.current = { ...pos.current };
      pos.current = { x: e.clientX, y: e.clientY };
      visible.current = true;

      const target = e.target as HTMLElement;
      hovering.current = target.closest(interactiveSelector) !== null;

      // Add trail points
      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 80) trail.current.shift();

      // Spawn particles along movement
      const dx = pos.current.x - prevPos.current.x;
      const dy = pos.current.y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const spawnCount = Math.min(Math.floor(speed * 0.3), 5);

      for (let i = 0; i < spawnCount; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 2.5;
        const vel = Math.random() * 1.5 + 0.5;
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * vel * -0.5,
          vy: Math.sin(angle) * vel * -0.5,
          life: 0,
          maxLife: 30 + Math.random() * 30,
          size: Math.random() * 2.5 + 0.5,
          hue: Math.random() > 0.5 ? 192 : 270 + Math.random() * 30,
        });
      }
    };

    const onLeave = () => {
      visible.current = false;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible.current) {
        // Fade out remaining elements
        trail.current = trail.current.filter((p) => {
          p.age += 1.5;
          return p.age < 40;
        });
        particles.current = particles.current.filter((p) => {
          p.life++;
          return p.life < p.maxLife;
        });
        if (trail.current.length === 0 && particles.current.length === 0) {
          raf = requestAnimationFrame(animate);
          return;
        }
      }

      // --- Draw wave trail ---
      if (trail.current.length > 2) {
        // Age trail points
        trail.current.forEach((p) => (p.age += 1));
        trail.current = trail.current.filter((p) => p.age < 40);

        if (trail.current.length > 2) {
          // Main glowing trail
          for (let layer = 0; layer < 3; layer++) {
            const widths = [12, 6, 2];
            const alphas = [0.06, 0.12, 0.35];
            const w = widths[layer] * (hovering.current ? 1.6 : 1);

            ctx.beginPath();
            ctx.moveTo(trail.current[0].x, trail.current[0].y);

            for (let i = 1; i < trail.current.length - 1; i++) {
              const p0 = trail.current[i];
              const p1 = trail.current[i + 1];
              const mx = (p0.x + p1.x) / 2;
              const my = (p0.y + p1.y) / 2;
              ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
            }

            const last = trail.current[trail.current.length - 1];
            ctx.lineTo(last.x, last.y);

            const gradient = ctx.createLinearGradient(
              trail.current[0].x,
              trail.current[0].y,
              last.x,
              last.y
            );
            const fadeStart = Math.max(0, 1 - trail.current[0].age / 40);
            gradient.addColorStop(0, `hsla(192, 100%, 50%, ${alphas[layer] * fadeStart * 0.3})`);
            gradient.addColorStop(0.3, `hsla(270, 80%, 65%, ${alphas[layer] * 0.7})`);
            gradient.addColorStop(0.6, `hsla(192, 100%, 50%, ${alphas[layer]})`);
            gradient.addColorStop(1, `hsla(320, 80%, 60%, ${alphas[layer]})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = w;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.shadowBlur = layer === 0 ? 20 : 0;
            ctx.shadowColor = "hsla(192, 100%, 50%, 0.3)";
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // --- Draw & update particles ---
      particles.current = particles.current.filter((p) => {
        p.life++;
        if (p.life >= p.maxLife) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy -= 0.02; // slight float upward

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const size = p.size * (1 - progress * 0.5);

        // Spark glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.15)`;
        ctx.fill();

        // Spark core
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 80%, 1)`;
        ctx.fill();
        ctx.restore();

        return true;
      });

      // --- Draw cursor dot ---
      if (visible.current) {
        const dotSize = hovering.current ? 10 : 6;
        const glowSize = hovering.current ? 50 : 30;

        // Outer energy glow
        const outerGrad = ctx.createRadialGradient(
          pos.current.x, pos.current.y, 0,
          pos.current.x, pos.current.y, glowSize
        );
        outerGrad.addColorStop(0, "hsla(192, 100%, 50%, 0.25)");
        outerGrad.addColorStop(0.4, "hsla(270, 80%, 65%, 0.1)");
        outerGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.current.x, pos.current.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Inner ring
        if (hovering.current) {
          ctx.beginPath();
          ctx.arc(pos.current.x, pos.current.y, 18, 0, Math.PI * 2);
          ctx.strokeStyle = "hsla(192, 100%, 50%, 0.3)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Core dot
        const coreGrad = ctx.createRadialGradient(
          pos.current.x, pos.current.y, 0,
          pos.current.x, pos.current.y, dotSize
        );
        coreGrad.addColorStop(0, "hsla(192, 100%, 90%, 1)");
        coreGrad.addColorStop(0.5, "hsla(192, 100%, 50%, 0.9)");
        coreGrad.addColorStop(1, "hsla(270, 80%, 65%, 0.4)");
        ctx.beginPath();
        ctx.arc(pos.current.x, pos.current.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "hsla(192, 100%, 50%, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ willChange: "auto" }}
    />
  );
};

export default FoggyCursor;
