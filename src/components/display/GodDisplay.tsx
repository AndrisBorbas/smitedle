import { Item } from "@joshmiquel/hirez/@types";
import { motion } from "framer-motion";
import { ImArrowDown, ImArrowUp } from "react-icons/im";

import { God } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { appearAnim, IconContainer } from "./IconContainer";

export type GodDisplayProps = {
	god: God;
	actualGod: God;
};

export type SimpleGodDisplayProps = {
	god?: God;
	item?: Item.Base;
	data?: { id: number; name: string };
	actualName: string;
};

function splitTypes(roles: string) {
	return roles.split(", ");
}

export type Correctness = boolean | "partial";

function checkSet(a: string[], b: string[]) {
	const same = a.every((v) => b.includes(v));
	const partial = a.some((v) => b.includes(v));
	let ret: Correctness = false;
	if (same && a.length === b.length) {
		ret = true;
	} else if (partial) {
		ret = "partial";
	}

	return ret;
}

type ContainerProps = {
	children: React.ReactNode;
	correct?: Correctness;
	small?: boolean;
};

function SimpleContainer({ children, small, correct = false }: ContainerProps) {
	let bgColor = "bg-red-600/25";

	if (correct === "partial") {
		bgColor = "bg-yellow-600/25";
	} else if (correct) {
		bgColor = "bg-green-600/25";
	} else {
		bgColor = "bg-red-600/25";
	}

	return (
		<motion.div variants={appearAnim} className="fancyAnim w-max">
			<div
				className={cn(
					bgColor,
					small ? "w-[16rem]" : "w-[20rem]",
					"relative flex flex-row items-center gap-4 border border-accent p-4 backdrop-blur",
				)}
			>
				{children}
			</div>
		</motion.div>
	);
}

export function SimpleDisplay({
	god,
	item,
	data,
	actualName,
}: SimpleGodDisplayProps) {
	return (
		<motion.div initial="initial" animate="show" className="w-max text-base">
			<SimpleContainer
				small={data !== undefined}
				correct={
					god?.Name === actualName ||
					item?.DeviceName === actualName ||
					data?.name === actualName
				}
			>
				{!data && (
					<IconContainer
						src={god?.godIcon_URL ?? item?.itemIcon_URL ?? ""}
						alt={`${god?.Name ?? item?.DeviceName} icon`}
						width={80 - 2}
						height={80 - 2}
					/>
				)}
				{god?.Name ?? item?.DeviceName ?? data?.name}
			</SimpleContainer>
		</motion.div>
	);
}

type TextContainerProps = {
	isSmallText?: boolean;
} & ContainerProps;

function TextContainer({
	children,
	correct = false,
	isSmallText = false,
}: TextContainerProps) {
	let bgColor = "bg-red-600/25";

	if (correct === "partial") {
		bgColor = "bg-yellow-600/25";
	} else if (correct) {
		bgColor = "bg-green-600/25";
	} else {
		bgColor = "bg-red-600/25";
	}

	return (
		<motion.div variants={appearAnim} className="fancyAnim">
			<div
				className={cn(
					bgColor,
					isSmallText && "text-xs",
					"relative flex h-20 w-20 items-center justify-center border border-accent backdrop-blur",
				)}
			>
				<p>{children}</p>
			</div>
		</motion.div>
	);
}

export function DetailedGodDisplay({ god, actualGod }: GodDisplayProps) {
	const [range, damage] = splitTypes(god.Type);
	const [actualRange, actualDamage] = splitTypes(actualGod.Type);
	const pros = god.Pros.split(", ");
	const actualPros = actualGod.Pros.split(", ");
	const pos = god.Position.split(", ");
	const actualPos = actualGod.Position.split(", ");

	return (
		<motion.div
			transition={{
				staggerChildren: 0.15,
			}}
			initial="initial"
			animate="show"
			className="flex w-max flex-row justify-center gap-2 text-sm"
		>
			<IconContainer
				src={god.godIcon_URL}
				alt={`${god.Name} icon`}
				width={80 - 2}
				height={80 - 2}
				anim
			/>
			<TextContainer correct={god.Gender === actualGod.Gender}>
				{god.Gender}
			</TextContainer>
			<TextContainer correct={god.Roles === actualGod.Roles}>
				{god.Roles}
			</TextContainer>
			<TextContainer correct={checkSet(pos, actualPos)}>
				{pos.join(", ")}
			</TextContainer>
			<TextContainer correct={range === actualRange}>{range}</TextContainer>
			<TextContainer correct={damage === actualDamage}>{damage}</TextContainer>
			<TextContainer isSmallText correct={checkSet(pros, actualPros)}>
				{pros.join(", ")}
			</TextContainer>
			<TextContainer correct={god.Pantheon === actualGod.Pantheon}>
				{god.Pantheon}
			</TextContainer>
			<TextContainer correct={god.ReleaseYear === actualGod.ReleaseYear}>
				{god.ReleaseYear}
				<ImArrowUp
					className={cn(
						"absolute left-[2px] top-[2px] -z-10 h-[calc(5rem-6px)] w-[calc(5rem-6px)] text-red-600/20",
						!(god.ReleaseYear < actualGod.ReleaseYear) && "hidden",
					)}
				/>
				<ImArrowDown
					className={cn(
						"absolute left-[2px] top-[2px] -z-10 h-[calc(5rem-6px)] w-[calc(5rem-6px)] text-red-600/20",
						!(god.ReleaseYear > actualGod.ReleaseYear) && "hidden",
					)}
				/>
			</TextContainer>
		</motion.div>
	);
}
