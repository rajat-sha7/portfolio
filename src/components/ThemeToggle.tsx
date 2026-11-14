"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Round button pinned to the bottom-left corner that switches between light and dark.
// Until it is clicked the site follows the device's own light/dark setting.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser, so render the icon after mount to avoid a mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-4 left-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink shadow-[0_10px_30px_-10px_rgba(0,25,89,0.45)] transition-[transform,background-color,border-color] duration-300 hover:scale-110 active:scale-95 md:bottom-6 md:left-6 md:h-12 md:w-12"
    >
      <span className="relative block h-5 w-5">
        <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      </span>
    </button>
  );
}
