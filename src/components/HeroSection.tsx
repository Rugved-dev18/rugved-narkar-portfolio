import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 30, letterSpacing: "0.1em" },
      { opacity: 1, y: 0, letterSpacing: "0.5em", duration: 1, ease: "power3.out" }
    ).
    fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.5"
    ).
    fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    ).
    fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Floating orbs
    gsap.utils.toArray<HTMLElement>(".hero-orb").forEach((orb) => {
      gsap.to(orb, {
        y: -20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-[100vw]">

      {/* Spline 3D Background — desktop only for performance */}
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <iframe
            src="https://my.spline.design/orb-2YMkvpRm5jgZz0zuRKV4A8F8/"
            frameBorder="0"
            width="100%"
            height="100%"
            loading="lazy"
            className="absolute inset-0 scale-110"
            style={{ filter: "brightness(1.4) saturate(1.5) contrast(1.1)" }}
            title="3D Background" />
        )}

        <div className="absolute inset-0 bg-background/35" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 85%)' }} />
      </div>

      {/* Vivid light beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[800px] pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at top center, hsl(192 100% 50% / 0.15), hsl(270 80% 65% / 0.08) 40%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at bottom left, hsl(270 80% 65% / 0.12), transparent 70%)' }} />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at center right, hsl(192 100% 50% / 0.1), transparent 70%)' }} />

      {/* Brighter floating orbs */}
      <div className="hero-orb w-80 h-80 -top-20 -right-20 absolute rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(192 100% 50% / 0.2), hsl(192 100% 50% / 0.05) 50%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="hero-orb w-56 h-56 bottom-20 -left-10 absolute rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(270 80% 65% / 0.25), hsl(270 80% 65% / 0.05) 50%, transparent 70%)', filter: 'blur(30px)' }} />
      <div className="hero-orb w-40 h-40 top-1/3 right-1/4 absolute rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(320 80% 60% / 0.15), transparent 70%)', filter: 'blur(25px)' }} />
      <div className="hero-orb w-32 h-32 bottom-1/3 left-1/3 absolute rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(192 100% 50% / 0.15), transparent 70%)', filter: 'blur(20px)' }} />

      {/* Social Icons - Left Side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5">
        {[
          { href: "https://www.linkedin.com/in/rugved-narkar-22000b314/", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
          { href: "https://github.com/Rugved-dev18", label: "GitHub", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
          { href: "https://x.com", label: "X (Twitter)", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
          { href: "https://discord.com", label: "Discord", path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189z" },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
          className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <p
          ref={welcomeRef}
          className="uppercase tracking-[0.3em] text-primary mb-4 opacity-0 glow-text font-extrabold font-sans"
          style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)" }}>

          Welcome To My World
        </p>
        <h1
          ref={headlineRef}
          className="tracking-tight leading-[1.1] mb-6 opacity-0 font-bold break-words"
          style={{ fontSize: "clamp(1.875rem, 6vw, 4.5rem)" }}>

          Hi, I'm{" "}
          <span className="gradient-text font-semibold">Rugved</span>
          <br />
          <span className="text-foreground/90">Software Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-muted-foreground font-light max-w-xl mx-auto mb-10 opacity-0 text-center"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}>

          A passionate developer focused on building scalable backend systems and impactful web applications. I enjoy working with Go, exploring open source, and solving real-world problems through technology. Currently sharpening my skills while contributing in Open Source.
        </p>

        <div ref={ctaRef} className="flex items-center justify-center gap-4 opacity-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-3.5 rounded-full font-medium text-xs tracking-wide text-primary-foreground"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
              boxShadow: '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
              transition: 'all 0.5s ease'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 0 50px hsl(var(--primary) / 0.6), 0 0 100px hsl(var(--accent) / 0.3)';}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)';}}
          >
            Hire Me
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-8 py-3.5 rounded-full font-medium text-xs tracking-wide border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>);

};

export default HeroSection;