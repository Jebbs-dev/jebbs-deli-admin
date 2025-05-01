"use client";

import Image from "next/image";
import ProductForm from "../../../../modules/products/new/components/product-form";
import { useParams } from "next/navigation";
import { useFetchProductById } from "@/modules/products/queries/fetch-product-by-id";
import { Product } from "@/types/products";
import useAuthStore from "@/state-store/auth";

const ProductPage = () => {
  const { productId } = useParams();

  const { vendor } = useAuthStore();

  const { data: product, isLoading } = useFetchProductById(
    String(productId !== "new" && productId),
    String(productId !== "new" && vendor?.store.id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(product);

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
};

export default ProductPage;
