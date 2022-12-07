/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["localhost", "cdn.sanity.io"],
		formats: ["image/webp"],
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	async redirects() {
		return [
			{
				source: "/canceled",
				destination: "/",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
