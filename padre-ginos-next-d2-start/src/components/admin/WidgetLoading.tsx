export default function WidgetLoading({ title }: { title: string }) {
	return (
		<section aria-busy="true" className="rounded-2xl bg-white p-6 shadow-sm">
			<h2 className="text-lg font-bold">{title}</h2>

			<p className="mt-4 text-sm text-ink/60">Memuat data...</p>
		</section>
	);
}
