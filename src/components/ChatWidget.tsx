"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const suggestions = [
    "What does GARIHC do?",
    "How can AI help my business?",
    "Tell me about your past work",
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Show tooltip after delay or on scroll (understated - not on immediate load)
    useEffect(() => {
        const seen = sessionStorage.getItem("garihc-chat-tooltip");
        if (seen) return;

        const delayMs = 7000; // 7 seconds
        const scrollThreshold = 350; // show after user scrolls this far

        const timer = setTimeout(() => setShowTooltip(true), delayMs);

        const onScroll = () => {
            if (window.scrollY >= scrollThreshold) {
                setShowTooltip(true);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        setHasInteracted(true);
        setShowTooltip(false);
        sessionStorage.setItem("garihc-chat-tooltip", "true");

        const userMessage: Message = { role: "user", content: text.trim() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.slice(-10),
                }),
            });

            if (!res.ok) throw new Error("Failed to get response");

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "I'm having trouble responding right now. Please reach out to info@garihc.com and we'll get back to you shortly.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Tooltip */}
            {showTooltip && !isOpen && (
                <div
                    className="chat-tooltip-wrap"
                    style={{
                        position: "fixed",
                        bottom: 80,
                        right: 24,
                        background: "#1A1A1A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        padding: "12px 18px",
                        zIndex: 9998,
                        maxWidth: 220,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: 300,
                            color: "#F5F5F0",
                            margin: 0,
                            lineHeight: 1.5,
                        }}
                    >
                        Ask our AI anything about GARIHC
                    </p>
                    <button
                        onClick={() => {
                            setShowTooltip(false);
                            sessionStorage.setItem("garihc-chat-tooltip", "true");
                        }}
                        style={{
                            position: "absolute",
                            top: 6,
                            right: 10,
                            background: "none",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            padding: 0,
                        }}
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Chat window */}
            {isOpen && (
                <div
                    className="chat-panel"
                    style={{
                        position: "fixed",
                        bottom: 80,
                        right: 24,
                        width: 380,
                        height: 520,
                        background: "#111111",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 20,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 9998,
                        boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: "18px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#BFA67A",
                                boxShadow: "0 0 8px rgba(191,166,122,0.4)",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.8rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                letterSpacing: "0.05em",
                            }}
                        >
                            GARIHC AI
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                marginLeft: "auto",
                                background: "none",
                                border: "none",
                                color: "var(--text-muted)",
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                padding: 0,
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                        }}
                    >
                        {/* Welcome state */}
                        {!hasInteracted && messages.length === 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    gap: 20,
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "var(--font-cormorant), serif",
                                        fontSize: "1.4rem",
                                        fontWeight: 400,
                                        color: "#F5F5F0",
                                        textAlign: "center",
                                        margin: 0,
                                    }}
                                >
                                    How can we help?
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        width: "100%",
                                    }}
                                >
                                    {suggestions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => sendMessage(s)}
                                            style={{
                                                fontFamily: "var(--font-outfit), sans-serif",
                                                fontSize: "0.8rem",
                                                fontWeight: 300,
                                                color: "var(--text-secondary)",
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                borderRadius: 12,
                                                padding: "12px 16px",
                                                cursor: "pointer",
                                                textAlign: "left",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor =
                                                    "rgba(196,102,58,0.3)";
                                                e.currentTarget.style.color = "#F5F5F0";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor =
                                                    "rgba(255,255,255,0.06)";
                                                e.currentTarget.style.color = "var(--text-secondary)";
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    alignSelf:
                                        msg.role === "user" ? "flex-end" : "flex-start",
                                    maxWidth: "85%",
                                }}
                            >
                                <div
                                    style={{
                                        background:
                                            msg.role === "user"
                                                ? "#2A2A2A"
                                                : "rgba(245,245,240,0.06)",
                                        color: "#F5F5F0",
                                        padding: "12px 16px",
                                        borderRadius:
                                            msg.role === "user"
                                                ? "16px 16px 4px 16px"
                                                : "16px 16px 16px 4px",
                                        fontFamily: "var(--font-outfit), sans-serif",
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
                                <div
                                    style={{
                                        background: "rgba(245,245,240,0.06)",
                                        padding: "12px 20px",
                                        borderRadius: "16px 16px 16px 4px",
                                        display: "flex",
                                        gap: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    {[0, 1, 2].map((j) => (
                                        <span
                                            key={j}
                                            style={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: "50%",
                                                background: "var(--text-muted)",
                                                display: "inline-block",
                                                animation: `chatBounce 1.4s ease-in-out ${j * 0.16}s infinite`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(input);
                        }}
                        style={{
                            padding: "14px 16px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            gap: 10,
                            flexShrink: 0,
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about GARIHC..."
                            disabled={loading}
                            style={{
                                flex: 1,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 12,
                                padding: "10px 14px",
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                color: "#F5F5F0",
                                outline: "none",
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            style={{
                                background: "var(--accent-warm)",
                                border: "none",
                                borderRadius: 12,
                                width: 40,
                                height: 40,
                                cursor: loading || !input.trim() ? "default" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: loading || !input.trim() ? 0.4 : 1,
                                transition: "opacity 0.3s",
                                flexShrink: 0,
                                color: "#FFFFFF",
                                fontSize: "1rem",
                            }}
                        >
                            ↑
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle button */}
            <button
                className="chat-fab"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowTooltip(false);
                    sessionStorage.setItem("garihc-chat-tooltip", "true");
                }}
                style={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: isOpen ? "var(--accent-warm)" : "#2A2A2A",
                    border: `1px solid ${isOpen ? "var(--accent-warm)" : "rgba(255,255,255,0.1)"}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease",
                }}
            >
                <span
                    style={{
                        fontSize: isOpen ? "1.4rem" : "1.2rem",
                        color: "#F5F5F0",
                        lineHeight: 1,
                    }}
                >
                    {isOpen ? "×" : "💬"}
                </span>
            </button>

            {/* Bounce animation */}
            <style jsx>{`
        @keyframes chatBounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
        </>
    );
}
