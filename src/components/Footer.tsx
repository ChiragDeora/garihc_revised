"use client";

export default function Footer() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

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
            href="mailto:info@garihc.com"
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 400,
              color: "#F5F5F0",
              textDecoration: "none",
              padding: "14px 28px",
              borderRight: "1px solid rgba(255,255,255,0.12)",
              transition: "background 0.3s",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Email for work.
          </a>
          <div
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 400,
              color: "#F5F5F0",
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ADE80",
                display: "inline-block",
                boxShadow: "0 0 8px rgba(74,222,128,0.4)",
              }}
            />
            Available for {currentMonth}
          </div>
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
