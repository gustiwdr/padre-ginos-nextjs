import { getTopPizzas } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function TopPizzasWidget() {
	const pizzas = await getTopPizzas();

	return (
		<section className="rounded-2xl bg-white p-6 shadow-sm">
			<h2 className="text-lg font-bold">Pizza terlaris sepanjang masa</h2>

			{pizzas.length === 0 ? (
				<p className="mt-4 text-sm text-ink/60">Belum ada data penjualan.</p>
			) : (
				<ol className="mt-4 space-y-4">
					{pizzas.map((pizza, index) => (
						<li
							key={pizza.id}
							className="flex items-center justify-between gap-4"
						>
							<div className="flex items-center gap-3">
								<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold">
									{index + 1}
								</span>

								<div>
									<p className="font-semibold">{pizza.name}</p>
									<p className="text-sm text-ink/60">{pizza.sold} terjual</p>
								</div>
							</div>

							<p className="shrink-0 text-sm font-semibold">
								{formatPrice(pizza.revenue)}
							</p>
						</li>
					))}
				</ol>
			)}
		</section>
	);
}
