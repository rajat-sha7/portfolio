// Projects shown on the site. Also used for the search-engine structured data.
export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string;
  category: string;
  image: string;
  demo?: string; // live site; left out for client projects so the client stays private
  repo?: string; // client projects have no public code
  overview?: string; // longer text for the project's own page (personal projects only)
}

export const projects: Project[] = [
  {
    id: 'servicehub',
    title: 'ServiceHub',
    description: 'Marketing website for a leading field service management software',
    stack: 'SvelteKit · Sanity CMS · Vercel',
    category: 'sveltekit',
    image: '/projects/fieldpulse.webp'
  },
  {
    id: 'threadcraft',
    title: 'ThreadCraft',
    description: 'E-commerce site for custom T-shirt printing and embroidery',
    stack: 'Next.js · Sanity CMS · Vercel',
    category: 'nextjs',
    image: '/projects/alamotees.webp'
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

// Client projects show under a made-up name with no link to the real site;
// their cards point visitors to the contact section instead.
// Only personal projects (public code and a live demo) get their own page.
type CaseStudy = Project & { repo: string; demo: string };

export const isClientProject = (p: Project) => !p.repo;
export const caseStudies = projects.filter((p): p is CaseStudy => !!p.repo && !!p.demo);

export const getProject = (id: string) => caseStudies.find((p) => p.id === id);
