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
	// date.setHours(date.getHours() - 24);
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

export function timeRemaining() {
	const now = new Date();
	const targetDate = new Date("2021-09-01T16:00:00.000Z");
	targetDate.setFullYear(now.getFullYear());
	targetDate.setMonth(now.getMonth());
	targetDate.setDate(now.getDate() + 1);
	const targetDateInTimezone = new Date(
		targetDate.toLocaleString(undefined, { timeZone: "Europe/Budapest" }),
	);
	const timeDifference = targetDateInTimezone.getTime() - now.getTime();

	let secondsRemaining = Math.floor(timeDifference / 1000);
	let minutesRemaining = Math.floor(secondsRemaining / 60);
	let hoursRemaining = Math.floor(minutesRemaining / 60);

	hoursRemaining %= 24;
	minutesRemaining %= 60;
	secondsRemaining %= 60;

	return `${hoursRemaining}:${`0${minutesRemaining}`.slice(
		-2,
	)}:${`0${secondsRemaining}`.slice(-2)}`;
}
