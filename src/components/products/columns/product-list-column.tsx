"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../data/product-list-data";
import SortProductStatus from "../sort-status";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Product Id",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <SortProductStatus data={row.original} />
    
  },
  {
    accessorKey: "unitsSold",
    header: "Units Sold",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("earnings"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>
    },
  },
];
