"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

// Closing signature: one very large line of the name in pale grey, resting on top of the
// footer. It slides left-to-right while scrolling down and back when scrolling up.
// Purely decorative.
const ScrollText = ({ text = "Rajat Sharma", repeat = 4 }: { text?: string; repeat?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 when the line enters at the bottom of the screen, 1 if it were to leave at the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // A light spring so the slide eases after the scroll instead of following it rigidly
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  // The row is several screens wide and always shifted left, so its ends never come into view
  const x = useTransform(progress, [0, 1], reduce ? ["-20%", "-20%"] : ["-38%", "0%"]);

  return (
    // overflow-hidden: the wide row can never add a horizontal scrollbar
    <div ref={ref} aria-hidden className="pointer-events-none select-none overflow-hidden bg-background">
      {/* The negative margin tucks the letters' feet under the footer's top edge */}
      <motion.div style={{ x }} className="-mb-[0.07em] flex w-max items-center whitespace-nowrap font-bruno-ace text-[clamp(64px,17vw,280px)] uppercase leading-[0.82] text-watermark will-change-transform">
        {Array.from({ length: repeat }, (_, i) => (
          <span key={i} className="flex items-center">
            {text}
            {/* Four-point star between repeats, echoing the banner */}
            <svg viewBox="0 0 24 24" className="mx-[0.22em] h-[0.3em] w-[0.3em] shrink-0" fill="currentColor">
              <path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.200-12-12C7.500 10.200 11.100 6.600 12 0z" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollText;
