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
}

export const projects: Project[] = [
  {
    id: 'fieldpulse',
    title: 'FieldPulse',
    description: 'Marketing website for a leading field service management software',
    stack: 'SvelteKit · Sanity CMS · Vercel',
    category: 'sveltekit',
    image: '/projects/fieldpulse.webp',
    demo: 'https://www.fieldpulse.com/'
  },
  {
    id: 'alamotees',
    title: 'Alamo Tees',
    description: 'E-commerce site for custom T-shirt printing and embroidery',
    stack: 'Next.js · Sanity CMS · Vercel',
    category: 'nextjs',
    image: '/projects/alamotees.webp',
    demo: 'https://www.alamotees.com/'
  },
  {
    id: 'resymeforge',
    title: 'ResymeForge',
    description: 'Interactive resume builder with 3D visuals and PDF export',
    stack: 'Next.js · TypeScript · Three.js · GSAP · Zustand',
    category: 'nextjs',
    image: '/projects/resymeforge.webp',
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
    demo: 'https://dev-test-azure.vercel.app',
    repo: 'https://github.com/rajat-sha7/DevTest'
  }
];
