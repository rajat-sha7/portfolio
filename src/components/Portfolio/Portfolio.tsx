'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { ease, Rise, SectionHeading, SpotlightCard } from '@/components/motion/primitives';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  stack: string;
  category: string;
  image: string;
  demo: string;
  repo?: string; // client projects have no public code
}

const portfolioItems: PortfolioItem[] = [
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

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'sveltekit', label: 'SvelteKit' }
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="resume" className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 md:py-[120px] lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            parts={[{ text: "Let's have a look at my" }, { text: 'Projects', accent: true }]}
            className="max-w-[760px]"
          />

          {/* Filter: the dark pill slides to whichever tab is active */}
          <Rise delay={0.2} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-1 rounded-full border border-[#E4E7EC] bg-[#F2F4F7] p-1.5">
              {categories.map((category) => {
                const active = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={active}
                    className={`relative shrink-0 rounded-full px-5 py-2.5 font-plus-jakarta text-sm font-bold transition-colors duration-300 md:px-7 md:py-3 md:text-base ${
                      active ? 'text-white' : 'text-[#475467] hover:text-[#00070E]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#001959] shadow-[0_10px_24px_-10px_rgba(76,125,254,0.9)]"
                      />
                    )}
                    <span className="relative">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </Rise>
        </div>

        {/* Cards glide to their new places when the filter changes */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease, delay: (i % 2) * 0.12, layout: { type: 'spring', stiffness: 260, damping: 30 } }}
              >
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="h-full">
                  <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-[#E4E7EC] bg-white p-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-500 hover:border-[#4C7DFE]/50 hover:shadow-[0_40px_70px_-35px_rgba(76,125,254,0.55)] md:p-3.5">
                    {/* Screenshot in a browser-style frame */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-[#F2F4F7]">
                      <div className="flex items-center gap-1.5 border-b border-[#E4E7EC] bg-white px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                        <span className="ml-2 truncate rounded-full bg-[#F2F4F7] px-3 py-0.5 font-plus-jakarta text-[10px] text-[#667085] md:text-xs">
                          {new URL(item.demo).host.replace(/^www\./, '')}
                        </span>
                      </div>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`${item.title} screenshot`}
                          width={1192}
                          height={702}
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/spot:scale-[1.06]"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-[#001959]/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100">
                          <span className="flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 font-plus-jakarta text-xs font-bold text-[#001959] transition-transform duration-500 group-hover/spot:translate-y-0 md:text-sm">
                            Visit site <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative px-3 pb-3 pt-5 md:px-4 md:pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bruno-ace text-lg font-normal leading-[1.3] text-[#00070E] md:text-2xl">
                          {/* Stretched link: the whole card opens the live site */}
                          <a href={item.demo} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                            {item.title}
                          </a>
                        </h3>
                        {item.repo ? (
                          <a
                            href={item.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E4E7EC] px-3 py-1.5 font-plus-jakarta text-xs font-bold text-[#344054] transition-colors duration-300 hover:border-[#4C7DFE] hover:text-[#4C7DFE]"
                          >
                            <Github className="h-3.5 w-3.5" /> Code
                          </a>
                        ) : (
                          <span className="shrink-0 rounded-full bg-[#4C7DFE]/10 px-3 py-1.5 font-plus-jakarta text-xs font-bold text-[#1E3FAE]">
                            Client project
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-plus-jakarta text-sm leading-[1.6] text-[#475467] md:text-base">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.stack.split(' · ').map((tech) => (
                          <span key={tech} className="rounded-full bg-[#F2F4F7] px-3 py-1 font-plus-jakarta text-xs font-semibold text-[#344054] transition-colors duration-300 group-hover/spot:bg-[#4C7DFE]/10 group-hover/spot:text-[#1E3FAE]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <p className="col-span-full py-12 text-center font-plus-jakarta text-muted-foreground">
              Projects in this category are coming soon.
            </p>
          )}
        </div>

        <Rise className="mt-10 flex justify-center md:mt-14">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <Link
              href="#contact"
              className="relative inline-flex h-12 items-center overflow-hidden rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#1E3FAE] px-10 font-plus-jakarta text-sm font-bold text-white shadow-[0_14px_34px_-12px_rgba(76,125,254,0.9)] md:h-14 md:px-12 md:text-base"
            >
              <span className="relative z-10">Hire me</span>
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sheen" />
            </Link>
          </motion.div>
        </Rise>
      </div>
    </section>
  );
};
