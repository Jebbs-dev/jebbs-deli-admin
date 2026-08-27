import { createFileRoute } from "@tanstack/react-router";
import RecentOrders from "@/modules/orders/components/recent-orders";
import SalesData from "@/modules/dashboard/components/sales-chart";
import SummaryData from "@/modules/dashboard/components/data-summary";
import TopProducts from "@/modules/dashboard/components/top-products";
import useUserRole from "@/hooks/useUserRole";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import RiderWalletSection from "@/modules/settlement/components/rider-wallet-section";
import AdminPayoutControls from "@/modules/settlement/components/admin-payout-controls";

export const Route = createFileRoute("/_dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const userType = useUserRole();

  if (userType === "IS_RIDER") {
    return (
      <div className="flex flex-col space-y-4 py-6 w-full px-3 md:px-0">
        <div className="border rounded-md bg-white dark:bg-background p-6 space-y-3">
          <h1 className="text-xl font-semibold text-primary">Rider home</h1>
          <p className="text-sm text-muted-foreground">
            Claim deliveries from the queue and manage your active assignments.
          </p>
          <div className="flex gap-2">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link to="/deliveries">Open deliveries</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/deliveries/history">View history</Link>
            </Button>
          </div>
        </div>
        <RiderWalletSection />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      {userType === "IS_ADMIN" && (
        <div className="mx-3 md:mx-0">
          <AdminPayoutControls />
        </div>
      )}
      <SummaryData />
      <div className="mx-3 md:mx-0">
        <SalesData />
      </div>
      <div className="grid grid-cols-1 gap-2 mx-3 md:mx-0 md:grid-cols-2 md:gap-4">
        <TopProducts />
      </div>
      <RecentOrders />
    </div>
  );
}
