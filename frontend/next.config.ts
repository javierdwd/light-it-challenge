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
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
