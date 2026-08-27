import { createFileRoute } from "@tanstack/react-router";
import ProductStoreList from "@/modules/product-store/components/product-store-list";
import { requireRoles } from "@/utils/require-roles";

export const Route = createFileRoute("/_dashboard/product-store/")({
  beforeLoad: requireRoles(["IS_ADMIN"]),
  component: ProductStorePage,
});

function ProductStorePage() {
  return <ProductStoreList />;
}
