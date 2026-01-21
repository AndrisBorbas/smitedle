"use client";

import { Skin } from "@joshmiquel/hirez/@types";
import { useEffect, useMemo, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { trackEvent } from "@/lib/track";
import { cn, dlog } from "@/lib/utils";

import { SimpleContainer } from "../display/GodsContainer";
import { IconContainer } from "../display/IconContainer";
import { WinContainer } from "../display/WinContainer";
import { FuzzyInput } from "../input/FuzzyInput";
import { Loading } from "../layout/Loading";

type SkinMiniGameProps = {
	actualSkin: Skin.Base;
	skins: Skin.Base[];
	actual: { god: number; skin1: number };
	onWin: () => void;
	win: boolean;
};

function SkinMiniGame({
	actualSkin,
	skins,
	actual,
	win,
	onWin,
}: SkinMiniGameProps) {
	const [selected, setSelected] = useLocalStorage(
		"skinMiniGameSelectedValue",
		"",
	);
	const [selectedSkins, setSelectedSkins] = useState<Skin.Base[]>([]);
	const [selectedSkinsIDs, setSelectedSkinsIDs] = useLocalStorage<number[]>(
		"skinMiniGameSelectedSkinsIDs",
		[],
	);
	const [loaded, setLoaded] = useState(false);
	const initialData = useMemo(() => {
		return skins
			.map((skin) => ({
				id: skin.skin_id1,
				name: skin.skin_name,
				god_id: skin.god_id,
			}))
			.filter((skin) => skin.god_id === actualSkin.god_id);
	}, [skins, actualSkin.god_id]);

	// Reset game current if god changes
	useEffect(() => {
		if (actual.god !== -1 && actualSkin.god_id !== actual.god) {
			window.localStorage.removeItem("skinMiniGameSelectedValue");
			setSelected("");
			window.localStorage.removeItem("skinMiniGameSelectedSkinsIDs");
			setSelectedSkinsIDs([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualSkin.god_id, actual.god]);

	// Set loaded after gods are loaded from local storage
	useEffect(() => {
		if (!loaded && selectedSkinsIDs.length !== 0) {
			setSelectedSkins(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectedSkinsIDs.map((id) => skins.find((s) => s.skin_id1 === id)!),
			);
			setLoaded(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [skins, loaded, selectedSkinsIDs]);

	const selectedData = selectedSkins.map((skin) => ({
		id: skin.skin_id1,
		name: skin.skin_name,
	}));

	return (
		<>
			<h3 className="mb-4">What is the name of this skin?</h3>

			<FuzzyInput
				initialData={initialData}
				filteredData={selectedSkinsIDs}
				selected={selected}
				setSelected={setSelected}
				disabled={win}
				submit={() => {
					const skin = skins.find(
						({ skin_name }) =>
							skin_name.toLowerCase() === selected.toLowerCase(),
					);
					if (!skin || selectedSkins.includes(skin)) {
						return false;
					}
					setSelectedSkinsIDs([skin.skin_id1, ...selectedSkinsIDs]);
					setSelectedSkins([skin, ...selectedSkins]);

					if (skin.skin_name === actualSkin.skin_name) {
						setTimeout(() => {
							onWin();
						});
					}
					return true;
				}}
				showIcon={false}
				className="max-w-[16rem]"
			/>

			<SimpleContainer actualName={actualSkin.skin_name} data={selectedData} />
		</>
	);
}

export type SkinGameProps = {
	gods: Gods;
	skins: Skin.Base[];
};

export function SkinGame({ gods, skins }: SkinGameProps) {
	const random = getDeterministicRandom(new Date(), "skin");
	const [actualSkin, setActualSkin] = useState(
		skins[Math.floor(random() * skins.length)],
	);
	const actualGod = useMemo(() => {
		return gods.find((god) => god.id === actualSkin.god_id);
	}, [actualSkin, gods]);

	const [actual, setActual] = useLocalStorage("skin", {
		god: -1,
		skin1: -1,
	});

	const [loaded, setLoaded] = useBool(false);

	const [win, setWin] = useLocalStorage("skinWin", false);
	const [skinMiniGameWin, setSkinMiniGameWin] = useLocalStorage(
		"skinMiniGameWin",
		false,
	);
	const [guesses, setGuesses] = useState(0);

	const [selected, setSelected] = useLocalStorage("skinSelectedValue", "");
	const [selectedGods, setSelectedGods] = useState<Gods>([]);
	const [selectedGodsIDs, setSelectedGodsIDs] = useLocalStorage<number[]>(
		"skinSelectedGodsIDs",
		[],
	);

	const winRef = useRef<HTMLHeadingElement>(null);

	// Print current god on dev
	useEffect(() => {
		dlog(actualSkin.god_name);
	}, [actualSkin]);

	// Save current god id
	useEffect(() => {
		setActual({ god: actualSkin.god_id, skin1: actualSkin.skin_id1 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualSkin]);

	// Reset game current if god changes
	useEffect(() => {
		if (actual.god !== -1 && actualSkin.god_id !== actual.god) {
			window.localStorage.removeItem("skinSelectedValue");
			setSelected("");
			window.localStorage.removeItem("skinSelectedGodsIDs");
			setSelectedGodsIDs([]);
			window.localStorage.removeItem("skinWin");
			setWin(false);
			window.localStorage.removeItem("skinMiniGameWin");
			setSkinMiniGameWin(false);
			setGuesses(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actual.god, actualSkin.god_id]);

	// Scroll to win on win
	useEffect(() => {
		if (win) {
			winRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [win]);

	useEffect(() => {
		if (!actualSkin.godSkin_URL) {
			const newSkin = skins[Math.floor(random() * skins.length)];
			setActualSkin(newSkin);
		}
	}, [actualSkin]);

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
		const data = window.localStorage.getItem("skinSelectedGodsIDs");
		if (data === null || data === "[]") {
			setSelectedGods([]);
			setSelectedGodsIDs([]);
			setGuesses(0);
			setLoaded.setTrue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className="mx-auto px-2 text-center">
			{!loaded && <Loading />}
			{loaded && (
				<>
					<div className="mb-8">
						<h2 className="mb-4">Who has this skin?</h2>
						<div
							className={cn(
								"mx-auto w-fit",
								guesses < 1 ? "[&_img]:blur-sm" : "[&_img]:blur-none",
								guesses < 2 ? "grayscale" : "grayscale-0",
								win && "grayscale-0 [&_img]:blur-none",
							)}
						>
							<IconContainer
								alt="Skin image"
								src={actualSkin.godSkin_URL}
								height={426.66}
								width={320}
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

							if (god.Name === actualSkin.god_name && !win) {
								setTimeout(() => {
									setWin(true);
								}, 150 * 1 + 300);
								trackEvent("Win_Skin", { guesses }, "/skin");
							}
							return true;
						}}
					/>

					<SimpleContainer
						actualName={actualSkin.god_name}
						gods={selectedGods}
					/>

					<WinContainer
						ref={winRef}
						win={skinMiniGameWin}
						actualGod={actualGod}
						word="skin"
						nextGame="Item"
						tracker={() => {
							trackEvent("Click_Next_Skin", {}, "/skin");
						}}
						showMiniGame={win}
						MiniGame={
							<SkinMiniGame
								actualSkin={actualSkin}
								skins={skins}
								win={skinMiniGameWin}
								actual={actual}
								onWin={() => {
									setTimeout(() => {
										setSkinMiniGameWin(true);
									});
								}}
							/>
						}
					/>
				</>
			)}
		</section>
	);
}
