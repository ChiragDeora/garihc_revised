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
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "0.75rem",
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
            fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            fontWeight: 400,
            color: "#F5F5F0",
            margin: "0 0 2rem 0",
            lineHeight: 1.3,
          }}
        >
          We don&apos;t advise.{" "}
          <span style={{ whiteSpace: "nowrap" }}>We build.</span>
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
              fontSize: "1.2rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.85)",
              maxWidth: 640,
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
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              color: "rgba(245,245,240,0.6)",
              maxWidth: 640,
            }}
          >
            Every engagement starts the same way: understand how the business
            actually runs, find what&apos;s broken, then build the fix. Not the
            other way around.
          </p>
        </motion.div>

        {/* Intro to They vs We */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            margin: "0 0 1.5rem 0",
            color: "rgba(245,245,240,0.9)",
            maxWidth: 640,
          }}
        >
          Most consultancies follow the same script. We don&apos;t.
        </motion.p>

        {/* They vs We */}
        <motion.div
          className="about-they-we"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem 2rem",
            maxWidth: 760,
            marginTop: "3rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(245,245,240,0.4)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            They
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#BFA67A",
              fontWeight: 500,
              margin: 0,
            }}
          >
            We
          </p>

          {[
            {
              they: "Send a strategy deck and call it delivery.",
              we: "Ship working software before they finish their audit.",
            },
            {
              they: "Staff juniors, bill for seniors.",
              we: "The person you talk to is the person who builds it.",
            },
            {
              they: 'Throw "AI" into every pitch because it\'s trending.',
              we: "Use a spreadsheet when that's what you need.",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="about-they-we-row"
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem 2rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-outfit), serif",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  margin: 0,
                  color: "rgba(245,245,240,0.45)",
                  textDecoration: "line-through",
                }}
              >
                {row.they}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-outfit), serif",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  margin: 0,
                  color: "rgba(245,245,240,0.9)",
                }}
              >
                {row.we}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
