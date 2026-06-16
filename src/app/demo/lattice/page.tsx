import ExpandableLattice from "@/components/ExpandableLattice";

export default function LatticeDemoPage() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#0A0A0A", overflow: "hidden" }}>
      <ExpandableLattice />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          pointerEvents: "none",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "#F5F5F0",
            margin: 0,
          }}
        >
          GARIHC
        </h1>
        <p
          style={{
            fontFamily: "var(--font-outfit, Helvetica Neue, sans-serif)",
            fontSize: "0.85rem",
            color: "rgba(245,245,240,0.5)",
            marginTop: "1.5rem",
            letterSpacing: "0.05em",
          }}
        >
          Scroll down to expand the sphere
        </p>
      </div>
    </div>
  );
}
