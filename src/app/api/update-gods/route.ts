import { NextResponse } from "next/server";

import { siteConfig } from "@/data/site";
import { getGods, saveGods, saveRawGods, trimGods } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	if (process.env.NODE_ENV !== "development") {
		return NextResponse.redirect(siteConfig.url);
	}

	const gods = await getGods();

	saveRawGods(gods);
	const goodGods = trimGods(gods);
	saveGods(goodGods);

	dlog("Gods updated");

	return NextResponse.json(goodGods);
}
