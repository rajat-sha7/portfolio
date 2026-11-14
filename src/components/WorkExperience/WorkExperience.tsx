'use client'
import { motion } from 'motion/react';
import { Blocks, Database, Gauge, Layers, Sparkles, type LucideIcon } from 'lucide-react';
import { rise, SectionHeading, SpotlightCard, stagger, viewport } from '@/components/motion/primitives';

// Focus areas from the GitHub profile. Swap in real job history (company, dates, role) when available.
const areas: { title: string; tags: string[]; subtitle: string; description: string; icon: LucideIcon; span: string }[] = [
  {
    title: "Modern Frameworks",
    tags: ["Next.js", "Nuxt", "SvelteKit"],
    subtitle: "Server-rendered & static sites",
    description: "Building production web applications across the React, Vue and Svelte ecosystems, using server rendering and static generation for fast, SEO-friendly pages.",
    icon: Layers,
    span: "lg:col-span-3",
  },
  {
    title: "Headless CMS",
    tags: ["Sanity", "Strapi", "Storyblok", "Builder.io"],
    subtitle: "Content modelling & visual editing",
    description: "Integrating headless CMS platforms with content modelling, visual editing and live previews, so content teams can ship pages without waiting on developers.",
    icon: Database,
    span: "lg:col-span-3",
  },
  {
    title: "Performance",
    tags: ["Core Web Vitals", "Lighthouse"],
    subtitle: "Fast, accessible frontends",
    description: "Code splitting, lazy loading, image and bundle optimisation. Analysing Lighthouse and Core Web Vitals reports to find bottlenecks and apply targeted fixes.",
    icon: Gauge,
    span: "lg:col-span-2",
  },
  {
    title: "Component Libraries",
    tags: ["TypeScript", "Tailwind CSS", "Radix UI"],
    subtitle: "Type-safe, reusable UI",
    description: "Turning designs into maintainable, component-driven frontends with type-safe, reusable component libraries.",
    icon: Blocks,
    span: "lg:col-span-2",
  },
  {
    title: "AI & LLM Apps",
    tags: ["Claude", "ChatGPT", "LLM APIs"],
    subtitle: "AI-assisted development",
    description: "Integrating LLM APIs into React and Next.js apps, building chat interfaces and content generation features, and using AI for scaffolding, code review, refactoring and documentation.",
    icon: Sparkles,
    span: "md:col-span-2 lg:col-span-2",
  },
];

const WorkExperience = () => {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-background px-4 py-16 sm:px-6 md:py-[120px] lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Expertise" parts={[{ text: "What I" }, { text: "Work On", accent: true }]} />

        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-6"
        >
          {areas.map((area, i) => (
            <motion.div key={area.title} variants={rise} className={area.span}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
                <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-500 hover:border-[#4C7DFE]/50 hover:shadow-[0_30px_60px_-30px_rgba(76,125,254,0.45)] md:p-8">
                  {/* Accent line that grows across the top on hover */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#4C7DFE] to-[#001959] transition-transform duration-500 ease-out group-hover/spot:scale-x-100" />

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#4C7DFE] to-[#001959] text-white shadow-[0_12px_24px_-10px_rgba(76,125,254,0.9)] transition-transform duration-500 group-hover/spot:-rotate-6 group-hover/spot:scale-110 md:h-14 md:w-14">
                      <area.icon className="h-6 w-6 md:h-7 md:w-7" />
                    </span>
                    <span className="font-bruno-ace text-3xl text-ghost transition-colors duration-500 group-hover/spot:text-[#4C7DFE]/40 md:text-4xl">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-bruno-ace text-xl font-normal leading-[1.25] text-ink md:text-2xl">
                    {area.title}
                  </h3>
                  <p className="relative mt-1 font-plus-jakarta text-sm font-bold text-[#4C7DFE] md:text-base">{area.subtitle}</p>
                  <p className="relative mt-3 font-plus-jakarta text-sm leading-[1.65] text-body-soft">{area.description}</p>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-surface-muted px-3 py-1 font-plus-jakarta text-xs font-semibold text-body transition-colors duration-300 group-hover/spot:bg-[#4C7DFE]/10 group-hover/spot:text-accent-ink">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
