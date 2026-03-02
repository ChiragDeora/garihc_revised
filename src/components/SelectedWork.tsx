"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const projects = [
  {
    name: "SPCO",
    tag: "WEB · PLATFORM",
    description:
      "End-to-end web development for an industrial parts marketplace.",
    link: "https://www.spco.in/",
    hasEmbed: true,
  },
  {
    name: "Foal & Pony",
    tag: "BRANDING · D2C · WEB",
    description:
      "Premium kids eyewear. Brand identity, website, and D2C launch across India.",
    link: "https://foalandpony.com/",
    hasEmbed: true,
  },
  {
    name: "Production Management System",
    tag: "AI · FULL-STACK",
    description:
      "Built an entire production management system. Workflow automation, real-time tracking, and reporting.",
    link: null,
    image: "/project-three.png",
    nda: true,
  },
  {
    name: "Freelance Consulting",
    tag: "STRATEGY",
    description:
      "Ongoing strategic and technical consulting for select clients across industries.",
    link: null,
    image: null,
    nda: true,
  },
];

function LiveSiteEmbed({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 60px rgba(0,0,0,0.4)",
        position: "relative",
        background: "#111111",
      }}
    >
      {/* Dark browser chrome */}
      <div
        style={{
          background: "#1A1A1A",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FEBC2E",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 6,
            padding: "5px 12px",
            fontSize: "0.7rem",
            fontFamily: "var(--font-outfit), sans-serif",
            color: "var(--text-muted)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {url}
        </div>
      </div>

      {!loaded && !error && (
        <div
          style={{
            height: 450,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111111",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            Loading {name}...
          </span>
        </div>
      )}

      {!error && (
        <iframe
          src={url}
          title={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: "100%",
            height: loaded ? 450 : 0,
            border: "none",
            display: loaded ? "block" : "none",
            background: "#FFFFFF",
          }}
        />
      )}

      {error && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
            background: "#111111",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.85rem",
              color: "#BFA67A",
            }}
          >
            Visit {name} →
          </span>
        </a>
      )}

      {loaded && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: "linear-gradient(transparent, rgba(17,17,17,0.95))",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "12px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.65rem",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#BFA67A",
              background: "rgba(191,166,122,0.08)",
              padding: "6px 18px",
              borderRadius: 20,
              border: "1px solid rgba(191,166,122,0.2)",
            }}
          >
            Visit Live Site →
          </span>
        </a>
      )}
    </div>
  );
}

export default function SelectedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.02 });

  return (
    <section
      id="work"
      ref={ref}
      style={{ background: "#0A0A0A", padding: "160px 1.5rem" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "5rem",
            opacity: isInView ? 1 : 0.3,
            transition: "opacity 0.6s ease",
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
            PORTFOLIO
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              color: "#F5F5F0",
              margin: 0,
            }}
          >
            Selected Work
          </h2>
        </div>

        {/* Project list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.name}
              style={{
                opacity: isInView ? 1 : 0.1,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
              }}
            >
              {project.hasEmbed && project.link ? (
                <LiveSiteEmbed url={project.link} name={project.name} />
              ) : project.image ? (
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: 16,
                    lineHeight: 0,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 450,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    height: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: "var(--text-muted)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Under NDA
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      margin: 0,
                      color: "#F5F5F0",
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
              )}

              {/* Project info */}
              <div
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        margin: 0,
                        color: "#F5F5F0",
                      }}
                    >
                      {project.name}
                    </h3>
                    {project.nda && (
                      <span
                        style={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.55rem",
                          fontWeight: 400,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#BFA67A",
                          border: "1px solid rgba(191,166,122,0.3)",
                          borderRadius: 4,
                          padding: "3px 8px",
                        }}
                      >
                        NDA
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      marginTop: "0.35rem",
                      color: "var(--text-secondary)",
                      maxWidth: 600,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {project.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
