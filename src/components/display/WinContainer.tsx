import { Item } from "@joshmiquel/hirez/@types";
import { forwardRef } from "react";

import { God } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { HomeGameLink } from "../link/HomeGameLink";
import { IconContainer } from "./IconContainer";
import { Timer } from "./Timer";

export type WinContainerProps = {
	win: boolean;
	actualGod?: God;
	actualItem?: Item.Base;
	nextGame: "Promo" | string;
	tracker: () => void;
	word: string;
};

export const WinContainer = forwardRef<HTMLDivElement, WinContainerProps>(
	({ win, actualGod, actualItem, nextGame, word, tracker }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"mx-auto mt-8 flex w-[20rem] flex-col items-center border border-accent bg-white/5 p-8 backdrop-blur",
					win ? "flex" : "hidden",
				)}
			>
				{win && (
					<>
						<h3 className="text-glow mb-4">You won! 🏆</h3>
						<h4 className="mb-1">
							The {actualGod ? "god" : ""}
							{actualItem ? "item" : ""} was:&shy;
							<wbr />{" "}
							<span className="whitespace-nowrap">
								{actualGod?.Name ?? actualItem?.DeviceName}
							</span>
						</h4>
						{actualGod && <h5 className="mb-2">{actualGod.Title}</h5>}
						<IconContainer
							src={actualGod?.godCard_URL ?? actualItem?.itemIcon_URL ?? ""}
							alt={`${actualGod?.Name ?? actualItem?.DeviceName} thumbnail`}
							width={180}
							height={335}
							anim
						/>
						<div className="mt-8">
							<Timer word={word} />
						</div>
						<div className="mt-8 w-full">
							{nextGame === "Promo" ? (
								<HomeGameLink
									name="Support me on Ko-fi"
									description="If you like this project, consider supporting, so I can keep it up ad-free!"
									animate
									onClick={tracker}
									href="https://ko-fi.com/andrisborbas"
								/>
							) : (
								<HomeGameLink
									name={nextGame}
									description="Try the next game"
									animate
									onClick={tracker}
								/>
							)}
						</div>
					</>
				)}
			</div>
		);
	},
);
