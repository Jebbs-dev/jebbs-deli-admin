"use client"

import ProductList from "@/modules/products/components/product-list";
import { useFetchProductByStore } from "@/modules/products/queries/fetch-products-by-store";
import useAuthStore from "@/state-store/auth";

const ProductsPage = () => {
  return (
    <div className="py-6 w-full">
      <ProductList />
    </div>
  );
};

export default ProductsPage;
