"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Reveal from "@/components/motion/Reveal";

// 3D background loads on the client only, after the page is interactive
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const Hero = () => {
  return (
    <div className="pl-5 pr-5">
      <section className="w-full max-w-[1440px] mx-auto bg-background relative overflow-hidden">
        {/* Background Blue Circle - Responsive sizing */}
        <div aria-hidden className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-[520px] lg:h-[520px] bg-blue-accent rounded-full opacity-10 blur-3xl"></div>
        <HeroScene />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hello Badge */}
          <div className="flex items-center justify-center mb-[30px] sm:mb-4 mt-12 md:mt-[71px] animate-fade-up">
            <div className="relative animate-float bg-white/70 backdrop-blur-sm px-4 sm:px-5 py-1 sm:py-2 rounded-full border-[1.27px] border-solid border-[#4C7DFE]">
              <span className="font-bruno-ace font-normal text-lg sm:text-xl md:text-[24px] leading-[140%] tracking-0 text-transparent bg-clip-text bg-gradient-to-b from-[#4C7DFE] to-[#001959]">
                Hello
              </span>
              <Image
                src="/herovector1.svg"
                alt="Header Logo"
                width={28}
                height={28}
                className="h-6 sm:h-8 md:h-10 w-auto absolute -right-6 sm:-right-8 -top-4 sm:-top-6"
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-4 text-center animate-fade-up [animation-delay:120ms]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-normal text-foreground leading-tight">
              I&apos;m <span className="text-blue-accent">Rajat Sharma</span>,
            </h1>
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-normal bg-clip-text text-transparent bg-gradient-to-b from-[#4C7DFE] to-[#001959]">
              Frontend Developer
              <Image
                src="/herovector1.svg"
                alt="Header Logo"
                width={72}
                height={75}
                className="h-6 sm:h-8 md:h-10 w-auto absolute -left-6 sm:-left-8 -bottom-4 sm:-bottom-6 rotate-180"
              />
            </h2>
          </div>

          {/* Side info: inline row on mobile/tablet, floating beside the photo on desktop */}
          <div className="mt-8 flex items-start justify-between gap-4 lg:contents animate-fade-up [animation-delay:240ms]">
            <div className="max-w-[60%] sm:max-w-[360px] lg:absolute lg:left-0 lg:top-[30%] lg:max-w-[300px] xl:max-w-[400px] lg:animate-fade-up lg:[animation-delay:240ms]">
              <Image src="/quote.svg" alt="" width={36} height={36} className="w-6 h-6 sm:w-9 sm:h-9" />
              <p className="font-plus-jakarta text-sm sm:text-[16px] leading-[150%] text-[#344054] mt-2 sm:mt-4">
                Senior frontend developer building fast, accessible and
                SEO-friendly web apps with React, Next.js, Vue, Nuxt and
                SvelteKit, powered by headless CMS and AI.
              </p>
            </div>
            <div className="text-right shrink-0 lg:absolute lg:right-0 lg:top-[25%] lg:animate-fade-up lg:[animation-delay:240ms]">
              <h3 className="font-bruno-ace text-xl sm:text-2xl md:text-4xl leading-[110%] text-[#00070E]">
                4+ Years
              </h3>
              <p className="font-plus-jakarta text-sm sm:text-[16px] leading-[150%] text-[#00070E]">
                Experience
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center relative mt-6 sm:mt-8 lg:mt-10 animate-fade-up [animation-delay:320ms]">
            <Image
              src="/avatar.png"
              alt="Rajat Sharma"
              width={512}
              height={507}
              className="relative z-[1] w-[85%] max-w-[512px] h-auto"
              priority
            />
            <Image
              src="/HeroEllipse.svg"
              alt="Hero Image"
              width={811}
              height={405}
              className="absolute bottom-0 z-[-1]"
            />

            <Button asChild className="bg-white hover:bg-white absolute bottom-4 sm:bottom-8 w-[150px] sm:w-[180px] md:w-[242px] h-[48px] sm:h-[56px] md:h-[64px] rounded-[50px] flex items-center justify-center z-[2] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link href="#contact">
              <span className="font-plus-jakarta-display font-bold text-sm sm:text-[16px] leading-[150%] tracking-0 text-transparent bg-clip-text bg-gradient-to-b from-[#4C7DFE] to-[#001959]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Hire me
              </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section id="about" className="relative w-full max-w-[1280px] h-auto bg-[#00070E] rounded-[12px] md:rounded-[24px] mx-auto text-white px-4 py-8 sm:px-8 sm:py-12 md:p-[74px] md:pb-[75px]">
        <Reveal variant="flip" className="flex flex-col items-center justify-center h-full">
          <h2 className="font-bruno-ace font-normal text-3xl sm:text-4xl md:text-[52px] leading-[110%] tracking-0 text-center">
            About Me
          </h2>
          <div className="mt-4 space-y-4 max-w-max">
            <p className="text-sm sm:text-[16px] font-plus-jakarta font-normal leading-[150%] tracking-0 text-center">
              Hello! I&apos;m Rajat Sharma, a frontend developer with 4 years of
              experience building production web applications across the React,
              Vue and Svelte ecosystems. I specialise in fast, accessible,
              SEO-friendly sites powered by headless CMS platforms like Sanity,
              Strapi, Storyblok and Builder.io.
            </p>

            <p className="text-sm sm:text-[16px] font-plus-jakarta font-normal leading-[150%] tracking-0 text-center">
              I turn designs into maintainable, component-driven frontends with
              TypeScript and Tailwind CSS, keep a close eye on Core Web Vitals,
              and use AI tools like Claude and ChatGPT to ship faster, while
              keeping full ownership of architecture and quality.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Hero;
