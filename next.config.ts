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
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
      ],
    }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
};

export default nextConfig;
