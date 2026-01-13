export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		twitter: string;
		github: string;
	};
};

export const siteConfig: SiteConfig = {
	name: "Smitedle",
	description:
		"The Smite god guessing game. A wordle game for the smite community.",
	url: "https://smitedle.net",
	ogImage: "https://smitedle.net/og.jpg",
	links: {
		twitter: "https://twitter.com/andrisborbas",
		github: "https://github.com/andrisborbas/smitedle",
	},
};

export const TRACKING_ID = "SqANPGtDvDE4";
