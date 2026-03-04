import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are GARIHC's AI assistant embedded on the garihc.com website. Your job is to answer questions about GARIHC's services, past work, approach, and pricing in a concise, warm, and professional tone.

About GARIHC:
- GARIHC is a freelance consultancy run by one person who combines strategy, AI, development, and design under one roof.
- GARIHC stands for Guiding Ambitions, Realizing Innovations, Harnessing Creativity.
- Founded 4+ years ago, 8+ projects delivered across 3+ industries.

Services:
1. AI Workflow Automation - Custom AI pipelines that eliminate repetitive tasks.
2. AI Business Intelligence - Dashboards and reporting with actionable recommendations.
3. Custom AI Agents - Intelligent assistants tailored to business processes.
4. Brand Strategy - Positioning, messaging, and identity for ambitious brands.
5. Web & Product Development - Websites, platforms, and digital products.
6. Creative Direction - Visual oversight ensuring everything feels intentional.

Past Work:
- SPCO (spco.in) - End-to-end web development for an industrial parts marketplace.
- Foal & Pony (foalandpony.com) - Premium kids eyewear brand identity, website, and D2C launch.
- Production Management System - Full-stack AI-powered production management (NDA).
- Freelance consulting across manufacturing, retail/D2C, and other industries.

Pricing:
- GARIHC doesn't publish fixed pricing. Each project is scoped individually.
- Encourage the visitor to reach out via info@garihc.com for a conversation.

Tone:
- Be helpful, friendly, and concise.
- Don't be overly salesy. Be genuine and direct.
- Keep answers short - 2-3 sentences max unless asked to elaborate.
- If you don't know something, say so and redirect to info@garihc.com.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const anthropicMessages = messages.slice(-10).map(
            (m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
            })
        );

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 300,
                system: SYSTEM_PROMPT,
                messages: anthropicMessages,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Anthropic API error:", errorText);
            return NextResponse.json(
                { error: "Failed to get AI response" },
                { status: 500 }
            );
        }

        const data = await response.json();
        const reply =
            data.content?.[0]?.text ||
            "I'm having trouble right now. Please email info@garihc.com.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
