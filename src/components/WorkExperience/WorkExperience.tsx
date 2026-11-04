'use client'
import Reveal from '@/components/motion/Reveal';
// Focus areas from the GitHub profile. Swap in real job history (company, dates, role) when available.
const experiences = [
  {
    company: "Modern Frameworks",
    period: "Next.js · Nuxt · SvelteKit",
    position: "Server-rendered & static sites",
    description: "Building production web applications across the React, Vue and Svelte ecosystems, using server rendering and static generation for fast, SEO-friendly pages."
  },
  {
    company: "Headless CMS",
    period: "Sanity · Strapi · Storyblok · Builder.io",
    position: "Content modelling & visual editing",
    description: "Integrating headless CMS platforms with content modelling, visual editing and live previews, so content teams can ship pages without waiting on developers."
  },
  {
    company: "Performance",
    period: "Core Web Vitals · Lighthouse",
    position: "Fast, accessible frontends",
    description: "Code splitting, lazy loading, image and bundle optimisation. Analysing Lighthouse and Core Web Vitals reports to find bottlenecks and apply targeted fixes."
  },
  {
    company: "Component Libraries",
    period: "TypeScript · Tailwind CSS · Radix UI",
    position: "Type-safe, reusable UI",
    description: "Turning designs into maintainable, component-driven frontends with type-safe, reusable component libraries."
  },
  {
    company: "AI & LLM Apps",
    period: "Claude · ChatGPT · LLM APIs",
    position: "AI-assisted development",
    description: "Integrating LLM APIs into React and Next.js apps, building chat interfaces and content generation features, and using AI for scaffolding, code review, refactoring and documentation."
  }
];

const WorkExperience = () => {
  return (
    <div className="bg-background py-12 md:py-[152px] px-4 sm:px-6 lg:px-8 w-full max-w-[1440px] mx-auto">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground">
            What I <span style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Work On
            </span>
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} variant="flip" delay={index * 90} className="group relative flex flex-col md:flex-row gap-4 md:gap-8 py-5 md:py-6 border-b border-border last:border-b-0 rounded-xl md:px-4 hover:bg-[#F2F4F7] transition-colors duration-300">
              {/* Left Content */}
              <div className="w-full md:w-1/2 pr-0 md:pr-8">
                <h3 className="font-bruno-ace font-normal text-xl sm:text-2xl md:text-[32px] leading-[130%] tracking-0 text-[#00070E] mb-1 transition-colors duration-300 group-hover:text-[#4C7DFE]">
                  {experience.company}
                </h3>
                <p className="text-muted-foreground" style={{ color: 'rgba(152, 162, 179, 1)', fontFamily: 'Bruno Ace', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '140%', letterSpacing: '0%' }}>
                  {experience.period}
                </p>
              </div>
              
              {/* Right Content */}
              <div className="w-full md:w-1/2 pl-0 md:pl-8">
                <h4 className="font-bruno-ace font-normal text-primary text-lg sm:text-xl md:text-[24px] leading-[140%] tracking-0 mb-2">
                  {experience.position}
                </h4>
                <p className="text-muted-foreground" style={{ fontFamily:  "Plus Jakarta Sans, sans-serif" , fontWeight: 400, fontStyle: 'normal', fontSize: '14px', lineHeight: '150%', letterSpacing: '0%' }}>
                  {experience.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
