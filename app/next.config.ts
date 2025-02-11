/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    esmExternals: true,
  }
};

export default config;
