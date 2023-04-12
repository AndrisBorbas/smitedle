import { NextResponse } from "next/server";

import { getGods, saveGods, saveRawGods, trimGods } from "@/lib/smiteApi";

export async function GET() {
	const gods = await getGods();

	saveRawGods(gods);
	const goodGods = trimGods(gods);
	saveGods(goodGods);

	return NextResponse.json(goodGods);
}
