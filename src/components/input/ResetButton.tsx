"use client";

import { usePlausible } from "next-plausible";
import { useState } from "react";
import { TbRefreshAlert } from "react-icons/tb";

import { cn } from "@/lib/utils";

export function ResetButton() {
	const [clicks, setClicks] = useState(0);
	const plausible = usePlausible();

	return (
		<div className="fixed right-2 top-2 z-40">
			<button
				className={cn(
					"fixed inset-0 z-40 hidden bg-slate-950/60",
					clicks > 0 && "block",
				)}
				type="button"
				onClick={() => {
					setClicks(0);
				}}
				aria-label="Cancel reset"
			/>
			<button
				className="group relative z-50 p-2 text-stone-50 transition-all hover:text-red-500 focus:text-red-500 focus:outline-none"
				onClick={() => {
					if (clicks < 1) {
						setClicks((c) => c + 1);
						return;
					}
					setClicks(0);
					plausible("click-reset");
					localStorage.clear();
					window.location.reload();
				}}
				type="button"
				title="Reset app state"
			>
				<TbRefreshAlert className="z-50 text-2xl drop-shadow-glow" />
				<div className="text-glow invisible absolute right-0 z-50 w-fit whitespace-nowrap break-keep bg-white/5 px-1 text-center text-stone-50 backdrop-blur group-hover:visible">
					Reset app state
				</div>
				<div
					className={cn(
						"text-glow invisible absolute right-10 top-1 z-50 w-fit whitespace-nowrap break-keep bg-white/5 px-1 text-center text-stone-50 backdrop-blur",
						clicks > 0 && "visible",
					)}
				>
					Are you sure?
				</div>
			</button>
		</div>
	);
}
