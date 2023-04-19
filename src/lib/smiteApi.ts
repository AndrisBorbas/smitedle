import { Smite } from "@joshmiquel/hirez";
import fs from "fs";

import { dlog } from "./utils";

const validKeys = [
	"Ability1",
	"Ability2",
	"Ability3",
	"Ability4",
	"Ability5",
	"AbilityId1",
	"AbilityId2",
	"AbilityId3",
	"AbilityId4",
	"AbilityId5",
	"godAbility1_URL",
	"godAbility2_URL",
	"godAbility3_URL",
	"godAbility4_URL",
	"godAbility5_URL",
	"MagicalPower",
	"PhysicalPower",
	"Pros",
	"Roles",
	"Title",
	"Type",
	"Name",
	"Pantheon",
	"godCard_URL",
	"godIcon_URL",
	"id",
];

type HirezGod = {
	Ability1: string;
	Ability2: string;
	Ability3: string;
	Ability4: string;
	Ability5: string;
	AbilityId1: number;
	AbilityId2: number;
	AbilityId3: number;
	AbilityId4: number;
	AbilityId5: number;
	godAbility1_URL: string;
	godAbility2_URL: string;
	godAbility3_URL: string;
	godAbility4_URL: string;
	godAbility5_URL: string;
	MagicalPower: number;
	PhysicalPower: number;
	Pros: string;
	Roles: string;
	Title: string;
	Type: string;
	Name: string;
	Pantheon: string;
	godCard_URL: string;
	godIcon_URL: string;
	id: number;
};

type GodExtraInfo = {
	Name: string;
	Gender: string;
	Position: string;
	ReleaseYear: number;
};

export type God = HirezGod & GodExtraInfo;
export type Gods = God[];

export const smiteApiDevId = parseInt(process.env.SMITE_API_DEV_ID ?? "0", 10);
export const smiteApiAuthKey = process.env.SMITE_API_AUTH_KEY ?? "noKey";

export function smiteApi() {
	return new Smite(smiteApiDevId, smiteApiAuthKey);
}

export async function getGods() {
	const gods = await smiteApi().getGods();
	return gods;
}

export async function saveRawGods(gods: any) {
	fs.writeFile(
		"./public/data/generated/rawGods.json",
		JSON.stringify(gods),
		(err) => {
			if (err) {
				dlog(err);
				return;
			}
			dlog("Raw gods saved");
		},
	);
}

export async function saveGods(gods: HirezGod[]) {
	fs.writeFile(
		"./public/data/generated/gods.json",
		JSON.stringify(gods),
		(err) => {
			if (err) {
				dlog(err);
				return;
			}
			dlog("Gods saved");
		},
	);
}

export function trimGods(gods: any[]) {
	gods.forEach((god) => {
		Object.keys(god).forEach(
			// eslint-disable-next-line no-param-reassign, @typescript-eslint/no-dynamic-delete
			(key) => validKeys.includes(key) || delete god[key],
		);
	});

	return gods as HirezGod[];
}

async function loadGeneratedGods() {
	const gods = await fs.readFileSync(
		`./public/data/generated/gods.json`,
		"utf-8",
	);
	return JSON.parse(gods) as HirezGod[];
}

async function loadGodsExtraInfo() {
	const gods = await fs.readFileSync(
		`./public/data/godsExtraInfo.json`,
		"utf-8",
	);
	return JSON.parse(gods) as GodExtraInfo[];
}

function combineGods(gods: HirezGod[], godsExtraInfo: GodExtraInfo[]): Gods {
	const combined = gods.map((god) => {
		const extraInfo = godsExtraInfo.find((info) => info.Name === god.Name);
		if (!extraInfo) {
			throw new Error(`No extra info for ${god.Name}`);
		}
		const combinedGod = { ...god, ...extraInfo };
		return combinedGod;
	});
	return combined;
}

export async function loadGods() {
	const [gods, godsExtraInfo] = await Promise.all([
		loadGeneratedGods(),
		loadGodsExtraInfo(),
	]);

	return combineGods(gods, godsExtraInfo);
}

export async function exportGods(gods: HirezGod[]) {
	const ex = gods.map((god) => {
		const asd = { Name: god.Name, Gender: 0, Position: 0, ReleaseYear: 0 };
		return asd;
	});
	fs.writeFile(
		"./public/data/generated/export.json",
		JSON.stringify(ex),
		(err) => {
			if (err) {
				dlog(err);
				return;
			}
			dlog("Gods exported");
		},
	);
}
