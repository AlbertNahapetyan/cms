/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  serverRuntimeConfig: {
    apiHost: process.env.API_HOST,
  },

  publicRuntimeConfig: {
    wsPort: process.env.WS_PORT
  }
};

export default nextConfig;
