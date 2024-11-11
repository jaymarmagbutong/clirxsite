/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['localhost', 'another-domain.com', '10.220.8.85'], // Allow localhost and any other domain you use for production
	  remotePatterns: [
		{
		  protocol: 'http',
		  hostname: 'localhost',
		  port: '3000', // For local development, explicitly set the port
		  pathname: '/img/**', // Allow all image paths under /img/
		},
		{
			protocol: 'http',
			hostname: '10.220.8.85',
			pathname: '/img/**', // Allow all image paths under /img/
		},
		{
		  protocol: 'https',
		  hostname: 'your-production-domain.com', // Replace with your production domain
		  pathname: '/img/**', // Allow all image paths under /img/ in production
		},
		{
		  protocol: 'https',
		  hostname: 'platform-lookaside.fbsbx.com', // Facebook CDN domain for images
		  pathname: '/**', // Allow all paths from this domain
		},
	  ],
	},
  
	reactStrictMode: false,
  
	logging: {
	  fetches: {
		fullUrl: true,
	  },
	},
  };
  
  export default nextConfig;
  