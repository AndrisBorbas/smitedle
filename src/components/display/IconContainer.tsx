import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

import styles from "./IconContainer.module.scss";

export type IconContainerProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	anim?: boolean;
};

export const appearAnim = {
	initial: {
		display: "none",
		scale: 0,
	},
	show: {
		display: "block",
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
};

export function IconContainer({
	src,
	alt,
	width = 64,
	height = 64,
	anim = false,
}: IconContainerProps) {
	return anim ? (
		<motion.div variants={appearAnim} className="fancyAnim">
			<div
				className={cn(
					styles.imageShadow,
					// TODO: postcss doesnt like custom classes in css modules, try again later
					"after:shadow-inner-xl relative border border-accent",
				)}
			>
				<Image src={src} alt={alt} width={width} height={height} unoptimized />
			</div>
		</motion.div>
	) : (
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
