import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Returns Rugved Narkar's public portfolio profile: name, focus, bio, and location.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = {
      name: "Rugved Narkar",
      title: "Go Backend Developer & Frontend Engineer",
      bio: "Specializes in frontend development, crafting dynamic, visually engaging, and highly responsive websites. Strong foundation in HTML, CSS, JavaScript with expertise in Golang, MongoDB, and Spline for interactive, immersive experiences.",
      email: "narkarrugved100@gmail.com",
      github: "https://github.com/Rugved-dev18",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: profile,
    };
  },
});
