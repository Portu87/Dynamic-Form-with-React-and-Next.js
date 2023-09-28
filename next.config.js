/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["res.cloudinary.com", "img.clerk.com", "localhost", "demo.foodyapp.es"],
    },
  };
  
  module.exports = nextConfig;
