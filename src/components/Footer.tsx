"use client";

import { CAL_LINK, gmailComposeUrl } from "@/lib/contact";

export default function Footer() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentMonthShort = new Date().toLocaleString("default", { month: "short" });

  return (
    <footer
      className="site-footer"
      style={{
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
      }}
    >
      {/* CTA Pill */}
      <div
        className="footer-cta"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "4rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="footer-cta-pill"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            borderRadius: 50,
            border: "1px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          <a
            href={gmailComposeUrl(undefined, "Work inquiry — GARIHC")}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta-link footer-cta-link-email"
          >
            Email for work.
          </a>
          <button
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
            className="footer-cta-link footer-cta-link-availability"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="footer-cta-dot" />
            <span className="footer-month-full">Available for {currentMonth}</span>
            <span className="footer-month-short">Avail. {currentMonthShort}</span>
          </button>
        </div>
      </div>

      {/* Giant GARIHC text */}
      <div
        className="footer-brand"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          lineHeight: 0.75,
          paddingBottom: 0,
          marginBottom: "-0.08em",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "clamp(6rem, 18vw, 20rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#F5F5F0",
            margin: 0,
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            userSelect: "none",
            transform: "translateY(15%)",
          }}
        >
          GARIHC
          <span
            style={{
              fontSize: "0.3em",
              verticalAlign: "super",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 400,
            }}
          >
            ™
          </span>
        </h2>
      </div>

      {/* Footer bottom: copyright / legal */}
      <div
        className="footer-bottom"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "2rem 1.5rem",
          paddingBottom: "max(2rem, calc(1rem + env(safe-area-inset-bottom)))",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} GARIHC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
