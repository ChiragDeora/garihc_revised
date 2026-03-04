"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GARIHC = "GARIHC";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const cyclingItems = [
    "a new website",
    "an AI chatbot",
    "a mobile app",
    "better analytics",
];

function useTextScramble(text: string, delay: number = 0) {
    const [display, setDisplay] = useState(text.split("").map(() => " "));
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const { display, start } = useTextScramble(GARIHC, 300);
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const [cycleIndex, setCycleIndex] = useState(0);
    const [phase, setPhase] = useState<"scramble" | "cycling" | "reveal">("scramble");

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(start, 500);
        return () => clearTimeout(timer);
    }, [start]);

    // Start cycling after scramble completes
    useEffect(() => {
        if (!mounted) return;
        const timer = setTimeout(() => setPhase("cycling"), 2200);
        return () => clearTimeout(timer);
    }, [mounted]);

    // Cycle through items
    useEffect(() => {
        if (phase !== "cycling") return;
        const timer = setInterval(() => {
            setCycleIndex((prev) => {
                if (prev >= cyclingItems.length - 1) {
                    // After last item, reveal the punchline
                    setTimeout(() => setPhase("reveal"), 800);
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);
        return () => clearInterval(timer);
    }, [phase]);

    // Animated grid
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animFrame: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouse = (e: MouseEvent) => {
            mousePos.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener("mousemove", onMouse);

        const draw = () => {
            time += 0.003;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const spacing = 50;
            const cols = Math.ceil(canvas.width / spacing) + 1;
            const rows = Math.ceil(canvas.height / spacing) + 1;
            const mx = mousePos.current.x * canvas.width;
            const my = mousePos.current.y * canvas.height;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    const dx = x - mx;
                    const dy = y - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const wave =
                        Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time * 0.7);
                    const proximity = Math.max(0, 1 - dist / 300);
                    const opacity = 0.06 + wave * 0.03 + proximity * 0.15;

                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(191, 166, 122, ${Math.max(0, Math.min(0.3, opacity))})`;
                    ctx.fill();
                }
            }
            animFrame = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouse);
        };
    }, []);

    return (
        <section
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
                padding: "3rem 2rem",
                boxSizing: "border-box",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            />

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
            <div style={{ position: "relative", zIndex: 1, transform: "translateX(0.12em)" }}>
                <h1
                    style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(3.5rem, 12vw, 9rem)",
                        fontWeight: 300,
                        letterSpacing: "0.35em",
                        margin: 0,
                        paddingRight: "0.35em",
                        color: "#F5F5F0",
                    }}
                >
                    {display.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={mounted ? { opacity: 1 } : {}}
                            transition={{ duration: 0.1, delay: 0.5 + i * 0.05 }}
                            style={{
                                display: "inline-block",
                                minWidth: "0.6em",
                                textAlign: "center",
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>
            </div>

            {/* Cycling hero text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 2.5 }}
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
                <AnimatePresence mode="wait">
                    {phase !== "reveal" ? (
                        <motion.div
                            key="cycling"
                            initial={{ opacity: 1 }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                transition: {
                                    duration: 0.5,
                                    ease: [0.32, 0.72, 0, 1],
                                },
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {/* "You think you need" - static */}
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

                            {/* Cycling word */}
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
                        </motion.div>
                    ) : (
                        /* Reveal - the punchline */
                        <motion.div
                            key="reveal"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.32, 0.72, 0, 1],
                            }}
                            style={{ textAlign: "center" }}
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Subline - appears after reveal */}
            <AnimatePresence>
                {phase === "reveal" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
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
                        }}
                    >
                        Strategy, AI, development, and design - all under one roof.
                    </motion.p>
                )}
            </AnimatePresence>

            {/* CTA - appears after reveal */}
            <AnimatePresence>
                {phase === "reveal" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        style={{
                            position: "relative",
                            zIndex: 1,
                            marginTop: "2.5rem",
                        }}
                    >
                        <a
                            href="#contact"
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.65rem",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                color: "#FFFFFF",
                                textDecoration: "none",
                                background: "var(--accent-warm)",
                                border: "1px solid var(--accent-warm)",
                                padding: "14px 36px",
                                borderRadius: 4,
                                transition: "all 0.4s ease",
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: phase === "reveal" ? 1 : 0 } : {}}
                transition={{ duration: 1, delay: phase === "reveal" ? 1.8 : 0 }}
                style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 400,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "0.75rem",
                    }}
                >
                    Scroll
                </span>
                <motion.div
                    style={{
                        width: 1,
                        height: 40,
                        background: "linear-gradient(180deg, #BFA67A, transparent)",
                        transformOrigin: "top",
                    }}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </section>
    );
}
