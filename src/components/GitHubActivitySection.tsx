import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = "Rugved-dev18";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number; color: string }[];
  recentRepos: { name: string; description: string; stars: number; forks: number; language: string; url: string }[];
  contributionMap: Record<string, number>;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};

const GitHubActivitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`),
        ]);

        const user = await userRes.json();
        const repos = await reposRes.json();
        const events = await eventsRes.json();

        if (!Array.isArray(repos)) {
          setLoading(false);
          return;
        }

        const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);

        const langMap: Record<string, number> = {};
        repos.forEach((r: any) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
          }
        });
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            color: LANG_COLORS[name] || "#8b5cf6",
          }));

        const recentRepos = repos
          .filter((r: any) => !r.fork)
          .slice(0, 4)
          .map((r: any) => ({
            name: r.name,
            description: r.description || "No description",
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language || "Unknown",
            url: r.html_url,
          }));

        // Build contribution map from events
        const contributionMap: Record<string, number> = {};
        // Initialize last 365 days
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().split("T")[0];
          contributionMap[key] = 0;
        }
        if (Array.isArray(events)) {
          events.forEach((e: any) => {
            const day = e.created_at?.split("T")[0];
            if (day && day in contributionMap) {
              contributionMap[day] = (contributionMap[day] || 0) + 1;
            }
          });
        }

        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalStars,
          topLanguages,
          recentRepos,
          contributionMap,
        });
      } catch (err) {
        console.error("GitHub API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    if (!stats || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.querySelectorAll(".github-card"),
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
    }, sectionRef);
    return () => ctx.revert();
  }, [stats]);

  const totalLangCount = stats?.topLanguages.reduce((s, l) => s + l.count, 0) || 1;

  return (
    <section id="github" ref={sectionRef} className="relative py-24 md:py-32 px-6">
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-6 gradient-border min-h-[200px] animate-pulse ${i === 3 ? "md:col-span-2 lg:col-span-3" : ""}`}
              />
            ))}
          </div>
        ) : stats ? (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Overview Card */}
            <div
              className="github-card glass rounded-2xl p-6 gradient-border group hover:scale-[1.02] transition-transform duration-500"
              style={{ boxShadow: "0 0 25px hsl(var(--primary) / 0.12), 0 0 60px hsl(var(--primary) / 0.05)" }}
            >
              <h3 className="text-lg font-light mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M12 20V10M18 20V4M6 20v-4" />
                </svg>
                <span className="gradient-text font-medium">Stats Overview</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Repositories", value: stats.publicRepos, icon: "📦" },
                  { label: "Total Stars", value: stats.totalStars, icon: "⭐" },
                  { label: "Followers", value: stats.followers, icon: "👥" },
                  { label: "Following", value: stats.following, icon: "➡️" },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary/40 rounded-xl p-4 text-center border border-border/30 hover:border-primary/30 transition-colors duration-300">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-2xl font-semibold text-foreground glow-text">{item.value}</div>
                    <div className="text-xs text-muted-foreground font-light mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Languages Card */}
            <div
              className="github-card glass rounded-2xl p-6 gradient-border group hover:scale-[1.02] transition-transform duration-500"
              style={{ boxShadow: "0 0 25px hsl(var(--accent) / 0.12), 0 0 60px hsl(var(--accent) / 0.05)" }}
            >
              <h3 className="text-lg font-light mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
                <span className="gradient-text font-medium">Top Languages</span>
              </h3>

              {/* Language bar */}
              <div className="flex h-3 rounded-full overflow-hidden mb-5 border border-border/30">
                {stats.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(lang.count / totalLangCount) * 100}%`,
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${Math.round((lang.count / totalLangCount) * 100)}%`}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                      <span className="text-sm font-light text-foreground">{lang.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((lang.count / totalLangCount) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div
              className="github-card glass rounded-2xl p-6 gradient-border group hover:scale-[1.02] transition-transform duration-500"
              style={{ boxShadow: "0 0 25px hsl(var(--glow-warm) / 0.12), 0 0 60px hsl(var(--glow-warm) / 0.05)" }}
            >
              <h3 className="text-lg font-light mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span className="gradient-text font-medium">Quick Links</span>
              </h3>

              <div className="space-y-3">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-secondary/40 rounded-xl p-4 border border-border/30 hover:border-primary/40 transition-all duration-300 group/link"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover/link:text-primary transition-colors">View Profile</div>
                    <div className="text-xs text-muted-foreground">@{GITHUB_USERNAME}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground ml-auto group-hover/link:text-primary transition-colors">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-secondary/40 rounded-xl p-4 border border-border/30 hover:border-accent/40 transition-all duration-300 group/link"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover/link:text-accent transition-colors">All Repositories</div>
                    <div className="text-xs text-muted-foreground">{stats.publicRepos} public repos</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground ml-auto group-hover/link:text-accent transition-colors">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contribution Graph — full width */}
            <div
              className="github-card glass rounded-2xl p-6 gradient-border group md:col-span-2 lg:col-span-3 hover:scale-[1.01] transition-transform duration-500"
              style={{ boxShadow: "0 0 25px hsl(var(--primary) / 0.1), 0 0 60px hsl(var(--accent) / 0.05)" }}
            >
              <h3 className="text-lg font-light mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 3v18" />
                </svg>
                <span className="gradient-text font-medium">Contribution Graph</span>
              </h3>
              <ContributionGraph data={stats.contributionMap} />
            </div>

            {/* Recent Repositories — full width */}
            <div
              className="github-card glass rounded-2xl p-6 gradient-border group md:col-span-2 lg:col-span-3 hover:scale-[1.01] transition-transform duration-500"
              style={{ boxShadow: "0 0 25px hsl(var(--primary) / 0.1), 0 0 60px hsl(var(--accent) / 0.05)" }}
            >
              <h3 className="text-lg font-light mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="gradient-text font-medium">Recent Repositories</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.recentRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary/40 rounded-xl p-4 border border-border/30 hover:border-primary/40 transition-all duration-300 group/repo block"
                  >
                    <div className="text-sm font-medium text-foreground group-hover/repo:text-primary transition-colors mb-2 truncate">
                      {repo.name}
                    </div>
                    <p className="text-xs text-muted-foreground font-light mb-3 line-clamp-2 min-h-[2rem]">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || "#8b5cf6" }} />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">⭐ {repo.stars}</span>
                      <span className="flex items-center gap-1">🍴 {repo.forks}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Unable to load GitHub data.</p>
        )}
      </div>
    </section>
  );
};

export default GitHubActivitySection;
