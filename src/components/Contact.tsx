"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CALENDLY_URL, gmailComposeUrl } from "@/lib/contact";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [borderProgress, setBorderProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    let start: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setBorderProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <section
      id="contact"
      ref={ref}
      className="contact-section"
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "4rem 1.5rem",
      }}
    >
      {/* Animated border frame */}
      <div
        className="contact-border-frame"
        style={{
          position: "absolute",
          inset: "2rem",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            width: `${Math.min(borderProgress * 4, 1) * 100}%`,
            background: "rgba(191,166,122,0.15)",
            transition: "none",
          }}
        />
        {/* Right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 1,
            height: `${Math.max(0, Math.min((borderProgress - 0.25) * 4, 1)) * 100}%`,
            background: "rgba(191,166,122,0.15)",
          }}
        />
        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 1,
            width: `${Math.max(0, Math.min((borderProgress - 0.5) * 4, 1)) * 100}%`,
            background: "rgba(191,166,122,0.15)",
            transformOrigin: "right",
          }}
        />
        {/* Left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 1,
            height: `${Math.max(0, Math.min((borderProgress - 0.75) * 4, 1)) * 100}%`,
            background: "rgba(191,166,122,0.15)",
            transformOrigin: "bottom",
          }}
        />
      </div>

      {/* Background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "35vw",
          fontWeight: 300,
          color: "rgba(255,255,255,0.015)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ?
      </div>

      <div
        style={{
          maxWidth: 800,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: "0 0 2.5rem 0",
            color: "#F5F5F0",
          }}
        >
          <span className="contact-headline">Got a problem worth solving?</span>
        </motion.h2>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={gmailComposeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontWeight: 300,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.3s",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = "#BFA67A";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = "var(--text-secondary)";
            }}
          >
            info@garihc.com
          </a>
        </motion.div>

        {/* Social links - commented out for now
        <div
          style={{
            width: 1,
            height: 50,
            background: "rgba(255,255,255,0.06)",
            margin: "3rem auto",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          {["LinkedIn", "Twitter"].map((name) => (
            <a
              key={name}
              href="#"
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              {name}
            </a>
          ))}
        </motion.div>
        */}

        {/* CTA — two ways to start */}
        <motion.div
          className="contact-cta-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent contact-cta-btn"
          >
            Book a call
          </a>
          <a
            href={gmailComposeUrl(undefined, "New project — GARIHC")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent contact-cta-btn contact-cta-btn-secondary"
          >
            Email us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
