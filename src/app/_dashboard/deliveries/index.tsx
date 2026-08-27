import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useFetchClaimableDeliveries,
  useFetchMyDeliveries,
} from "@/modules/deliveries/queries/fetch-deliveries";
import {
  useClaimDelivery,
  useDeliveryProgress,
  useUpdateRiderAvailability,
} from "@/modules/deliveries/mutations/delivery-actions";
import { Button } from "@/components/ui/button";
import SortOrdersStatus from "@/modules/orders/components/sort-status";
import useAuthStore from "@/state-store/auth";
import { FaSpinner } from "react-icons/fa";
import { Order } from "@/types/products";
import { requireRoles } from "@/utils/require-roles";
import RiderWalletSection from "@/modules/settlement/components/rider-wallet-section";

export const Route = createFileRoute("/_dashboard/deliveries/")({
  beforeLoad: requireRoles(["IS_RIDER"]),
  component: DeliveriesPage,
});

function formatMoney(value: number | string | undefined) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
}

function DeliveriesPage() {
  const { user } = useAuthStore();
  const { data: claimable, isLoading: claimableLoading } =
    useFetchClaimableDeliveries();
  const { data: mine, isLoading: mineLoading } = useFetchMyDeliveries(false);
  const { mutateAsync: claim, isPending: claiming } = useClaimDelivery();
  const { mutateAsync: progress, isPending: progressing } =
    useDeliveryProgress();
  const { mutateAsync: setAvailability, isPending: updatingAvailability } =
    useUpdateRiderAvailability();

  const isAvailable = user?.riderProfile?.isAvailable ?? false;

  return (
    <div className="flex flex-col space-y-6 py-6 w-full px-3 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-primary">
            Deliveries
          </h1>
          <p className="text-sm text-muted-foreground">
            Claim ready orders and update delivery progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {isAvailable ? "Available" : "Unavailable"}
          </span>
          <Button
            size="sm"
            variant={isAvailable ? "outline" : "default"}
            className={
              isAvailable ? "" : "bg-orange-600 hover:bg-orange-700"
            }
            disabled={updatingAvailability}
            onClick={() => void setAvailability(!isAvailable)}
          >
            {updatingAvailability ? (
              <FaSpinner className="animate-spin" />
            ) : isAvailable ? (
              "Go offline"
            ) : (
              "Go online"
            )}
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/deliveries/history">History</Link>
          </Button>
        </div>
      </div>

      <RiderWalletSection />

      <section className="border rounded-md bg-white dark:bg-background p-4 space-y-3">
        <h2 className="font-semibold">Assigned to you</h2>
        {mineLoading ? (
          <FaSpinner className="animate-spin text-orange-600" />
        ) : (
          <div className="space-y-3">
            {(mine?.items ?? []).map(
              (assignment: {
                id: string;
                status: string;
                order: Order;
              }) => {
                const order = assignment.order;
                const nextAction =
                  assignment.status === "assigned"
                    ? "pickup"
                    : assignment.status === "picked_up"
                      ? "in-transit"
                      : assignment.status === "in_transit"
                        ? "delivered"
                        : null;

                return (
                  <div
                    key={assignment.id}
                    className="border rounded-md p-3 space-y-2"
                  >
                    <div className="flex justify-between gap-2 items-start">
                      <div>
                        <p className="font-medium">
                          {order.store?.name ?? "Store"}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {order.id}
                        </p>
                        <p className="text-sm mt-1">
                          To: {order.customerAddress}
                        </p>
                        <p className="text-sm">
                          {formatMoney(order.totalPrice)}
                        </p>
                      </div>
                      <SortOrdersStatus
                        data={{ ...order, status: assignment.status }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {nextAction && (
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          disabled={progressing}
                          onClick={() =>
                            void progress({
                              orderId: order.id,
                              action: nextAction,
                            })
                          }
                        >
                          {nextAction === "pickup"
                            ? "Picked up"
                            : nextAction === "in-transit"
                              ? "In transit"
                              : "Delivered"}
                        </Button>
                      )}
                      {assignment.status !== "delivered" &&
                        assignment.status !== "failed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600"
                            disabled={progressing}
                            onClick={() => {
                              const reason =
                                window.prompt("Failure reason (optional)") ??
                                undefined;
                              void progress({
                                orderId: order.id,
                                action: "failed",
                                failureReason: reason,
                              });
                            }}
                          >
                            Mark failed
                          </Button>
                        )}
                    </div>
                  </div>
                );
              }
            )}
            {!mine?.items?.length && (
              <p className="text-sm text-muted-foreground">
                No active deliveries.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="border rounded-md bg-white dark:bg-background p-4 space-y-3">
        <h2 className="font-semibold">Claimable queue</h2>
        {claimableLoading ? (
          <FaSpinner className="animate-spin text-orange-600" />
        ) : (
          <div className="space-y-3">
            {(claimable?.items ?? []).map((order: Order) => (
              <div
                key={order.id}
                className="border rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{order.store?.name ?? "Store"}</p>
                  <p className="text-sm">From: {order.vendorAddress}</p>
                  <p className="text-sm">To: {order.customerAddress}</p>
                  <p className="text-sm">{formatMoney(order.totalPrice)}</p>
                </div>
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={claiming || !isAvailable}
                  onClick={() => void claim(order.id)}
                >
                  {claiming ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Claim"
                  )}
                </Button>
              </div>
            ))}
            {!claimable?.items?.length && (
              <p className="text-sm text-muted-foreground">
                No claimable deliveries right now.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
