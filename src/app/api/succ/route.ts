import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { assign } from "@/lib/track";
import { derr } from "@/lib/utils";

export async function POST(request: NextRequest) {
	try {
		const body = JSON.stringify(await request.json());
		const data = await fetch("https://analytics.andrisborbas.com/api/send", {
			method: "POST",
			body,
			headers: assign(
				{ "Content-Type": "application/json" },
				{ "User-Agent": request.headers.get("user-agent") },
			),
		}).then((res) => res.text());

		return NextResponse.json(data);
	} catch (error) {
		derr(error);
		return NextResponse.error();
	}
}
