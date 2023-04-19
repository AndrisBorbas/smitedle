import { ClassicGame } from "@/components/games/Classic";
import { getDeterministicRandom } from "@/lib/game";
import { loadGods } from "@/lib/smiteApi";

export default async function ClassicPage() {
	const gods = await loadGods();
	const random = getDeterministicRandom(new Date());
	const actualGod = gods[Math.floor(random() * gods.length)];
	// console.log(actualGod.Name);
	return <ClassicGame gods={gods} actualGod={actualGod} />;
}
