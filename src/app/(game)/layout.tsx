import Link from "next/link";
import { SiGithub, SiKofi } from "react-icons/si";

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
				<Link className="hover:text-glow mx-auto mb-4 block w-fit p-4" href="/">
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
						className="group whitespace-nowrap break-keep"
					>
						<span className="group-hover:text-glow underline transition-all group-hover:decoration-accent group-hover:underline-offset-2">
							consider supporting me on Ko-Fi
						</span>{" "}
						<SiKofi className="inline-block pb-1 text-3xl drop-shadow-glow transition-all group-hover:text-accent" />
					</TrackingLink>
				</div>
				<div className="mt-4">
					Bugs and issues can be reported on the{" "}
					<TrackingLink
						href="https://github.com/andrisborbas/smitedle/issues"
						isExternal
						target="_blank"
						eventName="click-layout-bugs"
						className="group whitespace-nowrap break-keep"
					>
						<span className="group-hover:text-glow underline transition-all group-hover:decoration-accent group-hover:underline-offset-2">
							projects GitHub
						</span>{" "}
						<SiGithub className="inline-block pb-1 text-3xl drop-shadow-glow transition-all group-hover:text-accent" />{" "}
						<span className="group-hover:text-glow underline transition-all group-hover:decoration-accent group-hover:underline-offset-2">
							page.
						</span>
					</TrackingLink>
				</div>
			</section>
		</>
	);
}
