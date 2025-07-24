/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://storage.googleapis.com/plency-bucket/**'), new URL('https://plency.s3.ap-south-1.amazonaws.com/**')],
  },
};

export default nextConfig;

