import { ClassicGame } from "@/components/games/Classic";
import { loadGeneratedGods } from "@/lib/smiteApi";

export default async function ClassicPage() {
	const gods = await loadGeneratedGods();
	const actualGod = gods[Math.floor(Math.random() * gods.length)];
	// console.log(actualGod.Name);
	return <ClassicGame gods={gods} actualGod={actualGod} />;
}
