"use client";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns as ProductListColumns } from "./columns/product-list-column";
// import products from "../data/product-list-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useFetchFilteredProductByStoreId } from "../queries/fetch-filtered-products-by-storeid";
import { useEffect, useState } from "react";
import { useFetchFilteredProducts } from "../queries/fetch-products";
import { useDebounce } from "@/hooks/use-debounce";
import { DataTable } from "./columns/product-datatable";
import { formatDate } from "@/utils/format-date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import TableFilters from "@/components/date-filters";

export const ProductListSkeleton = () => (
  <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background overflow-auto animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 bg-gray-300 dark:bg-orange-300 rounded w-1/4"></div>
      <div className="flex space-x-3">
        <div className="h-8 w-[100px] md:w-[180px] bg-gray-300 dark:bg-orange-300 rounded"></div>
        <div className="h-8 w-24 bg-gray-300 dark:bg-orange-300 rounded"></div>
      </div>
    </div>
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-10 bg-gray-300 dark:bg-orange-300 rounded"></div>
      ))}
    </div>
  </div>
);

const ProductList = () => {
  const {
    querykey,
    setQueryKey,
    backendPagination,
    dateFilter,
    setDateFilter,
  } = useQueryParamaters();

  const { vendor } = useAuthStore();

  const debouncedQuery = useDebounce(querykey, 1000);

  const { data: productsByStore, isLoading } = useFetchFilteredProductByStoreId(
    String(vendor?.store.id),
    {
      ...backendPagination,
      search: debouncedQuery,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
    }
  );

  // const { data: fetchProducts, isLoading: isProductsLoading } =
  //   useFetchFilteredProducts();

  const router = useRouter();

  return (
    <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background overflow-auto">
      <TableFilters
        title="All Products"
        buttonTitle="Add Products"
        formLink="/products/new"
        canAddNew
      />

      <DataTable
        columns={ProductListColumns}
        data={productsByStore?.products || []}
        total={productsByStore?.total}
        limit={productsByStore?.limit}
        offset={productsByStore?.offset}
        isLoading={isLoading}
        showInput
        showAdvancedPagination
        placeholder="Search for products..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default ProductList;
