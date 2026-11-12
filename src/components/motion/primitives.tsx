"use client";
import { motion, useScroll, useSpring, type Variants } from "motion/react";
import { Fragment, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

// Shared building blocks so every section animates the same way.

// Slow, soft ease-out used across the site
export const ease = [0.16, 1, 0.3, 1] as const;

// Animate once, a little after the element enters the screen
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

// Rise into place while going from blurred to sharp. `custom` = delay in seconds.
export const rise: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease, delay },
  }),
};

export const word: Variants = {
  hidden: { opacity: 0, y: "0.55em", filter: "blur(14px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease } },
};

export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const gradientText = "bg-clip-text text-transparent bg-gradient-to-b from-[#4C7DFE] to-[#001959]";
export const gradientTextOnDark = "bg-clip-text text-transparent bg-gradient-to-b from-[#B9CBFF] to-[#4C7DFE]";

type RiseProps = { children: ReactNode; className?: string; delay?: number };

// Animates on its own when scrolled into view
export function Rise({ children, className, delay = 0 }: RiseProps) {
  return (
    <motion.div variants={rise} custom={delay} initial="hidden" whileInView="show" viewport={viewport} className={className}>
      {children}
    </motion.div>
  );
}

// Parent that plays its <RiseItem> children one after another
export function Stagger({ children, className, gap = 0.1, delay = 0 }: RiseProps & { gap?: number }) {
  return (
    <motion.div variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewport} className={className}>
      {children}
    </motion.div>
  );
}

export function RiseItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={rise} className={className}>
      {children}
    </motion.div>
  );
}

type HeadingProps = {
  eyebrow: string;
  // Title split into parts so some words can take the gradient accent
  parts: { text: string; accent?: boolean }[];
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

// Small label + large title whose words arrive one by one
export function SectionHeading({ eyebrow, parts, align = "center", tone = "light", className = "" }: HeadingProps) {
  const dark = tone === "dark";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <motion.span
        variants={rise}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-plus-jakarta text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs ${
          dark ? "border-white/15 bg-white/5 text-[#B9CBFF]" : "border-[#4C7DFE]/30 bg-[#4C7DFE]/[0.07] text-[#1E3FAE]"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-[#8EAAFF]" : "bg-[#4C7DFE]"}`} />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={stagger(0.07, 0.1)}
        className={`mt-4 font-bruno-ace text-[26px] font-normal leading-[1.15] sm:text-4xl md:text-[48px] ${dark ? "text-white" : "text-foreground"}`}
      >
        {parts.map((part, p) =>
          part.text.split(" ").map((w, i) => (
            <Fragment key={`${p}-${i}`}>
              <motion.span
                variants={word}
                className={`inline-block will-change-transform ${part.accent ? (dark ? gradientTextOnDark : gradientText) : ""}`}
              >
                {w}
              </motion.span>{" "}
            </Fragment>
          ))
        )}
      </motion.h2>
    </motion.div>
  );
}

// Card with a soft light that follows the mouse
export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(76,125,254,0.16)",
  style,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} style={style} className={`group/spot relative ${className}`}>
      <div
        aria-hidden
        style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)` }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}

// Thin bar at the top of the page that fills as you scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#8EAAFF] via-[#4C7DFE] to-[#001959]"
    />
  );
}
