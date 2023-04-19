import Image from "next/image";

import { cn } from "@/lib/utils";

import styles from "./IconContainer.module.scss";

export type ImageContainerProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

export function ImageContainer({
	src,
	alt,
	width = 64,
	height = 64,
}: ImageContainerProps) {
	return (
		<div
			className={cn(
				styles.imageShadow,
				// TODO: postcss doesnt like custom classes in css modules, try again later
				"after:shadow-inner-xl relative border border-accent",
			)}
		>
			<Image src={src} alt={alt} width={width} height={height} unoptimized />
		</div>
	);
}
