/** @type {import('next').NextConfig} */

const nextConfig = {
  // EXISTING CONFIG
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  // TURBOPACK
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },

  // AVIF FRAME CACHE
  async headers() {
    return [
      {
        source: '/med-avif/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
