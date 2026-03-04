"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const items = [
  {
    number: "01",
    title: "Automate Operations",
    description:
      "We audit your workflows and deploy AI systems that handle what used to take your team hours.",
  },
  {
    number: "02",
    title: "Intelligent Decisions",
    description:
      "AI-powered analytics that surface insights and recommendations, not just charts.",
  },
  {
    number: "03",
    title: "AI-First Products",
    description:
      "From recommendation engines to native AI features. We build it into your product.",
  },
];

export default function AISpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      style={{
        background: "#0F0F0F",
        padding: "160px 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orb */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(191,166,122,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Large watermark text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(15rem, 30vw, 30rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.015)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        AI
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          gap: "5rem",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left – heading */}
        <div
          style={{
            flex: "1 1 400px",
            opacity: isInView ? 1 : 0.3,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p
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
            THE AI EDGE
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
              color: "#F5F5F0",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Artificial Intelligence,
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              Applied Elegantly.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.95rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "var(--text-secondary)",
            }}
          >
            We identify where intelligence creates compounding value. Quietly,
            reliably, at scale.
          </p>
          <a
            href="/calculator"
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent-warm)",
              textDecoration: "none",
              marginTop: "1.5rem",
              display: "inline-block",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Calculate Your AI Savings →
          </a>
        </div>

        {/* Right – glass cards */}
        <div
          style={{
            flex: "1 1 400px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.number}
              className="glass-card"
              style={{
                padding: "2rem",
                opacity: isInView ? 1 : 0.1,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${200 + i * 120}ms, transform 0.6s ease ${200 + i * 120}ms, border-color 0.4s ease, box-shadow 0.4s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(191,166,122,0.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(191,166,122,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                  display: "block",
                  color: "#BFA67A",
                }}
              >
                {item.number}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  margin: "0 0 0.5rem 0",
                  color: "#F5F5F0",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  margin: 0,
                  color: "var(--text-secondary)",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
