import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";

type OrderDetailPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function OrderDetailPage({
	params,
}: OrderDetailPageProps) {
	const { id } = await params;
	const orderId = Number(id);

	if (!Number.isSafeInteger(orderId) || orderId <= 0) {
		notFound();
	}

	const order = await getOrder(orderId);

	if (!order) {
		notFound();
	}

	return (
		<section className="max-w-4xl">
			<Link
				href="/admin/orders"
				className="text-sm font-semibold text-brand hover:underline"
			>
				← Semua order
			</Link>

			<div className="mt-5 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black">Order #{order.id}</h1>
					<p className="mt-1 text-sm text-ink/60">
						{order.date} · {order.time}
					</p>
				</div>

				<StatusBadge status={order.status} />
			</div>

			<div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
				<h2 className="text-lg font-bold">Detail pesanan</h2>

				<div className="mt-4 overflow-x-auto">
					<table className="w-full text-left text-sm">
						<thead className="border-b border-black/10 text-xs uppercase text-ink/60">
							<tr>
								<th className="py-3">Produk</th>
								<th className="py-3">Ukuran</th>
								<th className="py-3 text-right">Harga</th>
								<th className="py-3 text-right">Jumlah</th>
								<th className="py-3 text-right">Subtotal</th>
							</tr>
						</thead>

						<tbody>
							{order.lines.map((line, index) => (
								<tr
									key={`${line.pizzaId}-${line.size}-${index}`}
									className="border-b border-black/5"
								>
									<td className="py-3 font-medium">{line.name}</td>
									<td className="py-3">{line.size}</td>
									<td className="py-3 text-right">{formatPrice(line.price)}</td>
									<td className="py-3 text-right">{line.quantity}</td>
									<td className="py-3 text-right font-medium">
										{formatPrice(line.price * line.quantity)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-5 flex justify-end">
					<div className="text-right">
						<p className="text-sm text-ink/60">Total pembayaran</p>
						<p className="mt-1 text-2xl font-black">
							{formatPrice(order.total)}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
