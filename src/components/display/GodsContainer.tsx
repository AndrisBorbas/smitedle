import { God, Gods } from "@/lib/smiteApi";

import { GodDisplay } from "./GodDisplay";

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

export function GodsContainer({ gods, actualGod }: GodsContainerProps) {
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
				<GodDisplay key={god.Name} god={god} actualGod={actualGod} />
			))}
		</div>
	);
}
