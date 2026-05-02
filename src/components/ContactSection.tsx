import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_jisqb4f",
        "template_tv34ruh",
        formRef.current!,
        "h7FNfMegGcHcF6Z-I"
      );
      const btn = formRef.current?.querySelector("button[type='submit']");
      if (btn) {
        gsap.fromTo(btn, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
      }
      setSubmitted(true);
      formRef.current?.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="floating-orb w-56 h-56 top-20 right-0" />
      <div className="floating-orb-accent w-40 h-40 bottom-20 -left-10" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2 text-center">
          Get In <span className="gradient-text font-light">Touch</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary/50 mx-auto mb-4" />
        <p className="text-center text-muted-foreground font-light mb-12">
          Have a project in mind? Let's build something incredible together.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Let's Connect */}
          <div className="glass rounded-2xl p-8 md:p-10 gradient-border flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-light mb-6">
                Let's <span className="gradient-text font-medium">Connect</span>
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-light mb-1">Email</p>
                    <a href="mailto:narkarrugved100@gmail.com" className="text-sm text-foreground hover:text-primary transition-colors">
                      narkarrugved100@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-light mb-1">Contact No</p>
                    <a href="tel:+918530781565" className="text-sm text-foreground hover:text-primary transition-colors">
                      +91 8530781565
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-light mb-1">Location</p>
                    <p className="text-sm text-foreground">Pune, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/uc?export=download&id=1javd8u0-1RlqIJnAVXz7BiMDrBAp5DOn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm tracking-wide text-primary-foreground transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                  boxShadow: '0 0 25px hsl(var(--primary) / 0.3), 0 0 50px hsl(var(--accent) / 0.15)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
              <a
                href="https://github.com/Rugved-dev18"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rugved-narkar-22000b314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 md:p-10 space-y-6 gradient-border"
          >
            <div className="form-field">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                name="from_email"
                placeholder="Your Email"
                required
                className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
              />
            </div>
            <div className="form-field">
              <textarea
                name="message"
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
                disabled={sending}
              >
                {submitted ? "Message Sent! ✓" : sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
