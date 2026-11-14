'use client'
import { motion } from 'motion/react';
import { Briefcase, FolderGit2, Rocket, type LucideIcon } from 'lucide-react';
import CountUp from '@/components/motion/CountUp';
import { ease, rise, Rise, SectionHeading, SpotlightCard, stagger, viewport } from '@/components/motion/primitives';

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '4+', label: 'Years of Experience', icon: Briefcase },
  { value: '25+', label: 'Projects on GitHub', icon: FolderGit2 },
  { value: '10+', label: 'Live Deployments', icon: Rocket },
];

const reasons = [
  'Fast, accessible, SEO-friendly builds',
  'Headless CMS with visual editing and previews',
  'Clean, maintainable component architecture',
  'AI-assisted workflows that speed up delivery',
];

const gradientNumber = 'bg-clip-text text-transparent bg-gradient-to-b from-grad-start to-grad-end';

const WhyHireMe = () => {
  return (
    <section className="relative overflow-hidden bg-surface-muted px-4 py-16 sm:px-6 md:py-[120px] lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[8%] top-[10%] h-[70%] w-[40%] rounded-full bg-[#4C7DFE]/15 blur-[120px] animate-aurora" />
        <div className="absolute -right-[8%] bottom-[0%] h-[70%] w-[40%] rounded-full bg-[#8EAAFF]/25 blur-[120px] animate-aurora [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div>
          <SectionHeading align="left" eyebrow="Why me" parts={[{ text: 'Why' }, { text: 'Hire Me?', accent: true }]} />

          <Rise delay={0.2}>
            <p className="mt-5 font-plus-jakarta text-sm leading-[1.7] text-body sm:text-base">
              I build fast, accessible frontends that are easy for teams to maintain and for content editors to use. From server-rendered Next.js and Nuxt apps to headless CMS integrations with visual editing and previews, I care about Core Web Vitals, clean component architecture and shipping quickly, with AI-assisted workflows that speed up delivery without cutting corners.
            </p>
          </Rise>

          <motion.ul variants={stagger(0.12, 0.35)} initial="hidden" whileInView="show" viewport={viewport} className="mt-7 space-y-3">
            {reasons.map((reason) => (
              <motion.li key={reason} variants={rise} className="flex items-center gap-3 font-plus-jakarta text-sm font-semibold text-ink sm:text-base">
                {/* Tick draws itself */}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#001959]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6, ease, delay: 0.3 } } }}
                    />
                  </svg>
                </span>
                {reason}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Numbers */}
        <motion.div variants={stagger(0.14, 0.2)} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-2 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={rise} className={i === 0 ? 'col-span-2' : ''}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="h-full">
                <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-white bg-surface/90 dark:border-white/10 p-6 shadow-[0_24px_60px_-34px_rgba(0,25,89,0.45)] md:p-8">
                  {i === 0 && (
                    // Decorative rings turning slowly in the corner of the large card
                    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 md:h-64 md:w-64">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#4C7DFE]/30 animate-orbit [animation-duration:40s]" />
                      <div className="absolute inset-8 rounded-full border border-[#4C7DFE]/25" />
                      <div className="absolute inset-16 rounded-full bg-[#4C7DFE]/15 blur-xl animate-glow" />
                    </div>
                  )}
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-[#4C7DFE] to-[#001959] text-white shadow-[0_12px_24px_-10px_rgba(76,125,254,0.9)] transition-transform duration-500 group-hover/spot:-rotate-6 group-hover/spot:scale-110">
                    <stat.icon className="h-5 w-5" />
                  </span>
                  <div className={`relative mt-5 font-bruno-ace font-normal leading-none ${gradientNumber} ${i === 0 ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
                    <CountUp value={stat.value} />
                  </div>
                  <div className="relative mt-2 font-plus-jakarta text-sm font-semibold text-body md:text-base">{stat.label}</div>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHireMe;
