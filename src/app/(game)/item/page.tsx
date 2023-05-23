import { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { loadGods } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Item",
		template: `%s | ${siteConfig.name}`,
	},
	description:
		"Guess the god, and see how many attributes you can get right in this wordle style game.",
};

export default async function ClassicPage() {
	// const gods = await loadGods();
	return <section>Still under development, check back later</section>;
}
