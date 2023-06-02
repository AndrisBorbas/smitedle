"use client";

import { useTimer } from "react-timer-hook";

import { getTargetDate } from "@/lib/game";

export type TimerProps = {
	word: string;
};

export function Timer({ word }: TimerProps) {
	const { seconds, minutes, hours } = useTimer({
		expiryTimestamp: getTargetDate(),
	});

	return (
		<>
			<h6 className="text-xl">Next {word} in:</h6>
			<p className="text-2xl text-stone-50">
				<span className="mx-1">{`0${hours}`.slice(-2)}</span>:
				<span className="mx-1">{`0${minutes}`.slice(-2)}</span>:
				<span className="mx-1">{`0${seconds}`.slice(-2)}</span>
			</p>
		</>
	);
}
