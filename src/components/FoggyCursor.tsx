import { useEffect, useRef } from "react";

const FoggyCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const fogPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const interactiveSelector = 'a, button, [role="button"], input[type="submit"], [data-cursor-hover]';

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (fogRef.current) fogRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement;
      const isInteractive = target.closest(interactiveSelector) !== null;

      if (isInteractive !== hovering.current) {
        hovering.current = isInteractive;
        if (dotRef.current) {
          dotRef.current.style.width = isInteractive ? "14px" : "8px";
          dotRef.current.style.height = isInteractive ? "14px" : "8px";
          dotRef.current.style.boxShadow = isInteractive
            ? "0 0 20px hsl(var(--primary) / 1), 0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--accent) / 0.3)"
            : "0 0 12px hsl(var(--primary) / 0.8), 0 0 24px hsl(var(--primary) / 0.4)";
        }
        if (fogRef.current) {
          fogRef.current.style.width = isInteractive ? "300px" : "220px";
          fogRef.current.style.height = isInteractive ? "300px" : "220px";
          fogRef.current.style.background = isInteractive
            ? "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, hsl(var(--accent) / 0.12) 40%, transparent 70%)"
            : "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.06) 40%, transparent 70%)";
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (fogRef.current) fogRef.current.style.opacity = "0";
    };

    let raf: number;
    const animate = () => {
      fogPos.current.x += (pos.current.x - fogPos.current.x) * 0.07;
      fogPos.current.y += (pos.current.y - fogPos.current.y) * 0.07;
      if (fogRef.current) {
        fogRef.current.style.transform = `translate(${fogPos.current.x}px, ${fogPos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "hsl(var(--primary))",
          boxShadow: "0 0 12px hsl(var(--primary) / 0.8), 0 0 24px hsl(var(--primary) / 0.4)",
          transition: "opacity 0.3s, width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={fogRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.06) 40%, transparent 70%)",
          filter: "blur(2px)",
          transition: "opacity 0.4s, width 0.3s ease, height 0.3s ease, background 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default FoggyCursor;
