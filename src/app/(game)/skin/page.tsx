import { Metadata } from "next";

import { SkinGame } from "@/components/games/Skin";
import { siteConfig } from "@/data/site";
import { loadGods, loadSkins } from "@/lib/smiteApi";

export const metadata: Metadata = {
	title: {
		default: "Skin",
		template: `%s | ${siteConfig.name}`,
	},
	description: "Try to find out whose skin is shown in the image.",
	openGraph: {
		title: `Skin | ${siteConfig.name}`,
		description: "Try to find out whose skin is shown in the image.",
		siteName: siteConfig.name,
	},
	twitter: {
		title: `Skin | ${siteConfig.name}`,
		description: "Try to find out whose skin is shown in the image.",
	},
};

export default async function AbilityPage() {
	const gods = await loadGods();
	const skins = await loadSkins();
	return <SkinGame gods={gods} skins={skins} />;
}
