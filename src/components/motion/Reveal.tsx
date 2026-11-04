"use client";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  variant?: "up" | "left" | "right" | "zoom" | "flip";
  as?: ElementType;
};

const hidden: Record<NonNullable<RevealProps["variant"]>, string> = {
  up: "translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
  zoom: "scale-90",
  flip: "[transform:perspective(900px)_rotateX(25deg)_translateY(30px)]",
};

// Fades/slides its children in the first time they scroll into view.
export default function Reveal({ children, className = "", delay = 0, variant = "up", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100 [transform:none]" : `opacity-0 ${hidden[variant]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
