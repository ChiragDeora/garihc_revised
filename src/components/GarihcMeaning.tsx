"use client";

import { useEffect, useRef } from "react";

const letters = [
  {
    letter: "G",
    word: "Guiding",
    description:
      "We start with your north star. Every engagement begins with understanding where you want to be — and mapping the clearest path there.",
  },
  {
    letter: "A",
    word: "Ambitions",
    description:
      "Scale doesn\u2019t intimidate us. We build strategies for visions that others dismiss as impossible.",
  },
  {
    letter: "R",
    word: "Realizing",
    description:
      "Ideas without execution are just words. We deliver tangible, measurable outcomes — shipped, not just planned.",
  },
  {
    letter: "I",
    word: "Innovations",
    description:
      "From AI automation to product architecture — we bring what\u2019s next into what\u2019s now.",
  },
  {
    letter: "H",
    word: "Harnessing",
    description:
      "We take raw creativity, emerging technology, and sharp data — and orchestrate them into something that works.",
  },
  {
    letter: "C",
    word: "Creativity",
    description:
      "The final layer that separates functional from unforgettable. Taste is not optional.",
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
      className="section-padding bg-ivory"
      ref={sectionRef}
    >
      <div className="mx-auto" style={{ maxWidth: 1100, padding: "0 1.5rem" }}>
        <p className="section-label text-center fade-in-up" style={{ marginBottom: "4rem" }}>
          THE NAME
        </p>

        <div className="stagger-children">
          {letters.map((item) => (
            <div
              key={item.letter}
              className="fade-in-up flex flex-col md:flex-row group cursor-default"
              style={{
                borderTop: "1px solid #E8E5E0",
                padding: "3rem 0",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(184, 168, 138, 0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <div
                className="md:w-[30%] flex-shrink-0"
                style={{ marginBottom: "1rem" }}
              >
                <span
                  className="garihc-letter gradient-gold"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    lineHeight: 1,
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {item.letter}
                </span>
              </div>

              <div className="md:w-[70%] flex flex-col justify-center">
                <h3
                  className="text-charcoal"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  {item.word}
                </h3>
                <p
                  className="text-grey"
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "1rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: 0,
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
