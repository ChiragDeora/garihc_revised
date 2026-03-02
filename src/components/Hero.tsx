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
          Strategy. Technology.
          <br />
          <span className="gradient-gold">Taste.</span>
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
          AI-powered consulting for brands with ambition.
        </p>

        {/* Button */}
        <div className="hero-animate hero-animate-delay-4" style={{ marginTop: "2.5rem" }}>
          <a href="#contact" className="btn-primary">
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
          alt="GARIHC — Strategy, Technology, Taste"
          className="hero-image"
          style={{ width: "100%" }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-animate hero-animate-delay-5 scroll-indicator hidden md:flex"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          className="text-grey"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 30,
            background: "linear-gradient(180deg, #B8A88A, transparent)",
          }}
        />
      </div>
    </section>
  );
}
