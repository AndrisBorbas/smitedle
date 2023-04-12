import { TrackingLink } from "./TrackingLink";

export type HomeGameLinkProps = {
	name: string;
	description?: string;
	icon?: string;
};

export function HomeGameLink({ name, description, icon }: HomeGameLinkProps) {
	return (
		<TrackingLink
			href={`/${name.toLowerCase()}`}
			eventName={`home-${name.toLowerCase()}`}
			className="block w-64 rounded border border-yellow-500 p-4 text-left"
		>
			<h4 className="mb-1 text-lg">{name}</h4>
			<p className="text-sm">{description}</p>
		</TrackingLink>
	);
}
