"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Effect to prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className="max-w-[1440px] mx-auto">
      <div className="max-w-[1280px] mx-auto md:mt-[40px]">
        <div className="bg-[#00070E] text-white h-[86px] md:rounded-[16px] px-4 flex justify-between items-center w-full relative">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between w-full">
            <div className="flex gap-6 md:gap-8">
              <Link 
                href="#" 
                className={`font-plus-jakarta ${activeLink === "Home" ? "text-white" : "text-[#98A2B3]"} font-normal leading-[150%] tracking-0 hover:text-white transition-colors border-b-2 border-transparent hover:border-white p-4 md:p-5`} 
                onClick={() => handleLinkClick("Home")}
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Home
              </Link>
              <Link 
                href="#about" 
                className={`font-plus-jakarta ${activeLink === "About" ? "text-white" : "text-[#98A2B3]"} font-normal leading-[150%] tracking-0 hover:text-white transition-colors border-b-2 border-transparent hover:border-white p-4 md:p-5`} 
                onClick={() => handleLinkClick("About")}
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                About
              </Link>
            </div>
            <div className="text-xl font-bold flex items-center">
              <Image src="/header_logo.svg" alt="Header Logo" width={100} height={100} className="h-10 w-auto" />
              <span className="ml-2 font-bruno-ace text-[28.76px] leading-[120%] tracking-0 relative overflow-hidden inline-block">
                <span className="block text-white transition-all duration-300 hover:animate-text-gradient hover:bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] hover:bg-clip-text hover:text-transparent">
                  RahulKiroriwal
                </span>
              </span>
            </div>
            
            <div className="flex gap-6 md:gap-8">
              <Link 
                href="#resume" 
                className={`text-[16px] font-normal leading-[150%] tracking-0 ${activeLink === "Resume" ? "text-white" : "text-[#98A2B3]"} hover:text-white transition-colors border-b-2 border-transparent p-4 md:p-5`} 
                onClick={() => handleLinkClick("Resume")}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Resume
              </Link>
              <Link 
                href="#contact" 
                className={`text-[16px] font-normal leading-[150%] tracking-0 ${activeLink === "Contact" ? "text-white" : "text-[#98A2B3]"} hover:text-white transition-colors border-b-2 border-transparent p-4 md:p-5`} 
                onClick={() => handleLinkClick("Contact")}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile Layout */}
          <div className="md:hidden flex justify-between items-center w-full px-4">
            <div className="text-xl font-bold flex items-center">
              <Image src="/header_logo.svg" alt="Header Logo" width={100} height={100} className="h-10 w-auto" />
              <span className="ml-2 font-bruno-ace">RahulKiroriwal</span>
            </div>
            <button
              className="text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden fixed inset-0 bg-[#00070E]/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
            style={{ top: '86px' }}>
            <nav className="h-full w-full flex flex-col justify-center">
              <div className="flex flex-col space-y-6 px-8">
                {["Home", "About", "Resume", "Contact"].map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className={`
                      text-white text-2xl font-medium py-4 px-6 rounded-xl transition-all
                      ${activeLink === item 
                        ? 'bg-gradient-to-r from-[#4C7DFE] to-[#001959] shadow-lg' 
                        : 'hover:bg-white/10'
                      }
                    `}
                    onClick={() => handleLinkClick(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      {item}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 px-8">
                <Button className="w-full font-bruno-ace font-normal text-lg bg-gradient-to-b from-[#4C7DFE] to-[#001959] h-14 rounded-[50px]">
                  Hire Me
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;