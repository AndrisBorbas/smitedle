"use client";

import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { God, Gods } from "@/lib/smiteApi";
import { trackEvent } from "@/lib/track";
import { cn, dlog } from "@/lib/utils";

import { SimpleContainer } from "../display/GodsContainer";
import { IconContainer } from "../display/IconContainer";
import { WinContainer } from "../display/WinContainer";
import { FuzzyInput } from "../input/FuzzyInput";
import styles from "../input/FuzzyInput.module.scss";
import { Loading } from "../layout/Loading";

export type AbilityGameProps = {
	gods: Gods;
};

const abilityNames = ["Passive", "1", "2", "3", "Ultimate"];

type AbilityButtonProps = {
	actualAbility: 1 | 2 | 3 | 4 | 5;
	abilityName: string;
	index: number;
	setSelected: (value: number[]) => void;
	selected: number[];
	onWin: () => void;
};

function AbilityButton({
	actualAbility,
	abilityName,
	index,
	setSelected,
	selected,
	onWin,
}: AbilityButtonProps) {
	const [showImmune, setShowImmune] = useState(false);
	return (
		<div className="relative">
			<button
				key={abilityName}
				type="button"
				onClick={() => {
					if (!selected.includes(index)) {
						setSelected([...selected, index]);
						if (actualAbility === index) {
							onWin();
						} else {
							setShowImmune(true);
							setTimeout(() => {
								setShowImmune(false);
							}, 700);
						}
					}
				}}
				disabled={selected.includes(index) && actualAbility !== index}
				className={cn(
					"fancyButton h-16 w-fit cursor-pointer border-2 border-accent bg-white/5 p-4 px-6 text-lg font-semibold tabular-nums text-accent ring-accent backdrop-blur hover:bg-white/20 hover:text-white hover:ring-1 disabled:cursor-not-allowed",
					actualAbility === index &&
						selected.includes(index) &&
						"bg-green-600/25 text-white",
					actualAbility !== index &&
						selected.includes(index) &&
						"bg-red-600/25",
				)}
			>
				{abilityNames[index]}
			</button>
			<div
				className={cn(
					styles["animate-float-fade"],
					"pointer-events-none absolute inset-x-0 -top-8 z-30 select-none text-center font-serif font-bold text-yellow-300",
					showImmune ? "block" : "hidden",
				)}
				aria-hidden="true"
				draggable={false}
			>
				*Immune*
			</div>
		</div>
	);
}

type WhichAbilityGameProps = {
	actualAbility: 1 | 2 | 3 | 4 | 5;
	onWin: () => void;
};

function WhichAbilityGame({ actualAbility, onWin }: WhichAbilityGameProps) {
	const [selected, setSelected] = useState<number[]>([]);

	return (
		<>
			<h3 className="mb-4">Which ability is this?</h3>
			<div className="mx-auto flex w-max flex-row gap-2">
				{abilityNames.map((abilityName, index) => (
					<AbilityButton
						key={abilityName}
						actualAbility={actualAbility}
						index={index}
						setSelected={setSelected}
						selected={selected}
						abilityName={abilityName}
						onWin={onWin}
					/>
				))}
			</div>
		</>
	);
}

export function AbilityGame({ gods }: AbilityGameProps) {
	const random = getDeterministicRandom(new Date(), "ability");
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
	const [miniGameWin, setMiniGameWin] = useLocalStorage(
		"abilityMiniGameWin",
		false,
	);
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
			window.localStorage.removeItem("abilityMiniGameWin");
			setMiniGameWin(false);
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
						initialGods={gods}
						filteredData={selectedGodsIDs}
						selected={selected}
						setSelected={setSelected}
						disabled={win}
						submit={() => {
							const god = gods.find(
								(g) => g.Name.toLowerCase() === selected.toLowerCase(),
							);
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
								trackEvent("Win_Ability", { guesses }, "/ability");
							}
							return true;
						}}
					/>

					<SimpleContainer actualName={actualGod.Name} gods={selectedGods} />

					<WinContainer
						ref={winRef}
						win={miniGameWin}
						actualGod={actualGod}
						word="ability"
						nextGame="Skin"
						showMiniGame={win}
						MiniGame={
							<WhichAbilityGame
								actualAbility={actualAbility}
								onWin={() => {
									setTimeout(() => {
										setMiniGameWin(true);
									});
								}}
							/>
						}
						ExtraInfo={
							<h4 className="">
								The ability was:{" "}
								<span className="font-bold">
									{actualGod[`Ability${actualAbility}`]}
								</span>
							</h4>
						}
						tracker={() => {
							trackEvent("Click_Next_Ability", {}, "/ability");
						}}
					/>
				</>
			)}
		</section>
	);
}
