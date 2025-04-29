"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TopProducts } from "../../data/top-products";
import SortRatings from "../sort-ratings";

export const columns: ColumnDef<TopProducts>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "unitsSold",
    header: "Units Sold",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <SortRatings data={row.original} />,
  },
];
