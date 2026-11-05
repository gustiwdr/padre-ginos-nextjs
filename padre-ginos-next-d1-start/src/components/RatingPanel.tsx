"use client";

import { useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";
import { ratePizzaAction } from "@/app/actions";
import type { RatingSummary } from "@/lib/types";

function RatingButtons() {
	const { pending } = useFormStatus();

	return (
		<>
			<div className="mt-4 flex gap-1" aria-label="Beri rating">
				{[1, 2, 3, 4, 5].map((stars) => (
					<button
						key={stars}
						type="submit"
						name="stars"
						value={stars}
						disabled={pending}
						aria-label={`Beri ${stars} bintang`}
						className="text-3xl text-amber-500 hover:scale-110"
					>
						★
					</button>
				))}
			</div>

			{pending && (
				<p className="mt-2 text-sm text-ink/70" role="status">
					Mengirim…
				</p>
			)}
		</>
	);
}

export default function RatingPanel({
	pizzaId,
	summary,
}: {
	pizzaId: string;
	summary: RatingSummary;
}) {
	const [error, setError] = useState<string | null>(null);

	const [optimisticSummary, addOptimisticRating] = useOptimistic(
		summary,
		(current, stars: number): RatingSummary => ({
			count: current.count + 1,
			average: (current.average * current.count + stars) / (current.count + 1),
		}),
	);

	async function handleSubmit(formData: FormData) {
		setError(null);

		const stars = Number(formData.get("stars"));
		addOptimisticRating(stars);

		const result = await ratePizzaAction(pizzaId, formData);

		if (!result.ok) {
			setError(result.error);
		}
	}

	return (
		<section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
			<h2 className="text-lg font-bold">Rating pelanggan</h2>

			<p className="mt-1 text-ink/70" data-testid="rating-summary">
				★ {optimisticSummary.average.toFixed(1)} dari {optimisticSummary.count}{" "}
				rating
			</p>

			<form action={handleSubmit}>
				<RatingButtons />
			</form>

			{error && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					{error}
				</p>
			)}
		</section>
	);
}
