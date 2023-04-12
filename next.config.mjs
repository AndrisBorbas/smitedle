import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import withPWA from "next-pwa";

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		deviceSizes: [375],
		imageSizes: [64, 750],
		domains: ["webcdn.hirezstudios.com"],
	},
	experimental: {
		appDir: true,
		newNextLinkBehavior: true,
	},
	async headers() {
		const headers = [
			{
				source: "/assets/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex",
					},
				],
			},
		];
		if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
			headers.push({
				source: "/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex",
					},
				],
			});
		}
		return headers;
	},
};

export default withPlugins(
	[
		[withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })],
		[
			withPWA,
			{
				pwa: {
					dest: "public",
					disable: process.env.NEXT_PUBLIC_VERCEL_ENV !== "production",
				},
			},
		],
	],
	nextConfig,
);
