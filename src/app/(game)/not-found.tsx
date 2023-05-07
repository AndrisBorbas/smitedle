import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
	return (
		<section className="mx-auto text-center">
			<Link className="mx-auto mb-12 block w-fit p-4" href="/">
				<h1 className="text-6xl">Smitedle</h1>
			</Link>

			<h2 className="mb-4">404 - Not Found</h2>
			<p>This page doesn&apos;t exist</p>
			<Link className="mx-auto mb-12 mt-8 block p-4" href="/">
				<span className="group break-keep text-xl">
					Return to the home screen&nbsp;
					<FiArrowRight className="inline-block text-accent transition-all group-hover:translate-x-1" />
				</span>
			</Link>
		</section>
	);
}
