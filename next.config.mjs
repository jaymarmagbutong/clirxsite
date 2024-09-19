/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Explicitly set the port
        pathname: '/img/**', // Allow all paths from this domain
      },
      {
        protocol: 'https',
        hostname: 'another-domain.com',
        pathname: '/images/**', // Allow only paths starting with /images/
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '/**', // Allow all paths from this domain
      },
    ],
  },
  reactStrictMode: false,
  // Ensure this section is valid for your custom needs
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
