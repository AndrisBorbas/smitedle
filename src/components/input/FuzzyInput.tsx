"use client";

import { Item } from "@joshmiquel/hirez/@types";
import { filter as fuzzyFilter, sort as fuzzySort } from "fuzzyjs";
import { useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

import { useBool } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { Preview } from "../display/Preview";
import styles from "./FuzzyInput.module.scss";

export type FuzzyInputProps = {
	initialGods?: Gods;
	initialItems?: Item.Base[];
	filteredData: number[];
	// selectionProperty?: "Name" | "DeviceName";
	selected: string;
	disabled?: boolean;
	setSelected: (value: string) => void;
	submit: () => boolean;
	showIcon?: boolean;
};

export function FuzzyInput({
	initialGods,
	initialItems,
	filteredData,
	// selectionProperty,
	selected,
	disabled,
	setSelected,
	submit,
	showIcon = true,
}: FuzzyInputProps) {
	const [gods, setGods] = useState<Gods>([]);
	const [items, setItems] = useState<Item.Base[]>([]);
	const [isFocused, setIsFocused] = useBool(false);
	const [isHovered, setIsHovered] = useBool(false);
	const [showImmune, setShowImmune] = useBool(false);

	function searchItem(query: string) {
		if (!query) {
			setGods([]);
			setItems([]);
			return;
		}

		if (initialGods) {
			const filtered = initialGods
				.filter((god) => !filteredData.some((id) => id === god.id))
				.filter(
					fuzzyFilter(query, {
						iterator: (god) => god.Name,
					}),
				);
			const result = filtered
				.sort(
					fuzzySort(query, {
						iterator: (god) => god.Name,
					}),
				)
				.slice(0, 6);

			if (result.length) {
				setGods(result);
			} else {
				setGods([]);
			}
		} else if (initialItems) {
			const filtered = initialItems
				.filter((item) => !filteredData.some((id) => id === item.ItemId))
				.filter(fuzzyFilter(query, { iterator: (item) => item.DeviceName }));
			const result = filtered
				.sort(fuzzySort(query, { iterator: (item) => item.DeviceName }))
				.slice(0, 6);

			if (result.length) {
				setItems(result);
			} else {
				setItems([]);
			}
		}
	}

	return (
		<>
			<div className="mx-auto mb-2 flex max-w-[20rem] flex-row justify-center gap-2">
				<input
					className="w-full border-2 border-accent bg-white/5 p-3 px-4 text-lg text-stone-50 backdrop-blur placeholder:text-stone-400 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed"
					type="search"
					placeholder={`Type ${initialGods ? "a gods" : ""}${
						initialItems ? "an items" : ""
					} name...`}
					onChange={(e) => {
						setSelected(e.target.value);
						searchItem(e.target.value);
					}}
					onFocus={() => setIsFocused.setTrue()}
					onBlur={() => setIsFocused.setFalse()}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							if (!submit()) {
								setShowImmune.setTrue();
								setTimeout(() => setShowImmune.setFalse(), 700);
							} else {
								setSelected("");
								searchItem("");
							}
						}
					}}
					value={selected}
					disabled={disabled}
				/>

				<div className="relative">
					<button
						type="button"
						className="fancyButton border-2 border-accent bg-white/5 p-4 pr-5 text-2xl text-accent ring-accent backdrop-blur hover:bg-white/20 hover:text-white hover:ring-1"
						onClick={() => {
							if (!submit()) {
								setShowImmune.setTrue();
								setTimeout(() => setShowImmune.setFalse(), 700);
							} else {
								setSelected("");
								searchItem("");
							}
						}}
					>
						<BsArrowReturnLeft />
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
			</div>
			<div className="relative">
				{(gods.length > 0 || items.length > 0) && (isFocused || isHovered) && (
					<div
						className="absolute inset-x-0 top-0 z-10 mx-auto flex max-h-80 w-80 flex-col gap-2 overflow-y-auto bg-white/5 p-2 backdrop-blur"
						onMouseEnter={() => setIsHovered.setTrue()}
						onMouseLeave={() => setIsHovered.setFalse()}
						onMouseDown={() => setIsHovered.setTrue()}
						role="listbox"
						tabIndex={0}
					>
						{gods.map((god) => (
							<button
								key={god.Name}
								type="button"
								className="border border-transparent p-2 hover:border-accent hover:bg-white/10"
								onClick={() => {
									setSelected(god.Name);
									setGods([]);
								}}
							>
								<Preview god={god} showIcon={showIcon} />
							</button>
						))}
						{items.map((item) => (
							<button
								key={item.DeviceName}
								type="button"
								className="border border-transparent p-2 hover:border-accent hover:bg-white/10"
								onClick={() => {
									setSelected(item.DeviceName);
									setItems([]);
								}}
							>
								<Preview item={item} showIcon={showIcon} />
							</button>
						))}
					</div>
				)}
			</div>
		</>
	);
}
