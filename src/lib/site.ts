// One place for the facts that search engines and link previews read.

// Set NEXT_PUBLIC_SITE_URL in Vercel if the site moves to a custom domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-rajat-sha7s-projects.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Rajat Sharma",
  jobTitle: "Fullstack AI Developer",
  title: "Rajat Sharma | Fullstack AI Developer – React & Next.js",
  description:
    "Senior fullstack AI developer with 4+ years' experience building fast, accessible, SEO-friendly web apps with React, Next.js, SvelteKit and headless CMS.",
  country: "IN",
  linkedin: "https://www.linkedin.com/in/rajat-sharma-93175b199/",
  github: "https://github.com/rajat-sha7",
  skills: [
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt",
    "SvelteKit",
    "TypeScript",
    "Tailwind CSS",
    "Headless CMS",
    "Sanity",
    "Strapi",
    "Storyblok",
    "Builder.io",
    "Core Web Vitals",
    "Web accessibility",
    "LLM integration",
    "AI-assisted development",
  ],
} as const;
