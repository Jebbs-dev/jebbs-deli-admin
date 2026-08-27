import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useFetchOrderById } from "@/modules/orders/queries/fetch-order-by-id";
import {
  useAssignRider,
  useTransitionOrder,
} from "@/modules/orders/mutations/transition-order";
import SortOrdersStatus from "@/modules/orders/components/sort-status";
import { Button } from "@/components/ui/button";
import { useFetchAvailableRiders } from "@/modules/deliveries/queries/fetch-available-riders";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/products";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/orders/$orderId")({
  beforeLoad: requireRoles(["IS_ADMIN", "IS_VENDOR"]),
  component: OrderDetailPage,
});

function formatMoney(value: number | string | undefined) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

function OrderDetailPage() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading } = useFetchOrderById(orderId);
  const { mutateAsync: transition, isPending: isTransitioning } =
    useTransitionOrder(orderId);
  const { mutateAsync: assignRider, isPending: isAssigning } =
    useAssignRider(orderId);
  const { data: ridersData } = useFetchAvailableRiders();
  const [selectedRiderId, setSelectedRiderId] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin h-8 w-8 text-orange-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-3 md:mx-0 border rounded-md bg-white dark:bg-background p-6">
        <p>Order not found.</p>
        <Link to="/orders" className="text-orange-600 text-sm mt-2 inline-block">
          Back to orders
        </Link>
      </div>
    );
  }

  const typedOrder = order as Order;
  const isPickup = typedOrder.fulfillmentType === "pickup";
  const status = typedOrder.status;
  const canConfirm = status === "paid";
  const canPreparing = status === "confirmed";
  const canReady = status === "preparing";
  const canCompletePickup = status === "ready" && isPickup;
  const canAssign = status === "ready" && !isPickup && !typedOrder.assignment;
  const canCancel = ["pending", "paid", "confirmed", "preparing", "ready"].includes(
    status
  );

  const payment = typedOrder.payments?.[0];

  return (
    <div className="mx-3 md:mx-0 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Order details</h1>
          <p className="text-sm text-muted-foreground font-mono">{orderId}</p>
        </div>
        <Link
          to="/orders"
          className="flex items-center text-sm text-muted-foreground hover:text-orange-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-md bg-white dark:bg-background p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-primary">Status</h2>
            <SortOrdersStatus data={typedOrder} />
          </div>
          <p className="text-sm">
            Fulfillment:{" "}
            <span className="capitalize font-medium">
              {typedOrder.fulfillmentType ?? "delivery"}
            </span>
          </p>
          <p className="text-sm">Store: {typedOrder.store?.name ?? "—"}</p>
          <p className="text-sm">Customer: {typedOrder.user?.name ?? "—"}</p>
          <p className="text-sm">Vendor address: {typedOrder.vendorAddress}</p>
          <p className="text-sm">
            Customer address: {typedOrder.customerAddress}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {canConfirm && (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isTransitioning}
                onClick={() => transition({ action: "confirm" })}
              >
                Confirm
              </Button>
            )}
            {canPreparing && (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isTransitioning}
                onClick={() => transition({ action: "preparing" })}
              >
                Start preparing
              </Button>
            )}
            {canReady && (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isTransitioning}
                onClick={() => transition({ action: "ready" })}
              >
                Mark ready
              </Button>
            )}
            {canCompletePickup && (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={isTransitioning}
                onClick={() => transition({ action: "complete-pickup" })}
              >
                Complete pickup
              </Button>
            )}
            {canCancel && (
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                disabled={isTransitioning}
                onClick={() => transition({ action: "cancel" })}
              >
                Cancel
              </Button>
            )}
          </div>

          {canAssign && (
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t mt-3">
              <Select
                value={selectedRiderId}
                onValueChange={setSelectedRiderId}
              >
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Select rider" />
                </SelectTrigger>
                <SelectContent>
                  {(ridersData?.items ?? []).map(
                    (rider: { id: string; name: string }) => (
                      <SelectItem key={rider.id} value={rider.id}>
                        {rider.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!selectedRiderId || isAssigning}
                onClick={() => assignRider(selectedRiderId)}
              >
                Assign rider
              </Button>
            </div>
          )}

          {typedOrder.assignment && (
            <p className="text-sm pt-2">
              Assigned rider:{" "}
              <span className="font-medium">
                {typedOrder.assignment.rider?.name ?? typedOrder.assignment.riderId}
              </span>{" "}
              ({typedOrder.assignment.status})
            </p>
          )}
        </div>

        <div className="border rounded-md bg-white dark:bg-background p-4 space-y-3">
          <h2 className="font-semibold text-primary">Payment & totals</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-right">{formatMoney(typedOrder.subTotal)}</span>
            <span className="text-muted-foreground">Service fee</span>
            <span className="text-right">
              {formatMoney(typedOrder.serviceFee)}
            </span>
            <span className="text-muted-foreground">Delivery fee</span>
            <span className="text-right">
              {formatMoney(typedOrder.deliveryFee)}
            </span>
            <span className="font-medium">Total</span>
            <span className="text-right font-medium">
              {formatMoney(typedOrder.totalPrice)}
            </span>
            {typedOrder.vendorPayout != null && (
              <>
                <span className="text-muted-foreground">Vendor payout</span>
                <span className="text-right">
                  {formatMoney(typedOrder.vendorPayout)}
                </span>
              </>
            )}
          </div>

          <div className="border-t pt-3 text-sm space-y-1">
            <p>
              Payment status:{" "}
              <span className="font-medium capitalize">
                {payment?.status ?? "—"}
              </span>
            </p>
            {payment?.reference && (
              <p className="font-mono text-xs break-all">
                Ref: {payment.reference}
              </p>
            )}
            {typedOrder.paidAt && (
              <p>Paid at: {new Date(typedOrder.paidAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border rounded-md bg-white dark:bg-background p-4">
        <h2 className="font-semibold text-primary mb-3">Items</h2>
        <div className="space-y-2">
          {(typedOrder.orderItems ?? []).map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm border-b last:border-0 pb-2"
            >
              <span>
                {item.quantity}× {item.productName}
              </span>
              <span>{formatMoney(Number(item.unitPrice) * item.quantity)}</span>
            </div>
          ))}
          {!typedOrder.orderItems?.length && (
            <p className="text-sm text-muted-foreground">No items</p>
          )}
        </div>
      </div>
    </div>
  );
}
