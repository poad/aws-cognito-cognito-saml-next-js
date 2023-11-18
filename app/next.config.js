/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    esmExternals: true,
  }
};

module.exports = config;
