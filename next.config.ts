import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
