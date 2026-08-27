import { createFileRoute } from "@tanstack/react-router";
import RecentOrders from "@/modules/orders/components/recent-orders";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/orders/")({
  beforeLoad: requireRoles(["IS_ADMIN", "IS_VENDOR"]),
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <div className="py-6 w-full">
      <RecentOrders />
    </div>
  );
}
