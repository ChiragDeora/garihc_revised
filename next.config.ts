import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons**" },
    ],
  },
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/services", destination: "/" },
      { source: "/contact", destination: "/" },
      { source: "/work", destination: "/" },
      { source: "/work/:slug", destination: "/" },
    ];
  },
};

export default nextConfig;
