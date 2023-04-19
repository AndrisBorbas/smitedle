import seedrandom from "seedrandom";

/**
 * The generator resets every day at 18:00 UTC+2 (Budapest time)
 *
 * Calling the return value generates the next random number, so only call it when you want a new number.
 *
 * @param date The date to use for the random number generation, should be the current date
 */
export function getDeterministicRandom(date: Date) {
	// Testing
	// date.setHours(date.getHours() + 2);
	// date.setMinutes(date.getMinutes() + 0);

	const timeZone = "Europe/Budapest";
	date.setHours(date.getHours() + 6);
	date.setMinutes(date.getMinutes());
	const currentDate = date.toLocaleDateString("hu-HU", {
		timeZone,
		calendar: "gregory",
	});

	return seedrandom(currentDate);
}
