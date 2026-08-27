import { Order } from "@/types/products";

interface SortOrdersStatusProps {
  data: Order;
}

function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s,_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-amber-100 text-amber-800",
  confirmed: "bg-orange-100 text-orange-800",
  preparing: "bg-sky-100 text-sky-800",
  ready: "bg-indigo-100 text-indigo-800",
  picked_up: "bg-violet-100 text-violet-800",
  in_transit: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  failed: "bg-rose-200 text-rose-900",
};

const SortOrdersStatus = ({ data }: SortOrdersStatusProps) => {
  const style =
    statusStyles[data.status] ?? "bg-slate-100 text-slate-700";

  return (
    <div
      className={`px-3 py-1 flex flex-row shrink-0 space-x-3 items-center rounded-sm text-opacity-90 ${style}`}
    >
      <div>{capitalizeWords(data.status)}</div>
    </div>
  );
};

export default SortOrdersStatus;
