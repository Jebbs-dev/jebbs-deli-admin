import { createFileRoute } from "@tanstack/react-router";
import VendorAdminList from "@/modules/vendors/components/vendor-list";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/vendors")({
  beforeLoad: requireRoles(["IS_ADMIN"]),
  component: VendorAdminsPage,
});

function VendorAdminsPage() {
  return <VendorAdminList />;
}
