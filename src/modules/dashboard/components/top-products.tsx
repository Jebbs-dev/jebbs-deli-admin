import { columns as topProductColumns } from "@/modules/dashboard/components/columns/top-products";
import { DataTable } from "@/components/ui/data-table";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useFetchAnalyticsSummary } from "@/modules/analytics/queries/fetch-analytics-summary";
import useUserRole from "@/hooks/useUserRole";
import { useMemo } from "react";

const TopProducts = () => {
  const userType = useUserRole();
  const { data, isLoading } = useFetchAnalyticsSummary("1w");

  const rows = useMemo(
    () =>
      (data?.topProducts ?? []).map((product, index) => ({
        rank: index + 1,
        name: product.name,
        unitsSold: product.quantity,
        orders: product.orders,
      })),
    [data?.topProducts]
  );

  if (userType === "IS_RIDER") {
    return null;
  }

  return (
    <div className=" px-3 md:px-10 py-2 border rounded-md bg-white dark:bg-background">
      <div className="flex mb-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Top Products</h1>
        <Link
          to="/analytics"
          className="flex flow-row items-center gap-x-2 text-orange-600"
        >
          <p className="text-sm">View more</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <DataTable
        columns={topProductColumns}
        data={rows}
        columnFilterKey="name"
      />
      {isLoading && (
        <p className="text-sm text-muted-foreground py-2">Loading…</p>
      )}
      {!isLoading && rows.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">No top products yet.</p>
      )}
    </div>
  );
};

export default TopProducts;
