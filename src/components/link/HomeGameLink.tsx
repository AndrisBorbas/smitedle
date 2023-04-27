import Link from "next/link";

import { cn } from "@/lib/utils";

export type HomeGameLinkProps = {
	name: string;
	description?: string;
	icon?: string;
	onClick?: () => void;
};

export function HomeGameLink({
	name,
	description,
	icon,
	onClick,
}: HomeGameLinkProps) {
	return (
		<Link
			href={`/${name.toLowerCase()}`}
			className={cn(
				"relative block w-80 overflow-hidden border-[3px] border-accent bg-white/5 p-4 text-left text-white/80 backdrop-blur transition-all duration-500",
				"fancyButton hover:bg-white/20 hover:text-white",
			)}
			onClick={onClick}
		>
			<h4 className="mb-1 text-lg">{name}</h4>
			<p className="text-sm">{description}</p>
		</Link>
	);
}
