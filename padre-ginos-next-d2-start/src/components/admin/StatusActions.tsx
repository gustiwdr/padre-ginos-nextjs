"use client";

import { useActionState } from "react";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { nextStatuses, STATUS_LABELS, type OrderStatus } from "@/lib/orders";

export default function StatusActions({
	orderId,
	status,
}: {
	orderId: number;
	status: OrderStatus;
}) {
	const [state, formAction, isPending] = useActionState(
		updateOrderStatusAction,
		null,
	);

	const availableStatuses = nextStatuses(status);

	if (availableStatuses.length === 0) {
		return (
			<p className="mt-4 text-sm text-ink/60">
				Status final, tidak bisa diubah lagi.
			</p>
		);
	}

	return (
		<div className="mt-5">
			<h2 className="text-sm font-bold">Ubah status order</h2>

			<form action={formAction} className="mt-3 flex flex-wrap gap-2">
				<input type="hidden" name="id" value={orderId} />

				{availableStatuses.map((nextStatus) => (
					<button
						key={nextStatus}
						type="submit"
						name="status"
						value={nextStatus}
						disabled={isPending}
						className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isPending ? "Menyimpan…" : `Ubah ke ${STATUS_LABELS[nextStatus]}`}
					</button>
				))}
			</form>

			{state?.error && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					{state.error}
				</p>
			)}
		</div>
	);
}
