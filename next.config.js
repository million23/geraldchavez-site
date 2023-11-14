/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["media.graphassets.com"],
	},
	transpilePackages: ["geist"],
};

module.exports = nextConfig;
