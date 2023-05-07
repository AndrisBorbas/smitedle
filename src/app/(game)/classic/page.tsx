import { ClassicGame } from "@/components/games/Classic";
import { loadGods } from "@/lib/smiteApi";

export default async function ClassicPage() {
	const gods = await loadGods();
	return <ClassicGame gods={gods} />;
}
