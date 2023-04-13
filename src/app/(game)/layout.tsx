import { TrackingLink } from "@/components/link/TrackingLink";

type IndexLayoutProps = {
	children: React.ReactNode;
};

export default function IndexLayout({ children }: IndexLayoutProps) {
	return (
		<section className="mx-auto text-center">
			<TrackingLink
				className="mx-auto mb-4 block w-fit p-4"
				href="/"
				eventName="home"
			>
				<h1 className="text-6xl">Smitedle</h1>
			</TrackingLink>
			{children}
		</section>
	);
}
