/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs : false, tls: false };

    return config;
  }
}

/*
const nextConfig = {
  experimental: {
    appDir: true,
  },

}

module.exports = nextConfig
*/