import { createFileRoute } from "@tanstack/react-router";
import CustomerList from "@/modules/customers/components/customer-list";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/customers")({
  beforeLoad: requireRoles(["IS_ADMIN"]),
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      <CustomerList />
    </div>
  );
}
