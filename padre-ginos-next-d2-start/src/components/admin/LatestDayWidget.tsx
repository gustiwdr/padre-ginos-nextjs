import { getLatestDay } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function LatestDayWidget() {
	const day = await getLatestDay();

	return (
		<section className="rounded-2xl bg-white p-6 shadow-sm">
			<h2 className="text-lg font-bold">Hari terakhir</h2>
			<p className="mt-1 text-sm text-ink/60">{day.date}</p>

			<div className="mt-5 grid grid-cols-2 gap-4">
				<div>
					<p className="text-sm text-ink/60">Total order</p>
					<p className="mt-1 text-2xl font-black">{day.orders}</p>
				</div>

				<div>
					<p className="text-sm text-ink/60">Omzet</p>
					<p className="mt-1 text-2xl font-black">{formatPrice(day.revenue)}</p>
				</div>
			</div>
		</section>
	);
}
