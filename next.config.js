/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  mages: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      },
    ],
  },
}

module.exports = nextConfig
