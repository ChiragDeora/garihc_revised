"use client";

import { useEffect, useRef } from "react";

const letters = [
  {
    letter: "G",
    word: "Guiding",
    description:
      "We sit with you, understand your business inside out - the problem, the market, the goal - and build a strategy before writing a single line of code.",
  },
  {
    letter: "A",
    word: "Ambitions",
    description:
      "We build strategies for visions that others dismiss as impossible. Scale doesn\u2019t intimidate us.",
  },
  {
    letter: "R",
    word: "Realizing",
    description:
      "We take that strategy and build it - AI automations, web platforms, dashboards, ERP systems, whatever the solution demands.",
  },
  {
    letter: "I",
    word: "Innovations",
    description:
      "From AI agents to product architecture - we bring what\u2019s next into what\u2019s now. End to end.",
  },
  {
    letter: "H",
    word: "Harnessing",
    description:
      "We take raw creativity, emerging technology, and sharp data - and make them work together.",
  },
  {
    letter: "C",
    word: "Creativity",
    description:
      "We make sure it doesn\u2019t just work - it looks right, feels right, and communicates the brand. Design baked into every build.",
  },
];

export default function GarihcMeaning() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="meaning"
      style={{
        background: "#0A0A0A",
        padding: "160px 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      ref={sectionRef}
    >
      <div className="mx-auto" style={{ maxWidth: 1100, padding: "0 1.5rem" }}>
        <p
          className="section-label text-center fade-in-up"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "0.65rem",
            color: "#BFA67A",
            fontWeight: 400,
            marginBottom: "2rem",
          }}
        >
          THE NAME
        </p>

        {/* One Promise statement */}
        <div className="fade-in-up" style={{ maxWidth: 700, margin: "0 auto 4rem auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.7,
              color: "rgba(245,245,240,0.8)",
              margin: 0,
            }}
          >
            &ldquo;GARIHC stands for Guiding Ambitions, Realizing Innovations, Harnessing
            Creativity - it&rsquo;s not three services, it&rsquo;s one promise. We take your business
            problem from understanding to strategy to a fully built, beautifully designed
            solution. All under one roof.&rdquo;
          </p>
        </div>

        <div className="stagger-children">
          {letters.map((item) => (
            <div
              key={item.letter}
              className="fade-in-up"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "3rem 0",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1rem",
                transition: "background 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(196, 102, 58, 0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <div
                style={{ width: "30%", minWidth: 120, flexShrink: 0, marginBottom: "1rem" }}
              >
                <span
                  className="garihc-letter"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    lineHeight: 1,
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    background: "linear-gradient(135deg, #BFA67A, #D4C4A0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.letter}
                </span>
              </div>

              <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    margin: "0 0 0.75rem 0",
                    color: "#F5F5F0",
                  }}
                >
                  {item.word}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: 0,
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
