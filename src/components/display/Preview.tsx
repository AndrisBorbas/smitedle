import { God } from "@/lib/smiteApi";

import { ImageContainer } from "./IconContainer";

export type PreviewProps = {
	item: God;
};

export function Preview({ item }: PreviewProps) {
	return (
		<div className="flex flex-row items-center gap-4">
			<ImageContainer
				src={item.godIcon_URL}
				alt={`${item.Name} icon`}
				width={48}
				height={48}
			/>
			<p>{item.Name}</p>
		</div>
	);
}
