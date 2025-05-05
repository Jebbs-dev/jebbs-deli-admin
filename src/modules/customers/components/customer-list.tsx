"use client";

import React from "react";
import { columns as CustomerListColumns } from "./columns/customer-list-column";
import { useFetchFilteredCustomers } from "../queries/fetch-filtered-customers";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductListSkeleton } from "@/modules/products/components/product-list";
import { DataTable } from "./columns/customer-data-table";
import TableFilters from "@/components/date-filters";

const CustomerList = () => {
  const { vendor } = useAuthStore();
  const {
    querykey,
    backendPagination,
    dateFilter,
  } = useQueryParamaters();

  const debouncedQuery = useDebounce(querykey, 1000);

  const { data: customers, isLoading } = useFetchFilteredCustomers({
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
      <TableFilters title="Customers" canAddNew={false} />

      <DataTable
        columns={CustomerListColumns}
        data={customers?.customers}
        total={customers?.total}
        limit={customers?.limit}
        offset={customers?.offset}
        showInput
        showAdvancedPagination
        placeholder="Search for orders..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default CustomerList;
