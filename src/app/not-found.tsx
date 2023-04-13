import { FiArrowRight } from "react-icons/fi";

import { TrackingLink } from "@/components/link/TrackingLink";

export default function NotFound() {
	return (
		<section className="mx-auto text-center">
			<TrackingLink
				className="mx-auto mb-12 block w-fit p-4"
				href="/"
				eventName="home-404"
			>
				<h1 className="text-6xl">Smitedle</h1>
			</TrackingLink>

			<h2 className="mb-4">404 - Not Found</h2>
			<p>This page doesn&apos;t exist</p>
			<TrackingLink
				className="mx-auto mb-12 mt-8 block p-4"
				href="/"
				eventName="home-404"
			>
				<span className="group break-keep text-xl">
					Return to the home screen&nbsp;
					<FiArrowRight className="inline-block text-accent transition-all group-hover:translate-x-1" />
				</span>
			</TrackingLink>
		</section>
	);
}
