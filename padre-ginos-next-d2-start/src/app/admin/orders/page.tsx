import Link from "next/link";
import Form from "next/form";
import { redirect } from "next/navigation";
import { getOrders } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";

type OrdersPageProps = {
	searchParams: Promise<{
		page?: string;
		date?: string;
	}>;
};

function isValidDate(value: string | undefined): value is string {
	if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

	const date = new Date(`${value}T00:00:00.000Z`);

	return (
		!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
	);
}

function getPageUrl(page: number, date: string | null): string {
	const params = new URLSearchParams();

	params.set("page", String(page));

	if (date) {
		params.set("date", date);
	}

	return `/admin/orders?${params.toString()}`;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
	const params = await searchParams;

	const requestedPage = Number(params.page ?? "1");
	const page =
		Number.isSafeInteger(requestedPage) && requestedPage > 0
			? requestedPage
			: 1;

	const date = isValidDate(params.date) ? params.date : null;

	const { orders, totalPages } = await getOrders({ page, date });

	// Jika URL meminta halaman yang sudah tidak tersedia,
	// arahkan pengguna ke halaman terakhir.
	if (page > totalPages) {
		redirect(getPageUrl(totalPages, date));
	}

	return (
		<section>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black">Order</h1>
					<p className="mt-1 text-ink/70">Daftar transaksi pelanggan.</p>
				</div>

				<Form action="/admin/orders" className="flex flex-wrap items-end gap-2">
					<div>
						<label htmlFor="date" className="mb-1 block text-sm font-medium">
							Filter tanggal
						</label>
						<input
							id="date"
							type="date"
							name="date"
							defaultValue={date ?? ""}
							className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm"
						/>
					</div>

					<button
						type="submit"
						className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
					>
						Filter
					</button>

					{date && (
						<Link
							href="/admin/orders"
							className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold"
						>
							Reset
						</Link>
					)}
				</Form>
			</div>

			<div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
				<table className="w-full text-left text-sm">
					<thead className="bg-stone-50 text-xs uppercase text-ink/60">
						<tr>
							<th className="px-4 py-3">Order ID</th>
							<th className="px-4 py-3">Tanggal</th>
							<th className="px-4 py-3">Waktu</th>
							<th className="px-4 py-3 text-right">Item</th>
							<th className="px-4 py-3 text-right">Total</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3" />
						</tr>
					</thead>

					<tbody>
						{orders.length > 0 ? (
							orders.map((order) => (
								<tr key={order.id} className="border-t border-black/5">
									<td className="px-4 py-3 font-semibold">#{order.id}</td>
									<td className="px-4 py-3">{order.date}</td>
									<td className="px-4 py-3">{order.time}</td>
									<td className="px-4 py-3 text-right">{order.items}</td>
									<td className="px-4 py-3 text-right font-medium">
										{formatPrice(order.total)}
									</td>
									<td className="px-4 py-3">
										<StatusBadge status={order.status} />
									</td>
									<td className="px-4 py-3 text-right">
										<Link
											href={`/admin/orders/${order.id}`}
											className="font-semibold text-brand hover:underline"
										>
											Detail
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7} className="px-4 py-10 text-center text-ink/60">
									Tidak ada order pada tanggal ini.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="mt-5 flex items-center justify-between gap-4">
				<p className="text-sm text-ink/60">
					Halaman {page} dari {totalPages}
				</p>

				<div className="flex gap-2">
					{page > 1 && (
						<Link
							href={getPageUrl(page - 1, date)}
							className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-stone-50"
						>
							← Sebelumnya
						</Link>
					)}

					{page < totalPages && (
						<Link
							href={getPageUrl(page + 1, date)}
							className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-stone-50"
						>
							Selanjutnya →
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
