import { TrackingLink } from "./TrackingLink";

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
		<TrackingLink
			href={`/${name.toLowerCase()}`}
			eventName={`home-${name.toLowerCase()}`}
			className="block w-80 rounded border border-accent bg-white/5 p-4 text-left backdrop-blur"
			onClick={onClick}
		>
			<h4 className="mb-1 text-lg">{name}</h4>
			<p className="text-sm">{description}</p>
		</TrackingLink>
	);
}
