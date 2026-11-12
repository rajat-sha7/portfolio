"use client";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { SectionHeading, SpotlightCard, Stagger, RiseItem } from "@/components/motion/primitives";

const paragraphs = [
  "Hello! I'm Rajat Sharma, a fullstack AI developer with 4 years of experience building production web applications across the React, Vue and Svelte ecosystems. I specialise in fast, accessible, SEO-friendly sites powered by headless CMS platforms like Sanity, Strapi, Storyblok and Builder.io.",
  "I turn designs into maintainable, component-driven frontends with TypeScript and Tailwind CSS, keep a close eye on Core Web Vitals, and use AI tools like Claude and ChatGPT to ship faster, while keeping full ownership of architecture and quality.",
];

const tools = ["React", "Next.js", "Vue", "Nuxt", "SvelteKit", "TypeScript", "Tailwind CSS", "Sanity", "Strapi", "Storyblok", "Builder.io"];

const total = paragraphs.reduce((n, p) => n + p.split(" ").length, 0);

// One word of the text; it brightens when the scroll reaches its position
const ScrollWord = ({ text, index, progress, still }: { text: string; index: number; progress: MotionValue<number>; still: boolean }) => {
  const opacity = useTransform(progress, [index / total, Math.min(1, (index + 3) / total)], still ? [1, 1] : [0.22, 1]);
  return <motion.span style={{ opacity }}>{text} </motion.span>;
};

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  // Card grows to full size as it enters, then the text lights up word by word
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.5"] });
  const scale = useTransform(enter, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  const { scrollYProgress: read } = useScroll({ target: ref, offset: ["start 0.75", "end 0.7"] });

  let wordIndex = 0;

  return (
    <div className="px-5">
      <motion.section
        ref={ref}
        id="about"
        style={{ scale }}
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[16px] bg-[#00070E] text-white will-change-transform md:rounded-[28px]"
      >
        {/* Glow and grid inside the dark card */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] -top-[40%] h-[90%] w-[50%] rounded-full bg-[#4C7DFE]/30 blur-[120px] animate-aurora" />
          <div className="absolute -bottom-[45%] -right-[10%] h-[90%] w-[50%] rounded-full bg-[#1E3FAE]/40 blur-[120px] animate-aurora [animation-delay:-9s]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_75%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8EAAFF]/70 to-transparent" />
        </div>

        <SpotlightCard glow="rgba(142,170,255,0.12)" className="rounded-[inherit] px-5 py-12 sm:px-10 sm:py-16 md:px-[74px] md:py-24">
          <div className="relative mx-auto max-w-[980px]">
            <SectionHeading eyebrow="Who I am" tone="dark" parts={[{ text: "About" }, { text: "Me", accent: true }]} />

            <div className="mt-8 space-y-6 text-center font-plus-jakarta text-base font-medium leading-[1.6] sm:text-xl md:mt-12 md:text-2xl md:leading-[1.55]">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>
                  {p.split(" ").map((w) => {
                    const i = wordIndex++;
                    return <ScrollWord key={i} text={w} index={i} progress={read} still={reduce} />;
                  })}
                </p>
              ))}
            </div>

            <Stagger gap={0.05} delay={0.2} className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:mt-14">
              {tools.map((t) => (
                <RiseItem key={t}>
                  <span className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-plus-jakarta text-xs font-semibold text-[#DCE5FF] backdrop-blur-sm transition-colors duration-300 hover:border-[#8EAAFF] hover:bg-[#4C7DFE]/25 sm:px-4 sm:py-2 sm:text-sm">
                    {t}
                  </span>
                </RiseItem>
              ))}
            </Stagger>
          </div>
        </SpotlightCard>
      </motion.section>
    </div>
  );
};

export default About;
