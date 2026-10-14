import profileImg from "@/assets/profile.png";
import { useIsMobile } from "@/hooks/use-mobile";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type Skill = { name: string; icon: string; invert?: boolean };

const stackGroups: { label: string; primary?: boolean; skills: Skill[] }[] = [
  {
    label: "Primary",
    primary: true,
    skills: [
      { name: "Python", icon: `${DEVICON}/python/python-original.svg` },
      { name: "Go", icon: `${DEVICON}/go/go-original.svg` },
      { name: "SQL", icon: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg` },
    ],
  },
  {
    label: "Data",
    skills: [
      { name: "MongoDB", icon: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg` },
    ],
  },
  {
    label: "Web",
    skills: [
      { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
      { name: "HTML/CSS", icon: `${DEVICON}/html5/html5-original.svg` },
    ],
  },
  {
    label: "Workflow",
    skills: [
      { name: "Git", icon: `${DEVICON}/git/git-original.svg` },
      { name: "GitHub", icon: `${DEVICON}/github/github-original.svg`, invert: true },
      { name: "Bash", icon: `${DEVICON}/bash/bash-original.svg` },
      { name: "Figma", icon: `${DEVICON}/figma/figma-original.svg` },
    ],
  },
];

const principles = [
  {
    title: "Start with the person using it",
    body: "I ask who makes the decision and what they need to see to make it.",
  },
  {
    title: "Ship something that runs, then improve it",
    body: "Working endpoints and clear data flow before polish.",
  },
  {
    title: "Explain it plainly",
    body: "I communicate in English, Hindi and Marathi, and my team placed 3rd at an Entrepreneurship Bootcamp & Pitchfest.",
  },
];

const facts = [
  "Rugved Narkar",
  "Software engineering intern, Pune",
  "B.E. Computer Science, 2024 to 2028",
  "Speaks English, Hindi, Marathi",
];

const AboutSection = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Spline 3D Background — desktop only */}
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <iframe
            src="https://my.spline.design/boxeshover-SWORFSeQLNazFo81kGbdezdd/"
            frameBorder="0"
            width="100%"
            height="100%"
            loading="lazy"
            className="absolute inset-0"
            title="3D Background"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="floating-orb w-72 h-72 -top-10 -right-20" />
      <div className="floating-orb-accent w-48 h-48 bottom-0 left-0" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 md:gap-16 items-start">
        {/* Avatar + facts */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div
              className="absolute -inset-3 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.4), hsl(var(--glow-warm) / 0.3))" }}
            />
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-primary/20 group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
              <img
                src={profileImg}
                alt="Rugved Narkar"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <dl className="mt-10 w-full max-w-xs divide-y divide-border/60 border-y border-border/60">
            {facts.map((fact, i) => (
              <div key={fact} className="py-3 text-sm font-light">
                <dt className="sr-only">{["Name", "Role", "Education", "Languages"][i]}</dt>
                <dd className={i === 0 ? "text-foreground font-normal" : "text-muted-foreground"}>{fact}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-extralight mb-2 tracking-wide">
            About <span className="gradient-text font-light">Me</span>
          </h2>
          <div className="w-12 h-[2px] bg-primary/50 mb-6" />

          <div className="max-w-[62ch] space-y-4 text-foreground/80 font-light leading-[1.7] mb-10">
            <p>
              I'm a Computer Science student at Ajeenkya D.Y. Patil School of Engineering, Pune, building Python and Go backends and AI-integrated systems. I like the point where a messy real-world problem meets code, and I'm aiming to grow into a forward deployed engineer who works directly with users.
            </p>
            <p>
              My main project, Polar Nav X, is an AI-powered decision-support system for ships navigating Antarctic waters, built for Smart India Hackathon 2026. I also contribute to open source and practice problem solving on LeetCode.
            </p>
          </div>

          <h3 className="text-sm font-medium tracking-widest text-primary/70 uppercase mb-4">How I work</h3>
          <ul className="space-y-4 mb-10 max-w-[62ch]">
            {principles.map((p) => (
              <li key={p.title} className="border-l-2 border-primary/50 pl-4">
                <p className="text-foreground font-medium">{p.title}</p>
                <p className="text-muted-foreground font-light text-sm leading-[1.7]">{p.body}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-medium tracking-widest text-primary/70 uppercase mb-4">Tech Stack</h3>
          <div className="space-y-5">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{group.label}</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={`glass rounded-lg px-4 py-3 text-center hover:glow-box hover:border-primary/30 transition-all duration-500 cursor-default hover:-translate-y-1 ${
                        group.primary ? "border-primary/40" : ""
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        width={24}
                        height={24}
                        className={`w-6 h-6 mx-auto mb-1 ${skill.invert ? "invert" : ""}`}
                      />
                      <span className="text-xs font-light text-muted-foreground">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
