"use client";

import { useState, useEffect } from "react";

// Section ids must match the id attribute on each <section> in the page (DOM order top to bottom)
const SECTION_IDS = ["about", "services", "work", "contact"] as const;

// Order matches DOM: About, Services, Work, Contact (see page.tsx <main>)
const navLinks: { label: string; href: `#${string}`; id: string }[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const MOBILE_BREAKPOINT = 768;
const NAV_BAR_HEIGHT = 52;
// Horizontal row centered below the nav bar
function getArcLayout(w: number) {
  const total = navLinks.length;
  const topY = NAV_BAR_HEIGHT + 28;
  const totalWidth = w - 48; // 24px padding each side
  const step = totalWidth / (total - 1);
  const startX = 24;

  return navLinks.map((_, i) => ({
    left: startX + i * step,
    top: topY,
    rotation: 0,
  }));
}

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [arcOpen, setArcOpen] = useState(false);
  const [arcLayout, setArcLayout] = useState<{ left: number; top: number; rotation: number }[]>([]);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile || viewport.w <= 0) return;
    setArcLayout(getArcLayout(viewport.w));
  }, [isMobile, viewport.w, viewport.h]);

  // Recompute arc when menu opens; use visual viewport on mobile so we don't clip (browser chrome / URL bar)
  useEffect(() => {
    if (!arcOpen || !isMobile) return;
    const measure = () => {
      const vv = window.visualViewport;
      const w = vv?.width ?? window.innerWidth;
      const h = vv?.height ?? window.innerHeight;
      setViewport({ w, h });
    };
    measure();
    const t = setTimeout(measure, 150);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [arcOpen, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Active section = section whose top has passed the activation line (iterate in DOM order)
      const threshold = window.innerHeight * 0.4;
      let current = "";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) current = id;
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Allow scroll when nav is open on mobile (no body overflow lock)

  const goTo = (href: string) => {
    setArcOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const linkEl = (link: (typeof navLinks)[0], mobile = false) => {
    const isActive = activeSection === link.id;
    return (
      <a
        key={link.href}
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          goTo(link.href);
        }}
        style={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: mobile ? "0.75rem" : "0.75rem",
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
        {isActive && !mobile && (
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
              href="#"
              className="nav-logo"
              onClick={(e) => {
                e.preventDefault();
                setArcOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.9rem",
                letterSpacing: "0.22em",
                fontWeight: 600,
                color: "#F5F5F0",
                textDecoration: "none",
              }}
            >
              GARIHC
            </a>
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
              <span
                className="nav-menu-bar"
                style={{
                  width: 18,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 1,
                  transition: "transform 0.3s ease, opacity 0.2s ease",
                  transform: arcOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="nav-menu-bar"
                style={{
                  width: 18,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 1,
                  transition: "opacity 0.2s ease",
                  opacity: arcOpen ? 0 : 1,
                }}
              />
              <span
                className="nav-menu-bar"
                style={{
                  width: 18,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 1,
                  transition: "transform 0.3s ease, opacity 0.2s ease",
                  transform: arcOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Menu row */}
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
                    goTo(link.href);
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
        transition:
          "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
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
          href="#"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.9rem",
            letterSpacing: "0.3em",
            fontWeight: 600,
            color: "#F5F5F0",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          GARIHC
        </a>
        <div
          style={{
            width: 1,
            height: 20,
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((l) => linkEl(l, false))}
        </div>
      </div>
    </nav>
  );
}
