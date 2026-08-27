import { createFileRoute, Link } from "@tanstack/react-router";
import { useFetchMyDeliveries } from "@/modules/deliveries/queries/fetch-deliveries";
import SortOrdersStatus from "@/modules/orders/components/sort-status";
import { FaSpinner } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/types/products";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/deliveries/history")({
  beforeLoad: requireRoles(["IS_RIDER"]),
  component: DeliveryHistoryPage,
});

function formatMoney(value: number | string | undefined) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
}

function DeliveryHistoryPage() {
  const { data, isLoading } = useFetchMyDeliveries(true);

  return (
    <div className="flex flex-col space-y-4 py-6 w-full px-3 md:px-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-primary">
            Delivery history
          </h1>
          <p className="text-sm text-muted-foreground">
            Completed and failed deliveries.
          </p>
        </div>
        <Link
          to="/deliveries"
          className="flex items-center text-sm text-muted-foreground hover:text-orange-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Link>
      </div>

      <div className="border rounded-md bg-white dark:bg-background p-4 space-y-3">
        {isLoading ? (
          <FaSpinner className="animate-spin text-orange-600" />
        ) : (
          <>
            {(data?.items ?? []).map(
              (assignment: {
                id: string;
                status: string;
                updatedAt?: string;
                order: Order;
              }) => (
                <div
                  key={assignment.id}
                  className="border rounded-md p-3 flex justify-between gap-3"
                >
                  <div>
                    <p className="font-medium">
                      {assignment.order.store?.name ?? "Store"}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {assignment.order.id}
                    </p>
                    <p className="text-sm mt-1">
                      {assignment.order.customerAddress}
                    </p>
                    <p className="text-sm">
                      {formatMoney(assignment.order.totalPrice)}
                    </p>
                    {assignment.updatedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(assignment.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <SortOrdersStatus
                    data={{
                      ...assignment.order,
                      status: assignment.status,
                    }}
                  />
                </div>
              )
            )}
            {!data?.items?.length && (
              <p className="text-sm text-muted-foreground">No history yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
