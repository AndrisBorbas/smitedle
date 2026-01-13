import { useEffect } from "react";
import * as Swetrix from "swetrix";

import { TRACKING_ID } from "@/data/site";
import { dlog } from "@/lib/utils";

export function useSwetrix(
	pid: string = TRACKING_ID,
	initOptions: Swetrix.LibOptions = {
		apiURL: "https://succ.andrisborbas.com/log",
	},
	pageViewsOptions: Swetrix.PageViewsOptions = {},
) {
	useEffect(() => {
		Swetrix.init(pid, initOptions);
		Swetrix.trackViews(pageViewsOptions);
		// void Swetrix.trackErrors();
	}, [initOptions, pageViewsOptions, pid]);
}

export const getPayload = () => ({
	// eslint-disable-next-line no-restricted-globals
	hostname: location.hostname,

	// eslint-disable-next-line no-restricted-globals
	screen: `${screen.width}x${screen.height}`,
	language: navigator.language,

	// eslint-disable-next-line no-restricted-globals
	url: `${location.pathname}${location.search}`,
});

export function trackEvent(
	eventName: string,
	data: { [key: string]: string | number | boolean | null | undefined },
	url?: string,
) {
	if (process.env.NODE_ENV !== "production") {
		dlog("trackEvent blocked: ", eventName, data, url, getPayload());
		return;
	}
	Swetrix.track({
		ev: eventName,
		meta: data,
	});
}
