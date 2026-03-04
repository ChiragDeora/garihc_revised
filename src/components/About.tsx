"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
          We don&apos;t advise. We build.
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
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.85)",
              maxWidth: 600,
            }}
          >
            GARIHC is a technology consultancy for businesses that need more
            than a recommendation - they need the solution built and shipped.
            AI systems, custom software, product development, go-to-market
            strategy. Industries range from manufacturing to consumer brands
            to industrial distribution.
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.6)",
              maxWidth: 600,
            }}
          >
            Every engagement starts the same way: understand how the business
            actually runs, find what&apos;s broken, then build the fix. Not the
            other way around.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
