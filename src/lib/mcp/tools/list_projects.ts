import { defineTool } from "@lovable.dev/mcp-js";

const projects = [
  {
    title: "Samudra AI",
    description:
      "Integrated web platform for the Indian marine community providing real-time ocean data, safety alerts, SOS features, and AI-powered insights for fishermen and marine researchers.",
    tags: ["HTML", "CSS3", "TypeScript"],
    link: "https://samudra-india.vercel.app/",
  },
  {
    title: "Care4Elder – Elder's Assistant App",
    description:
      "A compassionate support initiative providing care, assistance, and well-being services for senior citizens.",
    tags: ["CSS3", "TypeScript", "API"],
    link: "https://care4elders-phi.vercel.app/",
  },
  {
    title: "3D Portfolio",
    description: "Creative developer portfolio with immersive 3D elements.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "To-Do App",
    description:
      "Full-stack task management application with authentication, CRUD operations, and a sleek dark-themed UI.",
    tags: ["Go", "Gin", "PostgreSQL", "JWT Auth"],
  },
  {
    title: "Animation Portfolio",
    description: "Web animation toolkit showcase with smooth interactions.",
    tags: ["GSAP", "Spline", "React"],
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "Lists Rugved's featured portfolio projects with descriptions, tech tags, and live links when available.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
