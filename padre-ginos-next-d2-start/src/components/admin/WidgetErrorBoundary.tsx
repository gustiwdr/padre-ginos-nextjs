"use client";

import { catchError, type ErrorInfo } from "next/error";

function ErrorFallback({ title }: { title: string }, { retry }: ErrorInfo) {
	return (
		<section className="rounded-2xl bg-white p-6 shadow-sm">
			<h2 className="text-lg font-bold">{title}</h2>

			<p className="mt-4 text-sm text-red-700">Gagal memuat data ini.</p>

			<button
				type="button"
				onClick={() => retry()}
				className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
			>
				Coba lagi
			</button>
		</section>
	);
}

const WidgetErrorBoundary = catchError(ErrorFallback);

export default WidgetErrorBoundary;
