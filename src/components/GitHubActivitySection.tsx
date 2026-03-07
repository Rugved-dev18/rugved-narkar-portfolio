import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = "Rugved-dev18";

const cards = [
  {
    title: "GitHub Stats",
    src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=00d4ff&text_color=c0c8e0&icon_color=a855f7&bg_color=00000000&ring_color=00d4ff`,
  },
  {
    title: "Top Languages",
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=00d4ff&text_color=c0c8e0&bg_color=00000000`,
  },
  {
    title: "Contribution Streak",
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=00d4ff&fire=a855f7&currStreakLabel=00d4ff&sideLabels=c0c8e0&dates=64748b&currStreakNum=c0c8e0&sideNums=c0c8e0&stroke=1e293b&background=00000000`,
  },
  {
    title: "Activity Graph",
    src: `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=react-dark&hide_border=true&bg_color=00000000&color=c0c8e0&line=00d4ff&point=a855f7&area=true&area_color=00d4ff`,
    wide: true,
  },
];

const GitHubActivitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".github-card"),
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="floating-orb w-64 h-64 -top-10 -left-20" />
      <div className="floating-orb-accent w-48 h-48 bottom-10 right-0" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2 text-center">
          GitHub <span className="gradient-text font-light">Activity</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary/50 mx-auto mb-4" />
        <p className="text-center text-muted-foreground font-light mb-12">
          A glimpse of my coding journey and open-source contributions.
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`github-card glass rounded-2xl p-4 gradient-border group hover:scale-[1.02] transition-transform duration-500 ${
                card.wide ? "md:col-span-2 lg:col-span-3" : ""
              }`}
              style={{
                boxShadow:
                  "0 0 20px hsl(var(--primary) / 0.1), 0 0 60px hsl(var(--primary) / 0.05)",
              }}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={card.src}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
