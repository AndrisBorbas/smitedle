import Image from "next/image";

import { HirezGod } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import styles from "./Preview.module.scss";

export type PreviewProps = {
	item: HirezGod;
};

export function Preview({ item }: PreviewProps) {
	return (
		<div className="flex flex-row items-center gap-4">
			<span
				className={cn(
					styles.imageShadow,
					// TODO: postcss doesnt like custom classes in css modules, try again later
					"after:shadow-inner-xl relative rounded",
				)}
			>
				<Image
					src={item.godIcon_URL}
					alt={`${item.Name} icon`}
					width={64}
					height={64}
					unoptimized
				/>
			</span>
			<p>{item.Name}</p>
		</div>
	);
}
