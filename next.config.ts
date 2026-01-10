import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // If deploying to https://<USERNAME>.github.io/<REPO_NAME>,
  // you might need to uncomment and set the following lines:
  // basePath: '/jal-rakshak-app',
  // assetPrefix: '/jal-rakshak-app/',
};

export default nextConfig;
