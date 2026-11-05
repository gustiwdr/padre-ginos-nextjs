import { Suspense } from "react";

import LatestDayWidget from "@/components/admin/LatestDayWidget";
import TopPizzasWidget from "@/components/admin/TopPizzasWidget";
import StatusWidget from "@/components/admin/StatusWidget";
import WidgetLoading from "@/components/admin/WidgetLoading";
import WidgetErrorBoundary from "@/components/admin/WidgetErrorBoundary";

export default function AdminHome() {
	return (
		<section>
			<h1 className="text-3xl font-black">Overview</h1>

			<p className="mt-2 text-ink/70">
				Ringkasan aktivitas dan penjualan toko.
			</p>

			<div className="mt-6 grid gap-4 lg:grid-cols-2">
				{/* Keputusan: Hari terakhir di-stream karena query-nya cepat dan datanya perlu tetap aktual. */}
				<Suspense fallback={<WidgetLoading title="Hari terakhir" />}>
					<LatestDayWidget />
				</Suspense>

				{/* Keputusan: Terlaris sepanjang masa menggunakan cache satu jam karena agregasi seluruh riwayat relatif mahal dan tidak perlu dihitung setiap request. */}
				<Suspense
					fallback={<WidgetLoading title="Pizza terlaris sepanjang masa" />}
				>
					<TopPizzasWidget />
				</Suspense>

				{/* Keputusan: Status order memiliki error boundary sendiri karena kegagalannya tidak boleh mengganggu widget lainnya. */}
				<WidgetErrorBoundary title="Status order">
					<Suspense fallback={<WidgetLoading title="Status order" />}>
						<StatusWidget />
					</Suspense>
				</WidgetErrorBoundary>
			</div>
		</section>
	);
}
