import { FuzzyInput } from "@/components/input/FuzzyInput";
import { loadGeneratedGods } from "@/lib/smiteApi";

async function loadGods() {
	const res = await loadGeneratedGods();

	if (!res) {
		throw new Error("Failed to load gods");
	}
	return res;
}

export default async function ClassicPage() {
	const gods = await loadGods();
	return (
		<section className="mx-auto text-center">
			<FuzzyInput initialData={gods} />
		</section>
	);
}
