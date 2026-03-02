"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: 4, suffix: "+", label: "Years Freelancing" },
  { number: 8, suffix: "+", label: "Projects Delivered" },
  { number: 3, suffix: "+", label: "Industries Served" },
];

function Counter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = Math.max(Math.floor(1500 / target), 30);
    const timer = setInterval(() => {
      n++;
      setCount(n);
      if (n >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);
  return (
    <>
      {active ? count : 0}
      {suffix}
    </>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#0F0F0F",
        padding: "160px 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "0.65rem",
            color: "#BFA67A",
            fontWeight: 400,
            marginBottom: "3rem",
          }}
        >
          ABOUT
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "#F5F5F0",
            margin: "0 0 2rem 0",
            lineHeight: 1.3,
          }}
        >
          Built from the ground up.
          <br />
          <span style={{ color: "var(--text-secondary)" }}>
            Always evolving.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "4rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.7)",
              maxWidth: 600,
            }}
          >
            GARIHC started over four years ago, born out of agency experience
            building websites and digital products for clients across
            industries. We went independent to do things differently.
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.7)",
              maxWidth: 600,
            }}
          >
            What started as web development evolved into something broader.
            We introduced AI workflow automation into our services, helping
            businesses not just look better but operate smarter. Custom AI
            agents, intelligent dashboards, automated pipelines.
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.7)",
              maxWidth: 600,
            }}
          >
            We work with select clients who want to combine sharp design
            with real technology. If that sounds like you, let&apos;s talk.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "2.5rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "4rem",
              flexWrap: "wrap",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{ display: "flex", alignItems: "center" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 1,
                      height: 50,
                      background: "rgba(255,255,255,0.06)",
                      marginRight: "4rem",
                    }}
                  />
                )}
                <div style={{ textAlign: "center", minWidth: 100 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "3.5rem",
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "#BFA67A",
                    }}
                  >
                    <Counter
                      target={stat.number}
                      suffix={stat.suffix}
                      active={isInView}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginTop: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
