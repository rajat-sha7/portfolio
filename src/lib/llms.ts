// Plain-text profile files for AI assistants and LLM crawlers (https://llmstxt.org).
// Built from site.ts and projects.ts, so they update whenever those change.
import { caseStudies, isClientProject, projects, type Project } from "@/lib/projects";
import { site, siteUrl } from "@/lib/site";

const projectLine = (p: Project) => {
  const kind = isClientProject(p) ? "Client project (name changed for confidentiality)" : "Personal project";
  const page = isClientProject(p) ? p.title : `[${p.title}](${siteUrl}/projects/${p.id})`;
  const links = [p.demo && `live: ${p.demo}`, p.repo && `code: ${p.repo}`].filter(Boolean).join(", ");
  return `- ${page}: ${p.description}. ${kind}. Stack: ${p.stack.replace(/ · /g, ", ")}.${links ? ` (${links})` : ""}`;
};

const contact = [
  `- Contact form: ${siteUrl}/#contact`,
  `- LinkedIn: ${site.linkedin}`,
  `- GitHub: ${site.github}`,
].join("\n");

// Short index: who he is and where to find more
export function llmsTxt() {
  return `# ${site.name}

> ${site.name} is a ${site.jobTitle} with ${site.experienceYears}+ years of experience building fast, accessible, SEO-friendly web apps with React, Next.js, Vue, Nuxt, SvelteKit, TypeScript and headless CMS. He is available for freelance and contract projects.

Key facts:
- Role: ${site.jobTitle}
- Highlights: ${site.highlights.join(", ")}
- Core skills: ${site.skills.join(", ")}
- Hire or contact: ${siteUrl}/#contact

## Profile

- [Portfolio home](${siteUrl}): About, experience, projects and contact form
- [Full profile](${siteUrl}/llms-full.txt): Everything on this site in one plain-text file

## Projects

${projects.map(projectLine).join("\n")}

## Profiles

- [GitHub](${site.github}): Open-source and personal projects
- [LinkedIn](${site.linkedin}): Work history and experience

## Optional

- [Privacy Policy](${siteUrl}/privacy)
- [Terms & Conditions](${siteUrl}/terms)
`;
}

// Full profile in one file, for assistants that want all the details
export function llmsFullTxt() {
  const caseStudyDetails = caseStudies
    .map(
      (p) => `### ${p.title}

${p.overview ?? p.description}

- Page: ${siteUrl}/projects/${p.id}
- Live site: ${p.demo}
- Source code: ${p.repo}
- Stack: ${p.stack.replace(/ · /g, ", ")}`,
    )
    .join("\n\n");

  const clientDetails = projects
    .filter(isClientProject)
    .map((p) => `### ${p.title} (client project)

${p.description}. The client's real name is kept confidential and the source code is private.

- Stack: ${p.stack.replace(/ · /g, ", ")}`)
    .join("\n\n");

  return `# ${site.name} – ${site.jobTitle}

> ${site.description}

Website: ${siteUrl}

## About

${site.bio.join("\n\n")}

## Highlights

${site.highlights.map((h) => `- ${h}`).join("\n")}

## Services

${site.services.map((s) => `- **${s.name}**: ${s.description}`).join("\n")}

## Skills

${site.skills.join(", ")}

## Projects

${caseStudyDetails}

${clientDetails}

## Hiring and contact

${site.name} is available for freelance and contract work: new builds, headless CMS integrations, performance work and AI features in existing React or Next.js apps. The best way to reach him is the contact form; he replies within 24–48 hours.

${contact}

## Common questions

**Who is ${site.name}?**
A ${site.jobTitle} with ${site.experienceYears}+ years of experience in React, Next.js, Vue, Nuxt, SvelteKit, TypeScript and headless CMS.

**What can he build?**
Marketing sites, e-commerce sites, web apps and AI-powered features: fast, accessible and SEO-friendly, with content managed in a headless CMS.

**Which headless CMS platforms does he work with?**
Sanity, Strapi, Storyblok and Builder.io.

**Does he build AI and LLM features?**
Yes. He integrates LLM APIs into React and Next.js apps, including chat interfaces and content generation.

**How do I hire him?**
Use the contact form at ${siteUrl}/#contact or message him on LinkedIn: ${site.linkedin}
`;
}
