"use client";

import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { trackEvent } from "@/lib/track";
import { cn, dlog } from "@/lib/utils";

import { DetailedGodsContainer } from "../display/GodsContainer";
import { IconContainer } from "../display/IconContainer";
import { Timer } from "../display/Timer";
import { FuzzyInput } from "../input/FuzzyInput";
import { Loading } from "../layout/Loading";
import { HomeGameLink } from "../link/HomeGameLink";

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
	const [selectedGods, setSelectedGods] = useState<Gods>([]);
	const [selectedGodsIDs, setSelectedGodsIDs] = useLocalStorage<number[]>(
		"classicSelectedGodsIDs",
		[],
	);

	const winRef = useRef<HTMLDivElement>(null);

	// Print current god on dev
	useEffect(() => {
		dlog(actualGod.Name);
	}, [actualGod.Name]);

	// Save current god id
	useEffect(() => {
		setActualGodId(actualGod.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualGod.id]);

	// Reset game current if god changes
	useEffect(() => {
		dlog(actualGod.id, actualGodId);
		if (actualGodId !== -1 && actualGod.id !== actualGodId) {
			window.localStorage.removeItem("classicSelectedValue");
			setSelected("");
			window.localStorage.removeItem("classicSelectedGodsIDs");
			setSelectedGodsIDs([]);
			window.localStorage.removeItem("classicWin");
			setWin(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualGodId, actualGod.id]);

	// Scroll to win on win
	useEffect(() => {
		if (win) {
			winRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [win]);

	// Set loaded after gods are loaded from local storage
	useEffect(() => {
		if (!loaded && selectedGodsIDs.length !== 0) {
			setSelectedGods(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectedGodsIDs.map((id) => gods.find((g) => g.id === id)!),
			);
			setLoaded.setTrue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gods, loaded, selectedGodsIDs]);

	// Set loaded if no gods are selected
	useEffect(() => {
		const data = window.localStorage.getItem("classicSelectedGodsIDs");
		if (data === null || data === "[]") {
			setSelectedGods([]);
			setSelectedGodsIDs([]);
			setLoaded.setTrue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className="mx-auto px-2 text-center">
			{!loaded && <Loading />}
			{loaded && (
				<>
					<FuzzyInput
						initialData={gods}
						filteredData={selectedGodsIDs}
						selected={selected}
						setSelected={setSelected}
						disabled={win}
						submit={() => {
							const god = gods.find((g) => g.Name === selected);
							if (!god || selectedGods.includes(god)) {
								return false;
							}
							setGuesses(guesses + 1);
							setSelectedGodsIDs([god.id, ...selectedGodsIDs]);
							setSelectedGods([god, ...selectedGods]);

							if (god.Name === actualGod.Name && !win) {
								setTimeout(() => {
									setWin(true);
								}, 150 * 9 + 300);
								trackEvent("win-classic", { guesses }, "/classic");
							}
							return true;
						}}
					/>
					<DetailedGodsContainer gods={selectedGods} actualGod={actualGod} />
					<div
						ref={winRef}
						className={cn(
							"mx-auto mt-8 flex w-fit flex-col items-center border border-accent bg-white/5 p-8 backdrop-blur",
							win ? "flex" : "hidden",
						)}
					>
						{win && (
							<>
								<h3 className="text-glow mb-4">You won! 🏆</h3>
								<h4 className="mb-1">The god was: {actualGod.Name}</h4>
								<h5 className="mb-2">{actualGod.Title}</h5>
								<IconContainer
									src={actualGod.godCard_URL}
									alt={`${actualGod.Name} thumbnail`}
									width={180}
									height={335}
									anim
								/>
								<div className="mt-8">
									<Timer />
								</div>
								<div className=" mt-8">
									<HomeGameLink
										name="Ability"
										description="Try the next game"
										animate
										onClick={() => {
											trackEvent("click-next-classic", {}, "/classic");
										}}
									/>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</section>
	);
}
