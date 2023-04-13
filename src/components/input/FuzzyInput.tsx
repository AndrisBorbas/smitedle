"use client";

import { filter as fuzzyFilter, sort as fuzzySort } from "fuzzyjs";
import { useState } from "react";

import { HirezGods } from "@/lib/smiteApi";

import { Preview } from "../display/Preview";

export type FuzzyInputProps = {
	initialData: HirezGods;
	selectionProperty?: "Name";
};

export function FuzzyInput({
	initialData,
	selectionProperty = "Name",
}: FuzzyInputProps) {
	const [data, setData] = useState<HirezGods>([]);
	const [isFocused, setIsFocused] = useState(false);

	function searchItem(query: string) {
		if (!query) {
			setData([]);
			return;
		}

		const filtered = initialData.filter(
			fuzzyFilter(query, { iterator: (item) => item[selectionProperty] }),
		);
		const result = filtered
			.sort(fuzzySort(query, { iterator: (item) => item[selectionProperty] }))
			.slice(0, 10);

		if (result.length) {
			setData(result);
		} else {
			setData([]);
		}
	}

	return (
		<>
			<div className="mx-auto mb-2 flex max-w-[20rem] flex-row justify-center gap-2">
				<input
					className="w-full border border-accent bg-white/5 p-3 px-4 text-lg text-stone-50 backdrop-blur placeholder:text-stone-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-accent"
					type="search"
					placeholder="Type a gods name ..."
					onChange={(e) => searchItem(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				<button
					type="button"
					className="border border-accent bg-white/5 p-4 text-accent ring-accent backdrop-blur hover:bg-white/10 hover:text-white hover:ring-1"
				>
					{">"}
				</button>
			</div>
			{data.length > 0 && isFocused && (
				<div className="mx-auto flex max-h-64 max-w-[20rem] flex-col gap-2 overflow-y-auto bg-slate-900 p-2">
					{data.map((item) => (
						<button type="button" className="rounded p-2 hover:bg-slate-800">
							<Preview item={item} />
						</button>
					))}
				</div>
			)}
		</>
	);
}
