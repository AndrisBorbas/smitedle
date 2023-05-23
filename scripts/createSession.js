const { Smite } = require("@joshmiquel/hirez");
const fs = require("fs");
require("dotenv").config({ path: "./.env.development.local" });

function deleteSession() {
	try {
		fs.unlinkSync("./hirez/session.json");
	} catch (error) {
		console.error(error);
	}
}

async function createSmiteApi() {
	// deleteSession();

	const smiteApiDevId = parseInt(process.env.SMITE_API_DEV_ID ?? "0", 10);
	const smiteApiAuthKey = process.env.SMITE_API_AUTH_KEY ?? "noKey";

	console.log(smiteApiDevId, smiteApiAuthKey);
	const api = new Smite(smiteApiDevId, smiteApiAuthKey);
	console.log(await api.ping());
	try {
		await api.createSession();
		console.log(await api.getDataUsed());
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create session");
	}
}

createSmiteApi();
