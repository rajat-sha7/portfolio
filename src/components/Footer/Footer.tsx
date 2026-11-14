"use client";
import { Button } from "@/components/ui/button";
import { Github, Globe, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Rise, SectionHeading, Stagger, RiseItem } from "@/components/motion/primitives";

const Footer = () => {
  const navigationLinks = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rajat-sharma-93175b199/" },
    { icon: Github, label: "GitHub", href: "https://github.com/rajat-sha7/portfolio" },
    { icon: Globe, label: "Portfolio", href: "https://portfolio-rajat-sha7s-projects.vercel.app" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#00070E]">
      {/* Glow and a thin light line along the top edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[60%] left-[20%] h-[90%] w-[60%] rounded-full bg-[#4C7DFE]/20 blur-[130px] animate-aurora" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8EAAFF]/70 to-transparent" />
      </div>
      <div className="relative text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-[1344px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-[54px] gap-6 md:gap-0">
          <SectionHeading
            eyebrow="Say hello"
            tone="dark"
            parts={[{ text: "Let\u2019s" }, { text: "Connect", accent: true }, { text: "there" }]}
            className="text-center md:!text-left"
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="w-full sm:w-auto">
          <Button asChild className="relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(76,125,254,1)] font-plus-jakarta font-bold text-base md:text-lg leading-[140%] tracking-0 bg-gradient-to-b from-[#4C7DFE] to-[#001959] w-full sm:w-[200px] md:w-[242px] h-12 sm:h-14 md:h-[64px] rounded-[50px] flex items-center justify-center">
            <Link href="#contact" className="group/btn">
              <span className="text-white inline-flex items-center">Hire me</span>
              <Image src="/Footer/btnarrow.svg" alt="" width={24} height={24} className="w-6 h-6 md:w-[30px] md:h-[30px] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sheen" />
            </Link>
          </Button>
          </motion.div>
        </div>

        <Rise delay={0.15} className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-8 md:mb-12">
          <div className="flex flex-col justify-between gap-4 md:gap-6 items-start">
            <div className="flex items-center gap-2">
              <Image
                src="/header_logo.svg"
                alt="Header Logo"
                width={40}
                height={40}
                className="h-10 w-10 md:h-[52px] md:w-[52px]"
              />
              <span className="font-bruno-ace font-normal text-xl md:text-[28.76px] leading-[120%] tracking-0">RajatSharma</span>
            </div>
            <p className="text-[#98A2B3] max-w-full md:max-w-[628px] font-plus-jakarta-display font-normal text-sm md:text-[16px] leading-[150%] tracking-0">
              Senior Fullstack AI Developer with 4 years of experience in React, Next.js, Vue, Nuxt and SvelteKit. I build fast, accessible web apps powered by headless CMS and AI-assisted workflows.
            </p>

            {/* Social Links */}
            <Stagger gap={0.1} delay={0.3} className="flex space-x-3 mt-6 md:mt-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <RiseItem key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -5, scale: 1.12, rotate: -6 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#001959] ring-1 ring-white/15 shadow-[0_12px_24px_-10px_rgba(76,125,254,0.9)]"
                  >
                    <Icon size={18} />
                  </motion.a>
                </RiseItem>
              ))}
            </Stagger>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-12 min-w-0 shrink-0">
            {/* Navigation */}
            <div>
              <h3 className="font-bruno-ace font-normal text-base md:text-[16px] leading-[150%] tracking-0 mb-3 md:mb-4">Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index} className="leading-6">
                    <Link
                      href={link.href}
                      className="text-[#98A2B3] hover:text-white font-plus-jakarta-display text-sm md:text-[16px] bg-[linear-gradient(#8EAAFF,#8EAAFF)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] hover:bg-[length:100%_1px] transition-[background-size,color] duration-300 pb-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bruno-ace font-normal text-base md:text-[16px] leading-[150%] tracking-0 mb-3 md:mb-4">Contact</h3>
              <ul className="space-y-3">
                {socialLinks.map(({ label, href }) => (
                  <li key={label} className="leading-6">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#98A2B3] hover:text-white font-plus-jakarta-display text-sm md:text-[16px] bg-[linear-gradient(#8EAAFF,#8EAAFF)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] hover:bg-[length:100%_1px] transition-[background-size,color] duration-300 pb-0.5">
                    {label}
                  </a>
                  </li>
                ))}
                <li className="leading-6 text-[#98A2B3] font-plus-jakarta-display text-sm md:text-[16px]">India</li>
              </ul>
            </div>
          </div>
        </Rise>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-[#98A2B3] font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%] text-center md:text-left">
            Copyright© {new Date().getFullYear()} Rajat Sharma. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:gap-4">
            <Link
              href="#"
              className="text-[#98A2B3] hover:text-white transition-colors font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%]"
            >
              User Terms & Conditions
            </Link>
            <span className="text-[#98A2B3] hidden md:block">|</span>
            <Link
              href="#"
              className="text-[#98A2B3] hover:text-white transition-colors font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
