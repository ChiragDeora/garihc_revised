"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableLattice from "./ExpandableLattice";

const GARIHC = "GARIHC";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const cyclingItems = [
    "a new website",
    "an AI chatbot",
    "a mobile app",
    "better analytics",
];

function useTextScramble(text: string, delay: number = 0) {
    const [display, setDisplay] = useState(text.split(""));
    const [started, setStarted] = useState(false);

    const start = useCallback(() => {
        if (started) return;
        setStarted(true);

        const length = text.length;
        const iterations = 10;
        let frame = 0;

        const timer = setInterval(() => {
            setDisplay(
                text.split("").map((char, i) => {
                    if (frame - delay / 30 > i * 3) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
            );
            frame++;
            if (frame > iterations * length + delay / 30) {
                setDisplay(text.split(""));
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [text, delay, started]);

    return { display, start };
}

export default function Intro() {
    const [mounted, setMounted] = useState(false);
    const [showCycling, setShowCycling] = useState(false);
    const { display, start } = useTextScramble(GARIHC, 300);
    const [cycleIndex, setCycleIndex] = useState(0);
    const [phase, setPhase] = useState<"scramble" | "cycling" | "reveal">("scramble");

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(start, 500);
        const cyclingTimer = setTimeout(() => setShowCycling(true), 1500);
        return () => { clearTimeout(timer); clearTimeout(cyclingTimer); };
    }, [start]);

    // Start cycling after scramble completes
    useEffect(() => {
        if (!mounted) return;
        const timer = setTimeout(() => setPhase("cycling"), 2100);
        return () => clearTimeout(timer);
    }, [mounted]);

    // Cycle through items
    useEffect(() => {
        if (phase !== "cycling") return;
        const timer = setInterval(() => {
            setCycleIndex((prev) => {
                if (prev >= cyclingItems.length - 1) {
                    setTimeout(() => setPhase("reveal"), 750);
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 1150);
        return () => clearInterval(timer);
    }, [phase]);

    return (
        <section
            className="intro-hero"
            style={{
                minHeight: "100vh",
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "#0A0A0A",
                boxSizing: "border-box",
            }}
        >
            <ExpandableLattice />

            {/* Central glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.3 }}
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    background:
                        "radial-gradient(circle, rgba(191,166,122,0.04) 0%, transparent 60%)",
                    pointerEvents: "none",
                }}
            />

            {/* GARIHC Letters */}
            <div style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "center" }}>
                <h1
                    className="hero-title"
                    style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(3rem, 13vw, 11rem)",
                        fontWeight: 300,
                        letterSpacing: "clamp(0.15em, 3vw, 0.35em)",
                        margin: 0,
                        paddingLeft: "0.18em",
                        paddingRight: "0.18em",
                        color: "#F5F5F0",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                    }}
                >
                    {display.join("")}
                </h1>
            </div>

            {/* Cycling / reveal text — both always in DOM to prevent LCP and CLS issues */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    marginTop: "3rem",
                    textAlign: "center",
                    maxWidth: 600,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Cycling content — fades out on reveal */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "absolute",
                        inset: 0,
                        opacity: phase !== "reveal" && showCycling ? 1 : 0,
                        transform: phase === "reveal" ? "translateY(-20px)" : "translateY(0)",
                        transition: "opacity 0.5s cubic-bezier(0.32,0.72,0,1), transform 0.5s cubic-bezier(0.32,0.72,0,1)",
                        pointerEvents: phase !== "reveal" ? "auto" : "none",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                            fontWeight: 300,
                            color: "var(--text-secondary)",
                            margin: "0 0 0.5rem 0",
                            letterSpacing: "0.02em",
                        }}
                    >
                        You think you need
                    </p>
                    <div style={{ height: "3.5rem", overflow: "hidden", position: "relative" }}>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={cycleIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    fontFamily: "var(--font-cormorant), serif",
                                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                                    fontWeight: 400,
                                    color: "#F5F5F0",
                                    display: "block",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {cyclingItems[cycleIndex]}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                    style={{
                                        display: "inline-block",
                                        width: 2,
                                        height: "1.2em",
                                        background: "#C4663A",
                                        marginLeft: 4,
                                        verticalAlign: "text-bottom",
                                    }}
                                />
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Reveal punchline — always in DOM, fades in on reveal */}
                <div
                    style={{
                        textAlign: "center",
                        opacity: phase === "reveal" ? 1 : 0,
                        transform: phase === "reveal" ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 1s cubic-bezier(0.32,0.72,0,1), transform 1s cubic-bezier(0.32,0.72,0,1)",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                            fontWeight: 400,
                            color: "#F5F5F0",
                            margin: 0,
                            lineHeight: 1.4,
                        }}
                    >
                        You need someone who diagnoses
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #C4663A, #D4845A)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            the real problem and builds the whole solution.
                        </span>
                    </p>
                </div>
            </div>

            {/* Subline — always in DOM to prevent CLS */}
            <p
                style={{
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
                    fontWeight: 300,
                    color: "var(--text-secondary)",
                    marginTop: "1.5rem",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    opacity: phase === "reveal" ? 1 : 0,
                    transition: "opacity 0.8s ease 0.6s",
                }}
            >
                Strategy, AI, development, and design - all under one roof.
            </p>

            {/* CTA — always in DOM to prevent CLS */}
            <div
                className="hero-cta-wrap"
                style={{
                    position: "relative",
                    zIndex: 1,
                    marginTop: "2.5rem",
                    opacity: phase === "reveal" ? 1 : 0,
                    transform: phase === "reveal" ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s",
                }}
            >
                <a
                    href="/contact"
                    className="btn-accent"
                    style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        padding: "14px 36px",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--accent-warm)";
                        e.currentTarget.style.boxShadow =
                            "0 0 30px rgba(196,102,58,0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent-warm)";
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    Let&apos;s start with a conversation
                </a>
            </div>

            {/* Lattice morphs into arrow on scroll — replaces old Lottie arrow */}
        </section>
    );
}
