import { NextResponse } from "next/server";

import { getGods, saveGods, saveRawGods, trimGods } from "@/lib/smiteApi";
import { dlog } from "@/lib/utils";

export async function GET() {
	const gods = await getGods();

	saveRawGods(gods);
	const goodGods = trimGods(gods);
	saveGods(goodGods);

	dlog("Gods updated");

	return NextResponse.json(goodGods);
}
