"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import About from "@/components/About/About";

const Hero = () => {
  return (
    <div className="pl-5 pr-5">
      <section className="w-full max-w-[1440px] mx-auto bg-background relative overflow-hidden">
        {/* Background Blue Circle - Responsive sizing */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-[600px] lg:h-[600px] bg-blue-accent rounded-full opacity-80 blur-3xl"></div>
        
        {/* Left Content - Responsive positioning */}
        <div className="absolute left-2 sm:left-4 md:left-8 bottom-[25%] sm:top-[25%] md:top-[30%] max-w-[180px] sm:max-w-[300px] md:max-w-[444px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-9 sm:h-9"
          >
            <path
              d="M12.135 17.445H5.1C5.22 10.44 6.6 9.28502 10.905 6.73502C11.4 6.43502 11.565 5.80502 11.265 5.29502C10.98 4.80002 10.335 4.63502 9.84 4.93502C4.77 7.93502 3 9.76502 3 18.48V26.565C3 29.13 5.085 31.2 7.635 31.2H12.135C14.775 31.2 16.77 29.205 16.77 26.565V22.065C16.77 19.44 14.775 17.445 12.135 17.445Z"
              fill="#00070E"
            />
            <path
              d="M28.3648 17.445H21.3298C21.4498 10.44 22.8298 9.28502 27.1348 6.73502C27.6298 6.43502 27.7948 5.80502 27.4948 5.29502C27.1948 4.80002 26.5648 4.63502 26.0548 4.93502C20.9848 7.93502 19.2148 9.76502 19.2148 18.495V26.58C19.2148 29.145 21.2998 31.215 23.8498 31.215H28.3498C30.9898 31.215 32.9848 29.22 32.9848 26.58V22.08C32.9998 19.44 31.0048 17.445 28.3648 17.445Z"
              fill="#00070E"
            />
          </svg>

          <p className="font-plus-jakarta text-xs sm:text-[16px] font-normal leading-[150%] tracking-0 text-[#344054] mt-2 sm:mt-4">
            A passionate UI/UX designer with over 2 years of experience in
            crafting digital experiences. I thrive on turning complex problems
            into simple and intuitive designs.
          </p>
        </div>

        {/* Right Content - Responsive positioning */}
        <div className="absolute right-2 sm:right-4 md:right-8 bottom-[35%] sm:top-[20%] md:top-[25%] max-w-[180px] sm:max-w-[300px] md:max-w-[444px] text-right">
          <h3 className="font-bruno-ace font-normal text-lg sm:text-xl md:text-4xl leading-[110%] tracking-0 text-[#00070E]">
            2+ Years
          </h3>
          <p className="font-plus-jakarta text-xs sm:text-[16px] font-normal leading-[150%] tracking-0 text-[#00070E]">
            Experience
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-16 lg:py-0 relative z-10 pt-[71px]">
          {/* Hello Badge */}
          <div className="flex items-center justify-center sm:mb-4 mb-[30px] mt-[71px]">
            <div className="relative px-4 sm:px-5 py-1 sm:py-2 rounded-full border-[1.27px] border-solid border-[#4C7DFE]">
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

          <div className="space-y-2 sm:space-y-4 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-normal text-foreground leading-tight">
              I&apos;m <span className="text-blue-accent">Rahul Kiroriwal</span>,
            </h1>
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-normal bg-clip-text text-transparent bg-gradient-to-b from-[#4C7DFE] to-[#001959]">
              UI/UX Designer
              <Image
                src="/herovector1.svg"
                alt="Header Logo"
                width={72}
                height={75}
                className="h-6 sm:h-8 md:h-10 w-auto absolute -left-6 sm:-left-8 -bottom-4 sm:-bottom-6 rotate-180"
              />
            </h2>
          </div>

          <div className="flex items-center justify-center relative  sm:mt-8 mt-[40px]">
            <Image
              src="/hero.svg"
              alt="Hero Image"
              width={544}
              height={752}
              className="w-[80%] sm:w-auto"
              style={{ zIndex: 1 }}
            />
            <Image
              src="/HeroEllipse.svg"
              alt="Hero Image"
              width={811}
              height={405}
              className="absolute bottom-0 z-[-1]"
            />

            <Button className="font-bruno-ace font-normal text-lg sm:text-xl md:text-[24px] leading-[140%] tracking-0 bg-white absolute bottom-4 sm:bottom-8 w-[150px] sm:w-[180px] md:w-[242px] h-[48px] sm:h-[56px] md:h-[64px] rounded-[50px] flex items-center justify-center z-2 transition-shadow hover:shadow-lg">
              <span className="font-plus-jakarta-display font-bold text-sm sm:text-[16px] leading-[150%] tracking-0 text-transparent bg-clip-text bg-gradient-to-b from-[#4C7DFE] to-[#001959]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Hire me
              </span>
            </Button>
          </div>
        </div>
      </section>
      <section id="about" className="relative w-full max-w-[1280px] h-auto bg-[#00070E] rounded-[12px] md:rounded-[24px] mx-auto text-white px-4 py-8 sm:px-8 sm:py-12 md:p-[74px] md:pb-[75px] mx-[20px]">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-bruno-ace font-normal text-3xl sm:text-4xl md:text-[52px] leading-[110%] tracking-0 text-center">
            About Me
          </h1>
          <div className="mt-4 space-y-4 max-w-max">
            <p className="text-sm sm:text-[16px] font-plus-jakarta font-normal leading-[150%] tracking-0 text-center" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Hello! I&apos;m Rahul Kiroriwal, a seasoned UI/UX designer with
              over a year of dedicated experience in shaping digital
              experiences. I&apos;m passionate about translating ideas into
              intuitive and visually compelling designs that captivate users.
            </p>

            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-sm sm:text-[16px] font-plus-jakarta font-normal leading-[150%] tracking-0 text-center">
              Armed with a keen eye for detail and a deep understanding of user
              behavior, I leverage industry-leading tools to bring concepts to
              life. Figma is my design haven, where creativity meets
              collaboration seamlessly. As an avid Figma enthusiast, I harness
              its power to craft pixel-perfect interfaces and interactive
              prototypes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
