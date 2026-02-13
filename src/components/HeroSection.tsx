import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
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
        delay: Math.random() * 2,
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-2YMkvpRm5jgZz0zuRKV4A8F8/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0"
          title="3D Background"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Light beam from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] light-beam pointer-events-none z-[1]" />

      {/* Floating orbs */}
      <div className="hero-orb floating-orb w-64 h-64 -top-20 -right-20 bg-primary/10" />
      <div className="hero-orb floating-orb w-48 h-48 bottom-20 -left-10 bg-accent/10" />
      <div className="hero-orb floating-orb w-32 h-32 top-1/3 right-1/4 bg-primary/5" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] mb-6 opacity-0"
        >
          Hi, I'm{" "}
          <span className="gradient-text font-light">Rugved</span>
          <br />
          <span className="text-foreground/90">Web Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-10 opacity-0"
        >
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
          className="inline-block px-8 py-3.5 rounded-full font-medium text-sm tracking-wide text-primary-foreground bg-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-500 animate-pulse-glow opacity-0"
        >
          Hire Me
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
