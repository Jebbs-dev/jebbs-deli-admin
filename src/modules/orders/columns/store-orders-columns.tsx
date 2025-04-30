"use client";

import { ColumnDef } from "@tanstack/react-table";


import { Order } from "@/types/products";
import SortOrdersStatus from "../components/sort-status";
import OrderTableActions from "./order-table-actions";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "vendorAddress",
    header: "Vendor Address",
  },
  {
    accessorKey: "customerAddress",
    header: "Customer Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <SortOrdersStatus data={row.original} />,
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return <OrderTableActions data={row.original} />;
    },
  },
];
