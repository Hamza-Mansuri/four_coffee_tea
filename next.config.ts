import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep original browser source files out of production deployments.
  // Next.js already minifies production JavaScript and CSS.
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
  },
};

export default nextConfig;
