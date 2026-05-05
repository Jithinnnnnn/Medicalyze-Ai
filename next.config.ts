import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Azure deployment
  output: 'standalone',
  
  // Optimize for production
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
