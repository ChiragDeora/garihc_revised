export default function Hero() {
  return (
    <section className="hero-section bg-white">
      <div className="mx-auto text-center" style={{ maxWidth: 1100, padding: "0 1.5rem" }}>
        {/* Label */}
        <p
          className="section-label hero-animate hero-animate-delay-1"
          style={{ marginBottom: "2rem" }}
        >
          FREELANCE CONSULTANCY
        </p>

        {/* Headline */}
        <h1
          className="hero-headline text-charcoal hero-animate hero-animate-delay-2"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          We understand your business
          <br />
          and build the{" "}
          <span className="gradient-gold">complete solution.</span>
        </h1>

        {/* Subline */}
        <p
          className="text-grey hero-animate hero-animate-delay-3"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "1.15rem",
            fontWeight: 300,
            marginTop: "1.8rem",
            lineHeight: 1.6,
          }}
        >
          Strategy, AI, development, and design - from one person who does it all.
        </p>

        {/* Button */}
        <div className="hero-animate hero-animate-delay-4" style={{ marginTop: "2.5rem" }}>
          <a
            href="/contact"
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              padding: "16px 44px",
              color: "#FFFFFF",
              background: "var(--accent-warm)",
              textDecoration: "none",
              display: "inline-block",
              borderRadius: 4,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              border: "1px solid var(--accent-warm)",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.background = "transparent";
              t.style.color = "var(--accent-warm)";
              t.style.boxShadow = "0 0 30px rgba(196,102,58,0.2)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.background = "var(--accent-warm)";
              t.style.color = "#FFFFFF";
              t.style.boxShadow = "none";
            }}
          >
            <span>Inquire</span>
          </a>
        </div>
      </div>

      {/* Full-width image */}
      <div
        className="hero-animate hero-animate-delay-5"
        style={{ marginTop: "5rem", lineHeight: 0 }}
      >
        <img
          src="/hero-bg.png"
          alt="GARIHC - Strategy, AI, Development, and Design"
          className="hero-image"
          style={{ width: "100%" }}
        />
      </div>

      {/* Client logo strip */}
      <div
        className="hero-animate hero-animate-delay-5"
        style={{
          borderTop: "1px solid #E8E5E0",
          padding: "1.5rem 0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "0.7rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#AAAAAA",
            margin: 0,
          }}
        >
          SPCO &nbsp;·&nbsp; Foal &amp; Pony &nbsp;·&nbsp; Stallion Eyewear &nbsp;·&nbsp; Deora Polyplast
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-animate hero-animate-delay-5 scroll-hint hidden md:flex"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span className="scroll-hint__label">Explore</span>
        <span className="scroll-hint__chevron" />
      </div>
    </section>
  );
}
