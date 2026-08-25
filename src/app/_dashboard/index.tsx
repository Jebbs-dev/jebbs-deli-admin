import { createFileRoute } from "@tanstack/react-router";
import RecentOrders from "@/modules/orders/components/recent-orders";
import SalesData from "@/modules/dashboard/components/sales-chart";
import SummaryData from "@/modules/dashboard/components/data-summary";

export const Route = createFileRoute("/_dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      <SummaryData />
      <div className="mx-3 md:mx-0">
        <SalesData />
      </div>
      <div className="grid grid-cols-1 gap-2 mx-3 md:mx-0 md:grid-cols-2 md:gap-4" />
      <RecentOrders />
    </div>
  );
}
