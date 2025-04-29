"use client"

import { Order } from "@/modules/dashboard/data/recent-orders";
import { ColumnDef } from "@tanstack/react-table";
import GetProducts from "../get-products";
import SortOrdersStatus from "../sort-orders";


export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order Id"
  },
  {
    accessorKey: "customer",
    header: "Customer"
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <GetProducts data={row.original}/>
  },
  {
    accessorKey: "time",
    header: "Time"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <SortOrdersStatus data={row.original} />
  }, 
]
