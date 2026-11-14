// Projects shown on the site. Also used for the search-engine structured data.
export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string;
  category: string;
  image: string;
  demo: string;
  repo?: string; // client projects have no public code
  overview: string; // longer text for the project's own page
}

export const projects: Project[] = [
  {
    id: 'fieldpulse',
    title: 'FieldPulse',
    description: 'Marketing website for a leading field service management software',
    stack: 'SvelteKit · Sanity CMS · Vercel',
    category: 'sveltekit',
    image: '/projects/fieldpulse.webp',
    overview:
      "A marketing website for FieldPulse, a leading field service management platform. Built as a fast, SEO-friendly SvelteKit site with content managed in Sanity, so the marketing team can publish and update pages without a developer. Delivered as a client project, so the source code is private.",
    demo: 'https://www.fieldpulse.com/'
  },
  {
    id: 'alamotees',
    title: 'Alamo Tees',
    description: 'E-commerce site for custom T-shirt printing and embroidery',
    stack: 'Next.js · Sanity CMS · Vercel',
    category: 'nextjs',
    image: '/projects/alamotees.webp',
    overview:
      "An e-commerce website for Alamo Tees, a custom T-shirt printing and embroidery business. Built with Next.js and a Sanity CMS so the team can manage products and content themselves, and deployed on Vercel. Delivered as a client project, so the source code is private.",
    demo: 'https://www.alamotees.com/'
  },
  {
    id: 'resymeforge',
    title: 'ResymeForge',
    description: 'Interactive resume builder with 3D visuals and PDF export',
    stack: 'Next.js · TypeScript · Three.js · GSAP · Zustand',
    category: 'nextjs',
    image: '/projects/resymeforge.webp',
    overview:
      "A resume builder with six templates built for different fields, plus a checker that flags what applicant tracking software will trip on as you write. Resumes export to PDF. This is a personal project and the code is public on GitHub.",
    demo: 'https://resyme-forge.vercel.app',
    repo: 'https://github.com/rajat-sha7/ResymeForge'
  },
  {
    id: 'devqna',
    title: 'DevQnA Prep',
    description: 'Interactive Q&A platform for coding-interview preparation',
    stack: 'Next.js · TypeScript · Tailwind CSS · Radix UI',
    category: 'nextjs',
    image: '/projects/devqna.webp',
    overview:
      "An interactive question-and-answer platform for coding-interview preparation. Built with Next.js, TypeScript, Tailwind CSS and Radix UI components. This is a personal project and the code is public on GitHub.",
    demo: 'https://dev-test-azure.vercel.app',
    repo: 'https://github.com/rajat-sha7/DevTest'
  }
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
