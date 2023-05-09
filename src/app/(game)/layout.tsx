import Link from "next/link";
import { SiKofi } from "react-icons/si";

import { ResetButton } from "@/components/input/ResetButton";
import { TrackingLink } from "@/components/link/TrackingLink";

type IndexLayoutProps = {
	children: React.ReactNode;
};

export default function IndexLayout({ children }: IndexLayoutProps) {
	return (
		<>
			<div className="fixed right-2 top-2 z-50">
				<ResetButton />
			</div>
			<section className="mx-auto text-center">
				<Link className="mx-auto mb-4 block w-fit p-4" href="/">
					<h1 className="text-6xl">Smitedle</h1>
				</Link>
				{children}
			</section>
			<section className="mx-auto mt-16 text-center">
				<div>
					If you like the project,{" "}
					<TrackingLink
						href="https://ko-fi.com/andrisborbas"
						isExternal
						target="_blank"
						eventName="click-layout-kofi"
						className="group"
					>
						<span className="group-hover:underline">
							consider supporting me on Ko-Fi
						</span>{" "}
						<SiKofi className="inline-block pb-1 text-3xl group-hover:text-accent" />
					</TrackingLink>
				</div>
			</section>
		</>
	);
}
