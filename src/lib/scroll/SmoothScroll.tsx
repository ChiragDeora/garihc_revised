"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Lenis from "lenis";
import {
  getPathForSection,
  getSectionIdFromPath,
  type SectionId,
} from "@/lib/navigation/routes";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const SECTION_HASHES: Record<string, SectionId> = {
  "#work": "work",
  "#about": "about",
  "#services": "services",
  "#contact": "contact",
};

export default function SmoothScroll() {
  const router = useRouter();

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

      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "/") return;

      const sectionId =
        SECTION_HASHES[href] ??
        (anchor.pathname ? getSectionIdFromPath(anchor.pathname) : null);

      if (!sectionId) return;

      const target = document.getElementById(sectionId);
      if (!target) return;

      e.preventDefault();
      const path = getPathForSection(sectionId, window.location.pathname);
      router.replace(path, { scroll: false });
      lenis.scrollTo(target, { offset: -8, immediate: true });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [router]);

  return null;
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function scrollToElement(selector: string, offset = -8) {
  const target = document.querySelector(selector);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset, immediate: true });
    return;
  }

  target.scrollIntoView({ behavior: "instant" });
}
