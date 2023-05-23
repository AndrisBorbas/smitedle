import { HomeGameLink } from "@/components/link/HomeGameLink";

export default function IndexPage() {
	return (
		<>
			<h2 className="mb-8 text-xl">Guess the Smite god.</h2>
			<section className="mx-auto grid max-w-[20rem] grid-cols-1 justify-items-center gap-4">
				<HomeGameLink
					name="Classic"
					description="Guess a god and see what you get right."
				/>
				<HomeGameLink name="Ability" description="Whose ability is it?" />
				<HomeGameLink
					name="Skin"
					description="Inspect the splash art and guess the god."
				/>
				<HomeGameLink name="Item" description="Guess the item from its icon." />
			</section>
		</>
	);
}
