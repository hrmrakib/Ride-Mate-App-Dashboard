import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "api.radeefz.com",
      },
      {
        protocol: "http",
        hostname: "10.10.12.126",
      },
      {
        protocol: "https",
        hostname: "v2.radeefz.com",
      },
    ],
  },
};

export default nextConfig;
