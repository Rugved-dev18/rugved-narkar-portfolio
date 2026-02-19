import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Open Source Contributor",
    organization: "Open Source Connect India",
    duration: "Dec 2025 – Present",
    description:
      "Contributed to the Various DevTools project, fixing accessibility bugs and improving the network inspector UI for better developer experience.",
    tags: ["JavaScript", "CSS", "Git", "Open Source"],
  },
  {
    role: "Campus Ambassador Intern",
    organization: "IIT Bombay - Techfest",
    duration: "Jan 2023 – May 2023",
    description:
      "Developed interactive landing pages and marketing websites. Implemented scroll-based animations and responsive layouts for client projects.",
    tags: ["HTML", "CSS", "JavaScript", "Adobe Photoshop"],
  },
  {
    role: "Marketing Intern",
    organization: "Eduveda Academy",
    duration: "2022 – 2023",
    description:
      "Delivered custom web solutions for small businesses including e-commerce stores, portfolios, and booking systems with a focus on performance.",
    tags: ["Sales", "Node.js", "MongoDB", "Stripe"],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".experience-card"),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );

        // Animate the timeline line
        const line = cardsRef.current.querySelector(".timeline-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 75%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="floating-orb w-56 h-56 top-20 right-[-4rem]" />
      <div className="floating-orb-accent w-40 h-40 bottom-20 left-[-2rem]" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2">
            My{" "}
            <span className="gradient-text font-light">Experience</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide mt-3">
            My Professional &amp; Open Source Journey
          </p>
          <div className="w-12 h-[2px] bg-primary/50 mt-4 mx-auto md:mx-0" />
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Vertical line – visible on md+ */}
          <div
            className="timeline-line hidden md:block absolute left-[22px] top-0 bottom-0 w-[2px] origin-top"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.3), transparent)",
            }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="experience-card relative md:pl-14 group"
              >
                {/* Timeline dot */}
                <span className="hidden md:block absolute left-[14px] top-6 w-[18px] h-[18px] rounded-full border-2 border-primary/60 bg-background z-10 group-hover:border-primary group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-all duration-500" />

                {/* Card */}
                <div className="glass rounded-2xl p-6 md:p-7 hover:glow-box hover:border-primary/30 hover:scale-[1.03] transition-all duration-500 cursor-default">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-primary/80 font-light">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground font-light tracking-wider whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-primary/25 text-primary font-light tracking-wider"
                        style={{
                          boxShadow:
                            "0 0 8px hsl(var(--primary) / 0.1)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
