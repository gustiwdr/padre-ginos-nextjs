import { getStatusCounts } from "@/lib/admin-data";
import { ORDER_STATUSES, STATUS_LABELS } from "@/lib/orders";

export default async function StatusWidget() {
	const counts = await getStatusCounts();

	return (
		<section className="rounded-2xl bg-white p-6 shadow-sm">
			<h2 className="text-lg font-bold">Status order hari terakhir</h2>

			<div className="mt-4 space-y-3">
				{ORDER_STATUSES.map((status) => (
					<div key={status} className="flex items-center justify-between">
						<span className="text-sm text-ink/70">{STATUS_LABELS[status]}</span>

						<span className="font-bold">{counts[status]}</span>
					</div>
				))}
			</div>
		</section>
	);
}
