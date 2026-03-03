import { useEffect, useRef } from "react";

const FoggyCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const fogPos = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (fogRef.current) fogRef.current.style.opacity = "1";
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
      {/* Small glowing dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "hsl(var(--primary))",
          boxShadow: "0 0 12px hsl(var(--primary) / 0.8), 0 0 24px hsl(var(--primary) / 0.4)",
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
      {/* Foggy trail */}
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
          transition: "opacity 0.4s",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default FoggyCursor;
