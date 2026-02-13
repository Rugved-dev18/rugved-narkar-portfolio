import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = formRef.current?.querySelector("button[type='submit']");
    if (btn) {
      gsap.fromTo(btn, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-6">
      <div className="floating-orb w-56 h-56 top-20 right-0" />
      <div className="floating-orb-accent w-40 h-40 bottom-20 -left-10" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2 text-center">
          Get In <span className="gradient-text font-light">Touch</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary/50 mx-auto mb-4" />
        <p className="text-center text-muted-foreground font-light mb-12">
          Have a project in mind? Let's build something incredible together.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 md:p-10 space-y-6 gradient-border"
        >
          <div className="form-field">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
            />
          </div>
          <div className="form-field">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
            />
          </div>
          <div className="form-field">
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300 resize-none"
            />
          </div>
          <div className="form-field">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-medium text-sm tracking-wide text-primary-foreground transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 0 25px hsl(var(--primary) / 0.3), 0 0 50px hsl(var(--accent) / 0.15)',
              }}
            >
              {submitted ? "Message Sent! ✓" : "Send Message"}
            </button>
          </div>
        </form>

        {/* Socials */}
        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
