import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      { protocol: "https", hostname: "m.media-amazon.com" }, // <-- add this
      {
        protocol: "https",
        hostname: "**", // allow all https hosts
      },
    ],
  },
};

export default nextConfig;
