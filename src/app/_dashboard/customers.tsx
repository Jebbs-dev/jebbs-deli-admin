import { createFileRoute } from "@tanstack/react-router";
import CustomerList from "@/modules/customers/components/customer-list";

export const Route = createFileRoute("/_dashboard/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="flex flex-col space-y-7 py-6 w-full">
      <CustomerList />
    </div>
  );
}
