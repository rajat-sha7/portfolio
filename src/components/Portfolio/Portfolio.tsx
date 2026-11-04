'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Tilt from '@/components/motion/Tilt';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  stack: string;
  category: string;
  image: string;
  demo: string;
  repo: string;
}

const portfolioItems: PortfolioItem[] = [
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
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Property listing website with animated UI',
    stack: 'Next.js · Tailwind CSS · Framer Motion',
    category: 'nextjs',
    image: '/projects/realestate.webp',
    demo: 'https://real-estate-pearl-xi.vercel.app',
    repo: 'https://github.com/rajat-sha7/Real_Estate'
  },
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Compound-interest returns calculator',
    stack: 'Next.js · Tailwind CSS',
    category: 'nextjs',
    image: '/projects/investment.webp',
    demo: 'https://investment-calculator-ten-coral.vercel.app',
    repo: 'https://github.com/rajat-sha7/InvestmentCalculator'
  },
  {
    id: 'gym',
    title: 'Fit Club Gym Website',
    description: 'Gym website with animated sections',
    stack: 'React · Framer Motion',
    category: 'react',
    image: '/projects/gym.webp',
    demo: 'https://gym-website-41s.pages.dev',
    repo: 'https://github.com/rajat-sha7/gym-website'
  },
  {
    id: 'ourhome',
    title: 'OurHome',
    description: 'Home and property website',
    stack: 'React · Vite · Tailwind CSS',
    category: 'react',
    image: '/projects/ourhome.webp',
    demo: 'https://our-home-seven.vercel.app',
    repo: 'https://github.com/rajat-sha7/our-home'
  }
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'react', label: 'React' }
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div id="resume" className="bg-background py-12 md:py-[152px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] px-4 md:px-5 mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Reveal as="h2" className="text-3xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground mb-4 md:mb-6 text-left">
            Let&apos;s have a look at my{' '}
            <span className="bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] text-transparent bg-clip-text">Projects</span>
          </Reveal>
          
          {/* Navigation: one scrollable row on small screens, wraps on larger */}
          <div className="-mx-4 px-4 md:mx-0 md:px-0 pb-6 md:pb-[52px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex md:flex-wrap justify-start gap-2 sm:gap-4 w-max md:w-auto">
              {categories.map((category) => {
                const active = activeCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant="ghost"
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={active}
                    className={`font-bruno-ace font-normal shrink-0 h-11 md:h-[58px] px-5 md:px-8 min-w-[120px] md:min-w-[180px] lg:min-w-[229px] rounded-full text-sm md:text-[18px] lg:text-[20px] leading-[140%] transition-all duration-300 ${
                      active
                        ? "bg-[linear-gradient(180deg,rgba(76,125,254,0.32)_0%,rgba(0,25,89,0.32)_100%)] hover:bg-[linear-gradient(180deg,rgba(76,125,254,0.4)_0%,rgba(0,25,89,0.4)_100%)]"
                        : "bg-[#F0F0F0] text-portfolio-nav hover:bg-portfolio-card-hover hover:text-portfolio-nav-active"
                    }`}
                  >
                    <span className={active ? "bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] text-transparent bg-clip-text" : ""}>
                      {category.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item, i) => (
            <Tilt key={`${activeCategory}-${item.id}`} max={6} style={{ animationDelay: `${i * 70}ms` }} className="animate-fade-up rounded-xl">
            <Card
              className="group relative h-full overflow-hidden border-border p-2 md:p-4 transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#4C7DFE]/20"
            >
              <div className="aspect-video overflow-hidden rounded-[8px] bg-muted">
                <Image
                  src={item.image}
                  alt={`${item.title} screenshot`}
                  width={1192}
                  height={702}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 pb-2 md:px-5 md:pb-3 space-y-2">
                <h3 className="font-bruno-ace font-normal text-foreground text-lg md:text-[24px] leading-[140%] tracking-0">
                  {/* Stretched link: the whole card opens the live demo */}
                  <a href={item.demo} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                    {item.title}
                  </a>
                </h3>
                <p className="font-plus-jakarta text-sm md:text-[16px] text-muted-foreground leading-[150%]">{item.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="font-plus-jakarta text-xs md:text-sm text-[#4C7DFE]">{item.stack}</span>
                  <a href={item.repo} target="_blank" rel="noopener noreferrer" className="relative z-10 font-plus-jakarta text-xs md:text-sm text-foreground underline underline-offset-4 hover:text-[#4C7DFE] transition-colors">
                    View code
                  </a>
                </div>
              </div>
            </Card>
            </Tilt>
          ))}
          {filteredItems.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12 font-plus-jakarta">
              Projects in this category are coming soon.
            </p>
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Button asChild className="font-bruno-ace font-normal bg-gradient-to-b from-[#4C7DFE] to-[#001959] w-[180px] md:w-[242px] h-12 md:h-[64px] rounded-[50px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href="#contact" className="text-sm md:text-[16px] leading-[150%] text-white">Hire me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};