"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const services = [
  {
    number: "01",
    name: "AI Workflow Automation",
    description:
      "Custom AI pipelines that eliminate repetitive tasks and free your team to focus on what matters.",
  },
  {
    number: "02",
    name: "AI Business Intelligence",
    description:
      "Dashboards and reporting that don't just display data. They tell you what to do next.",
  },
  {
    number: "03",
    name: "Custom AI Agents",
    description:
      "Intelligent assistants tailored to your business processes and customer needs.",
  },
  {
    number: "04",
    name: "Brand Strategy",
    description:
      "Positioning, messaging, and identity for brands that want to lead, not follow.",
  },
  {
    number: "05",
    name: "Web & Product Dev",
    description:
      "Websites, platforms, and digital products built with precision and purpose.",
  },
  {
    number: "06",
    name: "Creative Direction",
    description:
      "The visual oversight that ensures everything you put out feels intentional.",
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
          maxHeight: hovered ? 80 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, padding 0.4s ease",
          paddingBottom: hovered ? "1.5rem" : 0,
          paddingLeft: "4.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "0.85rem",
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
      style={{ background: "#0A0A0A", padding: "160px 1.5rem" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "4rem",
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
            <span style={{ color: "var(--text-secondary)" }}>ambitious brands.</span>
          </h2>
        </div>

        {/* Accordion rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {services.map((s, i) => (
            <ServiceRow key={s.name} service={s} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
