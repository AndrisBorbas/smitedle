import "@/styles/globals.scss";

import Script from "next/script";

import { Footer } from "@/components/layout/Footer";
import { siteConfig, TRACKING_ID } from "@/data/site";
import { cn } from "@/lib/utils";

type RootLayoutProps = {
	children: React.ReactNode;
};

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Smitedle",
		"Smite",
		"Smite Wordle",
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
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.jpg`],
		creator: "@andrisborbas",
	},
	icons: {
		icon: "/favicon.png",
		// shortcut: "/favicon-16x16.png",
		// apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className="bg-slate-950 font-sans text-white antialiased">
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

			<body className="relative flex min-h-screen flex-col before:absolute before:inset-0 before:-z-50 before:bg-smite before:bg-cover before:bg-fixed before:bg-top before:bg-no-repeat before:opacity-25 before:content-['']">
				<div className="fixed left-[-75px] top-[25px] z-50 w-72 rotate-[-30deg] bg-accent/25 py-2 text-center backdrop-blur">
					<div className="bg-black/25 text-white">Under construction</div>
				</div>

				<main className={cn("my-8 sm:my-16")}>{children}</main>

				<Footer buildDate={Date.now()} />
			</body>
		</html>
	);
}
