"use client";

import React from "react";
// import { customers } from '../data/customers'
import { columns as VendorListColumns } from "./columns/vendor-list-columns";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductListSkeleton } from "@/modules/products/components/product-list";
import TableFilters from "@/components/date-filters";
import { useFetchFilteredVendors } from "../queries/fetch-filtered-vendors";
import { DataTable } from "./columns/vendor-datatable";

const VendorAdminList = () => {
  const { vendor } = useAuthStore();
  const {
    querykey,
    setQueryKey,
    backendPagination,
    dateFilter,
    setDateFilter,
  } = useQueryParamaters();

  const debouncedQuery = useDebounce(querykey, 1000);

  const { data: vendors, isLoading } = useFetchFilteredVendors({
    ...backendPagination,
    search: debouncedQuery,
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
  });

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white dark:bg-background">
      <TableFilters title="Vendors" canAddNew={false} />

      <DataTable
        columns={VendorListColumns}
        data={vendors?.users}
        total={vendors?.total}
        limit={vendors?.limit}
        offset={vendors?.offset}
        showInput
        showAdvancedPagination
        placeholder="Search for orders..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default VendorAdminList;
