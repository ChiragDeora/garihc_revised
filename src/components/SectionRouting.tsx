"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import {
  getPathForSection,
  getSectionIdFromPath,
  type SectionId,
} from "@/lib/navigation/routes";

export default function SectionRouting() {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const syncedPathRef = useRef(pathname);
  const scrollSyncReadyRef = useRef(pathname === "/");

  useEffect(() => {
    syncedPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (pathname === "/") {
      scrollSyncReadyRef.current = true;
      if (prevPathname !== null && prevPathname !== "/") {
        scrollToTop();
      }
      return;
    }

    const sectionId = getSectionIdFromPath(pathname);
    if (!sectionId) {
      scrollSyncReadyRef.current = true;
      return;
    }

    const previousSection = prevPathname
      ? getSectionIdFromPath(prevPathname)
      : null;

    if (sectionId !== previousSection) {
      scrollSyncReadyRef.current = false;
      const timer = window.setTimeout(() => {
        scrollToElement(`#${sectionId}`);
        scrollSyncReadyRef.current = true;
      }, 50);
      return () => window.clearTimeout(timer);
    }

    scrollSyncReadyRef.current = true;
  }, [pathname]);

  useEffect(() => {
    const TOP_THRESHOLD = () => window.innerHeight * 0.55;
    const SECTION_THRESHOLD = () => window.innerHeight * 0.4;

    const syncPath = (path: string) => {
      if (syncedPathRef.current === path) return;
      syncedPathRef.current = path;
      router.replace(path, { scroll: false });
    };

    const handleScroll = () => {
      if (!scrollSyncReadyRef.current) return;

      const y = window.scrollY;

      if (y < TOP_THRESHOLD()) {
        syncPath("/");
        return;
      }

      let current: SectionId | "" = "";
      for (const id of ["work", "about", "services", "contact"] as const) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SECTION_THRESHOLD()) current = id;
      }

      if (!current) return;
      syncPath(getPathForSection(current, syncedPathRef.current));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router]);

  return null;
}
