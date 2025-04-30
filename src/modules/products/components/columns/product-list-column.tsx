"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortProductStatus from "../sort-status";
import Image from "next/image";
import ProductTableActions from "./product-table-actions";
import { Product } from "@/types/products";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Product Id",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("image") || 
          "/assets/svg/placeholder.svg"}
        
        alt={row.getValue("name")}
        width={40}
        height={40}
        className="w-10 h-10 object-cover rounded-full border border-gray-400"
      />
    ),
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
        currency: "NGN",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => <SortProductStatus data={row.original} />,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return <ProductTableActions data={row.original} />;
    },
  },
];
