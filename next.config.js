/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://storage.googleapis.com/plency-bucket/**'), new URL('https://storage.googleapis.com/plency-store/**')],
  },
};

module.exports = nextConfig;

