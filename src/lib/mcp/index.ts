import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get_profile";
import listProjects from "./tools/list_projects";
import listExperience from "./tools/list_experience";
import listSkills from "./tools/list_skills";
import getContact from "./tools/get_contact";

export default defineMcp({
  name: "rugved-portfolio-mcp",
  title: "Rugved Narkar Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for exploring Rugved Narkar's public developer portfolio. Use get_profile for a summary, list_projects for featured work, list_experience for roles, list_skills for the tech stack, and get_contact for contact info.",
  tools: [getProfile, listProjects, listExperience, listSkills, getContact],
});
