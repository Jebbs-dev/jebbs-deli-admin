"use client";

import React from "react";
// import { customers } from '../data/customers'
import { columns as ProductStoreListColumns } from "./columns/product-store-column";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";
import TableFilters from "@/components/date-filters";
import { useFetchFilteredStores } from "../queries/fetch-filtered-stores";
import { DataTable } from "./columns/product-store-datatable";

const ProductStoreList = () => {
  const { vendor } = useAuthStore();
  const {
    querykey,
    setQueryKey,
    backendPagination,
    dateFilter,
    setDateFilter,
  } = useQueryParamaters();

  const debouncedQuery = useDebounce(querykey, 1000);

  const { data: stores, isLoading } = useFetchFilteredStores({
    ...backendPagination,
    search: debouncedQuery,
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });


  return (
    <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background">
      <TableFilters title="Product Stores" canAddNew={false} />

      <DataTable
        columns={ProductStoreListColumns}
        data={stores?.stores || []}
        total={stores?.total}
        limit={stores?.limit}
        offset={stores?.offset}
        isLoading={isLoading}
        showInput
        showAdvancedPagination
        placeholder="Search by name or address..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default ProductStoreList;
