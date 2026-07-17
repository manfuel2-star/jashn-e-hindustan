import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95, 100],
  },
  typescript: process.env.VERCEL
    ? { tsconfigPath: "tsconfig.vercel.json" }
    : undefined,
};

export default nextConfig;
