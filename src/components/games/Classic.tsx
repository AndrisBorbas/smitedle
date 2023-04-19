"use client";

import { useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { Gods } from "@/lib/smiteApi";

import { GodsContainer } from "../display/GodsContainer";
import { FuzzyInput } from "../input/FuzzyInput";

export type ClassicGameProps = {
	gods: Gods;
};

export function ClassicGame({ gods }: ClassicGameProps) {
	const [selected, setSelected] = useState("");
	const [selectedGods, setSelectedGods] = useState<Gods>([]);

	const random = getDeterministicRandom(new Date());
	const actualGod = gods[Math.floor(random() * gods.length)];

	console.log(actualGod.Name);

	return (
		<section className="mx-auto px-2 text-center">
			<FuzzyInput
				initialData={gods}
				selected={selected}
				setSelected={setSelected}
				submit={() => {
					const god = gods.find((g) => g.Name === selected);
					if (!god || selectedGods.includes(god)) {
						return false;
					}
					setSelectedGods([god, ...selectedGods]);
					return true;
				}}
			/>
			<GodsContainer gods={selectedGods} actualGod={actualGod} />
		</section>
	);
}
