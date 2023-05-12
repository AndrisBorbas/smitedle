import { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { loadGods } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Skin",
		template: `%s | ${siteConfig.name}`,
	},
	description: "Try to find out whose skin is shown in the image.",
};

export default async function AbilityPage() {
	// const gods = await loadGods();
	return <section>Still under development, check back later</section>;
}
