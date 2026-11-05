import Link from "next/link";

export default function OrderNotFound() {
	return (
		<section>
			<h1 className="text-2xl font-bold">Order tidak ditemukan</h1>

			<p className="mt-2 text-ink/70">Order yang kamu cari tidak tersedia.</p>

			<Link
				href="/admin/orders"
				className="mt-4 inline-block text-brand underline"
			>
				Kembali ke daftar order
			</Link>
		</section>
	);
}
