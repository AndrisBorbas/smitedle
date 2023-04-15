import Image from "next/image";

import { cn } from "@/lib/utils";

import styles from "./IconContainer.module.scss";

export type IconContainerProps = {
	src: string;
	alt: string;
	size?: number;
};

export function IconContainer({ src, alt, size = 64 }: IconContainerProps) {
	return (
		<div
			className={cn(
				styles.imageShadow,
				// TODO: postcss doesnt like custom classes in css modules, try again later
				"after:shadow-inner-xl relative border border-accent",
			)}
		>
			<Image src={src} alt={alt} width={size} height={size} unoptimized />
		</div>
	);
}
