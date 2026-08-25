import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/modules/products/components/product-list";

export const Route = createFileRoute("/_dashboard/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="py-6 w-full">
      <ProductList />
    </div>
  );
}
