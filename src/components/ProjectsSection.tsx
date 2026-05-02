import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project1 from "@/assets/samudra-ai.jpg";
import project2 from "@/assets/care4elders.png";
import project3 from "@/assets/portfolio-3d-new.jpg";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";


gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Samudra AI",
    description: "An integrated web platform for the Indian marine community providing real-time ocean data, safety alerts, SOS features, and AI-powered insights for fishermen and marine researchers",
    image: project1,
    tags: ["Html", "CSS 3", "Typescript"],
    link: "https://samudra-india.vercel.app/",
  },
  {
    title: "Care4Elder – Elder's Assistant App",
    description: "Care4Elders is a compassionate support initiative dedicated to providing care, assistance, and well-being services for senior citizens, ensuring they live safely, comfortably, and with dignity.",
    image: project2,
    tags: ["CSS 3", "Typescript", "API"],
    link: "https://care4elders-phi.vercel.app/",
  },
  {
    title: "3D Portfolio",
    description: "Creative developer portfolio with immersive 3D elements",
    image: project3,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "To-Do App",
    description: "A full-stack task management application with authentication, CRUD operations, and a sleek dark-themed UI",
    image: project4,
    tags: ["Go", "Gin", "PostgreSQL", "JWT Auth"],
  },
  {
    title: "Animation Portfolio",
    description: "Web animation toolkit showcase with smooth interactions",
    image: project5,
    tags: ["GSAP", "Spline", "React"],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      if (scrollContainerRef.current) {
        gsap.fromTo(
          scrollContainerRef.current.querySelectorAll(".project-card"),
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="floating-orb-accent w-64 h-64 top-10 -left-20" />
      <div className="floating-orb w-48 h-48 bottom-10 right-0" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2">
            My <span className="gradient-text font-light">Projects</span>
          </h2>
          <div className="w-12 h-[2px] bg-primary/50" />
        </div>

        {/* Horizontal scroll on desktop, grid on mobile */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => {
            const CardWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <CardWrapper
                key={i}
                {...wrapperProps}
                className="project-card flex-shrink-0 w-[300px] md:w-auto snap-start glass rounded-xl overflow-hidden group hover:glow-box hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 cursor-pointer no-underline"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium mb-1 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-primary/25 text-primary font-light tracking-wider"
                        style={{ boxShadow: '0 0 8px hsl(var(--primary) / 0.1)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
