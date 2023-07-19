/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
      return [
        {
          source: '/:slug*',
          destination: 'https://www.astvel.app/:slug*',
          has: [{ type: 'host', value: 'astvel.app' }],
          permanent: true,
        },
      ]
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text),
);

module.exports = nextConfig
