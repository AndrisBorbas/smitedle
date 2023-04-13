import { Smite } from "@joshmiquel/hirez";
import fs from "fs";
import path from "path";

import { dlog } from "./utils";

export const validKeys = [
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

export type HirezGod = {
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

export type HirezGods = HirezGod[];

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
		"public/data/generated/rawGods.json",
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

export async function saveGods(gods: HirezGods) {
	fs.writeFile(
		"public/data/generated/gods.json",
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

	return gods as HirezGods;
}

export async function loadGeneratedGods() {
	const p = path.join("public", "data", "generated", "gods.json");
	const gods = await fs.readFileSync(`./${p}`, "utf-8");
	return JSON.parse(gods) as HirezGods;
}
