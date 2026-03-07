"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only show cursor on client and when not a touch device (avoids hydration mismatch)
        if (typeof window === "undefined" || "ontouchstart" in window) return;
        setShowCursor(true);
    }, []);

    useEffect(() => {
        if (!showCursor) return;

        const onMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
        };

        const onMouseEnter = () => setVisible(true);
        const onMouseLeave = () => setVisible(false);

        // Track hoverable elements
        const addHoverListeners = () => {
            const hoverables = document.querySelectorAll("a, button, [data-hover]");
            hoverables.forEach((el) => {
                el.addEventListener("mouseenter", () => setHovering(true));
                el.addEventListener("mouseleave", () => setHovering(false));
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);

        addHoverListeners();

        // Observe DOM changes to catch dynamically added elements
        const observer = new MutationObserver(() => {
            addHoverListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Ring follow animation
        let frame: number;
        const animate = () => {
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [showCursor]);

    if (!showCursor) return null;

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#BFA67A",
                    pointerEvents: "none",
                    zIndex: 99999,
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.3s, width 0.3s, height 0.3s, background 0.3s",
                    mixBlendMode: "difference",
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `1.5px solid ${hovering ? "#BFA67A" : "rgba(245,245,240,0.3)"}`,
                    pointerEvents: "none",
                    zIndex: 99998,
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.3s, width 0.35s, height 0.35s, border-color 0.3s",
                    ...(hovering
                        ? { width: 60, height: 60, marginLeft: -10, marginTop: -10 }
                        : {}),
                    mixBlendMode: "difference",
                }}
            />
        </>
    );
}
