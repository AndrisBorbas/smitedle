import { Metadata } from "next";

import { AbilityGame } from "@/components/games/Ability";
import { siteConfig } from "@/data/site";
import { loadGods } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Ability",
		template: `%s | ${siteConfig.name}`,
	},
	description: "Guess who has the ability that is shown in the image.",
};

export default async function AbilityPage() {
	const gods = await loadGods();
	return <AbilityGame gods={gods} />;
}
