import { Image } from "@unpic/react";
import { createFileRoute } from "@tanstack/react-router";
import ProductForm from "@/modules/products/new/components/product-form";
import { useFetchProductById } from "@/modules/products/queries/fetch-product-by-id";
import useAuthStore from "@/state-store/auth";

export const Route = createFileRoute("/_dashboard/products/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { user } = useAuthStore();

  const { data: product, isLoading } = useFetchProductById(
    String(productId !== "new" && productId),
    String(productId !== "new" && user?.store?.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row mt-10 gap-10">
      <div className="space-y-4 px-4 pb-6 md:px-0 md:pb-0 lg:w-2/3">
        <h1 className="text-xl md:text-3xl font-semibold">
          {productId === "new" ? "Add New Product" : "Edit Product Information"}
        </h1>
        <ProductForm product={product} productId={String(productId)} />
      </div>

      <div className="hidden lg:block">
        <Image
          src="/assets/images/margo-brodowicz-zXuHflGL8ss-unsplash.jpg"
          alt="steak with broccoli"
          width={250}
          height={400}
          className="xl:w-[450px] h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
}
