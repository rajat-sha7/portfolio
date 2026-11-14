"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowUpRight, Briefcase, FolderGit2 } from "lucide-react";

// Slow, soft ease-out used for every hero animation
const ease = [0.16, 1, 0.3, 1] as const;

// The text, disc and photo enter with CSS animations (see globals.css) so they
// start at first paint instead of waiting for JavaScript. This sets each delay.
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

// Ring outlines draw themselves around the photo
const draw = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: "easeInOut", delay } },
});

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, delay } },
});

const pop = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 240, damping: 18, delay } },
});

const gradientText = "bg-clip-text text-transparent bg-gradient-to-b from-grad-start to-grad-end";

// Tech labels that travel around the outer ring
const orbitChips = [
  { label: "React", dot: "#61DAFB" },
  { label: "Next.js", dot: "var(--ink)" },
  { label: "Vue", dot: "#42B883" },
  { label: "SvelteKit", dot: "#FF3E00" },
  { label: "TypeScript", dot: "#3178C6" },
  { label: "Sanity", dot: "#F03E2F" },
].map((chip, i, all) => {
  const angle = (i / all.length) * Math.PI * 2 - Math.PI / 2;
  return {
    ...chip,
    left: `${(50 + 49 * Math.cos(angle)).toFixed(2)}%`,
    top: `${(50 + 49 * Math.sin(angle)).toFixed(2)}%`,
  };
});

const rotatingStack = ["React", "Next.js", "Vue & Nuxt", "SvelteKit", "TypeScript", "Headless CMS"];

// Splits text into words that animate in one after another.
// `start` is the position of the first word in the whole heading.
const Words = ({ text, start, className = "" }: { text: string; start: number; className?: string }) => (
  <>
    {text.split(" ").map((w, i) => (
      <Fragment key={i}>
        <span style={delay(+(0.3 + (start + i) * 0.09).toFixed(2))} className={`inline-block animate-word-in ${className}`}>
          {w}
        </span>{" "}
      </Fragment>
    ))}
  </>
);

// The word after "I build with" changes every couple of seconds.
// Kept in its own component so the timer re-renders only this word, not the whole hero.
const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((n) => (n + 1) % rotatingStack.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span aria-hidden className="inline-grid h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence initial={false}>
        <motion.span
          key={rotatingStack[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease }}
          className="[grid-area:1/1] justify-self-start whitespace-nowrap font-bold text-blue-accent"
        >
          {rotatingStack[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const reduce = useReducedMotion();

  // Mouse parallax: layers of the photo stage shift by different amounts for depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -10);
  const midX = useTransform(sx, (v) => v * 14);
  const midY = useTransform(sy, (v) => v * 14);
  const frontX = useTransform(sx, (v) => v * 34);
  const frontY = useTransform(sy, (v) => v * 34);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // On scroll the text drifts up and fades while the stage grows slightly
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, -90]);
  const textOpacity = useTransform(scrollY, [0, 520], reduce ? [1, 1] : [1, 0]);
  const stageScale = useTransform(scrollY, [0, 700], reduce ? [1, 1] : [1, 1.08]);
  const stageY = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, 40]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <MotionConfig reducedMotion="user">
      <section
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative w-full max-w-[1440px] mx-auto overflow-hidden bg-background"
      >
        {/* Background: a faint grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent),linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] [mask-composite:intersect]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(76,125,254,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,125,254,0.09)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_15%,transparent_75%)]" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-2 pb-16 pt-10 sm:px-6 md:pt-14 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16"
        >
          {/* Text column */}
          <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center lg:text-left will-change-transform">
            <div style={delay(0.1)} className="inline-flex animate-rise-in items-center gap-2.5 rounded-full border border-[#4C7DFE]/40 bg-surface px-4 py-2 shadow-[0_8px_30px_-12px_rgba(76,125,254,0.6)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-plus-jakarta text-xs font-semibold tracking-wide text-ink-navy sm:text-sm">
                Available for new projects
              </span>
            </div>

            <h1 className="mt-6 font-normal leading-[1.15] text-foreground text-[22px] min-[360px]:text-[24px] min-[390px]:text-[28px] sm:text-[40px] md:text-[46px] lg:text-[34px] xl:text-[46px]">
              <Words text="I'm" start={0} />
              <Words text="Rajat Sharma," start={1} className="text-blue-accent" />
              <br />
              <Words text="Fullstack AI" start={3} className={gradientText} />
              <br />
              <Words text="Developer" start={5} className={gradientText} />
            </h1>

            <p style={delay(0.95)} className="mt-5 animate-rise-in font-plus-jakarta text-base font-medium text-ink sm:text-lg">
              I build with{" "}
              <span className="sr-only">React, Next.js, Vue, Nuxt, SvelteKit, TypeScript and headless CMS.</span>
              <RotatingWord />
            </p>

            <p style={delay(1.05)} className="mx-auto mt-4 animate-rise-in max-w-[520px] font-plus-jakarta text-sm leading-[1.65] text-body sm:text-base lg:mx-0">
              Senior fullstack AI developer building fast, accessible and
              SEO-friendly web apps, powered by headless CMS and AI.
            </p>

            <div style={delay(1.2)} className="mt-8 flex animate-rise-in flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Button asChild className="relative h-12 overflow-hidden rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#1E3FAE] px-8 shadow-[0_14px_34px_-12px_rgba(76,125,254,0.9)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-10px_rgba(76,125,254,1)] sm:h-14 sm:px-10">
                  <Link href="#contact">
                    <span className="relative z-10 font-plus-jakarta text-sm font-bold text-white sm:text-base">Hire me</span>
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sheen" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Link
                  href="#resume"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-ink-navy/20 bg-surface px-6 font-plus-jakarta text-sm font-bold text-ink-navy transition-colors duration-300 hover:border-[#4C7DFE] hover:text-[#4C7DFE] sm:h-14 sm:px-8 sm:text-base"
                >
                  View projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo stage */}
          <motion.div style={{ scale: stageScale, y: stageY }} className="relative mx-auto aspect-square w-[86%] max-w-[360px] sm:max-w-[440px] lg:w-full lg:max-w-[520px] will-change-transform">
            {/* Rings: one draws itself, one slowly turns, and a bright streak circles the edge */}
            <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
              <svg aria-hidden viewBox="0 0 400 400" className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="hero-streak" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4C7DFE" stopOpacity="0" />
                    <stop offset="1" stopColor="#4C7DFE" />
                  </linearGradient>
                </defs>
                <motion.circle variants={draw(0.5)} cx="200" cy="200" r="196" fill="none" stroke="#4C7DFE" strokeOpacity="0.28" strokeWidth="1" />
                <motion.g variants={fade(1.2)}>
                  <g className="animate-orbit [animation-duration:9s]" style={{ transformOrigin: "200px 200px" }}>
                    <circle cx="200" cy="200" r="196" fill="none" stroke="url(#hero-streak)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="120 1112" />
                  </g>
                  <g className="animate-orbit [animation-direction:reverse] [animation-duration:80s]" style={{ transformOrigin: "200px 200px" }}>
                    <circle cx="200" cy="200" r="166" fill="none" stroke="var(--ink-navy)" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
                    <circle cx="200" cy="34" r="5" fill="#4C7DFE" />
                    <circle cx="366" cy="200" r="3.5" fill="#8EAAFF" />
                    <circle cx="82.6" cy="317.4" r="4" fill="var(--ink-navy)" />
                  </g>
                </motion.g>
              </svg>
            </motion.div>

            {/* Neutral disc with the photo rising out of it */}
            <motion.div style={{ x: midX, y: midY }} className="absolute inset-0">
              <div style={delay(0.5)} className="absolute inset-[17%] animate-disc-in rounded-full bg-gradient-to-b from-[#F2F4F7] to-[#D0D5DD] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35),inset_0_2px_0_rgba(255,255,255,0.6)] dark:from-[#1B2A45] dark:to-[#0C1526] dark:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]" />
              <div className="absolute bottom-[17%] left-[17%] right-[17%] top-[5%] overflow-hidden rounded-b-[50%_42.3%]">
                <div style={delay(0.75)} className="relative h-full w-full origin-bottom animate-photo-in">
                  <Image
                    src="/avatar.png"
                    alt="Rajat Sharma"
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 240px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Tech labels riding the outer ring; each one counter-turns so it stays upright */}
            <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
              <div className="absolute inset-0 animate-orbit">
                {orbitChips.map((chip, i) => (
                  <div key={chip.label} style={{ left: chip.left, top: chip.top }} className="absolute -translate-x-1/2 -translate-y-1/2">
                    <motion.div variants={pop(1.3 + i * 0.1)}>
                      <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 dark:border-white/10 bg-surface/95 px-2.5 py-1 font-plus-jakarta text-[10px] font-semibold text-ink-navy shadow-[0_10px_26px_-10px_rgba(0,25,89,0.45)] animate-orbit [animation-direction:reverse] sm:px-3 sm:py-1.5 sm:text-xs">
                        <span className="h-2 w-2 rounded-full" style={{ background: chip.dot }} />
                        {chip.label}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating stat cards (closest layer, moves the most with the mouse) */}
            <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-[-6%] left-[-10%] z-20 sm:bottom-[10%] sm:left-[-10%] lg:left-[-4%] xl:left-[-7%]">
              <motion.div variants={pop(1.7)}>
                <div className="flex items-center gap-2 rounded-xl border border-white/70 dark:border-white/10 bg-surface/95 px-2.5 py-2 sm:rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,25,89,0.5)] animate-float sm:gap-3 sm:px-4 sm:py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-[#4C7DFE] to-[#001959] text-white sm:h-10 sm:w-10 sm:rounded-xl">
                    <Briefcase className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </span>
                  <span className="font-bruno-ace text-[13px] leading-none text-ink sm:text-xl">Experienced</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div style={{ x: frontX, y: frontY }} className="absolute right-[-10%] top-[-5%] z-20 sm:right-[-10%] sm:top-[14%] lg:right-[-4%] xl:right-[-7%]">
              <motion.div variants={pop(1.85)}>
                <div className="flex items-center gap-2 rounded-xl border border-white/70 dark:border-white/10 bg-surface/95 px-2.5 py-2 sm:rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,25,89,0.5)] animate-float [animation-delay:-2.5s] sm:gap-3 sm:px-4 sm:py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-[#4C7DFE] to-[#001959] text-white sm:h-10 sm:w-10 sm:rounded-xl">
                    <FolderGit2 className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </span>
                  <span>
                    <span className="block font-bruno-ace text-sm leading-none text-ink sm:text-xl">25+</span>
                    <span className="mt-1 block font-plus-jakarta text-[10px] text-body sm:text-xs">Projects on GitHub</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.a
            variants={fade(2.2)}
            href="#about"
            aria-label="Scroll to About"
            className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-ink-navy/40 pt-1.5 lg:flex"
          >
            <span className="h-2 w-1 rounded-full bg-[#4C7DFE] animate-scroll-dot" />
          </motion.a>
        </motion.div>
      </section>
      </MotionConfig>
    </div>
  );
};

export default Hero;
