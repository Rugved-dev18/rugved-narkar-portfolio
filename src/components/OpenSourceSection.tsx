import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = "Rugved-dev18";

interface Contribution {
  type: "pr" | "issue" | "comment";
  repo: string;
  repoUrl: string;
  title: string;
  url: string;
  state: string;
  createdAt: string;
}

const typeConfig = {
  pr: { label: "Pull Request", icon: "🔀", badgeClass: "border-primary/30 text-primary" },
  issue: { label: "Issue", icon: "🐛", badgeClass: "border-accent/30 text-accent" },
  comment: { label: "Comment", icon: "💬", badgeClass: "border-muted-foreground/30 text-muted-foreground" },
};

const OpenSourceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Use GitHub Search API for accurate PR and issue data
        const [prsRes, issuesRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+-user:${GITHUB_USERNAME}&per_page=30&sort=created&order=desc`),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue+-user:${GITHUB_USERNAME}&per_page=30&sort=created&order=desc`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`).then(r => r.json()).catch(() => []),
        ]);

        const prsData = await prsRes.json();
        const issuesData = await issuesRes.json();

        const contribs: Contribution[] = [];
        const seen = new Set<string>();

        // Add PRs from search
        if (prsData.items && Array.isArray(prsData.items)) {
          prsData.items.forEach((pr: any) => {
            const repoUrl = pr.repository_url || "";
            const repoName = repoUrl.replace("https://api.github.com/repos/", "");
            const key = `pr-${pr.html_url}`;
            if (!seen.has(key)) {
              seen.add(key);
              contribs.push({
                type: "pr",
                repo: repoName,
                repoUrl: `https://github.com/${repoName}`,
                title: pr.title,
                url: pr.html_url,
                state: pr.pull_request?.merged_at ? "merged" : pr.state,
                createdAt: pr.created_at,
              });
            }
          });
        }

        // Add issues from search
        if (issuesData.items && Array.isArray(issuesData.items)) {
          issuesData.items.forEach((issue: any) => {
            const repoUrl = issue.repository_url || "";
            const repoName = repoUrl.replace("https://api.github.com/repos/", "");
            const key = `issue-${issue.html_url}`;
            if (!seen.has(key)) {
              seen.add(key);
              contribs.push({
                type: "issue",
                repo: repoName,
                repoUrl: `https://github.com/${repoName}`,
                title: issue.title,
                url: issue.html_url,
                state: issue.state,
                createdAt: issue.created_at,
              });
            }
          });
        }

        // Add comments from events API (search API doesn't cover comments)
        if (Array.isArray(eventsRes)) {
          eventsRes.forEach((e: any) => {
            if (!e || !e.repo) return;
            const isOwn = e.repo.name?.startsWith(`${GITHUB_USERNAME}/`);
            if (isOwn) return;

            if (e.type === "IssueCommentEvent" && e.payload?.comment) {
              const comment = e.payload.comment;
              const issue = e.payload.issue;
              const key = `comment-${comment.html_url}`;
              if (!seen.has(key)) {
                seen.add(key);
                contribs.push({
                  type: "comment",
                  repo: e.repo.name,
                  repoUrl: `https://github.com/${e.repo.name}`,
                  title: issue?.title || "Comment",
                  url: comment.html_url,
                  state: "commented",
                  createdAt: e.created_at,
                });
              }
            }
          });
        }

        // Sort by date
        contribs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setContributions(contribs);
      } catch (err) {
        console.error("Error fetching OS contributions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    if (loading || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.querySelectorAll(".os-card"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, contributions]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
  };

  // Group contributions by repo
  const repoGroups = contributions.reduce<Record<string, Contribution[]>>((acc, c) => {
    if (!acc[c.repo]) acc[c.repo] = [];
    acc[c.repo].push(c);
    return acc;
  }, {});

  return (
    <section id="opensource" ref={sectionRef} className="relative py-24 md:py-32 px-6">
      <div className="floating-orb-accent w-56 h-56 top-20 -right-10" />
      <div className="floating-orb w-40 h-40 bottom-20 -left-10" />
      <div className="section-divider absolute top-0 left-1/4 right-1/4" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2 text-center">
          Open Source <span className="gradient-text font-light">Contributions</span>
        </h2>
        <div className="w-12 h-[2px] bg-primary/50 mx-auto mb-4" />
        <p className="text-center text-muted-foreground font-light mb-12">
          My contributions to open-source projects and communities.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 gradient-border min-h-[200px] animate-pulse" />
            ))}
          </div>
        ) : contributions.length === 0 ? (
          <div className="glass rounded-2xl p-10 gradient-border text-center">
            <p className="text-muted-foreground font-light">
              No recent open-source contributions found via the public events API.
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="space-y-6">
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Projects", value: Object.keys(repoGroups).length, icon: "📂" },
                { label: "Pull Requests", value: contributions.filter((c) => c.type === "pr").length, icon: "🔀" },
                { label: "Issues", value: contributions.filter((c) => c.type === "issue").length, icon: "🐛" },
                { label: "Comments", value: contributions.filter((c) => c.type === "comment").length, icon: "💬" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="os-card glass rounded-xl p-4 gradient-border text-center hover:scale-[1.03] transition-transform duration-300"
                  style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.08)" }}
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-semibold text-foreground glow-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-light mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contributions by repo */}
            {(() => {
              const entries = Object.entries(repoGroups);
              const INITIAL_LIMIT = 2;
              const visibleEntries = expanded ? entries : entries.slice(0, INITIAL_LIMIT);
              const hasMore = entries.length > INITIAL_LIMIT;

              return (
                <>
                  {visibleEntries.map(([repo, items]) => {
                    const visibleItems = expanded ? items : items.slice(0, 3);
                    return (
                      <div
                        key={repo}
                        className="os-card glass rounded-2xl p-6 gradient-border hover:scale-[1.01] transition-transform duration-500"
                        style={{ boxShadow: "0 0 25px hsl(var(--primary) / 0.1), 0 0 60px hsl(var(--accent) / 0.05)" }}
                      >
                        <a
                          href={items[0].repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 mb-5 group/repo"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary shrink-0">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span className="text-lg font-medium text-foreground group-hover/repo:text-primary transition-colors">
                            {repo}
                          </span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground ml-1 group-hover/repo:text-primary transition-colors">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                          </svg>
                        </a>

                        <div className="space-y-3">
                          {visibleItems.map((item, idx) => {
                            const config = typeConfig[item.type];
                            return (
                              <a
                                key={idx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 bg-secondary/40 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-all duration-300 group/item block"
                              >
                                <span className="text-base mt-0.5 shrink-0">{config.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.badgeClass} font-light tracking-wider`}>
                                      {config.label}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/40 text-muted-foreground font-light capitalize">
                                      {item.state}
                                    </span>
                                  </div>
                                  <p className="text-sm text-foreground group-hover/item:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                  </p>
                                  <span className="text-[11px] text-muted-foreground font-light mt-1 block">
                                    {formatDate(item.createdAt)}
                                  </span>
                                </div>
                              </a>
                            );
                          })}
                          {!expanded && items.length > 3 && (
                            <p className="text-xs text-muted-foreground font-light text-center pt-1">
                              +{items.length - 3} more contributions
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {hasMore && (
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="px-6 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-light tracking-wider hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                        style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.1)" }}
                      >
                        {expanded ? "Show Less" : "See More"}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenSourceSection;
