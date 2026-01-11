/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: '/jal-rakshak-app',
    assetPrefix: '/jal-rakshak-app/',
};

export default nextConfig;
