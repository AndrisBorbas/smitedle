import { forwardRef } from "react";

import { God } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { HomeGameLink } from "../link/HomeGameLink";
import { IconContainer } from "./IconContainer";
import { Timer } from "./Timer";

export type WinContainerProps = {
	win: boolean;
	actualGod?: God;
	nextGame: string;
	tracker: () => void;
};

export const WinContainer = forwardRef<HTMLDivElement, WinContainerProps>(
	({ win, actualGod, nextGame, tracker }, ref) => {
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
						<h4 className="mb-1">The god was: {actualGod?.Name}</h4>
						<h5 className="mb-2">{actualGod?.Title}</h5>
						<IconContainer
							src={actualGod?.godCard_URL ?? ""}
							alt={`${actualGod?.Name} thumbnail`}
							width={180}
							height={335}
							anim
						/>
						<div className="mt-8">
							<Timer />
						</div>
						<div className="mt-8 w-full">
							<HomeGameLink
								name={nextGame}
								description="Try the next game"
								animate
								onClick={tracker}
							/>
						</div>
					</>
				)}
			</div>
		);
	},
);
