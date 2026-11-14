"use client";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
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

  // Close the mobile menu if the screen grows to desktop size, or on Escape
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setIsMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    mq.addEventListener("change", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Highlight the link of the section currently in the middle of the screen
  useEffect(() => {
    const sections = links
      .slice(1)
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = links.find((l) => visible.has(l.href.slice(1)));
        if (current) setActiveLink(current.label);
        // Above the first section: back to Home
        else if (sections[0].getBoundingClientRect().top > window.innerHeight / 2) setActiveLink("Home");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
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
      className="sticky top-0 z-50 px-3 pt-3 md:static md:px-6 md:pt-0 lg:px-8 max-w-[1440px] mx-auto"
    >
      <div className="max-w-[1280px] mx-auto md:mt-[40px]">
        {/* On mobile the bar floats as a rounded pill; on desktop it is the full nav */}
        <div className="relative z-50 flex h-[60px] w-full items-center justify-between rounded-2xl bg-[#00070E] px-4 text-white shadow-[0_14px_30px_-14px_rgba(0,7,14,0.7)] ring-1 ring-white/10 md:h-[86px] md:rounded-[16px] md:px-6 md:shadow-none md:ring-0 dark:bg-[#0A1322] dark:md:ring-1">
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

          {/* Mobile bar: logo, current section, menu button */}
          <div className="md:hidden flex justify-between items-center w-full">
            <Link href="#top" onClick={() => handleLinkClick("Home")} className="flex items-center">
              <Image src="/header_logo.svg" alt="Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="ml-2 font-bruno-ace text-[17px]">RajatSharma</span>
            </Link>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className={`hidden rounded-full bg-white/10 px-3 py-1 font-plus-jakarta min-[360px]:inline-block text-xs font-semibold text-[#B9CBFF] transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                {activeLink}
              </span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#1E3FAE] transition-transform duration-200 active:scale-90"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {/* Two lines that cross into an X when the menu is open */}
                <span className="relative block h-4 w-[18px]">
                  <span className={`absolute left-0 top-1/2 -mt-px h-0.5 w-full rounded-full bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1"}`} />
                  <span className={`absolute left-0 top-1/2 -mt-px h-0.5 w-full rounded-full bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu: full screen, sits behind the bar */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 z-40 bg-[#00070E] transition-[opacity,visibility] duration-300 ease-out ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
        >
          {/* Soft blue light in the corners */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_100%_0%,rgba(76,125,254,0.28),transparent_70%),radial-gradient(70%_45%_at_0%_100%,rgba(30,63,174,0.35),transparent_70%)]" />

          <nav className="relative flex h-full flex-col overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[96px]">
            <p className="font-plus-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-[#8EAAFF]">Menu</p>

            <div className="mt-3 flex flex-1 flex-col">
              {links.map((item, i) => {
                const active = activeLink === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-current={active ? "true" : undefined}
                    style={{ transitionDelay: isMenuOpen ? `${80 + i * 60}ms` : "0ms" }}
                    className={`group flex items-center justify-between border-b border-white/10 py-5 transition-[opacity,translate] duration-500 ease-out ${
                      isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    onClick={() => handleLinkClick(item.label)}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-plus-jakarta text-xs font-semibold text-[#8EAAFF]">0{i + 1}</span>
                      <span
                        className={`font-bruno-ace text-[28px] leading-none ${
                          active ? "bg-gradient-to-b from-[#B9CBFF] to-[#4C7DFE] bg-clip-text text-transparent" : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
                        active ? "bg-[#4C7DFE] text-white" : "bg-white/5 text-white/50 group-active:bg-white/15"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div
              style={{ transitionDelay: isMenuOpen ? "340ms" : "0ms" }}
              className={`mt-8 transition-[opacity,translate] duration-500 ease-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex items-center gap-2.5 font-plus-jakarta text-sm font-semibold text-[#DCE5FF]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Available for new projects
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="#contact"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => handleLinkClick("Contact")}
                  className="flex h-14 flex-1 items-center justify-center rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#1E3FAE] font-plus-jakarta text-base font-bold text-white shadow-[0_14px_34px_-12px_rgba(76,125,254,0.9)]"
                >
                  Hire me
                </Link>
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    tabIndex={isMenuOpen ? 0 : -1}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-300 active:bg-white/15"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
