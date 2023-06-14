"use client";

import { Item } from "@joshmiquel/hirez/@types";
import { useEffect, useRef, useState } from "react";

import { getDeterministicRandom } from "@/lib/game";
import { useBool, useLocalStorage } from "@/lib/hooks";
import { trackEvent } from "@/lib/track";
import { cn, dlog } from "@/lib/utils";

import { SimpleContainer } from "../display/GodsContainer";
import { IconContainer } from "../display/IconContainer";
import { WinContainer } from "../display/WinContainer";
import { FuzzyInput } from "../input/FuzzyInput";
import { Loading } from "../layout/Loading";

export type ItemGameProps = {
	items: Item.Base[];
};

export function ItemGame({ items }: ItemGameProps) {
	const random = getDeterministicRandom(new Date(), "item");
	const [actualItem] = useState(items[Math.floor(random() * items.length)]);

	const [actual, setActual] = useLocalStorage("item", -1);

	const [loaded, setLoaded] = useBool(false);

	const [win, setWin] = useLocalStorage("itemWin", false);
	const [guesses, setGuesses] = useState(0);

	const [selected, setSelected] = useLocalStorage("itemSelectedValue", "");
	const [selectedItems, setSelectedItems] = useState<Item.Base[]>([]);
	const [selectedItemsIDs, setSelectedItemsIDs] = useLocalStorage<number[]>(
		"itemSelectedItemsIDs",
		[],
	);

	const winRef = useRef<HTMLHeadingElement>(null);

	// Print current item on dev
	useEffect(() => {
		dlog(actualItem.DeviceName);
	}, [actualItem.DeviceName]);

	// Save current item id
	useEffect(() => {
		setActual(actualItem.ItemId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actualItem.ItemId]);

	// Reset game current if item changes
	useEffect(() => {
		if (actual !== -1 && actualItem.ItemId !== actual) {
			window.localStorage.removeItem("itemSelectedValue");
			setSelected("");
			window.localStorage.removeItem("itemSelectedItemsIDs");
			setSelectedItemsIDs([]);
			window.localStorage.removeItem("itemWin");
			setWin(false);
			setGuesses(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actual, actualItem.ItemId]);

	// Scroll to win on win
	useEffect(() => {
		if (win) {
			winRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [win]);

	// Set loaded after items are loaded from local storage
	useEffect(() => {
		if (!loaded && selectedItemsIDs.length !== 0) {
			setSelectedItems(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectedItemsIDs.map(
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					(id) => items.find(({ ItemId }) => ItemId === id)!,
				),
			);
			setGuesses(selectedItemsIDs.length);
			setLoaded.setTrue();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items, loaded, selectedItemsIDs]);

	// Set loaded if no items are selected
	useEffect(() => {
		const data = window.localStorage.getItem("itemSelectedItemsIDs");
		if (data === null || data === "[]") {
			setSelectedItems([]);
			setSelectedItemsIDs([]);
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
						<h2 className="mb-4">What is this item called?</h2>
						<div
							className={cn(
								"mx-auto w-fit",
								guesses === 0 && "grayscale [&_img]:blur-[6px]",
								guesses === 1 && "grayscale [&_img]:blur-[3px]",
								guesses === 2 && "grayscale-0 [&_img]:blur-[3px]",
								(guesses > 2 || win) && "grayscale-0 [&_img]:blur-none",
							)}
						>
							<IconContainer
								alt="Item image"
								src={actualItem.itemIcon_URL}
								height={128}
								width={128}
								anim
								priority
							/>
						</div>
					</div>
					<FuzzyInput
						initialItems={items}
						filteredData={selectedItemsIDs}
						selected={selected}
						setSelected={setSelected}
						disabled={win}
						showIcon={false}
						submit={() => {
							const item = items.find(
								({ DeviceName }) => DeviceName === selected,
							);
							if (!item || selectedItems.includes(item)) {
								return false;
							}
							setGuesses(guesses + 1);
							setSelectedItemsIDs([item.ItemId, ...selectedItemsIDs]);
							setSelectedItems([item, ...selectedItems]);

							if (item.DeviceName === actualItem.DeviceName && !win) {
								setTimeout(() => {
									setWin(true);
								}, 150 * 1 + 300);
								trackEvent("win-item", { guesses }, "/item");
							}
							return true;
						}}
					/>

					<SimpleContainer
						actualName={actualItem.DeviceName}
						items={selectedItems}
					/>

					<WinContainer
						ref={winRef}
						win={win}
						actualItem={actualItem}
						word="item"
						nextGame="Promo"
						tracker={() => {
							trackEvent("click-next-last", {}, "/item");
						}}
					/>
				</>
			)}
		</section>
	);
}
