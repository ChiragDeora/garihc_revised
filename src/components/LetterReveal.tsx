"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const pairedLetters = [
    {
        letters: ["G", "A"],
        words: ["Guiding", "Ambitions"],
        descriptions: [
            "We start with your north star, mapping the clearest path to where you want to be.",
            "We build strategies for visions that others dismiss as impossible.",
        ],
    },
    {
        letters: ["R", "I"],
        words: ["Realizing", "Innovations"],
        descriptions: [
            "We deliver tangible, measurable outcomes. Shipped, not just planned.",
            "From AI automation to product architecture, we bring what's next into what's now.",
        ],
    },
    {
        letters: ["H", "C"],
        words: ["Harnessing", "Creativity"],
        descriptions: [
            "We orchestrate raw creativity, emerging tech, and sharp data into something that works.",
            "The final layer that separates functional from unforgettable. Taste is not optional.",
        ],
    },
];

function PairedSection({
    pair,
    index,
}: {
    pair: (typeof pairedLetters)[0];
    index: number;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    return (
        <section
            ref={sectionRef}
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background: index % 2 === 0 ? "#0A0A0A" : "#0F0F0F",
                padding: "4rem 1.5rem",
                overflow: "hidden",
            }}
        >
            {/* Section counter */}
            <span
                style={{
                    position: "absolute",
                    top: "2rem",
                    right: "2rem",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.8s ease",
                }}
            >
                0{index + 1} / 03
            </span>

            <div
                style={{
                    maxWidth: 1100,
                    width: "100%",
                    display: "flex",
                    gap: "4rem",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                {pair.letters.map((letter, i) => (
                    <motion.div
                        key={letter}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                            flex: "1 1 320px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {/* Big letter */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={
                                isInView
                                    ? { scale: 1, opacity: 1 }
                                    : { scale: 0.8, opacity: 0 }
                            }
                            transition={{
                                duration: 1,
                                delay: i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "clamp(8rem, 20vw, 14rem)",
                                fontWeight: 300,
                                lineHeight: 0.85,
                                userSelect: "none",
                                color: "#F5F5F0",
                                textShadow: isInView
                                    ? "0 0 80px rgba(191,166,122,0.15), 0 0 160px rgba(191,166,122,0.05)"
                                    : "none",
                                transition: "text-shadow 1s ease",
                            }}
                        >
                            {letter}
                        </motion.div>

                        {/* Word */}
                        <motion.h3
                            initial={{ opacity: 0, y: 15 }}
                            animate={
                                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                            }
                            transition={{
                                duration: 0.6,
                                delay: 0.3 + i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                                fontWeight: 500,
                                margin: "1.5rem 0 0.5rem 0",
                                color: "#BFA67A",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            {pair.words[i]}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                            }
                            transition={{
                                duration: 0.6,
                                delay: 0.45 + i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                lineHeight: 1.75,
                                margin: 0,
                                color: "var(--text-secondary)",
                                maxWidth: 360,
                            }}
                        >
                            {pair.descriptions[i]}
                        </motion.p>
                    </motion.div>
                ))}
            </div>

            {/* Bottom accent line */}
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                    position: "absolute",
                    bottom: "3rem",
                    height: 2,
                    background:
                        "linear-gradient(90deg, transparent, #BFA67A, transparent)",
                }}
            />
        </section>
    );
}

export default function LetterReveal() {
    return (
        <>
            {pairedLetters.map((pair, index) => (
                <PairedSection key={pair.letters.join("")} pair={pair} index={index} />
            ))}
        </>
    );
}
