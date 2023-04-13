import { NextResponse } from "next/server";

import { loadGeneratedGods } from "@/lib/smiteApi";

export async function GET() {
	const gods = await loadGeneratedGods();

	return NextResponse.json(gods);
}
