/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		localPatterns: [
			{
				pathname: '/img/uploaded/**',
				search: '',
			},
			{
				pathname: '/img/**',
				search: '',
			},
		],
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
				pathname: '/img/uploaded/**',
				search: '',
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
				hostname: 'ik.imagekit.io', // Facebook CDN domain for images
			},
			{
				protocol: 'http',
				hostname: 'localhost', // Facebook CDN domain for images
				port: '8000'
			},
		],
	},
  
	reactStrictMode: false,
  
	logging: {
	  fetches: {
		fullUrl: true,
	  },
	},
	 async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },
 
  };
  
  export default nextConfig;
  