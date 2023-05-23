import { NextResponse } from "next/server";

import { siteConfig } from "@/data/site";
import { getItems, save } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	if (process.env.CAN_GENERATE !== "true") {
		return NextResponse.redirect(siteConfig.url);
	}

	const rawItems = await getItems();

	save(rawItems, "rawItems");
	// const goodGods = trimGods(gods);
	// saveGods(goodGods);

	dlog("Items updated");

	return NextResponse.json(rawItems);
}
