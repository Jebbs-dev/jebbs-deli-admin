import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/admins")({
  component: AdminPage,
});

function AdminPage() {
  return <div>AdminPage</div>;
}
