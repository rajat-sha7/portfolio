"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const lenis = useLenis();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) lenis?.stop();
    else lenis?.start();
    // Lock on <html>, not <body>: overflow on body would break the sticky header
    document.documentElement.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen, lenis]);

  // Close the mobile menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setIsMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const desktopLink = (item: (typeof links)[number]) => (
    <Link
      key={item.label}
      href={item.href}
      onClick={() => handleLinkClick(item.label)}
      className={`font-plus-jakarta text-[15px] lg:text-[16px] leading-[150%] border-b-2 py-3 px-2 lg:px-4 transition-colors duration-300 hover:text-white hover:border-white ${
        activeLink === item.label ? "text-white border-white" : "text-[#98A2B3] border-transparent"
      }`}
    >
      {item.label}
    </Link>
  );

  return (
    <header
      id="top"
      className="sticky top-0 z-50 md:static md:px-5 max-w-[1440px] mx-auto"
    >
      <div className="max-w-[1280px] mx-auto md:mt-[40px]">
        <div className="bg-[#00070E] text-white h-[72px] md:h-[86px] md:rounded-[16px] px-4 md:px-6 flex justify-between items-center w-full relative">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between w-full gap-4">
            <div className="flex gap-2 lg:gap-6">{links.slice(0, 2).map(desktopLink)}</div>

            <Link href="#top" onClick={() => handleLinkClick("Home")} className="flex items-center shrink-0 group">
              <Image src="/header_logo.svg" alt="Logo" width={40} height={40} className="h-9 lg:h-10 w-auto transition-transform duration-500 group-hover:rotate-[360deg]" />
              <span className="ml-2 font-bruno-ace text-[22px] lg:text-[28.76px] leading-[120%] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_50%,#4C7DFE_75%,#001959_100%)] bg-[length:100%_200%] bg-clip-text text-transparent group-hover:animate-text-gradient">
                RajatSharma
              </span>
            </Link>

            <div className="flex gap-2 lg:gap-6">{links.slice(2).map(desktopLink)}</div>
          </nav>

          {/* Mobile Layout */}
          <div className="md:hidden flex justify-between items-center w-full">
            <Link href="#top" onClick={() => handleLinkClick("Home")} className="flex items-center">
              <Image src="/header_logo.svg" alt="Logo" width={36} height={36} className="h-9 w-auto" />
              <span className="ml-2 font-bruno-ace text-lg">RajatSharma</span>
            </Link>
            <button
              className="relative z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className={`block transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#00070E]/95 backdrop-blur-sm z-40 transition-[opacity,transform] duration-300 ease-out ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav className="h-full w-full flex flex-col justify-center overflow-y-auto py-8">
            <div className="flex flex-col space-y-4 px-6">
              {links.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  style={{ transitionDelay: isMenuOpen ? `${80 + i * 50}ms` : "0ms" }}
                  className={`font-plus-jakarta text-white text-2xl font-medium py-4 px-6 rounded-xl transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  } ${
                    activeLink === item.label
                      ? "bg-gradient-to-r from-[#4C7DFE] to-[#001959] shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => handleLinkClick(item.label)}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-white/30"></span>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 px-6">
              <Button
                asChild
                className="w-full font-bruno-ace font-normal text-lg bg-gradient-to-b from-[#4C7DFE] to-[#001959] h-14 rounded-[50px]"
              >
                <Link href="#contact" tabIndex={isMenuOpen ? 0 : -1} onClick={() => handleLinkClick("Contact")}>
                  Hire Me
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
