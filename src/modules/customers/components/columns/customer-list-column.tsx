"use client";

import { Customer } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
// import { Customer, customers } from "../../data/customers";
import { EllipsisVertical } from "lucide-react";
import dayjs from "dayjs";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Customer Id",
  },
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "telephone",
    header: "Phone No",
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => dayjs(row.getValue("createdAt")).format("MMMM D, YYYY")
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <EllipsisVertical size={15} />
      </div>
    ),
  },
];
