"use client";

import { TbRefreshAlert } from "react-icons/tb";

import { trackEvent } from "@/lib/track";

export function ResetButton() {
	return (
		<button
			className="group relative p-2 text-stone-50 transition-all hover:text-red-500 focus:text-red-500 focus:outline-none"
			onClick={() => {
				trackEvent("click-reset", {}, window.location.pathname);
				localStorage.clear();
				window.location.reload();
			}}
			type="button"
			title="Reset app state"
		>
			<TbRefreshAlert className="text-2xl drop-shadow-glow" />
			<div className="text-glow invisible absolute right-0 z-50 w-fit whitespace-nowrap break-keep bg-white/5 p-1 text-center text-stone-50 backdrop-blur group-hover:visible">
				Reset app state
			</div>
		</button>
	);
}
