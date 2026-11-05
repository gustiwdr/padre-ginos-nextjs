import { STATUS_LABELS, type OrderStatus } from "@/lib/orders";

const STATUS_STYLES: Record<OrderStatus, string> = {
	pending: "bg-amber-100 text-amber-800",
	preparing: "bg-blue-100 text-blue-800",
	ready: "bg-violet-100 text-violet-800",
	delivered: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
		>
			{STATUS_LABELS[status]}
		</span>
	);
}
