"use client";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Height of the sticky header, so sections don't end up hidden under it
const HEADER_OFFSET = -96;

// Section links like "/#about" scroll smoothly to the section
// without leaving "#about" in the address bar.
export default function HashLinks() {
  const lenis = useLenis();
  const pathname = usePathname();

  const scrollToSection = (el: HTMLElement, immediate = false) => {
    // force: still scrolls while the mobile menu has paused scrolling
    if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate, force: true });
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  };

  // Links to a section on the current page: scroll there and keep the URL clean.
  // Runs before Next's <Link> handler, which skips navigation once the default is prevented.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!section) return;

      e.preventDefault();
      // Wait a frame so a closing mobile menu can release the scroll lock first
      requestAnimationFrame(() => scrollToSection(section));
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  });

  // Arriving from another page (e.g. "All projects" → "/#resume"):
  // scroll to the section, then drop the "#..." from the address bar.
  useEffect(() => {
    if (!location.hash) return;
    const section = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    history.replaceState(history.state, "", location.pathname + location.search);
    if (section) requestAnimationFrame(() => scrollToSection(section, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, lenis]);

  return null;
}
