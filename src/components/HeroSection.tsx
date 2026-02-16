import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-2YMkvpRm5jgZz0zuRKV4A8F8/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0"
          title="3D Background" />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Light beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[700px] light-beam pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at bottom left, hsl(270 80% 65% / 0.08), transparent 70%)' }} />

      {/* Floating orbs */}
      <div className="hero-orb floating-orb w-80 h-80 -top-20 -right-20" />
      <div className="hero-orb floating-orb-accent w-56 h-56 bottom-20 -left-10" />
      <div className="hero-orb floating-orb w-40 h-40 top-1/3 right-1/4" />
      <div className="hero-orb floating-orb-accent w-32 h-32 bottom-1/3 left-1/3" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          ref={welcomeRef}
          className="text-xs uppercase tracking-[0.3em] text-primary mb-4 opacity-0 glow-text font-extrabold font-sans md:text-base">

          Welcome To My World
        </p>
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-6 opacity-0 font-bold">

          Hi, I'm{" "}
          <span className="gradient-text font-semibold">Rugved</span>
          <br />
          <span className="text-foreground/90">Web Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-10 opacity-0">

          Crafting immersive digital experiences with cutting-edge
          technologies and pixel-perfect precision.
        </p>

        <a
          ref={ctaRef}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block px-8 py-3.5 rounded-full font-medium text-sm tracking-wide text-primary-foreground opacity-0"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            boxShadow: '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
            transition: 'all 0.5s ease'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 0 50px hsl(var(--primary) / 0.6), 0 0 100px hsl(var(--accent) / 0.3)';}}
          onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)';}}>

          Hire Me
        </a>
      </div>
    </section>);

};

export default HeroSection;