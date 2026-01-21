import { Item } from "@joshmiquel/hirez/@types";

import { God } from "@/lib/smiteApi";

import { IconContainer } from "./IconContainer";

export type PreviewProps = {
	god?: God;
	item?: Item.Base;
	data?: { id: number; name: string };
	showIcon?: boolean;
};

export function Preview({ item, god, data, showIcon = true }: PreviewProps) {
	return (
		<div className="flex flex-row items-center gap-4">
			{showIcon && (
				<IconContainer
					src={god?.godIcon_URL ?? item?.itemIcon_URL ?? ""}
					alt={`${god?.Name ?? item?.DeviceName ?? data?.name} icon`}
					width={48}
					height={48}
				/>
			)}
			<p>{god?.Name ?? item?.DeviceName ?? data?.name}</p>
		</div>
	);
}
