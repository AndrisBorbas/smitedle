"use client";

import { Item } from "@joshmiquel/hirez/@types";
import { filter as fuzzyFilter, sort as fuzzySort } from "fuzzyjs";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsArrowReturnLeft } from "react-icons/bs";

import { useBool } from "@/lib/hooks";
import { Gods } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { Preview } from "../display/Preview";
import styles from "./FuzzyInput.module.scss";

export type FuzzyInputProps = {
	initialGods?: Gods;
	initialItems?: Item.Base[];
	initialData?: { id: number; name: string }[];
	filteredData: number[];
	// selectionProperty?: "Name" | "DeviceName";
	selected: string;
	disabled?: boolean;
	setSelected: (value: string) => void;
	submit: () => boolean;
	showIcon?: boolean;
	className?: string;
};

export function FuzzyInput({
	initialGods,
	initialItems,
	initialData,
	filteredData,
	// selectionProperty,
	selected,
	disabled,
	setSelected,
	submit,
	className,
	showIcon = true,
}: FuzzyInputProps) {
	const [gods, setGods] = useState<Gods>([]);
	const [items, setItems] = useState<Item.Base[]>([]);
	const [data, setData] = useState<{ id: number; name: string }[]>([]);
	const [isFocused, setIsFocused] = useBool(false);
	const [isHovered, setIsHovered] = useBool(false);
	const [showImmune, setShowImmune] = useBool(false);
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const [dropdownPosition, setDropdownPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
	});

	const updateDropdownPosition = () => {
		if (inputContainerRef.current) {
			const rect = inputContainerRef.current.getBoundingClientRect();
			setDropdownPosition({
				top: rect.bottom,
				left: rect.left + rect.width / 2,
				width: 320, // w-80 = 20rem = 320px
			});
		}
	};

	useEffect(() => {
		if (
			inputContainerRef.current &&
			(gods.length > 0 || items.length > 0 || data.length > 0)
		) {
			updateDropdownPosition();
		}
	}, [gods, items, data, isFocused, isHovered]);

	useEffect(() => {
		if (gods.length > 0 || items.length > 0 || data.length > 0) {
			window.addEventListener("scroll", updateDropdownPosition, true);
			window.addEventListener("resize", updateDropdownPosition);

			return () => {
				window.removeEventListener("scroll", updateDropdownPosition, true);
				window.removeEventListener("resize", updateDropdownPosition);
			};
		}
	}, [gods.length, items.length, data.length]);

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
		} else if (initialData) {
			const filtered = initialData
				.filter((entry) => !filteredData.some((id) => id === entry.id))
				.filter(fuzzyFilter(query, { iterator: (entry) => entry.name }));
			const result = filtered
				.sort(fuzzySort(query, { iterator: (entry) => entry.name }))
				.slice(0, 6);

			if (result.length) {
				setData(result);
			} else {
				setData([]);
			}
		}
	}

	return (
		<>
			<div
				ref={inputContainerRef}
				className={cn(
					"mx-auto mb-2 flex max-w-[20rem] flex-row justify-center gap-2",
					className,
				)}
			>
				<input
					className="w-full border-2 border-accent bg-white/5 p-3 px-4 text-lg text-stone-50 backdrop-blur placeholder:text-stone-400 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed"
					type="search"
					placeholder={`Type ${initialGods ? "a gods" : ""}${
						initialItems ? "an items" : ""
					}${initialData ? "a" : ""} name...`}
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
			{(gods.length > 0 || items.length > 0 || data.length > 0) &&
				(isFocused || isHovered) &&
				typeof document !== "undefined" &&
				createPortal(
					<div
						className="fixed z-50 flex max-h-80 flex-col gap-2 overflow-y-auto bg-white/5 p-2 backdrop-blur"
						style={{
							top: dropdownPosition.top,
							left: dropdownPosition.left,
							width: dropdownPosition.width,
							transform: "translateX(-50%)",
						}}
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
						{data.map((entry) => (
							<button
								key={entry.id}
								type="button"
								className="border border-transparent p-2 hover:border-accent hover:bg-white/10"
								onClick={() => {
									setSelected(entry.name);
									setData([]);
								}}
							>
								<Preview data={entry} showIcon={showIcon} />
							</button>
						))}
					</div>,
					document.body,
				)}
		</>
	);
}
