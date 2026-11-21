// One place for the facts that search engines and link previews read.

// Set NEXT_PUBLIC_SITE_URL in Vercel if the site moves to a custom domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rajat-sharma-dev.vercel.app").replace(/\/$/, "");

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
  // Used by llms.txt, llms-full.txt and the structured data. Keep in step with the About section.
  experienceYears: 4,
  bio: [
    "Rajat Sharma is a fullstack AI developer with 4+ years of experience building production web applications across the React, Vue and Svelte ecosystems. He specialises in fast, accessible, SEO-friendly sites powered by headless CMS platforms like Sanity, Strapi, Storyblok and Builder.io.",
    "He turns designs into maintainable, component-driven frontends with TypeScript and Tailwind CSS, keeps a close eye on Core Web Vitals, and uses AI tools like Claude and ChatGPT to ship faster, while keeping full ownership of architecture and quality.",
  ],
  // What he offers, from the Experience section
  services: [
    {
      name: "Modern framework development",
      description:
        "Production web applications with React, Next.js, Vue, Nuxt and SvelteKit, using server rendering and static generation for fast, SEO-friendly pages.",
    },
    {
      name: "Headless CMS integration",
      description:
        "Sanity, Strapi, Storyblok and Builder.io integrations with content modelling, visual editing and live previews, so content teams can ship pages without waiting on developers.",
    },
    {
      name: "Core Web Vitals and performance optimisation",
      description:
        "Code splitting, lazy loading, image and bundle optimisation, guided by Lighthouse and Core Web Vitals reports.",
    },
    {
      name: "Component libraries",
      description: "Type-safe, reusable, component-driven UI built with TypeScript and Tailwind CSS from designs.",
    },
    {
      name: "AI and LLM app development",
      description:
        "LLM API integrations in React and Next.js apps, chat interfaces and content generation features, plus AI-assisted scaffolding, code review, refactoring and documentation.",
    },
  ],
  highlights: ["4+ years of experience", "25+ projects on GitHub", "10+ live deployments"],
} as const;
