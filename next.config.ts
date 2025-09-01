import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true, // keep if you don’t want Next.js image optimization
  },
  basePath: isProd ? "/port2" : "",
  assetPrefix: isProd ? "/port2/" : "",
};

export default nextConfig;

