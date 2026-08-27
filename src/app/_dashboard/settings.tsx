import { createFileRoute } from "@tanstack/react-router";
import useAuthStore from "@/state-store/auth";
import useUserRole from "@/hooks/useUserRole";
import AdminPayoutControls from "@/modules/settlement/components/admin-payout-controls";
import RiderWalletSection from "@/modules/settlement/components/rider-wallet-section";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuthStore();
  const userType = useUserRole();

  return (
    <div className="flex flex-col space-y-6 py-6 w-full px-3 md:px-0">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-primary">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          {user?.name ? `Signed in as ${user.name}` : "Account settings"}
        </p>
      </div>

      {userType === "IS_ADMIN" && <AdminPayoutControls />}
      {userType === "IS_RIDER" && <RiderWalletSection />}
    </div>
  );
}
