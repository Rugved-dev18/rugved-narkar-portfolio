import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
{ name: "HTML5", icon: "🌐" },
{ name: "CSS3", icon: "🎨" },
{ name: "JavaScript", icon: "⚡" },
{ name: "Go", icon: "🐹" },
{ name: "MongoDB", icon: "🍃" },
{ name: "Vercel", icon: "▲" }];


const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%"
          }
        }
      );

      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6">

      {/* Section ambient glows */}
      <div className="floating-orb w-72 h-72 -top-10 -right-20" />
      <div className="floating-orb-accent w-48 h-48 bottom-0 left-0" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Profile Image */}
        <div ref={imageRef} className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-3 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.4), hsl(var(--glow-warm) / 0.3))' }} />
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-primary/20 group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
              <img
                src={profileImg}
                alt="Rugved - Web Developer"
                className="w-full h-full object-cover object-top" />

            </div>
          </div>
        </div>

        {/* Bio */}
        <div ref={textRef}>
          <h2 className="text-3xl md:text-4xl font-extralight mb-2 tracking-wide">
            About <span className="gradient-text font-light">Me</span>
          </h2>
          <div className="w-12 h-[2px] bg-primary/50 mb-6" />
          <p className="text-muted-foreground font-light leading-relaxed mb-8">
            I specialize in frontend development, crafting dynamic, visually engaging, and highly responsive websites. With a strong foundation in HTML, CSS, and JavaScript, I build modern web interfaces optimized for performance and accessibility. My expertise extends to Golang, MongoDB, and Spline for creating interactive, immersive experiences.
          



          </p>

          <h3 className="text-sm font-medium tracking-widest text-primary/70 uppercase mb-4">
            Tech Stack
          </h3>
          <div ref={skillsRef} className="grid grid-cols-3 gap-3">
            {skills.map((skill) =>
            <div
              key={skill.name}
              className="glass rounded-lg px-4 py-3 text-center hover:glow-box hover:border-primary/30 transition-all duration-500 cursor-default hover:-translate-y-1">

                <span className="text-xl mb-1 block">{skill.icon}</span>
                <span className="text-xs font-light text-muted-foreground">
                  {skill.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default AboutSection;