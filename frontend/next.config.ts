import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
