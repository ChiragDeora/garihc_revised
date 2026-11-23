import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons**" },
      { protocol: "https", hostname: "www.spco.in" },
      { protocol: "https", hostname: "rppl.garihc.com" },
      { protocol: "https", hostname: "block.garihc.com" },
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
