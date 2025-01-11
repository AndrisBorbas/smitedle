import { NextResponse } from "next/server";

import { siteConfig } from "@/data/site";
import { exportGods, getGods, save, trimGods } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	if (process.env.CAN_GENERATE !== "true") {
		return NextResponse.redirect(siteConfig.url);
	}

	const rawGods = await getGods();

	save(rawGods, "rawGods");
	const gods = trimGods(rawGods);
	save(gods, "gods");
	exportGods(gods);

	dlog("Gods updated");

	return NextResponse.json(gods);
}
