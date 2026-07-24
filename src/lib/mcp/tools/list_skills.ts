import { defineTool } from "@lovable.dev/mcp-js";

const skills = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "Go", "MongoDB", "MySQL",
  "Git", "GitHub", "Bash", "VS Code", "Figma", "Photoshop", "Hugging Face",
  "Vercel", "Firebase", "Markdown", "PowerShell",
];

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description: "Lists Rugved's technical skills and tools.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(skills, null, 2) }],
    structuredContent: { skills },
  }),
});
