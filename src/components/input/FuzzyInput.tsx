"use client";

import { filter as fuzzyFilter, sort as fuzzySort } from "fuzzyjs";
import { useState } from "react";

import { Gods } from "@/lib/smiteApi";

import { Preview } from "../display/Preview";

export type FuzzyInputProps = {
	initialData: Gods;
	selectionProperty?: "Name";
	selected: string;
	setSelected: (value: string) => void;
	submit: () => boolean;
};

export function FuzzyInput({
	initialData,
	selectionProperty = "Name",
	selected,
	setSelected,
	submit,
}: FuzzyInputProps) {
	const [data, setData] = useState<Gods>([]);
	const [isFocused, setIsFocused] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

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
			.slice(0, 6);

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
					placeholder="Type a gods name..."
					onChange={(e) => {
						setSelected(e.target.value);
						searchItem(e.target.value);
					}}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					value={selected}
				/>

				<button
					type="button"
					className="border border-accent bg-white/5 p-4 text-accent ring-accent backdrop-blur hover:bg-white/10 hover:text-white hover:ring-1"
					onClick={() => {
						submit();

						setSelected("");
					}}
				>
					{">"}
				</button>
			</div>
			<div className="relative">
				{data.length > 0 && (isFocused || isHovered) && (
					<div
						className="absolute inset-x-0 top-0 z-10 mx-auto flex max-h-72 w-80 flex-col gap-2 overflow-y-auto bg-white/5 p-2 backdrop-blur"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{data.map((item) => (
							<button
								key={item.Name}
								type="button"
								className="border border-transparent p-2 hover:border-accent hover:bg-white/10"
								onClick={() => {
									setSelected(item.Name);
									setData([]);
								}}
							>
								<Preview item={item} />
							</button>
						))}
					</div>
				)}
			</div>
		</>
	);
}
