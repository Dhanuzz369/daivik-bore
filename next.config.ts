import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["daivikborewells.com", "daivik-borewells.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.daivikborewells.com/:path*",
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
};

export default nextConfig;
