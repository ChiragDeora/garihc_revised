import type { Metadata } from "next";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
    title: "AI Savings Calculator - GARIHC",
    description:
        "Calculate how much time and money your business can save with AI automation. Free tool by GARIHC.",
};

export default function CalculatorPage() {
    return <Calculator />;
}
