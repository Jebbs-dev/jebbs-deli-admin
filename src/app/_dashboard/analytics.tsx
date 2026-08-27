import { createFileRoute } from "@tanstack/react-router";
import SalesData from "@/modules/dashboard/components/sales-chart";
import SummaryData from "@/modules/dashboard/components/data-summary";
import TopProducts from "@/modules/dashboard/components/top-products";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/analytics")({
  beforeLoad: requireRoles(["IS_ADMIN", "IS_VENDOR"]),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      <div className="px-3 md:px-0">
        <h1 className="text-xl md:text-2xl font-semibold text-primary">
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Revenue, orders, and top products for the selected range.
        </p>
      </div>
      <SummaryData />
      <div className="mx-3 md:mx-0">
        <SalesData />
      </div>
      <div className="mx-3 md:mx-0">
        <TopProducts />
      </div>
    </div>
  );
}
