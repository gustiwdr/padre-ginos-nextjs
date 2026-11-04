"use server";

import { refresh } from "next/cache";
import { pizzaExists, toggleFavorite, addRating } from "@/lib/data";
import { shouldFail, simulateLatency } from "@/lib/demo";
import { parseStars } from "@/lib/format";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function toggleFavoriteAction(
	pizzaId: string,
): Promise<ActionResult> {
	if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
		return { ok: false, error: "Pizza tidak dikenal." };
	}

	await simulateLatency("write");

	if (await shouldFail()) {
		return { ok: false, error: "Gagal menyimpan favorit. Coba lagi." };
	}

	await toggleFavorite(pizzaId);
	refresh();

	return { ok: true };
}

export async function ratePizzaAction(
	pizzaId: string,
	formData: FormData,
): Promise<ActionResult> {
	const stars = parseStars(formData.get("stars"));

	if (stars === null) {
		return { ok: false, error: "Rating tidak valid." };
	}

	if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
		return { ok: false, error: "Pizza tidak dikenal." };
	}

	await simulateLatency("write");

	if (await shouldFail()) {
		return { ok: false, error: "Gagal mengirim rating. Coba lagi." };
	}

	await addRating(pizzaId, stars);
	refresh();

	return { ok: true };
}
