"use client";

import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom, timeRemaining } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { cn, dlog } from "@/lib/utils";

import { GodsContainer } from "../display/GodsContainer";
import { ImageContainer } from "../display/IconContainer";
import { FuzzyInput } from "../input/FuzzyInput";

export type ClassicGameProps = {
	gods: Gods;
};

export function ClassicGame({ gods }: ClassicGameProps) {
	const random = getDeterministicRandom(new Date());
	const [actualGod] = useState(gods[Math.floor(random() * gods.length)]);
	const [actualGodId, setActualGodId] = useLocalStorage("classic", -1);

	const [loaded, setLoaded] = useBool(false);

	const [win, setWin] = useLocalStorage("classicWin", false);
	const [guesses, setGuesses] = useState(0);

	const [selected, setSelected] = useLocalStorage("classicSelectedValue", "");
	const [selectedGods, setSelectedGods] = useLocalStorage<Gods>(
		"classicSelectedGods",
		[],
	);

	const winRef = useRef<HTMLHeadingElement>(null);

	// Print current god on dev
	useEffect(() => {
		dlog(actualGod.Name);
	}, [actualGod]);

	// Save current god id
	useEffect(() => {
		setActualGodId(actualGod.id);
	}, [actualGod, setActualGodId]);

	// Reset game current if god changes
	useEffect(() => {
		dlog(actualGod.id, actualGodId);
		if (actualGodId !== -1 && actualGod.id !== actualGodId) {
			window.localStorage.removeItem("classicSelectedValue");
			setSelected("");
			window.localStorage.removeItem("classicSelectedGods");
			setSelectedGods([]);
			window.localStorage.removeItem("classicWin");
			setWin(false);

			setLoaded.setTrue();
		}
	}, [actualGodId, actualGod, setSelected, setSelectedGods, setWin, setLoaded]);

	// Scroll to win on win
	useEffect(() => {
		if (win) {
			winRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [win]);

	// Set loaded after gods are loaded from local storage
	useEffect(() => {
		if (selectedGods.length !== 0) {
			setLoaded.setTrue();
		}
	}, [selectedGods, setLoaded]);

	// Set loaded if no gods are selected
	useEffect(() => {
		const data = window.localStorage.getItem("classicSelectedGods");
		if (data === null || data === "[]") {
			setLoaded.setTrue();
		}
	}, [setLoaded]);

	return (
		<section className="mx-auto px-2 text-center">
			{!loaded && <div>Loading...</div>}
			{loaded && (
				<>
					<FuzzyInput
						initialData={gods}
						filteredData={selectedGods}
						selected={selected}
						setSelected={setSelected}
						submit={() => {
							const god = gods.find((g) => g.Name === selected);
							if (!god || selectedGods.includes(god)) {
								return false;
							}
							setGuesses(guesses + 1);
							setSelectedGods([god, ...selectedGods]);
							if (god.Name === actualGod.Name) {
								setWin(true);
							}
							return true;
						}}
					/>
					<GodsContainer gods={selectedGods} actualGod={actualGod} />
					<div
						ref={winRef}
						className={cn(
							"mx-auto mt-8 flex w-fit flex-col items-center border border-accent bg-white/5 p-8 backdrop-blur",
							win ? "flex" : "hidden",
						)}
					>
						{win && (
							<>
								<h3 className="mb-4">You won! 🏆</h3>
								<h4 className="mb-4">The god was: {actualGod.Name}</h4>
								<ImageContainer
									src={actualGod.godCard_URL}
									alt={`${actualGod.Name} thumbnail`}
									width={180}
									height={335}
								/>
							</>
						)}
					</div>
					<div className="mt-8">
						{win && <h5>Next god in: {timeRemaining()}</h5>}
					</div>
				</>
			)}
		</section>
	);
}
