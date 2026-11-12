import React from "react";
import Image from "next/image";

const bannerItems = [
  "React",
  "Next.js",
  "Vue & Nuxt",
  "SvelteKit",
  "TypeScript",
  "Headless CMS",
  "AI & LLM Apps",
];

// One "half" of the track. The track holds two identical halves and slides
// by -50%, so the loop restarts exactly where it began (no jump or gap).
const Half = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {[0, 1].map((rep) =>
      bannerItems.map((item) => (
        <React.Fragment key={`${rep}-${item}`}>
          <span className="font-bruno-ace text-white text-xl sm:text-2xl md:text-3xl whitespace-nowrap px-6 md:px-8">
            {item}
          </span>
          <Image src="/Star.svg" alt="" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8 shrink-0" />
        </React.Fragment>
      ))
    )}
  </div>
);

const SlidingBanner = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <div className="group relative flex h-[50px] w-full items-center overflow-hidden bg-gradient-to-r from-[#4C7DFE] to-[#001959] md:h-[64px]">
      <div className={`flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}>
        <Half />
        <Half hidden />
      </div>
      {/* Items fade in and out at the edges */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#4C7DFE] to-transparent md:w-28" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#001959] to-transparent md:w-28" />
    </div>
  );
};

export default SlidingBanner;
