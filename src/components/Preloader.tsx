import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate name in
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    );

    // Animate progress bar
    tl.to(
      progressBarRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          if (percentRef.current) {
            percentRef.current.textContent = `${progress}%`;
          }
        },
      },
      "-=0.3"
    );

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Ambient glow */}
      <div className="floating-orb w-96 h-96 top-1/4 left-1/3" />

      <h1
        ref={nameRef}
        className="text-5xl md:text-7xl font-extralight tracking-[0.3em] mb-12 glow-text text-foreground opacity-0"
      >
        RUGVED
      </h1>

      <div className="w-64 md:w-80 flex flex-col items-center gap-3">
        <div className="w-full h-[2px] bg-border/30 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
          />
        </div>
        <span ref={percentRef} className="text-sm text-muted-foreground font-light tracking-widest">
          0%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
