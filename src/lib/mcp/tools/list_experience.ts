import { defineTool } from "@lovable.dev/mcp-js";

const experience = [
  {
    role: "Open Source Contributor",
    organization: "Open Source Connect India",
    duration: "Dec 2025 – Present",
    description:
      "Contributed to the Various DevTools project, fixing accessibility bugs and improving the network inspector UI.",
    tags: ["JavaScript", "CSS", "Git", "Open Source"],
  },
  {
    role: "Campus Ambassador Intern",
    organization: "IIT Bombay - Techfest",
    duration: "Jul 2025 – Nov 2025",
    description:
      "Represented IIT Bombay's Techfest on campus through outreach campaigns, engagement drives, and registrations.",
    tags: ["HTML", "CSS", "JavaScript", "Adobe Photoshop"],
  },
  {
    role: "Marketing Intern",
    organization: "Eduveda Academy",
    duration: "Jun 2025 – Jul 2025",
    description:
      "Contributed to digital marketing campaigns, content creation, social media management, and campaign analysis.",
    tags: ["Sales", "Advertising", "Student Services"],
  },
];

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "Lists Rugved's professional experience: roles, organizations, durations, and highlights.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
    structuredContent: { experience },
  }),
});
