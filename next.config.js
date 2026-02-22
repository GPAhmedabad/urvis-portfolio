/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'linkedin.com'], // Add more as needed
        unoptimized: true,
    },
};

module.exports = nextConfig;
