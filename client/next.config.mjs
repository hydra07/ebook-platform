/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.vietnamworks.com',
      'www.canva.com',
      'marketplace.canva.com',
      'cdn.pixabay.com',
      'res.cloudinary.com',
    ],
  },
  experimental: {
    workerThreads: false, // Disable worker threads
  },
};

export default nextConfig;
