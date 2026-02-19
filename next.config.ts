import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'resend', 'three', '@react-three/drei', '@react-three/fiber'],
  },
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
