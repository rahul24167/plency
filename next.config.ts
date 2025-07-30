import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.plency.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
