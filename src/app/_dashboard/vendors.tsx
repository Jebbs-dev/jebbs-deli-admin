import { createFileRoute } from "@tanstack/react-router";
import VendorAdminList from "@/modules/vendors/components/vendor-list";

export const Route = createFileRoute("/_dashboard/vendors")({
  component: VendorAdminsPage,
});

function VendorAdminsPage() {
  return <VendorAdminList />;
}
