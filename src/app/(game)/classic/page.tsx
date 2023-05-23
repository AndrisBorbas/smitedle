import { Metadata } from "next";

import { ClassicGame } from "@/components/games/Classic";
import { siteConfig } from "@/data/site";
import { loadGods } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Classic",
		template: `%s | ${siteConfig.name}`,
	},
	description:
		"Guess the god, and see how many attributes you can get right in this wordle style game.",
	openGraph: {
		title: `Classic | ${siteConfig.name}`,
		description:
			"Guess the god, and see how many attributes you can get right in this wordle style game.",
		siteName: siteConfig.name,
	},
	twitter: {
		title: `Classic | ${siteConfig.name}`,
		description:
			"Guess the god, and see how many attributes you can get right in this wordle style game.",
	},
};

export default async function ClassicPage() {
	const gods = await loadGods();
	return <ClassicGame gods={gods} />;
}
