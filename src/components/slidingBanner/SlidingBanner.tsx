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

const SlidingBanner = () => {
  return (
    <div className="group w-full h-[50px] md:h-[64px] bg-gradient-to-r from-[#4C7DFE] to-[#001959] overflow-hidden flex items-center">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
        <Half />
        <Half hidden />
      </div>
    </div>
  );
};

export default SlidingBanner;
