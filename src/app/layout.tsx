import "@/styles/globals.scss";

import Script from "next/script";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { siteConfig, TRACKING_ID } from "@/data/site";
import { absoluteUrl, cn } from "@/lib/utils";

type RootLayoutProps = DetailedHTMLProps<
	HTMLAttributes<HTMLElement>,
	HTMLElement
>;

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Smitedle",
		"Smite",
		"Hi-Rez Studios",
		"Hirez",
		"Wordle",
		"Smidle",
		"Game",
		"Guess",
	],
	authors: [
		{
			name: "andrisborbas",
			url: "https://andrisborbas.com",
		},
	],
	creator: "andrisborbas",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: absoluteUrl("/og.jpg"),
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.jpg`],
		creator: "@andrisborbas",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children, className }: RootLayoutProps) {
	return (
		<html lang="en" className="bg-stone-950 font-sans text-white antialiased">
			<head />

			{/* Umami analytics */}
			<Script
				async
				defer
				data-website-id={TRACKING_ID}
				src="https://succ.andrisborbas.com/succ.js"
				data-auto-track={
					process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "true" : "false"
				}
			/>
			{/* End Umami analytics */}

			<body className="flex min-h-screen flex-col">
				<main className={cn("my-8 sm:my-16", className)}>{children}</main>
			</body>
		</html>
	);
}
