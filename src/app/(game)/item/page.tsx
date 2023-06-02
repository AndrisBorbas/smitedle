import { Metadata } from "next";

import { ItemGame } from "@/components/games/Item";
import { siteConfig } from "@/data/site";
import { loadItems } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Item",
		template: `%s | ${siteConfig.name}`,
	},
	description: "Guess the Smite item from its icon.",
	openGraph: {
		title: `Item | ${siteConfig.name}`,
		description: "Guess the Smite item from its icon.",
		siteName: siteConfig.name,
	},
	twitter: {
		title: `Item | ${siteConfig.name}`,
		description: "Guess the Smite item from its icon.",
	},
};

export default async function ClassicPage() {
	const items = await loadItems();
	return <ItemGame items={items} />;
}
