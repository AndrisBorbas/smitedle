import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function dlog(...args: unknown[]) {
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line no-console
		console.log(...args);
	}
}

export function derr(...args: unknown[]) {
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line no-console
		console.error(...args);
	}
}
