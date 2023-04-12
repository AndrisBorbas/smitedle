import manifest from "@/../package.json";

import { TrackingLink } from "../link/TrackingLink";

export type FooterProps = {
	buildDate?: number;
};

export function Footer({ buildDate }: FooterProps) {
	const buildDateFormat = buildDate && new Date(buildDate);
	const buildDateString = buildDate
		? new Intl.DateTimeFormat("hu-HU", {
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
		  })
				.format(buildDateFormat)
				.match(/\d+/g)
				?.join("")
		: "";

	return (
		<footer className="mt-auto flex flex-col justify-between bg-slate-800 p-4 sm:flex-row sm:p-8">
			<div className="flex w-full flex-row justify-between">
				<p className="pr-4 text-xs">
					Smite is a registered trademark of Hi-Rez Studios. Some content and
					images are the property of Hi-Rez Studios.
				</p>
				<p className="text-xs decoration-yellow-300 underline-offset-2 hover:underline">
					<TrackingLink
						href="https://www.github.com/andrisborbas/smitedle"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub link"
						isExternal
						eventName="footer-version-click"
						eventData={{ site: "GitHub" }}
					>
						v{manifest.version}.{buildDateString} &copy;&nbsp;
						{new Date().getFullYear()}
						&nbsp;AndrisBorbas
					</TrackingLink>
				</p>
			</div>
		</footer>
	);
}
