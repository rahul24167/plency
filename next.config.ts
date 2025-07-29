import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.plency.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;