import { createFileRoute } from "@tanstack/react-router";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/admins")({
  beforeLoad: requireRoles(["IS_ADMIN"]),
  component: AdminPage,
});

function AdminPage() {
  return <div>AdminPage</div>;
}
