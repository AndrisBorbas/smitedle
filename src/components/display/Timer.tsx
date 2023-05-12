"use client";

import { useTimer } from "react-timer-hook";

import { getTargetDate } from "@/lib/game";

export function Timer() {
	const { seconds, minutes, hours } = useTimer({
		expiryTimestamp: getTargetDate(),
	});

	return (
		<>
			<h6 className="text-xl">Next god in:</h6>
			<p className="text-2xl text-stone-50">
				<span className="mx-1">{hours}</span>:
				<span className="mx-1">{minutes}</span>:
				<span className="mx-1">{seconds}</span>
			</p>
		</>
	);
}
