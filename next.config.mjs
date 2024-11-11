/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**',
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
			{
				protocol: 'http',
				hostname: '10.220.8.85', // Fixed the format for IP address
				pathname: '/**', // Allow all paths from this domain
			},
			
		],
	},

	reactStrictMode: false,

	async rewrites() {
		return [
			{
				source: "/api/socket/socket",
				destination: "/api/socket/socket",
			},
		];
	},
};

export default nextConfig;
