"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
// import { customers } from '../data/customers'
import { columns as CustomerListColumns } from "./columns/customer-list-column";
import { useFetchCustomer } from "../queries/fetch-customers";
import { Customer } from "@/types/user";



const CustomerList = () => {
  const { data: customers, isLoading} = useFetchCustomer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(customers);

  return (
    <div>
      <DataTable
        columns={CustomerListColumns}
        data={customers || []}
        showInput
        showAdvancedPagination
        placeholder="Search for customers..."
        columnFilterKey="name"
      />
    </div>
  );
};

export default CustomerList;
