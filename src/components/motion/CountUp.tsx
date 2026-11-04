"use client";
import { useEffect, useRef, useState } from "react";

// Counts from 0 up to the number in `value` (e.g. "25+") once it scrolls into view.
export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setN(target * (1 - Math.pow(1 - p, 3))); // ease-out
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
