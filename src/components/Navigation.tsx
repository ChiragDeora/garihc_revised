"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import {
  getPathForSection,
  SECTION_IDS,
  type SectionId,
} from "@/lib/navigation/routes";

const navLinks: { label: string; href: string; id: SectionId }[] = [
  { label: "Work", href: "/work", id: "work" },
  { label: "About", href: "/about", id: "about" },
  { label: "Services", href: "/services", id: "services" },
  { label: "Contact", href: "/contact", id: "contact" },
];

const MOBILE_BREAKPOINT = 768;
const NAV_BAR_HEIGHT = 52;

function ThemeToggle({ size = 22 }: { size?: number }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="theme-toggle"
      style={{
        width: size * 2.1,
        height: size + 4,
        borderRadius: size,
        border: "1px solid rgba(255,255,255,0.1)",
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(191,166,122,0.18)",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.4s ease, border-color 0.4s ease",
        padding: 0,
      }}
    >
      {/* Track knob */}
      <span
        style={{
          position: "absolute",
          top: 2,
          left: dark ? 2 : `calc(100% - ${size - 2}px)`,
          width: size - 4,
          height: size - 4,
          borderRadius: "50%",
          background: dark ? "#1a1a1a" : "#F5F5F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        {dark ? (
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="#BFA67A" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="#C4663A" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </span>
    </button>
  );
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [arcOpen, setArcOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const SCROLL_DELTA = 6;
    const HIDE_OVER_HERO = () => window.innerHeight * 0.8;

    const handleScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      const diff = y - prev;

      if (y < HIDE_OVER_HERO()) {
        setVisible(false);
      } else if (Math.abs(diff) > SCROLL_DELTA) {
        setVisible(diff < 0);
      }
      lastScrollY.current = y;

      const threshold = window.innerHeight * 0.4;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveSection(current);
    };
    lastScrollY.current = window.scrollY;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (id: SectionId) => {
    setArcOpen(false);
    const path = getPathForSection(id, pathname);
    router.replace(path, { scroll: false });
    scrollToElement(`#${id}`);
  };

  const goHome = () => {
    setArcOpen(false);
    router.replace("/", { scroll: false });
    scrollToTop();
  };

  const linkEl = (link: (typeof navLinks)[0]) => {
    const isActive = activeSection === link.id;
    return (
      <a
        key={link.href}
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          goTo(link.id);
        }}
        style={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: "0.75rem",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: isActive ? "#BFA67A" : "rgba(245,245,240,0.85)",
          textDecoration: "none",
          transition: "color 0.3s",
          position: "relative",
          paddingBottom: 2,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLAnchorElement).style.color = "#F5F5F0";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLAnchorElement).style.color = isActive
            ? "#BFA67A"
            : "rgba(245,245,240,0.85)";
        }}
      >
        {link.label}
        {isActive && (
          <span
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              height: 1.5,
              background: "#BFA67A",
              borderRadius: 1,
            }}
          />
        )}
      </a>
    );
  };

  if (isMobile) {
    return (
      <>
        <nav
          className="nav-bar nav-bar-mobile"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1001,
            background: visible || arcOpen ? "rgba(10,10,10,0.95)" : "transparent",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: visible || arcOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
            padding: "0 1rem",
            transform: visible || arcOpen ? "translateY(0)" : "translateY(-100%)",
            opacity: visible || arcOpen ? 1 : 0,
            pointerEvents: visible || arcOpen ? "auto" : "none",
            transition: "transform 0.35s ease, opacity 0.35s ease, background 0.3s, border-color 0.3s",
          }}
        >
          <div
            style={{
              height: NAV_BAR_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <a
              href="/"
              className="nav-logo"
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
              }}
            >
              <img src="/logo-light.png" alt="" className="nav-logo-img" style={{ height: 26, width: "auto" }} />
              <span className="nav-logo-text" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", letterSpacing: "0.24em", fontWeight: 600, color: "#F5F5F0" }}>GARIHC</span>
            </a>
            {/* <div style={{ position: "absolute", right: 48, display: "flex", alignItems: "center" }}>
              <ThemeToggle size={20} />
            </div> */}
            <button
              type="button"
              aria-label={arcOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setArcOpen((o) => !o)}
              className="nav-menu-btn"
              style={{
                position: "absolute",
                right: 0,
                width: 44,
                height: 44,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                cursor: "pointer",
                transition: "background 0.25s",
              }}
            >
              <span style={{ width: 18, height: 2, background: "#F5F5F0", borderRadius: 1, transition: "transform 0.3s ease, opacity 0.2s ease", transform: arcOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ width: 18, height: 2, background: "#F5F5F0", borderRadius: 1, transition: "opacity 0.2s ease", opacity: arcOpen ? 0 : 1 }} />
              <span style={{ width: 18, height: 2, background: "#F5F5F0", borderRadius: 1, transition: "transform 0.3s ease, opacity 0.2s ease", transform: arcOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>

        {arcOpen && (
          <div
            style={{
              position: "fixed",
              top: NAV_BAR_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "12px 8px",
              background: "rgba(10,10,10,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              animation: "nav-backdrop-in 0.25s ease",
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.id);
                  }}
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: isActive ? "#BFA67A" : "rgba(245,245,240,0.85)",
                    textDecoration: "none",
                    padding: "6px 0",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <nav
      className="nav-bar"
      style={{
        position: "fixed",
        top: "1.25rem",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-80px)",
        zIndex: 1000,
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 50,
        padding: "0 2rem",
        opacity: visible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
      }}
    >
      <div
        className="nav-inner"
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        <a
          href="/"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
          style={{
            textDecoration: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img src="/logo-light.png" alt="" className="nav-logo-img" style={{ height: 32, width: "auto" }} />
          <span className="nav-logo-text" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", letterSpacing: "0.3em", fontWeight: 600, color: "#F5F5F0" }}>GARIHC</span>
        </a>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((l) => linkEl(l))}
        </div>
        {/* <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
        <ThemeToggle size={22} /> */}
      </div>
    </nav>
  );
}
