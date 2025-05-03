import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // add this line
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
};

export default nextConfig;

