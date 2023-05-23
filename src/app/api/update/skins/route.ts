import { NextResponse } from "next/server";

import { siteConfig } from "@/data/site";
import { getAllSkins, organizeSkins, save } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	if (process.env.CAN_GENERATE !== "true") {
		return NextResponse.redirect(siteConfig.url);
	}

	const rawSkins = await getAllSkins();

	save(rawSkins, "rawSkins");
	const skins = organizeSkins(rawSkins);
	save(skins, "skins");
	// const goodGods = trimGods(gods);
	// saveGods(goodGods);

	dlog(skins.length, "skins updated");

	return NextResponse.json(skins);
}
