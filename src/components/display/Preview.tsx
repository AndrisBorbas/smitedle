import { God } from "@/lib/smiteApi";

import { IconContainer } from "./IconContainer";

export type PreviewProps = {
	item: God;
};

export function Preview({ item }: PreviewProps) {
	return (
		<div className="flex flex-row items-center gap-4">
			<IconContainer
				src={item.godIcon_URL}
				alt={`${item.Name} icon`}
				width={48}
				height={48}
			/>
			<p>{item.Name}</p>
		</div>
	);
}
