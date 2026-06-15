"use client";

import { useEffect, useRef, useState } from "react";

export default function FuturisticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.role === "tab" ||
        target.closest("a") ||
        target.closest("button");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="futuristic-cursor"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.4 : 1})`,
          opacity: isHovering ? 1 : 0.7,
        }}
      >
        {/* Core dot */}
        <div className="cursor-core" />

        {/* Glow rings */}
        <div className="cursor-ring cursor-ring-1" />
        <div className="cursor-ring cursor-ring-2" />
        <div className="cursor-ring cursor-ring-3" />

        {/* Intensity field - intensifies background */}
        <div className="cursor-intensity-field" />
      </div>

      <div className="cursor-background-effect" />
    </>
  );
}
