import { God, Gods } from "@/lib/smiteApi";

import { DetailedGodDisplay, SimpleGodDisplay } from "./GodDisplay";

export type GodsContainerProps = {
	gods: Gods;
	actualGod: God;
};

function HeaderContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-14 w-20 items-center justify-center rounded-b border-b-2 border-accent">
			<p>{children}</p>
		</div>
	);
}

export function DetailedGodsContainer({ gods, actualGod }: GodsContainerProps) {
	return (
		<div className="mx-auto flex w-max max-w-full flex-col justify-center gap-2 overflow-x-auto">
			<div className="flex w-max flex-row items-center justify-center gap-2 text-sm">
				<HeaderContainer>God</HeaderContainer>
				<HeaderContainer>Gender</HeaderContainer>
				<HeaderContainer>Role</HeaderContainer>
				<HeaderContainer>Position</HeaderContainer>
				<HeaderContainer>Range</HeaderContainer>
				<HeaderContainer>Damage</HeaderContainer>
				<HeaderContainer>Pros</HeaderContainer>
				<HeaderContainer>Pantheon</HeaderContainer>
				<HeaderContainer>Release year</HeaderContainer>
			</div>

			{gods.map((god) => (
				<DetailedGodDisplay key={god.Name} god={god} actualGod={actualGod} />
			))}
		</div>
	);
}

export function SimpleGodsContainer({ gods, actualGod }: GodsContainerProps) {
	return (
		<div className="mx-auto flex w-max max-w-full flex-col justify-center gap-2 overflow-x-auto">
			{gods.map((god) => (
				<SimpleGodDisplay key={god.Name} god={god} actualGod={actualGod} />
			))}
		</div>
	);
}
