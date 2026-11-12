/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
  },
};

export default config;
