"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;

      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -8 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToElement(selector: string, offset = -8) {
  const target = document.querySelector(selector);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset });
    return;
  }

  target.scrollIntoView({ behavior: "smooth" });
}
