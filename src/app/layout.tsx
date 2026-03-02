import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GARIHC — Guiding Ambitions, Realizing Innovations, Harnessing Creativity",
  description: "AI-powered consulting for brands with ambition. Strategy, technology, and taste.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
        style={{ background: "#0A0A0A", color: "#F5F5F0", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
