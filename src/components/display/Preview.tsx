import Image from "next/image";

import { HirezGod } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { IconContainer } from "./IconContainer";

export type PreviewProps = {
	item: HirezGod;
};

export function Preview({ item }: PreviewProps) {
	return (
		<div className="flex flex-row items-center gap-4">
			<IconContainer
				src={item.godIcon_URL}
				alt={`${item.Name} icon`}
				size={48}
			/>
			<p>{item.Name}</p>
		</div>
	);
}
