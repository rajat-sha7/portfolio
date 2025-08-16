"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navigationLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Resume", href: "#" },
    { name: "Project", href: "#" },
  ];

  const socialLinks = [
    { icon: 'Footer/FB.svg', href: "#", color: "text-blue-500" },
    { icon: 'Footer/insta.svg', href: "#", color: "text-pink-500" },
    { icon: 'Footer/indeed.svg', href: "#", color: "text-blue-600" },
    { icon: 'Footer/x.svg', href: "#", color: "text-red-500" },

  ];

  return (
    <footer className="bg-[#00070E]">
      <div className="bg-[#00070E] text-white py-8 md:py-16 px-4 sm:px-8 md:px-20 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-[54px] gap-6 md:gap-0">
          <h2 className="font-bruno-ace font-normal text-3xl sm:text-4xl md:text-[52px] leading-[110%] tracking-0 text-[#FCFCFD] text-center md:text-left">
            Let&apos;s Connect there
          </h2>

          <Button className="font-bruno-ace font-normal text-lg sm:text-xl md:text-[24px] leading-[140%] tracking-0 bg-gradient-to-b from-[#4C7DFE] to-[#001959] w-full sm:w-[200px] md:w-[242px] h-12 sm:h-14 md:h-[64px] rounded-[50px] flex items-center justify-center">
            <span className="bg-clip-text text-white inline-flex items-center">Hire me</span>
            <Image src="Footer/btnarrow.svg" alt="Description" width={24} height={24} className="w-6 h-6 md:w-[30px] md:h-[30px]" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 md:mb-12">
          <div className="flex flex-col justify-between gap-4 md:gap-6 items-start">
            <div className="flex items-center gap-2">
              <Image
                src="/header_logo.svg"
                alt="Header Logo"
                width={40}
                height={40}
                className="h-10 w-10 md:h-[52px] md:w-[52px]"
              />
              <span className="font-bruno-ace font-normal text-xl md:text-[28.76px] leading-[120%] tracking-0">RahulKiroriwal</span>
            </div>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-muted-foreground max-w-full md:max-w-[628px] font-plus-jakarta-display font-normal text-sm md:text-[16px] leading-[150%] tracking-0">
              A passionate UI/UX designer with over 2 years of experience in crafting digital experiences. I thrive on turning complex problems into simple and intuitive designs.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6 md:mt-[50px]">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Image src={link?.icon} alt="Social Icon" width={30} height={30} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Navigation */}
            <div>
              <h3 className="font-bruno-ace font-normal text-base md:text-[16px] leading-[150%] tracking-0 mb-3 md:mb-4">Navigation</h3>
              <ul className="space-y-2 md:space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors font-plus-jakarta-display text-sm md:text-[16px]"
                      style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                      }}
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
              <div className="space-y-2 md:space-y-3">
                <p className="text-muted-foreground font-plus-jakarta-display text-sm md:text-[16px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  +91 8146478431
                </p>
                <p className="text-muted-foreground font-plus-jakarta-display text-sm md:text-[16px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  rahulkiroriwal27@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }} className="text-muted-foreground font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%] text-center md:text-left">
            Copyright© 2025 Rahul Kiroriwal. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              href="#"
              className="text-muted-foreground hover:text-white transition-colors font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%]"
            >
              User Terms & Conditions
            </Link>
            <span className="text-muted-foreground hidden md:block">|</span>
            <Link style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              href="#"
              className="text-muted-foreground hover:text-white transition-colors font-plus-jakarta-display font-normal text-xs sm:text-sm md:text-[16px] leading-[150%]"
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
