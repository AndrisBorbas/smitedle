"use client";

import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { trackEvent } from "@/lib/track";
import { dlog } from "@/lib/utils";

import { DetailedGodsContainer } from "../display/GodsContainer";
import { WinContainer } from "../display/WinContainer";
import { FuzzyInput } from "../input/FuzzyInput";
import { Loading } from "../layout/Loading";

export type ClassicGameProps = {
	gods: Gods;
};

export function ClassicGame({ gods }: ClassicGameProps) {
	const random = getDeterministicRandom(new Date(), "classic");
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
			setGuesses(0);
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
			setGuesses(selectedGodsIDs.length);
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
			setGuesses(0);
			setLoaded.setTrue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dlog(guesses, "guesses");
	}, [guesses]);

	return (
		<section className="mx-auto px-2 text-center">
			{!loaded && <Loading />}
			{loaded && (
				<>
					<FuzzyInput
						initialGods={gods}
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

					<WinContainer
						ref={winRef}
						win={win}
						actualGod={actualGod}
						word="god"
						nextGame="Ability"
						tracker={() => {
							trackEvent("click-next-classic", {}, "/classic");
						}}
					/>
				</>
			)}
		</section>
	);
}
