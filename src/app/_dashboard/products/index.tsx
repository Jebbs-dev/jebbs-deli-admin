import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/modules/products/components/product-list";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/products/")({
  beforeLoad: requireRoles(["IS_VENDOR"]),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="py-6 w-full">
      <ProductList />
    </div>
  );
}
