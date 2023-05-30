"use client";

import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { trackEvent } from "@/lib/track";
import { cn, dlog } from "@/lib/utils";

import { SimpleGodsContainer } from "../display/GodsContainer";
import { IconContainer } from "../display/IconContainer";
import { WinContainer } from "../display/WinContainer";
import { FuzzyInput } from "../input/FuzzyInput";
import { Loading } from "../layout/Loading";

export type AbilityGameProps = {
	gods: Gods;
};

export function AbilityGame({ gods }: AbilityGameProps) {
	const random = getDeterministicRandom(new Date());
	const [uiRandom] = useState(Math.random());
	// Has to be before random god selection
	const [actualAbility] = useState<1 | 2 | 3 | 4 | 5>(
		(Math.floor(random() * 4) + 1) as 1 | 2 | 3 | 4 | 5,
	);
	const [actualGod] = useState(gods[Math.floor(random() * gods.length)]);
	const [actual, setActual] = useLocalStorage("ability", {
		god: -1,
		ability: -1,
	});

	const [loaded, setLoaded] = useBool(false);

	const [win, setWin] = useLocalStorage("abilityWin", false);
	const [guesses, setGuesses] = useState(0);

	const [selected, setSelected] = useLocalStorage("abilitySelectedValue", "");
	const [selectedGods, setSelectedGods] = useState<Gods>([]);
	const [selectedGodsIDs, setSelectedGodsIDs] = useLocalStorage<number[]>(
		"abilitySelectedGodsIDs",
		[],
	);

	const winRef = useRef<HTMLHeadingElement>(null);

	// Print current god on dev
	useEffect(() => {
		dlog(actualGod.Name);
	}, [actualGod]);

	// Save current god id
	useEffect(() => {
		setActual({ god: actualGod.id, ability: actualAbility });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualAbility, actualGod]);

	// Reset game current if god changes
	useEffect(() => {
		if (actual.god !== -1 && actualGod.id !== actual.god) {
			window.localStorage.removeItem("abilitySelectedValue");
			setSelected("");
			window.localStorage.removeItem("abilitySelectedGodsIDs");
			setSelectedGodsIDs([]);
			window.localStorage.removeItem("abilityWin");
			setWin(false);
			setGuesses(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actual.god, actualGod.id]);

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
		const data = window.localStorage.getItem("abilitySelectedGodsIDs");
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
					<div className="mb-8">
						<h2 className="mb-4">Who has this ability?</h2>
						<div
							className={cn(
								"mx-auto w-fit",
								// eslint-disable-next-line no-nested-ternary
								guesses < 1
									? uiRandom < 0.5
										? "[&_img]:rotate-90"
										: "[&_img]:-rotate-90"
									: "[&_img]:rotate-0",
								guesses < 2 ? "grayscale" : "grayscale-0",
								win && "grayscale-0 [&_img]:rotate-0",
							)}
						>
							<IconContainer
								alt="Ability icon"
								src={actualGod[`godAbility${actualAbility}_URL`]}
								height={78}
								width={78}
								anim
								priority
							/>
						</div>
					</div>
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
								}, 150 * 1 + 300);
								trackEvent("win-ability", { guesses }, "/ability");
							}
							return true;
						}}
					/>

					<SimpleGodsContainer
						actualGodName={actualGod.Name}
						gods={selectedGods}
					/>

					<WinContainer
						ref={winRef}
						win={win}
						actualGod={actualGod}
						nextGame="Skin"
						tracker={() => {
							trackEvent("click-next-ability", {}, "/ability");
						}}
					/>
				</>
			)}
		</section>
	);
}
