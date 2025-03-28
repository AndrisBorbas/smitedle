"use client";

import Link, { LinkProps } from "next/link";
import { usePlausible } from "next-plausible";

type TrackingLinkProps = {
	isExternal?: boolean;
	eventName: string;
	eventData?: object;
	href: string;
	ref?: React.Ref<HTMLAnchorElement>;
} & React.HTMLProps<HTMLAnchorElement> &
	LinkProps;

export function TrackingLink({
	isExternal,
	eventName,
	eventData,
	href,
	onClick,
	children,
	...restProps
}: TrackingLinkProps) {
	const plausible = usePlausible();

	return (
		<>
			{isExternal && (
				<a
					href={href}
					onClick={(e) => {
						plausible(eventName, { props: { link: href, ...eventData } });
						onClick?.(e);
					}}
					{...restProps}
				>
					{children}
				</a>
			)}
			{!isExternal && (
				<Link
					href={href}
					onClick={(e) => {
						plausible(eventName, { props: { link: href, ...eventData } });
						onClick?.(e);
					}}
					{...restProps}
				>
					{children}
				</Link>
			)}
		</>
	);
}
