import { createFileRoute } from "@tanstack/react-router";
import ProductStoreList from "@/modules/product-store/components/product-store-list";

export const Route = createFileRoute("/_dashboard/product-store/")({
  component: ProductStorePage,
});

function ProductStorePage() {
  return <ProductStoreList />;
}
