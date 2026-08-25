import { createFileRoute } from "@tanstack/react-router";
import RecentOrders from "@/modules/orders/components/recent-orders";

export const Route = createFileRoute("/_dashboard/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <div className="py-6 w-full">
      <RecentOrders />
    </div>
  );
}
