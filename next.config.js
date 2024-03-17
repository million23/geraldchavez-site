/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["media.graphassets.com", "cdn.sanity.io"],
	},
};

module.exports = nextConfig;
