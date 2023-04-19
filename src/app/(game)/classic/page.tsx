import { ClassicGame } from "@/components/games/Classic";
import { loadGods } from "@/lib/smiteApi";

export default async function ClassicPage() {
	const gods = await loadGods();
	const actualGod = gods[Math.floor(Math.random() * gods.length)];
	// console.log(actualGod.Name);
	return <ClassicGame gods={gods} actualGod={actualGod} />;
}
