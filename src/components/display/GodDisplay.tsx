import { ImArrowDown, ImArrowUp } from "react-icons/im";

import { God } from "@/lib/smiteApi";
import { cn } from "@/lib/utils";

import { ImageContainer } from "./IconContainer";

export type GodDisplayProps = {
	god: God;
	actualGod: God;
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

type TextContainerProps = {
	children: React.ReactNode;
	correct?: Correctness;
	isSmallText?: boolean;
};

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
		<div
			className={cn(
				bgColor,
				isSmallText && "text-xs",
				"relative flex h-20 w-20 items-center justify-center border border-accent backdrop-blur",
			)}
		>
			<p>{children}</p>
		</div>
	);
}

export function GodDisplay({ god, actualGod }: GodDisplayProps) {
	const [range, damage] = splitTypes(god.Type);
	const [actualRange, actualDamage] = splitTypes(actualGod.Type);
	const pros = god.Pros.split(", ");
	const actualPros = actualGod.Pros.split(", ");
	const pos = god.Position.split(", ");
	const actualPos = actualGod.Position.split(", ");

	return (
		<div className="flex w-max flex-row justify-center gap-2 text-sm">
			<ImageContainer
				src={god.godIcon_URL}
				alt={`${god.Name} icon`}
				width={80 - 2}
				height={80 - 2}
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
		</div>
	);
}
