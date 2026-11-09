/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90, 95],
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920, 2560, 3840],
  },
};

export default nextConfig;
