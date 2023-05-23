import Link from "next/link";

import { cn } from "@/lib/utils";

export type HomeGameLinkProps = {
	name: string;
	description?: string;
	icon?: string;
	onClick?: () => void;
	animate?: boolean;
};

export function HomeGameLink({
	name,
	description,
	icon,
	onClick,
	animate = false,
}: HomeGameLinkProps) {
	return (
		<Link
			href={`/${name.toLowerCase()}`}
			className={cn(
				"max-w-80 relative block w-full overflow-hidden border-[3px] border-accent bg-white/5 p-4 text-left text-white/80 backdrop-blur transition-all duration-500",
				"fancyButton group hover:bg-white/20 hover:text-white",
			)}
			onClick={onClick}
		>
			<h4 className="group-hover:text-glow mb-1 text-lg">{name}</h4>
			<p className="group-hover:text-glow text-sm">{description}</p>
			{!!animate && (
				<div
					className="animate-ping2 pointer-events-none absolute inset-0"
					draggable={false}
					aria-hidden
				/>
			)}
		</Link>
	);
}
