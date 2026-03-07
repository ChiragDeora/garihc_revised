"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

// AI Spotlight copy (three glass cards below "Artificial Intelligence, Applied Elegantly")
const aiSpotlightItems = [
  {
    number: "01",
    title: "Automate Operations",
    description:
      "Your team is doing work a machine should be doing. We audit your workflows, identify what can be automated, and deploy AI systems that run quietly in the background. Less manual effort, fewer errors, more output.",
  },
  {
    number: "02",
    title: "Intelligent Decisions",
    description:
      "Most dashboards show you what already happened. Ours tell you what to do about it. Real-time insights, pattern detection, and recommendations your team can act on without second-guessing.",
  },
  {
    number: "03",
    title: "AI-First Products",
    description:
      "We don't bolt AI onto your product as a feature. We build it into how the product thinks. Smart search, recommendation engines, predictive workflows, all native to the experience.",
  },
];

const services = [
  {
    number: "01",
    name: "Applied AI",
    description:
      "Automation, intelligence, and custom agents. Deployed where they actually move the needle, not where they look good on a pitch.",
  },
  {
    number: "02",
    name: "Web & Product Dev",
    description:
      "Websites, platforms, and digital products. Built with precision, shipped with purpose.",
  },
  {
    number: "03",
    name: "Systems & Integrations",
    description:
      "Connecting the tools your business already runs on. APIs, automations, and infrastructure that just works.",
  },
  {
    number: "04",
    name: "Digital Transformation",
    description:
      "Taking manual, broken workflows and rebuilding them into something your team actually wants to use.",
  },
];

function ServiceRow({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0",
        cursor: "default",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          paddingRight: 0,
          paddingLeft: hovered ? "1rem" : 0,
          position: "relative",
          transition: "padding 0.4s ease",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: hovered ? 2 : 0,
            background: "#BFA67A",
            transition: "width 0.3s ease",
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", flex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 400,
              color: hovered ? "#BFA67A" : "var(--text-muted)",
              transition: "color 0.3s",
              minWidth: "2rem",
            }}
          >
            {service.number}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 400,
              margin: 0,
              color: hovered ? "#F5F5F0" : "rgba(245,245,240,0.7)",
              transition: "color 0.3s",
            }}
          >
            {service.name}
          </h3>
        </div>

        {/* Arrow */}
        <span
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "1.2rem",
            color: hovered ? "#BFA67A" : "var(--text-muted)",
            transform: hovered ? "translateX(0) rotate(-45deg)" : "translateX(-10px) rotate(-45deg)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          →
        </span>
      </div>

      {/* Expandable description */}
      <div
        style={{
          maxHeight: hovered ? 180 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, padding 0.4s ease",
          paddingBottom: hovered ? "1.5rem" : 0,
          paddingLeft: "4.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.7,
            margin: 0,
            color: "var(--text-secondary)",
            maxWidth: 500,
          }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "160px 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow (from AI Spotlight) */}
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

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
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
              marginBottom: "1rem",
            }}
          >
            WHAT WE DO
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#F5F5F0",
              margin: 0,
              lineHeight: 1.2,
              maxWidth: 500,
            }}
          >
            Services built for
            <br />
            <span style={{ color: "var(--text-secondary)" }}>ambitious businesses.</span>
          </h2>
        </div>

        {/* Services accordion */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {services.map((s, i) => (
            <ServiceRow key={s.name} service={s} index={i} isInView={isInView} />
          ))}
        </div>

        {/* AI block: watermark behind title + cards */}
        <div
          style={{
            marginTop: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* AI watermark – behind this block only */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(12rem, 25vw, 24rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.02)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
              zIndex: 0,
            }}
          >
            AI
          </div>

          {/* AI intro + calculator */}
          <div
            style={{
              maxWidth: 560,
              position: "relative",
              zIndex: 1,
              opacity: isInView ? 1 : 0.3,
              transform: isInView ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
          <h3
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: "0 0 1rem 0",
              color: "#F5F5F0",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            }}
          >
            Artificial Intelligence,
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              Applied Elegantly.
            </span>
          </h3>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "1.05rem",
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
            Calculate your AI savings →
          </a>
          </div>

          {/* Three AI glass cards – stacked full width to fill space */}
          <div
            className="services-ai-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
              marginTop: "2.5rem",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
          {aiSpotlightItems.map((item, i) => (
            <div
              key={item.number}
              className="glass-card"
              style={{
                padding: "2rem 2.5rem",
                opacity: isInView ? 1 : 0.1,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${200 + i * 120}ms, transform 0.6s ease ${200 + i * 120}ms, border-color 0.4s ease, box-shadow 0.4s ease`,
                border: "1px solid rgba(255,255,255,0.06)",
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
              <h4
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                  fontWeight: 500,
                  margin: "0 0 0.5rem 0",
                  color: "#F5F5F0",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  margin: 0,
                  color: "var(--text-secondary)",
                  maxWidth: "none",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
