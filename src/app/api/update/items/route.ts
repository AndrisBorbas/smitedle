import { NextResponse } from "next/server";

import { siteConfig } from "@/data/site";
import { getItems, organizeItems, save } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	if (process.env.CAN_GENERATE !== "true") {
		return NextResponse.redirect(siteConfig.url);
	}

	const rawItems = await getItems();

	save(rawItems, "rawItems");
	const { activeItems, inactiveItems } = organizeItems(rawItems);
	save(activeItems, "items");
	save(inactiveItems, "inactiveItems");

	dlog(
		rawItems.length,
		activeItems.length,
		inactiveItems.length,
		"Items updated",
	);

	return NextResponse.json(rawItems);
}
