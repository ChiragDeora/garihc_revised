"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
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
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {/* Logo */}
        <a
          href="#"
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

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 20,
            background: "rgba(255,255,255,0.1)",
          }}
        />

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: isActive ? "#BFA67A" : "rgba(245,245,240,0.5)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  position: "relative",
                  paddingBottom: 2,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "#F5F5F0";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = isActive
                    ? "#BFA67A"
                    : "rgba(245,245,240,0.5)";
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
          })}
        </div>
      </div>
    </nav>
  );
}
