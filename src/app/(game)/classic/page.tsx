import { ClassicGame } from "@/components/games/Classic";
import { getDeterministicRandom } from "@/lib/game";
import { loadGods } from "@/lib/smiteApi";

export default async function ClassicPage() {
	const gods = await loadGods();
	// console.log(actualGod.Name);
	return <ClassicGame gods={gods} />;
}
